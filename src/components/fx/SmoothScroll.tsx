'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCapabilities } from '@/lib/hooks';

/**
 * Lenis-powered inertial scrolling, wired into GSAP's ScrollTrigger so both
 * read from the same clock (otherwise pinned sections jitter one frame
 * behind the content).
 *
 * Deliberately skipped on touch and when reduced motion is requested:
 * native momentum scrolling on mobile beats anything JS can fake.
 */
export default function SmoothScroll() {
  const { coarsePointer, reducedMotion, ready } = useCapabilities();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || coarsePointer || reducedMotion) return;

    let lenis: import('lenis').default | null = null;
    let rafId = 0;
    let killed = false;
    let cleanupExtras: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (killed) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        infinite: false,
      });

      // Drive Lenis from GSAP's ticker rather than its own rAF, so the two
      // never disagree about what "now" is.
      const onTick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      lenis.on('scroll', ScrollTrigger.update);

      // Anchor links must go through Lenis or they snap instead of glide.
      const onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -90 });
      };
      document.addEventListener('click', onAnchorClick);

      // A late-loading font or image can change page height; recalculating
      // keeps ScrollTrigger's start/end positions honest.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      const t = setTimeout(refresh, 800);

      cleanupExtras = () => {
        gsap.ticker.remove(onTick);
        document.removeEventListener('click', onAnchorClick);
        window.removeEventListener('load', refresh);
        clearTimeout(t);
      };
    })();

    return () => {
      killed = true;
      cancelAnimationFrame(rafId);
      cleanupExtras?.();
      lenis?.destroy();
    };
  }, [coarsePointer, reducedMotion, ready]);

  // A client-side route change must reset scroll position and re-measure.
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh()).catch(() => {});
    }, 180);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

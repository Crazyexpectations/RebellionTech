'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '.rb-reveal, .rb-depth, .rb-left, .rb-right, .rb-scale, .rb-blur, .rb-diagram';

/**
 * One IntersectionObserver for the whole page. Elements carrying a reveal
 * class get `.rb-in` the first time they cross into view, then stop being
 * observed. Re-scans on route change so client-rendered subpages animate too.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('rb-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('rb-in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -50px 0px' }
    );

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains('rb-in')) io.observe(el);
      });
    };

    // Two passes: immediately, and once more after client components and
    // dynamic imports have had a chance to mount.
    scan();
    const t1 = setTimeout(scan, 120);
    const t2 = setTimeout(scan, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}

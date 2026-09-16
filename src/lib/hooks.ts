'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   Performance gating
   The site ships heavy visuals. These hooks decide who actually gets
   them, so a mid-range phone never pays for a WebGL particle field.
   ═══════════════════════════════════════════════════════════════════ */

export type DeviceTier = 'high' | 'mid' | 'low';

interface Capabilities {
  tier: DeviceTier;
  reducedMotion: boolean;
  coarsePointer: boolean;
  /** Full 3D scene: desktop-class GPU, fine pointer, motion allowed. */
  allow3D: boolean;
  /** Cursor followers, magnetic buttons, spotlight — pointer-dependent. */
  allowCursorFX: boolean;
  /** Has the capability check run yet? Guards against SSR mismatch. */
  ready: boolean;
}

const DEFAULTS: Capabilities = {
  tier: 'mid',
  reducedMotion: false,
  coarsePointer: false,
  allow3D: false,
  allowCursorFX: false,
  ready: false,
};

function detect(): Capabilities {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const cores = navigator.hardwareConcurrency ?? 4;
  // Non-standard but widely supported on Chromium; absent elsewhere.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const narrow = window.innerWidth < 768;

  // Save-Data header signals a user who is paying for bytes.
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  const saveData = conn?.saveData === true;
  const slowNet = conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g';

  let tier: DeviceTier = 'mid';
  if (cores >= 8 && memory >= 8 && !narrow) tier = 'high';
  else if (cores <= 4 || memory <= 4 || narrow) tier = 'low';

  if (saveData || slowNet) tier = 'low';

  return {
    tier,
    reducedMotion,
    coarsePointer,
    allow3D: tier === 'high' && !reducedMotion && !saveData,
    allowCursorFX: !coarsePointer && !reducedMotion,
    ready: true,
  };
}

/**
 * Device capability probe. Returns `ready: false` on the first render so
 * server and client markup always agree, then fills in real values.
 */
export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(DEFAULTS);

  useEffect(() => {
    setCaps(detect());

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqPointer = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCaps(detect());

    mqMotion.addEventListener('change', onChange);
    mqPointer.addEventListener('change', onChange);

    // Width changes can flip the tier (tablet rotate, window resize).
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(onChange, 250);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      mqMotion.removeEventListener('change', onChange);
      mqPointer.removeEventListener('change', onChange);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);

  return caps;
}

/** True once the OS asks for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* ═══════════════════════════════════════════════════════════════════
   Viewport
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Fires once when the element first enters the viewport, then disconnects.
 * Cheaper than keeping an observer alive for the life of the page.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser) — just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

/** Window scrollY, rAF-throttled. Never reads layout inside the listener. */
export function useScrollY(threshold = 0) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setPast(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return past;
}

/* ═══════════════════════════════════════════════════════════════════
   Counters
   ═══════════════════════════════════════════════════════════════════ */

/** Eases a number from 0 to `target` once `active` flips true. */
export function useCountUp(target: number, active: boolean, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, decimals, reduced]);

  return value;
}

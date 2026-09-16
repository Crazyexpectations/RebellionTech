'use client';

import { useEffect, useRef } from 'react';

/**
 * Reading-progress bar pinned to the top of the viewport.
 * Animates `scaleX` only, so it stays on the compositor and costs nothing
 * during scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      bar.style.opacity = p > 0.005 ? '1' : '0';
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9990,
        pointerEvents: 'none',
        background: 'rgba(239,59,35,0.07)',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '100%',
          transform: 'scaleX(0)',
          transformOrigin: '0 50%',
          opacity: 0,
          background: 'linear-gradient(90deg, #c41e0f, #ef3b23 40%, #ff7a5c 70%, #f0b64a)',
          boxShadow: '0 0 12px rgba(239,59,35,0.7)',
          willChange: 'transform',
          transition: 'opacity .3s',
        }}
      />
    </div>
  );
}

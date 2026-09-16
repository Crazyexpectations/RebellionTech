'use client';

import { useEffect } from 'react';
import { useCapabilities } from '@/lib/hooks';

/**
 * Emits a ripple ring plus a short spark burst wherever the user clicks.
 * Nodes are appended to <body>, animated purely in CSS, and removed on
 * `animationend` — nothing is retained and React never re-renders.
 */
export default function ClickFX() {
  const { reducedMotion, ready } = useCapabilities();

  useEffect(() => {
    if (!ready || reducedMotion) return;

    // Hard ceiling on concurrent nodes — protects against click-spamming.
    let live = 0;
    const MAX_LIVE = 24;

    const spawn = (e: PointerEvent) => {
      // Ignore right/middle click and synthetic events with no position.
      if (e.button !== 0 || live > MAX_LIVE) return;

      const { clientX: x, clientY: y } = e;

      // Interactive targets get the cyan accent, everything else ember.
      const onInteractive = !!(e.target as Element | null)?.closest?.(
        'a, button, [role="button"], [data-cursor]'
      );
      const hue = onInteractive ? 'rgba(42,212,240,' : 'rgba(239,59,35,';

      const ring = document.createElement('span');
      ring.className = 'rb-click-ripple';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.borderColor = `${hue}.75)`;
      live++;
      ring.addEventListener(
        'animationend',
        () => {
          ring.remove();
          live--;
        },
        { once: true }
      );
      document.body.appendChild(ring);

      // Six sparks thrown outward on a circle.
      const SPARKS = 6;
      for (let i = 0; i < SPARKS; i++) {
        const angle = (i / SPARKS) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 22 + Math.random() * 20;

        const spark = document.createElement('span');
        spark.style.cssText = `
          position:fixed;left:${x}px;top:${y}px;z-index:99989;
          width:3px;height:3px;border-radius:50%;pointer-events:none;
          background:${hue}.95);box-shadow:0 0 6px ${hue}.7);
          will-change:transform,opacity;
        `;
        document.body.appendChild(spark);
        live++;

        const anim = spark.animate(
          [
            { transform: 'translate(-50%,-50%) translate(0,0) scale(1)', opacity: 1 },
            {
              transform: `translate(-50%,-50%) translate(${Math.cos(angle) * dist}px, ${
                Math.sin(angle) * dist
              }px) scale(0)`,
              opacity: 0,
            },
          ],
          { duration: 520 + Math.random() * 180, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
        anim.onfinish = () => {
          spark.remove();
          live--;
        };
      }
    };

    document.addEventListener('pointerdown', spawn, { passive: true });
    return () => document.removeEventListener('pointerdown', spawn);
  }, [reducedMotion, ready]);

  return null;
}

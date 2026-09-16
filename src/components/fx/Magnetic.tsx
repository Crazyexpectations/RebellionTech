'use client';

import { useEffect, useRef } from 'react';
import { useCapabilities } from '@/lib/hooks';

interface Props {
  children: React.ReactNode;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
  /** Extra radius around the element that still counts as "near". */
  radius?: number;
  className?: string;
}

/**
 * Pulls its child toward the cursor when the pointer comes near, then
 * springs back on leave. Attaches listeners to the wrapper only, and writes
 * `transform` directly — no React state in the pointer path.
 */
export default function Magnetic({ children, strength = 16, radius = 90, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const { allowCursorFX, ready } = useCapabilities();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || !allowCursorFX) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const goal = { x: 0, y: 0 };
    let animating = false;

    const loop = () => {
      current.x += (goal.x - current.x) * 0.18;
      current.y += (goal.y - current.y) * 0.18;

      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(goal.x - current.x) < 0.1 && Math.abs(goal.y - current.y) < 0.1;

      if (settled && goal.x === 0 && goal.y === 0) {
        el.style.transform = '';
        animating = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (animating) return;
      animating = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;

      if (dist > reach) {
        goal.x = 0;
        goal.y = 0;
      } else {
        const falloff = 1 - dist / reach;
        goal.x = (dx / reach) * strength * falloff * 2;
        goal.y = (dy / reach) * strength * falloff * 2;
      }
      start();
    };

    const onLeave = () => {
      goal.x = 0;
      goal.y = 0;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [allowCursorFX, ready, strength, radius]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', willChange: 'transform' }}>
      {children}
    </span>
  );
}

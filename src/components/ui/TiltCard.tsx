'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';
import { useCapabilities } from '@/lib/hooks';

interface Props {
  children: ReactNode;
  /** Accent used for the hover glow and border. */
  accent?: string;
  /** Max rotation in degrees on each axis. */
  tilt?: number;
  /** How far the card lifts toward the viewer, in px. */
  lift?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Card that rotates toward the cursor in 3D. Writes transforms straight to
 * the node inside a rAF, so a grid of these costs one frame callback each
 * only while actually hovered.
 *
 * Falls back to a flat card on touch devices and under reduced motion.
 */
export default function TiltCard({
  children,
  accent = '#ef3b23',
  tilt = 9,
  lift = 10,
  className = '',
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const { allowCursorFX } = useCapabilities();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!allowCursorFX) return;
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    if (raf.current) return;

    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      const nx = (clientX - r.left) / r.width - 0.5;
      const ny = (clientY - r.top) / r.height - 0.5;

      el.style.transition = 'box-shadow .25s, border-color .25s';
      el.style.transform = `perspective(900px) rotateX(${(-ny * tilt).toFixed(2)}deg) rotateY(${(
        nx * tilt
      ).toFixed(2)}deg) translateY(-${lift}px)`;
      el.style.boxShadow = `0 40px 90px rgba(0,0,0,.65), 0 0 50px ${accent}22`;
      el.style.borderColor = `${accent}55`;
    });
  };

  const onLeave = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.transition =
      'transform .6s cubic-bezier(.16,1,.3,1), box-shadow .45s, border-color .35s';
    el.style.transform = '';
    el.style.boxShadow = '';
    el.style.borderColor = '';
  };

  return (
    <div
      ref={ref}
      className={`rb-card ${className}`}
      data-glow={`${accent}20`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}

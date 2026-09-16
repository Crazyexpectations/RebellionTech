'use client';

import { useEffect } from 'react';
import { useCapabilities } from '@/lib/hooks';

/**
 * Drives the cursor-tracked glow on `.rb-card` (see `.rb-card::after` in
 * globals.css). One delegated, rAF-throttled listener covers every card on
 * every page — no per-card handlers, no per-card state.
 */
export default function SpotlightCards() {
  const { allowCursorFX, ready } = useCapabilities();

  useEffect(() => {
    if (!ready || !allowCursorFX) return;

    let raf = 0;
    let lastEvent: PointerEvent | null = null;
    let lastCard: HTMLElement | null = null;

    const apply = () => {
      raf = 0;
      const e = lastEvent;
      if (!e) return;

      const card = (e.target as Element | null)?.closest?.('.rb-card') as HTMLElement | null;

      // Left the previous card — drop its glow so it fades out cleanly.
      if (lastCard && lastCard !== card) {
        lastCard.style.setProperty('--glow-color', 'rgba(239,59,35,0)');
      }
      lastCard = card;
      if (!card) return;

      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      card.style.setProperty(
        '--glow-color',
        card.dataset.glow ?? 'rgba(239,59,35,0.13)'
      );
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [allowCursorFX, ready]);

  return null;
}

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useCapabilities } from '@/lib/hooks';

// three.js is ~160 KB gzipped. Keeping it out of the initial bundle means
// first paint never waits on it, and low-tier devices never download it.
const NeuralCore = dynamic(() => import('./NeuralCore'), {
  ssr: false,
  loading: () => null,
});

/**
 * Layered hero backdrop.
 *
 * Layer 0 (always): CSS gradient blobs and a masked grid. Composited by the
 * GPU, costs nothing, and is a complete look on its own — so a phone or a
 * reduced-motion visitor still gets a designed hero, not an empty box.
 *
 * Layer 1 (capable devices only): the WebGL neural core, faded in after the
 * page has settled so it never competes with first paint.
 */
export default function HeroBackdrop() {
  const { allow3D, ready } = useCapabilities();
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    if (!ready || !allow3D) return;

    // Wait for the browser to go idle before pulling in three.js — text and
    // the CTA are interactive long before the canvas appears.
    const start = () => setMount3D(true);
    const ric = (window as Window & { requestIdleCallback?: typeof requestIdleCallback })
      .requestIdleCallback;

    if (typeof ric === 'function') {
      const id = ric(start, { timeout: 1800 });
      return () => {
        const cic = (window as Window & { cancelIdleCallback?: typeof cancelIdleCallback })
          .cancelIdleCallback;
        cic?.(id);
      };
    }

    const t = setTimeout(start, 900);
    return () => clearTimeout(t);
  }, [allow3D, ready]);

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Masked technical grid */}
      <div className="rb-grid-bg" style={{ position: 'absolute', inset: 0 }} />

      {/* Ambient glow blobs */}
      <div
        className="rb-glow-blob"
        style={{
          top: '34%',
          left: '62%',
          width: 640,
          height: 640,
          transform: 'translate(-50%,-50%)',
          background:
            'radial-gradient(circle, rgba(239,59,35,.20) 0%, rgba(196,30,15,.05) 40%, transparent 68%)',
          animation: 'rbPulse 9s ease-in-out infinite',
        }}
      />
      <div
        className="rb-glow-blob"
        style={{
          top: '68%',
          left: '78%',
          width: 300,
          height: 300,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(42,212,240,.14) 0%, transparent 70%)',
          animation: 'rbPulse 13s ease-in-out infinite reverse',
        }}
      />
      <div
        className="rb-glow-blob"
        style={{
          top: '20%',
          left: '18%',
          width: 260,
          height: 260,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(240,182,74,.11) 0%, transparent 70%)',
          animation: 'rbPulse 16s ease-in-out infinite',
        }}
      />

      {/* WebGL layer */}
      {mount3D && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'rbIn 1.4s ease-out both',
          }}
        >
          <NeuralCore />
        </div>
      )}

      {/* Vignette — pushes focus back to the headline */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(5,5,8,.55) 78%, rgba(5,5,8,.9) 100%)',
        }}
      />

      {/* Left scrim — the copy column sits here, and body text has to stay
          readable when the core drifts behind it. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg, rgba(5,5,8,.94) 0%, rgba(5,5,8,.8) 26%, rgba(5,5,8,.3) 48%, transparent 66%)',
        }}
      />
    </div>
  );
}

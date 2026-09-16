'use client';

import { useEffect, useRef, useState } from 'react';
import { useCapabilities } from '@/lib/hooks';

type Mode = 'default' | 'hover' | 'text' | 'drag' | 'view';

interface CursorState {
  mode: Mode;
  label: string;
}

/**
 * Two-layer cursor: a dot pinned to the true pointer position and a ring
 * that trails it with eased lag. Both are driven from a single rAF loop
 * writing `transform` only, so the compositor does all the work and the
 * main thread never lays out during pointer movement.
 *
 * Opt an element into a custom state with `data-cursor="view"` and
 * `data-cursor-label="Open"`.
 */
export default function CustomCursor() {
  const { allowCursorFX, ready } = useCapabilities();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<CursorState>({ mode: 'default', label: '' });
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mutable pointer data lives in refs — updating it must never re-render.
  const target = useRef({ x: -300, y: -300 });
  const eased = useRef({ x: -300, y: -300 });
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!ready || !allowCursorFX) return;

    const root = document.documentElement;
    root.classList.add('rb-cursor-on');

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!hasMoved.current) {
        hasMoved.current = true;
        // Jump the ring to the pointer so it doesn't fly in from 0,0.
        eased.current.x = e.clientX;
        eased.current.y = e.clientY;
        setVisible(true);
      }
    };

    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.(
        'a, button, [role="button"], label, input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;

      if (!el) {
        setState((s) => (s.mode === 'default' ? s : { mode: 'default', label: '' }));
        return;
      }

      const explicit = el.dataset.cursor as Mode | undefined;
      const label = el.dataset.cursorLabel ?? '';
      const tag = el.tagName.toLowerCase();

      let mode: Mode = 'hover';
      if (explicit) mode = explicit;
      else if (tag === 'input' || tag === 'textarea') mode = 'text';

      setState((s) => (s.mode === mode && s.label === label ? s : { mode, label }));
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      const t = target.current;
      const e = eased.current;
      // Critically-damped-ish follow. 0.16 reads as "attached but alive".
      e.x += (t.x - e.x) * 0.16;
      e.y += (t.y - e.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${e.x}px, ${e.y}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${e.x}px, ${e.y}px, 0)`;
      }
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      root.classList.remove('rb-cursor-on');
    };
  }, [allowCursorFX, ready]);

  if (!ready || !allowCursorFX) return null;

  const { mode, label } = state;
  const isHover = mode === 'hover' || mode === 'view';
  const isText = mode === 'text';

  const dotSize = down ? 4 : isHover ? 5 : isText ? 2 : 7;
  const ringSize = mode === 'view' ? 68 : isHover ? 50 : isText ? 30 : 34;
  const ringColor =
    mode === 'view' ? 'rgba(42,212,240,.85)' : isHover ? 'rgba(255,122,92,.85)' : 'rgba(255,255,255,.32)';
  const ringFill =
    mode === 'view' ? 'rgba(42,212,240,.1)' : isHover ? 'rgba(239,59,35,.08)' : 'transparent';

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    willChange: 'transform',
    opacity: visible ? 1 : 0,
    transition: 'opacity .25s',
  };

  return (
    <>
      {/* Exact-position dot */}
      <div ref={dotRef} aria-hidden style={{ ...base, zIndex: 99999 }}>
        <div
          style={{
            width: dotSize,
            height: isText ? 20 : dotSize,
            marginLeft: -dotSize / 2,
            marginTop: isText ? -10 : -dotSize / 2,
            borderRadius: isText ? 1 : '50%',
            background: isHover ? '#ff7a5c' : '#fff',
            boxShadow: isHover ? '0 0 12px rgba(255,122,92,.9)' : 'none',
            transition: 'width .2s, height .2s, margin .2s, background .2s, box-shadow .2s, border-radius .2s',
          }}
        />
      </div>

      {/* Trailing ring */}
      <div ref={ringRef} aria-hidden style={{ ...base, zIndex: 99998 }}>
        <div
          style={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            borderRadius: '50%',
            border: `1.5px solid ${ringColor}`,
            background: ringFill,
            backdropFilter: mode === 'view' ? 'blur(2px)' : 'none',
            WebkitBackdropFilter: mode === 'view' ? 'blur(2px)' : 'none',
            transform: `scale(${down ? 0.82 : 1})`,
            transition:
              'width .35s cubic-bezier(.16,1,.3,1), height .35s cubic-bezier(.16,1,.3,1), margin .35s cubic-bezier(.16,1,.3,1), border-color .25s, background .25s, transform .18s',
          }}
        />
      </div>

      {/* Contextual label inside the ring */}
      {label && (
        <div ref={labelRef} aria-hidden style={{ ...base, zIndex: 99999 }}>
          <div
            style={{
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--fm)',
              fontSize: '0.56rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: mode === 'view' ? '#2ad4f0' : '#ff7a5c',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        </div>
      )}
    </>
  );
}

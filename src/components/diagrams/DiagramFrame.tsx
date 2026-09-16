'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LegendItem {
  label: string;
  color: string;
}

interface Props {
  title: string;
  caption?: string;
  legend?: LegendItem[];
  /** Minimum width before the frame starts scrolling horizontally. */
  minWidth?: number;
  children: ReactNode;
}

/**
 * Chrome around an architecture diagram: heading, legend, and an expand
 * control that opens a pan/zoom view for dense graphs.
 *
 * On narrow screens the diagram scrolls horizontally instead of shrinking
 * its labels into illegibility.
 */
export default function DiagramFrame({
  title,
  caption,
  legend,
  minWidth = 620,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure
        className="rb-card rb-corner"
        style={{ padding: '1.5rem', margin: 0, overflow: 'hidden' }}
        data-glow="rgba(239,59,35,0.10)"
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--fm)',
                fontSize: '0.6rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--t3)',
                marginBottom: '0.4rem',
              }}
            >
              Architecture
            </div>
            <h3 style={{ margin: 0, fontSize: '1.02rem' }}>{title}</h3>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rb-btn rb-btn-ghost rb-btn-sm"
            data-cursor="view"
            data-cursor-label="Expand"
            aria-label={`Expand diagram: ${title}`}
            style={{ flexShrink: 0 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Expand
          </button>
        </div>

        {/* Diagram */}
        <div className="rb-diagram-scroll">
          <div style={{ minWidth }}>{children}</div>
        </div>

        {/* Legend */}
        {legend && legend.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem 1.2rem',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--b)',
            }}
          >
            {legend.map((l) => (
              <span
                key={l.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontFamily: 'var(--fm)',
                  fontSize: '0.66rem',
                  color: 'var(--t3)',
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 3,
                    background: l.color,
                    boxShadow: `0 0 8px ${l.color}66`,
                    flexShrink: 0,
                  }}
                />
                {l.label}
              </span>
            ))}
          </div>
        )}

        {caption && (
          <figcaption
            style={{
              marginTop: '1rem',
              fontSize: '0.83rem',
              color: 'var(--t2)',
              lineHeight: 1.75,
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <DiagramViewer title={title} onClose={() => setOpen(false)}>
          {children}
        </DiagramViewer>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Full-screen pan / zoom viewer
   ═══════════════════════════════════════════════════════════════════ */

function DiagramViewer({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });
  const closeRef = useRef<HTMLButtonElement>(null);

  const clamp = (s: number) => Math.min(5, Math.max(0.6, s));
  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === '+' || e.key === '=') setScale((s) => clamp(s + 0.35));
      else if (e.key === '-' || e.key === '_') setScale((s) => clamp(s - 0.35));
      else if (e.key === '0') reset();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Non-passive wheel listener — React's onWheel is passive, so
  // preventDefault() there would be ignored and the page would scroll.
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => clamp(s - e.deltaY * 0.0018));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const btn: React.CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,.14)',
    background: 'rgba(14,14,22,.92)',
    color: '#f0f0f5',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
    transition: 'background .2s, border-color .2s',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — expanded view`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        background: 'rgba(3,3,6,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'rbIn .25s ease-out',
      }}
    >
      {/* Title */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', top: 22, left: 24, maxWidth: '55vw', zIndex: 602 }}
      >
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--t1)' }}>{title}</div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: '0.62rem', color: 'var(--t3)' }}>
          {Math.round(scale * 100)}%
        </div>
      </div>

      {/* Toolbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', top: 18, right: 20, display: 'flex', gap: 8, zIndex: 602 }}
      >
        <button style={btn} onClick={() => setScale((s) => clamp(s - 0.4))} aria-label="Zoom out">
          −
        </button>
        <button style={btn} onClick={() => setScale((s) => clamp(s + 0.4))} aria-label="Zoom in">
          +
        </button>
        <button
          style={{ ...btn, width: 'auto', padding: '0 14px', borderRadius: 999, fontSize: '0.7rem', fontFamily: 'var(--fm)' }}
          onClick={reset}
        >
          Reset
        </button>
        <button ref={closeRef} style={{ ...btn, fontSize: '1.4rem' }} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          setDragging(true);
          last.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          const dx = e.clientX - last.current.x;
          const dy = e.clientY - last.current.y;
          last.current = { x: e.clientX, y: e.clientY };
          setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onDoubleClick={() => (scale > 1 ? reset() : setScale(2.2))}
        style={{
          width: '94vw',
          height: '82vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none',
          cursor: dragging ? 'grabbing' : 'grab',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: dragging ? 'none' : 'transform .2s cubic-bezier(.16,1,.3,1)',
          }}
        >
          {/* Force the reveal-driven edge animations to their finished state */}
          <div className="rb-in">{children}</div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--fm)',
          fontSize: '0.58rem',
          color: 'rgba(255,255,255,.3)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        SCROLL TO ZOOM · DRAG TO PAN · DOUBLE-CLICK TO RESET · ESC TO CLOSE
      </div>
    </div>
  );
}

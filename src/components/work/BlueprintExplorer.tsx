'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section, { SectionHead } from '@/components/ui/Section';
import { BLUEPRINTS } from '@/lib/blueprints';
import { accentTint } from '@/lib/site';

/**
 * Two-pane explorer: pick a system archetype on the left, read its full
 * build notes on the right. Collapses to a stacked accordion on mobile.
 */
export default function BlueprintExplorer() {
  const [activeId, setActiveId] = useState(BLUEPRINTS[0].id);
  const active = BLUEPRINTS.find((b) => b.id === activeId) ?? BLUEPRINTS[0];
  const tint = accentTint(active.accent);

  return (
    <Section bg="base" hex>
      <SectionHead
        badge="Reference architectures"
        title={<>Six systems we build, <span className="rb-gt">opened up</span></>}
        lead="These are blueprints, not case studies. Each one describes an archetype we are built to deliver: the real problem, the part that is genuinely hard, and how each layer of the architecture answers it."
        maxWidth={720}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .bp-shell { display: grid; grid-template-columns: 330px 1fr; gap: 1.5rem; align-items: start; }
          @media (max-width: 960px) { .bp-shell { grid-template-columns: 1fr; } }

          .bp-list { display: flex; flex-direction: column; gap: 0.5rem; position: sticky; top: 96px; }
          @media (max-width: 960px) { .bp-list { position: static; } }

          .bp-item {
            width: 100%; text-align: left; cursor: pointer; font: inherit; color: inherit;
            background: var(--card); border: 1px solid var(--b); border-radius: 12px;
            padding: 0.95rem 1.1rem; transition: border-color .25s, background .25s, transform .25s;
          }
          .bp-item:hover { border-color: var(--b2); transform: translateX(3px); }
          .bp-item[aria-selected="true"] { background: var(--card2); }

          .bp-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
          @media (max-width: 720px) { .bp-detail-grid { grid-template-columns: 1fr; } }
        `,
        }}
      />

      <div className="bp-shell">
        {/* ── Selector ─────────────────────────────────────────────── */}
        <div className="bp-list" role="tablist" aria-label="System blueprints">
          {BLUEPRINTS.map((b) => {
            const on = b.id === activeId;
            const t = accentTint(b.accent);
            return (
              <button
                key={b.id}
                role="tab"
                aria-selected={on}
                aria-controls="bp-detail"
                onClick={() => setActiveId(b.id)}
                className="bp-item"
                style={{ borderColor: on ? t.border : undefined }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 5 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 2,
                      background: b.accent,
                      opacity: on ? 1 : 0.4,
                      boxShadow: on ? `0 0 8px ${b.accent}` : 'none',
                      flexShrink: 0,
                      transition: 'opacity .25s',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--fd)',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      color: on ? 'var(--t1)' : 'var(--t2)',
                      transition: 'color .25s',
                    }}
                  >
                    {b.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--t3)', lineHeight: 1.6, paddingLeft: 16 }}>
                  {b.summary}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Detail ───────────────────────────────────────────────── */}
        <div
          id="bp-detail"
          role="tabpanel"
          className="rb-card rb-corner"
          // Remounting on change replays the entrance animation.
          key={active.id}
          style={{ padding: '2rem', animation: 'rbUp .5s cubic-bezier(.16,1,.3,1) both' }}
          data-glow={tint.border}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: '12%',
              right: '12%',
              height: 1,
              background: `linear-gradient(90deg, transparent, ${active.accent}77, transparent)`,
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div className="rb-label" style={{ color: active.accent, marginBottom: 6 }}>
                {active.archetype}
              </div>
              <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{active.name}</h3>
            </div>

            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', flexShrink: 0 }}>
              <span
                className="rb-chip"
                style={{ background: tint.bg, color: active.accent, border: `1px solid ${tint.border}` }}
              >
                {active.tier}
              </span>
              <span
                className="rb-chip"
                style={{ background: 'rgba(255,255,255,.03)', color: 'var(--t2)', border: '1px solid var(--b2)' }}
              >
                {active.range}
              </span>
            </div>
          </div>

          {/* Problem + hard part */}
          <div className="bp-detail-grid" style={{ marginBottom: '1.75rem' }}>
            <div>
              <div className="rb-label" style={{ marginBottom: '0.6rem' }}>The problem</div>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>{active.problem}</p>
            </div>
            <div
              style={{
                background: tint.bg,
                border: `1px solid ${tint.border}`,
                borderRadius: 10,
                padding: '1.1rem 1.2rem',
              }}
            >
              <div className="rb-label" style={{ color: active.accent, marginBottom: '0.6rem' }}>
                The hard part
              </div>
              <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--t2)' }}>{active.hardPart}</p>
            </div>
          </div>

          {/* Layer notes */}
          <div className="rb-label" style={{ marginBottom: '0.9rem' }}>How the layers answer it</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
            {active.layers.map((l, i) => (
              <div
                key={l.layer}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr',
                  gap: '1rem',
                  padding: '0.8rem 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--b)',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '0.7rem',
                    color: active.accent,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    paddingTop: 2,
                  }}
                >
                  {l.layer}
                </span>
                <span style={{ fontSize: '0.86rem', color: 'var(--t2)', lineHeight: 1.72 }}>{l.note}</span>
              </div>
            ))}
          </div>

          {/* Fit signals */}
          <div className="bp-detail-grid">
            <div>
              <div className="rb-label" style={{ marginBottom: '0.7rem' }}>Build this if</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, listStyle: 'none' }}>
                {active.signals.map((sg) => (
                  <li key={sg} style={{ display: 'flex', gap: 9, fontSize: '0.84rem' }}>
                    <span style={{ color: active.accent, flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'var(--t2)' }}>{sg}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="rb-label" style={{ marginBottom: '0.7rem' }}>Do not build this if</div>
              <div style={{ display: 'flex', gap: 9, fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--t3)', flexShrink: 0 }}>✕</span>
                <span style={{ color: 'var(--t3)' }}>{active.notFor}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--b)' }}>
            <Link href="/audit/" className="rb-btn rb-btn-ghost rb-btn-sm">
              Ask whether this fits your problem
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

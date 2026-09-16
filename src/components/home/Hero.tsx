'use client';

import Link from 'next/link';
import HeroBackdrop from '@/components/three/HeroBackdrop';
import Magnetic from '@/components/fx/Magnetic';
import { SITE, CTA } from '@/lib/site';

const FACTS = [
  { k: '72h', v: 'Audit turnaround', accent: 'var(--cy2)' },
  { k: '100%', v: 'IP transferred', accent: 'var(--em3)' },
  { k: '0', v: 'Vendor lock-in', accent: 'var(--am2)' },
  { k: '6', v: 'Layers owned', accent: 'var(--em3)' },
];

const SPEC_LINES = [
  { k: 'system', v: 'domain-intelligence', c: 'var(--cy2)' },
  { k: 'models', v: 'task-tuned, not generic', c: 'var(--t1)' },
  { k: 'retrieval', v: 'hybrid + reranked', c: 'var(--t1)' },
  { k: 'guardrails', v: 'enforced, not prompted', c: 'var(--am2)' },
  { k: 'evaluation', v: 'adversarial + sliced', c: 'var(--t1)' },
  { k: 'ownership', v: 'yours', c: 'var(--em3)' },
];

export default function Hero() {
  return (
    <section
      className="rb-noise"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-h) + 2.5rem)',
        paddingBottom: '4rem',
        background: 'var(--bg)',
      }}
    >
      <HeroBackdrop />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hero-grid {
            display: grid; grid-template-columns: 1fr; gap: 3rem;
            max-width: 1220px; margin: 0 auto; padding: 0 1.35rem;
            position: relative; width: 100%;
          }
          @media (min-width: 1080px) {
            .hero-grid { grid-template-columns: 1.15fr 0.85fr; gap: 4rem; align-items: center; }
          }
          .hero-panel { display: none; }
          @media (min-width: 1080px) { .hero-panel { display: block; } }

          .hero-word {
            display: inline-block;
            opacity: 0; transform: translateY(0.5em) rotate(2deg);
            animation: heroWord .85s cubic-bezier(.16,1,.3,1) forwards;
          }
          @keyframes heroWord {
            to { opacity: 1; transform: none; }
          }

          .hero-facts {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1px; background: var(--b);
            border: 1px solid var(--b); border-radius: 12px; overflow: hidden;
          }
          @media (max-width: 680px) { .hero-facts { grid-template-columns: repeat(2, 1fr); } }

          .hero-fact { background: rgba(8,8,14,.72); padding: 0.95rem 1rem; }

          .hero-cta-row { display: flex; gap: 0.85rem; flex-wrap: wrap; }
          @media (max-width: 420px) {
            .hero-cta-row > * { width: 100%; }
            .hero-cta-row .rb-btn { width: 100%; }
          }

          /* The cue only earns its space when the viewport is tall enough
             that it will not collide with the facts strip. */
          .hero-cue { display: none; }
          @media (min-width: 1080px) and (min-height: 760px) {
            .hero-cue { display: flex; }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-word { opacity: 1 !important; transform: none !important; animation: none !important; }
          }
        `,
        }}
      />

      <div className="hero-grid">
        {/* ── Copy ─────────────────────────────────────────────────── */}
        <div>
          {SITE.status.open && (
            <div
              className="rb-u0"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '6px 15px',
                borderRadius: 999,
                border: '1px solid var(--cy-a25)',
                background: 'rgba(8,8,14,.6)',
                backdropFilter: 'blur(10px)',
                marginBottom: '1.6rem',
              }}
            >
              <span className="rb-dot-live" />
              <span
                style={{
                  fontSize: '0.66rem',
                  fontFamily: 'var(--fm)',
                  color: 'var(--cy2)',
                  letterSpacing: '0.08em',
                }}
              >
                {SITE.status.label}
              </span>
            </div>
          )}

          <h1 style={{ marginBottom: '1.4rem' }}>
            {'Stop renting'.split(' ').map((w, i) => (
              <span key={i} className="hero-word" style={{ animationDelay: `${0.12 + i * 0.08}s`, marginRight: '0.28em' }}>
                {w}
              </span>
            ))}
            <span className="hero-word" style={{ animationDelay: '0.28s', marginRight: '0.28em' }}>
              intelligence.
            </span>
            <br />
            <span className="hero-word rb-gt-anim" style={{ animationDelay: '0.42s' }}>
              Own it.
            </span>
          </h1>

          <p
            className="rb-u2"
            style={{ fontSize: '1.02rem', maxWidth: 560, marginBottom: '2rem', lineHeight: 1.8 }}
          >
            Most &quot;AI products&quot; are a prompt wrapped around someone else&apos;s model. We build the
            whole system — the data, the retrieval, the reasoning, the guardrails, the evaluation — and
            then we hand you the keys.
          </p>

          <div className="hero-cta-row rb-u3" style={{ marginBottom: '2.75rem' }}>
            <Magnetic strength={13} radius={70}>
              <Link href={CTA.href} className="rb-btn rb-btn-fill">
                Get a 72-hour audit
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>

            <Magnetic strength={10} radius={60}>
              <Link href="/systems/" className="rb-btn rb-btn-ghost">
                See how we build
              </Link>
            </Magnetic>
          </div>

          {/* Quick facts */}
          <div className="hero-facts rb-u4">
            {FACTS.map((f) => (
              <div key={f.v} className="hero-fact">
                <div
                  style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: f.accent,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '0.63rem',
                    color: 'var(--t3)',
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Floating spec panel (wide screens) ───────────────────── */}
        <div className="hero-panel rb-u3">
          <div
            className="rb-frost rb-card-3d"
            style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,122,92,.6), transparent)',
              }}
            />

            {/* Window chrome */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                paddingBottom: '0.9rem',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--b)',
              }}
            >
              {['#ef3b23', '#f0b64a', '#2ad4f0'].map((c) => (
                <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
              <span
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '0.62rem',
                  color: 'var(--t3)',
                  marginLeft: 6,
                  letterSpacing: '0.06em',
                }}
              >
                system.spec
              </span>
            </div>

            {SPEC_LINES.map((l, i) => (
              <div
                key={l.k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 12,
                  padding: '0.42rem 0',
                  fontFamily: 'var(--fm)',
                  fontSize: '0.74rem',
                  animation: `rbUp .6s cubic-bezier(.16,1,.3,1) ${0.6 + i * 0.09}s both`,
                }}
              >
                <span style={{ color: 'var(--t3)' }}>{l.k}</span>
                <span style={{ color: l.c, textAlign: 'right' }}>{l.v}</span>
              </div>
            ))}

            <div
              style={{
                marginTop: '1.1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--b)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span className="rb-dot-live" />
              <span style={{ fontFamily: 'var(--fm)', fontSize: '0.66rem', color: 'var(--t2)' }}>
                Built for production, not for the demo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="hero-cue"
        style={{
          position: 'absolute',
          bottom: 26,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'rbIn 1s ease-out 1.4s both',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--fm)',
            fontSize: '0.56rem',
            letterSpacing: '0.2em',
            color: 'var(--t3)',
          }}
        >
          SCROLL
        </span>
        <span
          style={{
            width: 1,
            height: 34,
            background: 'linear-gradient(to bottom, var(--em2), transparent)',
            animation: 'rbPulse 2.4s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}

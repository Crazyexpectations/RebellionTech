import Link from 'next/link';
import Magnetic from '@/components/fx/Magnetic';
import { SITE, CTA } from '@/lib/site';

const DELIVERABLES = [
  'A written read on what you are actually trying to build',
  'The architecture we would use, and the two we rejected',
  'Where this fails in production, and what that costs',
  'A realistic budget range and timeline — or a reason not to start',
];

export default function CTASection() {
  return (
    <section
      className="rb-cv rb-noise"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--b)',
        padding: '6rem 1.35rem',
      }}
    >
      <div className="rb-floor" style={{ opacity: 0.55 }} />

      <div
        aria-hidden
        className="rb-glow-blob"
        style={{
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 420,
          background: 'radial-gradient(ellipse, rgba(239,59,35,.13) 0%, transparent 70%)',
          animation: 'rbPulse 10s ease-in-out infinite',
        }}
      />

      <div className="rb-inner" style={{ maxWidth: 900, textAlign: 'center' }}>
        <span className="rb-badge rb-badge-cyan rb-reveal" style={{ marginBottom: '1.5rem' }}>
          Start here
        </span>

        <h2 className="rb-reveal rb-d1" style={{ marginBottom: '1.25rem', fontSize: 'clamp(2rem, 4.4vw, 3.4rem)' }}>
          Find out what you actually need
          <br />
          <span className="rb-gt-anim">before you spend a rupee building it.</span>
        </h2>

        <p
          className="rb-reveal rb-d2"
          style={{ fontSize: '1rem', maxWidth: 620, margin: '0 auto 2.5rem', lineHeight: 1.8 }}
        >
          Send us the problem in whatever form you have it — a paragraph, a deck, a half-working prototype.
          You get a written architecture audit back in 72 hours.
        </p>

        {/* Deliverables */}
        <div
          className="rb-reveal rb-d3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.75rem',
            maxWidth: 760,
            margin: '0 auto 2.75rem',
            textAlign: 'left',
          }}
        >
          {DELIVERABLES.map((d) => (
            <div
              key={d}
              className="rb-card"
              style={{ padding: '0.95rem 1.1rem', display: 'flex', gap: 10, alignItems: 'flex-start' }}
            >
              <span aria-hidden style={{ color: 'var(--cy2)', flexShrink: 0, fontSize: '0.8rem', marginTop: 2 }}>
                ✓
              </span>
              <span style={{ fontSize: '0.84rem', color: 'var(--t2)', lineHeight: 1.65 }}>{d}</span>
            </div>
          ))}
        </div>

        <div
          className="rb-reveal rb-d4"
          style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Magnetic strength={15} radius={80}>
            <Link href={CTA.href} className="rb-btn rb-btn-fill">
              Request the audit
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Magnetic>

          <Magnetic strength={11} radius={65}>
            <a href={`mailto:${SITE.email}`} className="rb-btn rb-btn-ghost">
              {SITE.email}
            </a>
          </Magnetic>
        </div>

        <p
          className="rb-reveal rb-d5"
          style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--t3)', marginTop: '1.75rem' }}
        >
          No discovery call required · No obligation · You keep the document either way
        </p>
      </div>
    </section>
  );
}

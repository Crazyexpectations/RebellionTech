import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** Short facts rendered as a hairline strip under the lead. */
  facts?: { k: string; v: string }[];
  tone?: 'ember' | 'cyan' | 'brass';
}

const TONE = {
  ember: { badge: 'rb-badge', glow: 'rgba(239,59,35,.13)' },
  cyan: { badge: 'rb-badge rb-badge-cyan', glow: 'rgba(42,212,240,.11)' },
  brass: { badge: 'rb-badge rb-badge-brass', glow: 'rgba(240,182,74,.11)' },
};

/** Shared masthead for every subpage — keeps the entry rhythm identical. */
export default function PageHero({ eyebrow, title, lead, facts, tone = 'ember' }: Props) {
  const t = TONE[tone];

  return (
    <section
      className="rb-noise rb-subpage-bg"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-h) + 4.5rem)',
        paddingBottom: '3.5rem',
        paddingInline: '1.35rem',
        borderBottom: '1px solid var(--b)',
      }}
    >
      <div className="rb-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.7 }} aria-hidden />
      <div
        aria-hidden
        className="rb-glow-blob"
        style={{
          top: '-25%',
          right: '-6%',
          width: 560,
          height: 560,
          background: `radial-gradient(circle, ${t.glow} 0%, transparent 68%)`,
          animation: 'rbPulse 12s ease-in-out infinite',
        }}
      />

      <div className="rb-inner">
        <span className={`${t.badge} rb-u0`} style={{ marginBottom: '1.3rem' }}>
          {eyebrow}
        </span>

        <h1 className="rb-u1" style={{ maxWidth: 940, marginBottom: '1.2rem', fontSize: 'clamp(2.1rem, 4.6vw, 3.9rem)' }}>
          {title}
        </h1>

        <p className="rb-u2" style={{ maxWidth: 680, fontSize: '1rem', lineHeight: 1.8 }}>
          {lead}
        </p>

        {facts && facts.length > 0 && (
          <div
            className="rb-u3"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 2.5rem',
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--b)',
            }}
          >
            {facts.map((f) => (
              <div key={f.v} style={{ padding: '0.4rem 0' }}>
                <div
                  style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--t1)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {f.k}
                </div>
                <div className="rb-label" style={{ marginTop: 2 }}>{f.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

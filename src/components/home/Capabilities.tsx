import Link from 'next/link';
import Section, { SectionHead } from '@/components/ui/Section';
import TiltCard from '@/components/ui/TiltCard';
import { CAPABILITIES } from '@/lib/capabilities';
import { accentTint } from '@/lib/site';

export default function Capabilities() {
  return (
    <Section bg="alt" mesh id="capabilities" rail="Capabilities">
      <SectionHead
        badge="Core capabilities"
        title={<>Six things we do <span className="rb-gt">properly</span></>}
        lead="Not a service menu. These are the six layers that decide whether an AI system survives contact with reality — and we own all of them."
      />

      <div className="rb-grid-3">
        {CAPABILITIES.map((c, i) => {
          const tint = accentTint(c.accent);
          return (
            <TiltCard
              key={c.n}
              accent={c.accent}
              className="rb-depth rb-corner"
              style={{ padding: '1.75rem', transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              {/* Watermark index */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 12,
                  fontFamily: 'var(--fd)',
                  fontWeight: 700,
                  fontSize: '4.6rem',
                  opacity: 0.045,
                  color: c.accent,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {c.n}
              </span>

              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${tint.border}, transparent)`,
                }}
              />

              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  marginBottom: '1.2rem',
                  background: tint.bg,
                  border: `1px solid ${tint.border}`,
                  color: c.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {c.icon}
              </div>

              <h3 style={{ marginBottom: '0.5rem', lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: '0.86rem', marginBottom: '1.2rem', lineHeight: 1.75 }}>{c.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rb-chip"
                    style={{ background: tint.bg, color: c.accent, border: `1px solid ${tint.border}` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>

      <div className="rb-reveal" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link href="/systems/" className="rb-btn rb-btn-ghost">
          Full breakdown of how each layer is built
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}

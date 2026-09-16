import Section, { SectionHead } from '@/components/ui/Section';
import TiltCard from '@/components/ui/TiltCard';
import { PRICING_MODELS } from '@/lib/pricing';
import { accentTint } from '@/lib/site';

export default function PricingModels() {
  return (
    <Section bg="alt" mesh>
      <SectionHead
        badge="Engagement models"
        title={<>Four ways to <span className="rb-gt">work with us</span></>}
        lead="Which one applies depends on a single question: do you want to own the system, or do you want us to operate it? Everything else follows from that."
        maxWidth={660}
      />

      <div className="rb-grid-2" style={{ marginBottom: '1.25rem' }}>
        {PRICING_MODELS.map((m, i) => {
          const tint = accentTint(m.accent);
          return (
            <TiltCard
              key={m.title}
              accent={m.accent}
              tilt={5}
              lift={6}
              className="rb-depth"
              style={{ padding: '2rem', transitionDelay: `${(i % 2) * 0.1}s`, overflow: 'hidden' }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${m.accent}70, transparent)`,
                }}
              />
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  borderRadius: '0 2px 2px 0',
                  background: `linear-gradient(to bottom, ${m.accent}, transparent)`,
                  opacity: 0.8,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ fontFamily: 'var(--fm)', fontSize: '1.3rem', color: m.accent, lineHeight: 1 }}>
                  {m.icon}
                </span>
                <span
                  className="rb-chip"
                  style={{ background: tint.bg, color: m.accent, border: `1px solid ${tint.border}`, fontSize: '0.6rem', letterSpacing: '0.08em' }}
                >
                  {m.tag}
                </span>
              </div>

              <h3 style={{ marginBottom: '0.55rem', fontSize: '1.08rem' }}>{m.title}</h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: '0.95rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: m.accent,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {m.price}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--t3)' }}>
                  {m.priceUnit}
                </span>
              </div>

              <p style={{ fontSize: '0.855rem', marginBottom: '1.3rem', lineHeight: 1.76 }}>{m.summary}</p>

              <div className="rb-label" style={{ marginBottom: '0.6rem' }}>Includes</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem', listStyle: 'none' }}>
                {m.includes.map((inc) => (
                  <li key={inc} style={{ display: 'flex', gap: 9, fontSize: '0.82rem' }}>
                    <span style={{ color: m.accent, flexShrink: 0, fontSize: '0.75rem', marginTop: 2 }}>✓</span>
                    <span style={{ color: 'var(--t2)' }}>{inc}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  borderTop: `1px solid ${tint.border}`,
                  paddingTop: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: m.accent, fontStyle: 'italic' }}>
                  {m.think}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end' }}>
                  {m.examples.slice(0, 2).map((ex) => (
                    <span
                      key={ex}
                      className="rb-chip"
                      style={{ background: tint.bg, color: m.accent, border: `1px solid ${tint.border}`, fontSize: '0.6rem' }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      <div className="rb-reveal rb-card" style={{ padding: '1.35rem 1.6rem', borderColor: 'var(--em-a25)' }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          <strong style={{ color: 'var(--em3)' }}>A note on naming.</strong> Not every recurring fee is an
          Infrastructure Subscription. A retainer for ongoing improvements is a different thing from operating
          critical knowledge, retrieval and analytics infrastructure day to day. We use the term only when
          that is genuinely what is happening — otherwise it is a Monthly Retainer and it is priced like one.
        </p>
      </div>
    </Section>
  );
}

import Section, { SectionHead } from '@/components/ui/Section';
import { TIERS, FACTORS } from '@/lib/pricing';
import { accentTint } from '@/lib/site';

export function ComplexityTiers() {
  return (
    <Section bg="alt" mesh>
      <SectionHead
        badge="Complexity"
        badgeTone="cyan"
        title={<>Technical complexity <span className="rb-gt2">tiers</span></>}
        lead="These describe the depth of engineering in a system and drive project cost. They do not decide the engagement model — a Tier 2 system can run under either one."
        maxWidth={660}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.35rem' }}>
        {TIERS.map((t, i) => {
          const tint = accentTint(t.accent);
          return (
            <div
              key={t.n}
              className="rb-reveal rb-card rb-lift"
              style={{ padding: '1.9rem', overflow: 'hidden', transitionDelay: `${i * 0.08}s` }}
              data-glow={tint.border}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  background: `linear-gradient(to bottom, ${t.accent}, transparent)`,
                }}
              />
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 16,
                  fontFamily: 'var(--fd)',
                  fontWeight: 700,
                  fontSize: '5.5rem',
                  opacity: 0.035,
                  color: t.accent,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {t.n}
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                    <span
                      className="rb-chip"
                      style={{
                        background: tint.bg,
                        color: t.accent,
                        border: `1px solid ${tint.border}`,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontSize: '0.6rem',
                      }}
                    >
                      {t.tier}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.08rem' }}>{t.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', margin: 0, maxWidth: '68ch' }}>{t.desc}</p>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '0.8rem',
                    color: t.accent,
                    background: tint.bg,
                    border: `1px solid ${tint.border}`,
                    padding: '5px 13px',
                    borderRadius: 999,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.price}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: '0.9rem', borderTop: '1px solid var(--b)' }}>
                {t.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rb-chip"
                    style={{ background: tint.bg, color: t.accent, border: `1px solid ${tint.border}` }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rb-reveal rb-card" style={{ padding: '1.35rem 1.6rem', borderColor: 'var(--am-a25)' }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          <strong style={{ color: 'var(--am2)' }}>Tier is not the engagement model.</strong> Tier describes
          how deep the engineering goes. The question on this page decides whether you engage through Build
          plus Retainer or Setup plus Subscription. They are independent choices.
        </p>
      </div>
    </Section>
  );
}

export function CostFactors() {
  return (
    <Section bg="base">
      <SectionHead
        badge="Cost factors"
        title={<>What actually <span className="rb-gt">moves the number</span></>}
        lead="There is no price list, because there is no standard project. These six things decide where in the range you land."
        maxWidth={560}
      />

      <div className="rb-grid-3" style={{ marginBottom: '1.5rem' }}>
        {FACTORS.map((f, i) => (
          <div
            key={f.f}
            className="rb-depth rb-card rb-lift"
            style={{ padding: '1.5rem', transitionDelay: `${(i % 3) * 0.09}s` }}
          >
            <div
              className="rb-label"
              style={{ color: 'var(--em3)', marginBottom: '0.7rem' }}
            >
              0{i + 1}
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '0.98rem' }}>{f.f}</h3>
            <p style={{ fontSize: '0.855rem', margin: 0, lineHeight: 1.74 }}>{f.e}</p>
          </div>
        ))}
      </div>

      <div className="rb-reveal rb-card" style={{ padding: '1.35rem 1.6rem', borderColor: 'var(--em-a25)' }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          <strong style={{ color: 'var(--em3)' }}>No discounts, no surprises.</strong> These ranges reflect
          real cost. Custom intelligence is expensive because it is real engineering work, and we do not
          compete on price. Once the audit is done, the number we quote is the number you pay.
        </p>
      </div>
    </Section>
  );
}

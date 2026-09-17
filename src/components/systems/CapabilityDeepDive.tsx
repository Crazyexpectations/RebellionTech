import Section, { SectionHead } from '@/components/ui/Section';
import { CAPABILITIES } from '@/lib/capabilities';
import { accentTint } from '@/lib/site';

/** Each capability expanded: what it means and how we actually do it. */
export default function CapabilityDeepDive() {
  return (
    <Section bg="base" hex id="layers" rail="The six layers">
      <SectionHead
        badge="Layer by layer"
        title={<>What each layer <span className="rb-gt">actually involves</span></>}
        lead="The claims on the home page, with the engineering underneath them."
        maxWidth={620}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {CAPABILITIES.map((c, i) => {
          const tint = accentTint(c.accent);
          const flip = i % 2 === 1;

          return (
            <article
              key={c.n}
              className={`${flip ? 'rb-right' : 'rb-left'} rb-card rb-corner`}
              style={{ padding: '2rem', overflow: 'hidden' }}
              data-glow={`${tint.border}`}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  background: `linear-gradient(to bottom, ${c.accent}, transparent)`,
                  opacity: 0.8,
                }}
              />

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .cdd-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 2.5rem; }
                  @media (max-width: 860px) { .cdd-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
                `,
                }}
              />

              <div className="cdd-grid">
                {/* Left: identity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                    <span
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 11,
                        background: tint.bg,
                        border: `1px solid ${tint.border}`,
                        color: c.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--fm)',
                        fontSize: '0.68rem',
                        color: c.accent,
                        letterSpacing: '0.14em',
                      }}
                    >
                      {c.n}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--t1)', fontWeight: 500, marginBottom: '0.75rem' }}>
                    {c.short}
                  </p>
                  <p style={{ fontSize: '0.86rem', marginBottom: '1.1rem' }}>{c.desc}</p>

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
                </div>

                {/* Right: practice */}
                <div>
                  <div className="rb-label" style={{ marginBottom: '0.9rem' }}>In practice</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', listStyle: 'none' }}>
                    {c.detail.map((d) => (
                      <li key={d} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                        <span
                          aria-hidden
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: c.accent,
                            flexShrink: 0,
                            marginTop: 8,
                            boxShadow: `0 0 8px ${c.accent}`,
                          }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--t2)', lineHeight: 1.75 }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

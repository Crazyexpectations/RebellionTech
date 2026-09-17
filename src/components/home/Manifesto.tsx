import Section from '@/components/ui/Section';

const CLAIMS = [
  {
    bad: 'A prompt in a text box',
    good: 'A system with retrieval, policy, evaluation and memory',
    accent: 'var(--em3)',
  },
  {
    bad: 'Demos that work on the happy path',
    good: 'Behaviour that holds on the cases that matter',
    accent: 'var(--am2)',
  },
  {
    bad: 'A vendor you can never leave',
    good: 'Code, weights and documentation you own outright',
    accent: 'var(--cy2)',
  },
];

/** The positioning argument, stated plainly. */
export default function Manifesto() {
  return (
    <Section bg="base" hex topGlow id="why" rail="Why we exist">
      <div className="rb-reveal" style={{ maxWidth: 860, marginBottom: '3.5rem' }}>
        <span className="rb-badge" style={{ marginBottom: '1.2rem' }}>Why we exist</span>
        <h2 style={{ marginBottom: '1.25rem' }}>
          The AI industry got very good at{' '}
          <span className="rb-gt">looking capable</span>.
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 720 }}>
          Most of what ships as &quot;AI&quot; is an API call with a personality. It demos beautifully and
          collapses the moment it meets a real workflow, a real edge case, or a real auditor. We started
          RebellionTech because the gap between <strong>a convincing demo</strong> and{' '}
          <strong>a system you can depend on</strong> is where all the actual engineering lives — and almost
          nobody is doing it.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CLAIMS.map((c, i) => (
          <div
            key={c.bad}
            className="rb-reveal rb-card"
            style={{ padding: '1.5rem 1.75rem', transitionDelay: `${i * 0.1}s` }}
            data-glow={`${c.accent === 'var(--cy2)' ? 'rgba(42,212,240,.1)' : 'rgba(239,59,35,.1)'}`}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .mf-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; }
                @media (max-width: 720px) {
                  .mf-row { grid-template-columns: 1fr; gap: 0.75rem; }
                  .mf-arrow { transform: rotate(90deg); justify-self: start; }
                }
              `,
              }}
            />
            <div className="mf-row">
              <div>
                <div className="rb-label" style={{ marginBottom: 6 }}>What you get elsewhere</div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--t3)',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(239,59,35,.5)',
                    textDecorationThickness: 1,
                  }}
                >
                  {c.bad}
                </div>
              </div>

              <div
                className="mf-arrow"
                aria-hidden
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: `1px solid ${c.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: c.accent,
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <div className="rb-label" style={{ marginBottom: 6, color: c.accent }}>What we build</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--t1)', fontWeight: 500 }}>{c.good}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rb-reveal rb-card"
        style={{
          padding: '1.6rem 1.9rem',
          marginTop: '2rem',
          borderColor: 'var(--am-a25)',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          <strong style={{ color: 'var(--am2)' }}>We will tell you not to build it.</strong> A meaningful
          share of the audits we run end with &quot;this is a database query and a rules engine, not an AI
          project.&quot; That answer is worth more than a contract, and it is the fastest way to find out
          whether we are being honest with you.
        </p>
      </div>
    </Section>
  );
}

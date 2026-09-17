import Section, { SectionHead } from '@/components/ui/Section';
import { ACCENT, accentTint } from '@/lib/site';

const BELIEFS = [
  {
    n: '01',
    t: 'Understand before you build',
    d: 'The expensive mistakes are made in the first two weeks, when nobody has written code yet and everybody is agreeing enthusiastically about a problem they have each understood differently.',
    accent: ACCENT.emberLight,
  },
  {
    n: '02',
    t: 'The system is the product',
    d: 'The model is one component among many, and rarely the one that decides whether the thing works. Retrieval, evaluation and failure handling do more for outcomes than another few points of benchmark score.',
    accent: ACCENT.ember,
  },
  {
    n: '03',
    t: 'Ownership is not negotiable',
    d: 'If a client wants to take the system and walk, they should be able to. Building in switching costs is a business model that only works on people who are not paying attention.',
    accent: ACCENT.brass,
  },
  {
    n: '04',
    t: 'Say the uncomfortable thing early',
    d: 'That the data is not good enough. That the timeline is fantasy. That this does not need AI. Delivering that news late is the single most expensive thing a consultancy does.',
    accent: ACCENT.signal,
  },
];

const ETHICS = [
  {
    t: 'We check provenance before ingestion',
    d: 'Where data came from, what consent covers it, and whether you have the right to train on it. A model built on data you cannot defend is a liability, not an asset.',
  },
  {
    t: 'We score fairness per slice, not in aggregate',
    d: 'Wherever a system touches people — hiring, credit, access, care — aggregate accuracy hides exactly the failures that matter. Slice-level reporting is part of the deliverable.',
  },
  {
    t: 'We decline work we should not do',
    d: 'Surveillance of individuals without their knowledge, manipulation dressed as personalisation, and anything that implies clinical judgement without a clinician. This costs us revenue and the rule stands anyway.',
  },
  {
    t: 'We make refusal a designed behaviour',
    d: 'A system that says "I do not have enough to answer that" is more valuable than one that always produces something. Designing the refusal is as much work as designing the answer.',
  },
];

export default function Philosophy() {
  return (
    <>
      <Section bg="base" hex id="positions" rail="Positions">
        <SectionHead
          badge="How we think"
          title={<>Four positions we <span className="rb-gt">actually hold</span></>}
          lead="Not values on a wall. These change what we do on a Tuesday."
          maxWidth={580}
        />

        <div className="rb-grid-2">
          {BELIEFS.map((b, i) => {
            const tint = accentTint(b.accent);
            return (
              <div
                key={b.n}
                className="rb-depth rb-card rb-lift"
                style={{ padding: '1.8rem', transitionDelay: `${(i % 2) * 0.1}s`, overflow: 'hidden' }}
                data-glow={tint.border}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -12,
                    right: 14,
                    fontFamily: 'var(--fd)',
                    fontWeight: 700,
                    fontSize: '5rem',
                    opacity: 0.04,
                    color: b.accent,
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {b.n}
                </span>
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '22%',
                    bottom: '22%',
                    width: 2.5,
                    borderRadius: '0 3px 3px 0',
                    background: b.accent,
                    opacity: 0.85,
                  }}
                />

                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>{b.t}</h3>
                <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.78 }}>{b.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section bg="alt" id="ethics" rail="Ethics">
        <SectionHead
          badge="Ethics"
          badgeTone="brass"
          title={<>Where we <span className="rb-gt3">draw lines</span></>}
          lead="Specific commitments rather than a statement of principles, because specifics are the only kind you can be held to."
          maxWidth={620}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {ETHICS.map((e, i) => (
            <div
              key={e.t}
              className="rb-reveal rb-card"
              style={{ padding: '1.5rem 1.7rem', transitionDelay: `${i * 0.08}s` }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  aria-hidden
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'var(--am-a08)',
                    border: '1px solid var(--am-a25)',
                    color: 'var(--am2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.75rem',
                  }}
                >
                  ✓
                </span>
                <div>
                  <h3 style={{ fontSize: '0.98rem', marginBottom: '0.4rem' }}>{e.t}</h3>
                  <p style={{ fontSize: '0.86rem', margin: 0, maxWidth: '76ch' }}>{e.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

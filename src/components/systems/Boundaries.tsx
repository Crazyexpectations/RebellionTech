import Section, { SectionHead } from '@/components/ui/Section';

const WONT = [
  {
    t: 'Ship something we cannot explain',
    d: 'If we cannot describe why the system produced a given output, it does not go live. That rules out some techniques that would otherwise score well.',
  },
  {
    t: 'Take a project that does not need us',
    d: 'If the audit says a SQL view and a scheduled report solves it, that is the recommendation. We would rather lose the contract than bill for theatre.',
  },
  {
    t: 'Build on data you do not have rights to',
    d: 'Provenance and consent are checked before ingestion. A model trained on data you cannot defend is a liability wearing the costume of an asset.',
  },
  {
    t: 'Promise a fixed price before the audit',
    d: 'A number quoted before we understand the data is either padded or wrong. We quote after phase 01, and then we hold to it.',
  },
  {
    t: 'Make leaving expensive',
    d: 'On build engagements everything transfers. No key escrow, no hosted component you cannot self-host, no clause that punishes you for walking.',
  },
  {
    t: 'Claim capabilities we have not tested',
    d: 'If a benchmark was not run on your data, we will not cite it at you. Vendor marketing numbers are not evidence about your problem.',
  },
];

export default function Boundaries() {
  return (
    <Section bg="base">
      <SectionHead
        badge="Boundaries"
        title={<>Things we <span className="rb-gt">will not do</span></>}
        lead="Constraints are easier to verify than promises. Hold us to these."
        maxWidth={580}
      />

      <div className="rb-grid-3">
        {WONT.map((w, i) => (
          <div
            key={w.t}
            className="rb-depth rb-card"
            style={{ padding: '1.5rem', transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderRadius: 8,
                border: '1px solid var(--em-a25)',
                background: 'var(--em-a08)',
                color: 'var(--em3)',
                marginBottom: '1rem',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </span>
            <h3 style={{ fontSize: '0.96rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{w.t}</h3>
            <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.72 }}>{w.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

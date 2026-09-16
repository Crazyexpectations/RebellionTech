import Section, { SectionHead } from '@/components/ui/Section';

const ROWS = [
  {
    dim: 'Starting point',
    them: 'A model, then a problem to point it at',
    us: 'Your problem, then whatever solves it — sometimes not AI',
  },
  {
    dim: 'Data work',
    them: 'Whatever was already in the warehouse',
    us: 'Curated, labelled and versioned as a deliverable in its own right',
  },
  {
    dim: 'Evaluation',
    them: 'Eyeballing a handful of outputs',
    us: 'Slice-level scoring against your real cases, gating every release',
  },
  {
    dim: 'Failure behaviour',
    them: 'Confidently wrong',
    us: 'Cites its source, or refuses and says why',
  },
  {
    dim: 'Handover',
    them: 'A hosted endpoint and a monthly invoice',
    us: 'Code, weights, docs and runbooks — transferred outright',
  },
  {
    dim: 'When it degrades',
    them: 'You find out from a customer',
    us: 'Drift alerts tied to business metrics, with a retraining path',
  },
];

export default function Difference() {
  return (
    <Section bg="alt">
      <SectionHead
        badge="The difference"
        badgeTone="brass"
        title={<>Compare us to <span className="rb-gt3">the usual engagement</span></>}
        lead="Not a swipe at anyone in particular. This is simply where most AI projects spend their budget, and where we spend ours."
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .df-table { border: 1px solid var(--b); border-radius: 14px; overflow: hidden; }
          .df-head, .df-row { display: grid; grid-template-columns: 0.8fr 1.1fr 1.3fr; }
          .df-head > *, .df-row > * { padding: 1.05rem 1.25rem; }
          .df-head { background: rgba(255,255,255,.025); border-bottom: 1px solid var(--b); }
          .df-row { border-bottom: 1px solid var(--b); transition: background .25s; }
          .df-row:last-child { border-bottom: none; }
          .df-row:hover { background: rgba(255,255,255,.018); }
          @media (max-width: 760px) {
            .df-head { display: none; }
            .df-row { grid-template-columns: 1fr; gap: 0; padding: 0.4rem 0 1rem; }
            .df-row > * { padding: 0.45rem 1.15rem; }
            .df-cell-dim { padding-top: 1rem !important; }
          }
        `,
        }}
      />

      <div className="rb-reveal df-table">
        <div className="df-head">
          <div className="rb-label">Dimension</div>
          <div className="rb-label">Typical AI engagement</div>
          <div className="rb-label" style={{ color: 'var(--em3)' }}>RebellionTech</div>
        </div>

        {ROWS.map((r) => (
          <div key={r.dim} className="df-row">
            <div className="df-cell-dim" style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--t1)' }}>
              {r.dim}
            </div>

            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <span aria-hidden style={{ color: 'var(--t3)', flexShrink: 0, marginTop: 1, fontSize: '0.8rem' }}>
                ✕
              </span>
              <span style={{ fontSize: '0.86rem', color: 'var(--t3)' }}>{r.them}</span>
            </div>

            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <span aria-hidden style={{ color: 'var(--em3)', flexShrink: 0, marginTop: 1, fontSize: '0.8rem' }}>
                ✓
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--t1)' }}>{r.us}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

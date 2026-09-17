import Section, { SectionHead } from '@/components/ui/Section';
import TiltCard from '@/components/ui/TiltCard';
import { ACCENT, accentTint } from '@/lib/site';

/* ── Research areas ─────────────────────────────────────────────── */

const AREAS = [
  {
    n: '01',
    t: 'Retrieval quality',
    accent: ACCENT.signal,
    q: 'Why does the right document not come back?',
    d: 'Chunking strategy, embedding choice and fusion weighting are still mostly folklore. We run them as measured experiments on each client corpus and keep the results, so the next project starts from evidence rather than a blog post.',
    open: 'Whether corpus-specific chunking can be learned rather than tuned by hand.',
  },
  {
    n: '02',
    t: 'Calibrated refusal',
    accent: ACCENT.emberLight,
    q: 'How does a system know it does not know?',
    d: 'Confidence signals from language models are poorly calibrated. We work on external verification — checking claims against retrieved spans — because asking the model how sure it is mostly measures its fluency.',
    open: 'Cheap verification that does not double inference cost on every request.',
  },
  {
    n: '03',
    t: 'Domain representation',
    accent: ACCENT.brass,
    q: 'How do you encode how a field actually reasons?',
    d: 'Every domain has structure that general models flatten: what counts as evidence, which distinctions matter, what a practitioner would never say. Capturing that as an explicit ontology consistently beats hoping it was in the pretraining data.',
    open: 'Semi-automated ontology extraction from expert interviews and corpora.',
  },
  {
    n: '04',
    t: 'Evaluation under drift',
    accent: ACCENT.ember,
    q: 'How do you know it is still working?',
    d: 'A static benchmark stops being meaningful the moment inputs shift. We build evaluation sets that refresh from live traffic, with slice-level scoring so degradation shows up where it matters rather than averaging away.',
    open: 'Detecting quality decay before the business metric moves.',
  },
  {
    n: '05',
    t: 'Bounded agency',
    accent: ACCENT.signal,
    q: 'How much autonomy is safe to grant?',
    d: 'Agents that can act are useful and dangerous in proportion. We work on budgets, dry runs, typed tools and verification gates — making the safety properties structural rather than instructions the model may ignore.',
    open: 'Formal guarantees on multi-step plans that touch irreversible actions.',
  },
  {
    n: '06',
    t: 'Small-model viability',
    accent: ACCENT.brass,
    q: 'How little model can the job actually take?',
    d: 'Frontier models are the default answer and often the wrong one on cost and latency. Distillation and task-specific tuning frequently match them on narrow work at a fraction of the unit economics.',
    open: 'Where the quality cliff sits for each task family we deploy.',
  },
];

export function ResearchAreas() {
  return (
    <Section bg="base" hex id="questions" rail="Open questions">
      <SectionHead
        badge="Open questions"
        title={<>What we are <span className="rb-gt">still working out</span></>}
        lead="Research here means unresolved engineering questions we hit repeatedly in production, not papers. Each of these changes how we build, and each has an open end we have not closed."
        maxWidth={700}
      />

      <div className="rb-grid-3">
        {AREAS.map((a, i) => {
          const tint = accentTint(a.accent);
          return (
            <TiltCard
              key={a.n}
              accent={a.accent}
              className="rb-depth"
              style={{ padding: '1.7rem', transitionDelay: `${(i % 3) * 0.09}s`, overflow: 'hidden' }}
            >
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

              <div className="rb-label" style={{ color: a.accent, marginBottom: '0.8rem' }}>{a.n}</div>
              <h3 style={{ marginBottom: '0.6rem', fontSize: '1rem' }}>{a.t}</h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--t1)',
                  fontStyle: 'italic',
                  marginBottom: '0.7rem',
                  lineHeight: 1.6,
                }}
              >
                {a.q}
              </p>
              <p style={{ fontSize: '0.845rem', marginBottom: '1.1rem', lineHeight: 1.74 }}>{a.d}</p>

              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: `1px solid ${tint.border}`,
                }}
              >
                <div className="rb-label" style={{ color: a.accent, marginBottom: 5, fontSize: '0.58rem' }}>
                  Still open
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--t3)', lineHeight: 1.65 }}>{a.open}</div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Model selection ────────────────────────────────────────────── */

const SELECTION = [
  {
    approach: 'Prompted frontier model',
    when: 'Broad, low-volume tasks where quality matters more than unit cost',
    cost: 'High per call',
    control: 'Low',
    accent: ACCENT.signal,
  },
  {
    approach: 'Retrieval-augmented',
    when: 'Answers must come from your corpus and be citable',
    cost: 'Medium',
    control: 'Medium',
    accent: ACCENT.brass,
  },
  {
    approach: 'Fine-tuned / adapted',
    when: 'Narrow repeated task, consistent format, volume that justifies training',
    cost: 'Low per call',
    control: 'High',
    accent: ACCENT.emberLight,
  },
  {
    approach: 'Custom-trained',
    when: 'Novel problem, proprietary data, no adequate base model exists',
    cost: 'High upfront',
    control: 'Total',
    accent: ACCENT.ember,
  },
  {
    approach: 'Not a model at all',
    when: 'The problem is deterministic and a rules engine or query solves it',
    cost: 'Lowest',
    control: 'Total',
    accent: ACCENT.signal,
  },
];

export function ModelSelection() {
  return (
    <Section bg="alt" mesh id="strategy" rail="Model strategy">
      <SectionHead
        badge="Model strategy"
        badgeTone="cyan"
        title={<>Choosing the approach <span className="rb-gt2">on evidence</span></>}
        lead="The last row is the one most firms will not show you, and it is the right answer more often than the industry admits."
        maxWidth={640}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .ms-table { border: 1px solid var(--b); border-radius: 14px; overflow: hidden; }
          .ms-head, .ms-row { display: grid; grid-template-columns: 1fr 1.5fr 0.7fr 0.6fr; }
          .ms-head > *, .ms-row > * { padding: 1rem 1.2rem; }
          .ms-head { background: rgba(255,255,255,.025); border-bottom: 1px solid var(--b); }
          .ms-row { border-bottom: 1px solid var(--b); transition: background .25s; }
          .ms-row:last-child { border-bottom: none; }
          .ms-row:hover { background: rgba(255,255,255,.018); }
          @media (max-width: 820px) {
            .ms-head { display: none; }
            .ms-row { grid-template-columns: 1fr 1fr; padding: 0.5rem 0 1rem; }
            .ms-row > *:first-child { grid-column: 1 / -1; padding-bottom: 0.3rem; }
            .ms-row > *:nth-child(2) { grid-column: 1 / -1; padding-top: 0; padding-bottom: 0.6rem; }
            .ms-row > * { padding: 0.35rem 1.15rem; }
          }
        `,
        }}
      />

      <div className="rb-reveal ms-table">
        <div className="ms-head">
          <div className="rb-label">Approach</div>
          <div className="rb-label">Right when</div>
          <div className="rb-label">Cost profile</div>
          <div className="rb-label">Control</div>
        </div>

        {SELECTION.map((s) => (
          <div key={s.approach} className="ms-row">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span
                aria-hidden
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 2,
                  background: s.accent,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${s.accent}`,
                }}
              />
              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--t1)' }}>{s.approach}</span>
            </div>
            <div style={{ fontSize: '0.855rem', color: 'var(--t2)' }}>{s.when}</div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '0.78rem', color: 'var(--t3)' }}>{s.cost}</div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '0.78rem', color: s.accent }}>{s.control}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Limits ─────────────────────────────────────────────────────── */

const LIMITS = [
  {
    t: 'It will still be wrong sometimes',
    d: 'Grounding, verification and refusal reduce error rates substantially. They do not reach zero. Any system design that assumes zero is a system design that will fail, so we design the handling of wrong answers as a first-class feature.',
  },
  {
    t: 'Retrieval cannot fix a bad corpus',
    d: 'If the knowledge is not written down anywhere, no amount of embedding cleverness will surface it. Sometimes the honest first deliverable is documentation, not a model.',
  },
  {
    t: 'Evaluation is harder than building',
    d: 'Getting a demo working takes days. Knowing whether it is actually good, on the cases you care about, takes considerably longer — and is where most of the value of an engagement sits.',
  },
  {
    t: 'Latency and quality trade off',
    d: 'Reranking, verification and multi-step reasoning all cost time. Where the interaction is real-time, some quality has to be traded away. We make that trade explicit rather than discovering it in production.',
  },
  {
    t: 'Drift is not optional',
    d: 'Your data shifts, your users adapt, providers update models underneath you. A system that is not monitored is degrading — the only question is whether anyone has noticed yet.',
  },
  {
    t: 'Some problems are not AI problems',
    d: 'Process failures, data-quality failures and organisational-clarity failures all present as AI opportunities. Building a model on top of one of those buries the problem rather than solving it.',
  },
];

export function Limits() {
  return (
    <Section bg="base" id="limits" rail="Limits">
      <SectionHead
        badge="Limits"
        title={<>What this technology <span className="rb-gt">cannot do</span></>}
        lead="Stated plainly, because you will find out eventually and it is better to hear it now."
        maxWidth={580}
      />

      <div className="rb-grid-2" style={{ gap: '1rem' }}>
        {LIMITS.map((l, i) => (
          <div
            key={l.t}
            className="rb-reveal rb-card"
            style={{ padding: '1.6rem', transitionDelay: `${(i % 2) * 0.08}s` }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span
                aria-hidden
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  border: '1px solid var(--b2)',
                  color: 'var(--t3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.7rem',
                  fontFamily: 'var(--fm)',
                }}
              >
                !
              </span>
              <div>
                <h3 style={{ fontSize: '0.96rem', marginBottom: '0.45rem', lineHeight: 1.35 }}>{l.t}</h3>
                <p style={{ fontSize: '0.855rem', margin: 0, lineHeight: 1.74 }}>{l.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

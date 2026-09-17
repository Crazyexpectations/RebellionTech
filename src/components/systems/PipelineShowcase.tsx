import Section, { SectionHead } from '@/components/ui/Section';
import DiagramFrame from '@/components/diagrams/DiagramFrame';
import RetrievalPipeline from '@/components/diagrams/RetrievalPipeline';
import AgentOrchestration from '@/components/diagrams/AgentOrchestration';
import TrainingPipeline from '@/components/diagrams/TrainingPipeline';
import EvaluationGate from '@/components/diagrams/EvaluationGate';
import { INK } from '@/components/diagrams/primitives';

interface Note {
  t: string;
  d: string;
  accent: string;
}

function Notes({ items }: { items: Note[] }) {
  return (
    <div className="rb-grid-3" style={{ gap: '0.9rem', marginTop: '1.25rem' }}>
      {items.map((n, i) => (
        <div
          key={n.t}
          className="rb-reveal rb-card"
          style={{ padding: '1.2rem', transitionDelay: `${i * 0.07}s` }}
        >
          <div className="rb-label" style={{ color: n.accent, marginBottom: 7 }}>{n.t}</div>
          <p style={{ fontSize: '0.845rem', margin: 0, lineHeight: 1.72 }}>{n.d}</p>
        </div>
      ))}
    </div>
  );
}

export default function PipelineShowcase() {
  return (
    <>
      {/* ── Retrieval ────────────────────────────────────────────── */}
      <Section bg="alt" mesh id="retrieval" rail="Retrieval">
        <SectionHead
          badge="Retrieval"
          badgeTone="cyan"
          title={<>How a question becomes <span className="rb-gt2">a cited answer</span></>}
          lead="Almost every hallucination we are asked to fix turns out to be a retrieval failure, not a model failure. The model answered faithfully — it was handed the wrong context."
          maxWidth={700}
        />

        <div className="rb-reveal">
          <DiagramFrame
            title="Retrieval and grounding pipeline"
            minWidth={700}
            legend={[
              { label: 'Understand & fetch', color: INK.signal },
              { label: 'Select & compose', color: INK.ember },
              { label: 'Answer', color: INK.emberLight },
              { label: 'Prove', color: INK.brass },
            ]}
            caption="Stage 06 is the one that separates a demo from a system. If a claim cannot be traced to a retrieved span, the answer is regenerated or withheld — it is never shipped with a confident tone and no evidence."
          >
            <RetrievalPipeline />
          </DiagramFrame>
        </div>

        <Notes
          items={[
            {
              t: 'Chunking is measured',
              d: 'Chunk size and overlap are tuned on your corpus against a labelled question set. The default from a tutorial is almost never right for legal text and contact-centre transcripts at the same time.',
              accent: INK.signal,
            },
            {
              t: 'Hybrid beats pure vector',
              d: 'Dense embeddings miss exact identifiers — part numbers, case codes, names. Keyword search catches them. Running both and fusing the results consistently outperforms either alone.',
              accent: INK.ember,
            },
            {
              t: 'Permissions live here',
              d: 'Filtering by entitlement at retrieval time means the model is never handed a document the user cannot see. Enforcing it in the prompt is not enforcement.',
              accent: INK.brass,
            },
          ]}
        />
      </Section>

      {/* ── Agents ───────────────────────────────────────────────── */}
      <Section bg="base" id="agents" rail="Orchestration">
        <SectionHead
          badge="Orchestration"
          title={<>Multi-agent systems that stay <span className="rb-gt">debuggable</span></>}
          lead="Agents calling agents freely produces systems nobody can reason about and nobody can fix. We keep control flow in one place and make every decision replayable."
          maxWidth={700}
        />

        <div className="rb-reveal">
          <DiagramFrame
            title="Agent orchestration topology"
            minWidth={700}
            legend={[
              { label: 'Specialists', color: INK.signal },
              { label: 'Orchestrator', color: INK.ember },
              { label: 'Support services', color: INK.emberLight },
              { label: 'Verification', color: INK.brass },
            ]}
            caption="Specialists never address each other directly. Every message passes through the orchestrator, which means every run has a single ordered trace — and a bad output from three months ago can still be reproduced exactly."
          >
            <AgentOrchestration />
          </DiagramFrame>
        </div>

        <Notes
          items={[
            {
              t: 'Bounded autonomy',
              d: 'Each run gets an explicit budget: steps, tool calls, wall-clock time and spend. Exceeding any of them stops the run and reports, rather than quietly looping.',
              accent: INK.ember,
            },
            {
              t: 'The critic has teeth',
              d: 'A separate evaluator must pass the output before it reaches a user or writes to a system of record. Rejection routes back to rework, not to a retry of the same prompt.',
              accent: INK.brass,
            },
            {
              t: 'Tools are typed',
              d: 'Every tool has a schema, a permission scope and a dry-run mode. An agent cannot invent a call signature, and destructive actions require an explicit confirmation path.',
              accent: INK.signal,
            },
          ]}
        />
      </Section>

      {/* ── Training ─────────────────────────────────────────────── */}
      <Section bg="alt" hex id="training" rail="Training">
        <SectionHead
          badge="Build loop"
          badgeTone="brass"
          title={<>Training is a loop, <span className="rb-gt3">not a launch</span></>}
          lead="The interesting arrow in this diagram points backwards. What the system does in production is the raw material for the next round of curation."
          maxWidth={700}
        />

        <div className="rb-reveal">
          <DiagramFrame
            title="Data and training pipeline"
            minWidth={700}
            legend={[
              { label: 'Data work', color: INK.signal },
              { label: 'Training', color: INK.ember },
              { label: 'Evaluation', color: INK.emberLight },
              { label: 'Release', color: INK.brass },
            ]}
            caption="Nothing crosses from evaluation to deploy without clearing the quality gate, and nothing clears the gate on aggregate accuracy alone — the slices that matter to your business are scored separately and can each veto a release."
          >
            <TrainingPipeline />
          </DiagramFrame>
        </div>

        <Notes
          items={[
            {
              t: 'Datasets are versioned artefacts',
              d: 'Every training run names the exact dataset version it used. Reproducing a result six months later is a lookup, not an archaeology project.',
              accent: INK.signal,
            },
            {
              t: 'Synthetic data is labelled as such',
              d: 'Generated examples are useful and are marked. Mixing them invisibly into a gold set is how teams end up measuring their own generator.',
              accent: INK.ember,
            },
            {
              t: 'Rollback is rehearsed',
              d: 'Reverting to the previous model version is a single command, and we exercise it on a schedule. A rollback path that has never been run is a hypothesis.',
              accent: INK.brass,
            },
          ]}
        />
      </Section>

      {/* ── Evaluation gate ──────────────────────────────────────── */}
      <Section bg="base" id="evaluation" rail="Guardrails">
        <SectionHead
          badge="Guardrails"
          title={<>Nothing ships on the model&rsquo;s <span className="rb-gt">say-so</span></>}
          lead="Four independent checks run on every candidate output. Any one of them can veto a release, and the veto carries a reason rather than a silent retry."
          maxWidth={700}
        />

        <div className="rb-reveal">
          <DiagramFrame
            title="Evaluation and release gate"
            minWidth={700}
            legend={[
              { label: 'Groundedness', color: INK.signal },
              { label: 'Policy', color: INK.ember },
              { label: 'Quality', color: INK.emberLight },
              { label: 'Safety', color: INK.brass },
            ]}
            caption="The checks run in parallel, so adding one costs latency but not architecture. The dashed return path matters as much as the gate itself: a blocked output goes back with its failure reason attached, which is what makes the next attempt better rather than merely different."
          >
            <EvaluationGate />
          </DiagramFrame>
        </div>

        <Notes
          items={[
            {
              t: 'Refusal is a passing grade',
              d: 'An output that declines to answer because the evidence is not there has behaved correctly. We score refusal quality deliberately, because a system that never abstains is a system that confabulates.',
              accent: INK.signal,
            },
            {
              t: 'Checks are independent',
              d: 'No check can be satisfied by the component it is checking. Groundedness is verified against retrieved spans, not against the model asserting that it was careful.',
              accent: INK.emberLight,
            },
            {
              t: 'Vetoes are logged',
              d: 'Every block is recorded with its reason and inputs. That log becomes the adversarial set for the next training round, so failures compound into improvement.',
              accent: INK.brass,
            },
          ]}
        />
      </Section>
    </>
  );
}

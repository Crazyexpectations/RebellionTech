import Section, { SectionHead } from '@/components/ui/Section';
import DiagramFrame from '@/components/diagrams/DiagramFrame';
import SystemArchitecture from '@/components/diagrams/SystemArchitecture';
import { INK } from '@/components/diagrams/primitives';

const LAYERS = [
  {
    name: 'Interface',
    accent: INK.signal,
    line: 'Where people and machines actually touch the system. Thin on purpose — no logic hides here.',
  },
  {
    name: 'Orchestration',
    accent: INK.ember,
    line: 'Decides what is being asked, what is allowed, and which tools may run. This is where control lives.',
  },
  {
    name: 'Reasoning',
    accent: INK.emberLight,
    line: 'Task-specific models plus the planner that decomposes work — and the evaluators that score it.',
  },
  {
    name: 'Knowledge',
    accent: INK.brass,
    line: 'Vectors, records, ontology and memory. The difference between an answer and a guess.',
  },
  {
    name: 'Data',
    accent: INK.muted,
    line: 'Ingestion, cleaning, labelling, versioning. Everything above is downstream of this being right.',
  },
];

export default function HowWeBuild() {
  return (
    <Section bg="base" id="architecture" rail="Architecture">
      <SectionHead
        badge="The shape of the work"
        badgeTone="cyan"
        title={<>Every system we ship has <span className="rb-gt2">the same skeleton</span></>}
        lead="Five layers, plus an observability spine that watches all of them. The details change per project. The structure does not — because this is the structure that survives production."
        maxWidth={700}
      />

      <div className="rb-reveal" style={{ marginBottom: '2rem' }}>
        <DiagramFrame
          title="Reference system architecture"
          minWidth={700}
          legend={[
            { label: 'Interface', color: INK.signal },
            { label: 'Orchestration', color: INK.ember },
            { label: 'Reasoning', color: INK.emberLight },
            { label: 'Knowledge', color: INK.brass },
            { label: 'Observability', color: INK.signal },
          ]}
          caption="Requests flow top to bottom; evidence and telemetry flow back up. The dashed return path is what keeps the system honest over time — production behaviour becomes the next training set."
        >
          <SystemArchitecture />
        </DiagramFrame>
      </div>

      <div className="rb-grid-3" style={{ gap: '1rem' }}>
        {LAYERS.map((l, i) => (
          <div
            key={l.name}
            className="rb-reveal rb-card"
            style={{ padding: '1.35rem', transitionDelay: `${i * 0.07}s` }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                top: '20%',
                bottom: '20%',
                width: 2.5,
                borderRadius: '0 3px 3px 0',
                background: l.accent,
                opacity: 0.8,
              }}
            />
            <div
              className="rb-label"
              style={{ color: l.accent, marginBottom: 7, letterSpacing: '0.14em' }}
            >
              {l.name}
            </div>
            <p style={{ fontSize: '0.855rem', margin: 0, lineHeight: 1.72 }}>{l.line}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

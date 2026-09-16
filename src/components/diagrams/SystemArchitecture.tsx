import { DNode, DLane, DEdge, DArrow, INK, rgba } from './primitives';

/* Lane geometry — authored once, reused by every row. */
const LANE_X = 30;
const LANE_W = 690;
const LANE_H = 96;
const LANES_Y = [36, 148, 260, 372, 484];

const X4 = [50, 218, 386, 554];
const W4 = 148;
const X3 = [50, 278, 506];
const W3 = 196;

const NODE_DY = 32;
const NODE_H = 50;

/** Three vertical connectors bridging one lane to the next. */
function LaneBridge({ from, to, accent, delay }: { from: number; to: number; accent: string; delay: number }) {
  const y1 = LANES_Y[from] + NODE_DY + NODE_H;
  const y2 = LANES_Y[to] + NODE_DY;
  return (
    <>
      {[124, 375, 628].map((x, i) => (
        <g key={x}>
          <DEdge
            d={`M${x},${y1} L${x},${y2 - 7}`}
            accent={accent}
            len={80}
            delay={delay + i * 0.05}
            opacity={0.45}
          />
          <DArrow x={x} y={y2 - 7} dir="down" accent={accent} delay={delay + 0.5 + i * 0.05} size={4} />
        </g>
      ))}
    </>
  );
}

/**
 * The shape of every system we ship: five layers from interface down to raw
 * data, with an observability spine watching all of them.
 */
export default function SystemArchitecture() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 600"
      role="img"
      aria-label="Five-layer system architecture: interface, orchestration, reasoning, knowledge and data, with an observability spine running alongside."
    >
      {/* ── Lane containers ────────────────────────────────────────── */}
      <DLane x={LANE_X} y={LANES_Y[0]} w={LANE_W} h={LANE_H} label="Interface" accent={INK.signal} delay={0} />
      <DLane x={LANE_X} y={LANES_Y[1]} w={LANE_W} h={LANE_H} label="Orchestration" accent={INK.ember} delay={0.1} />
      <DLane x={LANE_X} y={LANES_Y[2]} w={LANE_W} h={LANE_H} label="Reasoning" accent={INK.emberLight} delay={0.2} />
      <DLane x={LANE_X} y={LANES_Y[3]} w={LANE_W} h={LANE_H} label="Knowledge" accent={INK.brass} delay={0.3} />
      <DLane x={LANE_X} y={LANES_Y[4]} w={LANE_W} h={LANE_H} label="Data Foundation" accent={INK.muted} delay={0.4} />

      {/* ── Layer 1: Interface ─────────────────────────────────────── */}
      {[
        { t: 'Web & App', s: 'product surface' },
        { t: 'API', s: 'programmatic' },
        { t: 'Chat / Voice', s: 'conversational' },
        { t: 'Integrations', s: 'CRM · ERP · Slack' },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={X4[i]}
          y={LANES_Y[0] + NODE_DY}
          w={W4}
          h={NODE_H}
          title={n.t}
          sub={n.s}
          accent={INK.signal}
          delay={0.05 + i * 0.06}
        />
      ))}

      <LaneBridge from={0} to={1} accent={INK.signal} delay={0.3} />

      {/* ── Layer 2: Orchestration ─────────────────────────────────── */}
      {[
        { t: 'Intent Router', s: 'what is being asked' },
        { t: 'Policy & Guardrails', s: 'what is permitted' },
        { t: 'Tool Executor', s: 'actions & side effects' },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={X3[i]}
          y={LANES_Y[1] + NODE_DY}
          w={W3}
          h={NODE_H}
          title={n.t}
          sub={n.s}
          accent={INK.ember}
          delay={0.4 + i * 0.06}
        />
      ))}

      <LaneBridge from={1} to={2} accent={INK.ember} delay={0.6} />

      {/* ── Layer 3: Reasoning ─────────────────────────────────────── */}
      {[
        { t: 'Task Models', s: 'tuned per job' },
        { t: 'Reasoning Engine', s: 'plan · decompose' },
        { t: 'Evaluators', s: 'score every output' },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={X3[i]}
          y={LANES_Y[2] + NODE_DY}
          w={W3}
          h={NODE_H}
          title={n.t}
          sub={n.s}
          accent={INK.emberLight}
          delay={0.7 + i * 0.06}
        />
      ))}

      <LaneBridge from={2} to={3} accent={INK.emberLight} delay={0.9} />

      {/* ── Layer 4: Knowledge ─────────────────────────────────────── */}
      {[
        { t: 'Vector Store', s: 'semantic recall' },
        { t: 'Structured Store', s: 'facts & records' },
        { t: 'Domain Ontology', s: 'how the field thinks' },
        { t: 'Memory', s: 'per-user context' },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={X4[i]}
          y={LANES_Y[3] + NODE_DY}
          w={W4}
          h={NODE_H}
          title={n.t}
          sub={n.s}
          accent={INK.brass}
          delay={1.0 + i * 0.06}
        />
      ))}

      <LaneBridge from={3} to={4} accent={INK.brass} delay={1.2} />

      {/* ── Layer 5: Data foundation ───────────────────────────────── */}
      {[
        { t: 'Ingestion', s: 'sources & sync' },
        { t: 'Cleaning', s: 'normalise · dedupe' },
        { t: 'Labelling', s: 'human + synthetic' },
        { t: 'Versioning', s: 'reproducible sets' },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={X4[i]}
          y={LANES_Y[4] + NODE_DY}
          w={W4}
          h={NODE_H}
          title={n.t}
          sub={n.s}
          accent={INK.muted}
          delay={1.3 + i * 0.06}
        />
      ))}

      {/* ── Observability spine ────────────────────────────────────── */}
      <DLane x={740} y={36} w={160} h={544} label="Observability" accent={INK.signal} delay={0.5} />

      {[
        { t: 'Telemetry', s: 'traces & cost', y: 90 },
        { t: 'Evaluation', s: 'quality gates', y: 200 },
        { t: 'Drift Watch', s: 'decay alerts', y: 310 },
        { t: 'Retraining', s: 'closed loop', y: 420 },
      ].map((n, i) => (
        <DNode
          key={n.t}
          x={758}
          y={n.y}
          w={124}
          h={54}
          title={n.t}
          sub={n.s}
          accent={INK.signal}
          variant="ghost"
          delay={0.6 + i * 0.08}
        />
      ))}

      {/* Dashed taps from each layer into the observability spine */}
      {[LANES_Y[1], LANES_Y[2], LANES_Y[3]].map((ly, i) => (
        <DEdge
          key={ly}
          d={`M720,${ly + NODE_DY + NODE_H / 2} L740,${ly + NODE_DY + NODE_H / 2}`}
          accent={INK.signal}
          len={40}
          delay={1.5 + i * 0.1}
          dashed
          opacity={0.4}
        />
      ))}

      {/* Feedback loop: retraining writes back into the data foundation */}
      <DEdge
        d={`M820,474 L820,556 L${X4[3] + W4 / 2},556`}
        accent={INK.signal}
        len={340}
        delay={1.7}
        dashed
        opacity={0.35}
      />
      <DArrow x={X4[3] + W4 / 2} y={556} dir="left" accent={INK.signal} delay={2.3} size={4} />
      <text
        className="d-sub d-fade"
        x={700}
        y={570}
        textAnchor="end"
        fontSize={8}
        fill={rgba(INK.signal, 0.65)}
        style={{ transitionDelay: '2.3s' }}
      >
        CONTINUOUS FEEDBACK
      </text>
    </svg>
  );
}

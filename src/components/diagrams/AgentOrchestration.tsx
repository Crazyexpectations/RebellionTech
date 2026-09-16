import { DNode, DEdge, DArrow, INK, rgba } from './primitives';

const AGENT_W = 174;
const AGENT_X = [40, 262, 484, 706];
const AGENT_CX = AGENT_X.map((x) => x + AGENT_W / 2);

const AGENTS = [
  { t: 'Researcher', s: 'gathers evidence', accent: INK.signal },
  { t: 'Analyst', s: 'reasons over it', accent: INK.emberLight },
  { t: 'Builder', s: 'produces the work', accent: INK.ember },
  { t: 'Critic', s: 'tries to break it', accent: INK.brass },
];

const SUPPORT = [
  { x: 40, t: 'Shared Memory', s: 'state across turns', accent: INK.brass },
  { x: 340, t: 'Guardrails', s: 'policy & limits', accent: INK.ember },
  { x: 640, t: 'Tool Layer', s: 'APIs, code, data', accent: INK.signal },
];

/**
 * A multi-agent system that does not descend into chaos: one orchestrator
 * owns control flow, specialists never call each other directly, and a
 * critic has to sign off before anything leaves the system.
 */
export default function AgentOrchestration() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 540"
      role="img"
      aria-label="Multi-agent orchestration: four specialist agents on a shared bus, a central orchestrator, shared memory, guardrails and a tool layer, feeding a verified output."
    >
      {/* ── Specialist agents ──────────────────────────────────────── */}
      {AGENTS.map((a, i) => (
        <DNode
          key={a.t}
          x={AGENT_X[i]}
          y={50}
          w={AGENT_W}
          h={54}
          title={a.t}
          sub={a.s}
          accent={a.accent}
          delay={0.1 + i * 0.08}
        />
      ))}

      {/* ── Dispatch bus ───────────────────────────────────────────── */}
      {AGENT_CX.map((cx, i) => (
        <DEdge
          key={cx}
          d={`M${cx},104 L${cx},160`}
          accent={INK.ember}
          len={70}
          delay={0.4 + i * 0.06}
          opacity={0.5}
        />
      ))}
      <DEdge d={`M${AGENT_CX[0]},160 L${AGENT_CX[3]},160`} accent={INK.ember} len={700} delay={0.5} opacity={0.45} />
      <text
        className="d-sub d-fade"
        x={AGENT_CX[3] + 12}
        y={163}
        fontSize={8}
        fill={rgba(INK.ember, 0.6)}
        style={{ transitionDelay: '1.1s' }}
      >
        BUS
      </text>

      <DEdge d="M460,160 L460,203" accent={INK.ember} len={60} delay={0.9} flow opacity={0.6} />
      <DArrow x={460} y={203} dir="down" accent={INK.ember} delay={1.3} size={5} />

      {/* ── Orchestrator ───────────────────────────────────────────── */}
      <g className="d-fade" style={{ transitionDelay: '1.0s' }}>
        <rect
          x={340}
          y={210}
          width={240}
          height={76}
          rx={12}
          fill={rgba(INK.ember, 0.11)}
          stroke={rgba(INK.ember, 0.5)}
          strokeWidth={1.4}
        />
        <rect x={340} y={210} width={240} height={2.5} rx={1} fill={INK.ember} opacity={0.9} />
        <text className="d-title" x={460} y={240} textAnchor="middle" fontSize={15} dominantBaseline="middle">
          Orchestrator
        </text>
        <text className="d-sub" x={460} y={259} textAnchor="middle" fontSize={9} dominantBaseline="middle">
          owns control flow · assigns work · resolves conflict
        </text>
        <text
          x={460}
          y={275}
          textAnchor="middle"
          fontSize={8}
          fill={rgba(INK.ember, 0.75)}
          dominantBaseline="middle"
          letterSpacing="0.1em"
        >
          NO AGENT-TO-AGENT CALLS
        </text>
      </g>

      {/* ── Support bus ────────────────────────────────────────────── */}
      <DEdge d="M460,286 L460,318" accent={INK.emberLight} len={45} delay={1.4} opacity={0.5} />
      <DEdge d="M160,318 L760,318" accent={INK.emberLight} len={620} delay={1.5} opacity={0.42} />

      {SUPPORT.map((s, i) => {
        const cx = s.x + 120;
        return (
          <g key={s.t}>
            <DEdge d={`M${cx},318 L${cx},343`} accent={s.accent} len={35} delay={1.6 + i * 0.07} opacity={0.5} />
            <DArrow x={cx} y={343} dir="down" accent={s.accent} delay={2.0 + i * 0.07} size={4} />
            <DNode
              x={s.x}
              y={350}
              w={240}
              h={62}
              title={s.t}
              sub={s.s}
              accent={s.accent}
              delay={1.6 + i * 0.08}
            />
          </g>
        );
      })}

      {/* ── Verified output ────────────────────────────────────────── */}
      <DEdge d="M460,412 L460,443" accent={INK.brass} len={45} delay={2.1} flow opacity={0.6} />
      <DArrow x={460} y={443} dir="down" accent={INK.brass} delay={2.5} size={5} />
      <DNode
        x={340}
        y={450}
        w={240}
        h={58}
        title="Verified Output"
        sub="cited · typed · logged"
        accent={INK.brass}
        delay={2.2}
      />

      {/* ── Critic veto loop ───────────────────────────────────────── */}
      <DEdge
        d="M580,479 L880,479 L880,77 L854,77"
        accent={INK.brass}
        len={1100}
        delay={2.4}
        dashed
        opacity={0.35}
      />
      <DArrow x={854} y={77} dir="left" accent={INK.brass} delay={3.1} size={4} />
      <text
        className="d-sub d-fade"
        x={872}
        y={280}
        fontSize={8}
        fill={rgba(INK.brass, 0.6)}
        textAnchor="middle"
        transform="rotate(-90 872 280)"
        style={{ transitionDelay: '3.1s' }}
      >
        REJECTED → REWORK
      </text>
    </svg>
  );
}

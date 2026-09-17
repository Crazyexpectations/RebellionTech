import { DNode, DEdge, DArrow, DLabel, INK, rgba } from './primitives';

const CHECK_W = 190;
const CHECK_X = [30, 255, 480, 705];
const CHECK_CX = CHECK_X.map((x) => x + CHECK_W / 2);
const CHECK_Y = 160;
const CHECK_H = 64;

const CHECKS = [
  { t: 'Groundedness', s: 'claim → source span', accent: INK.signal, d: 'Every assertion traced' },
  { t: 'Policy', s: 'permitted & entitled', accent: INK.ember, d: 'Scope and access rules' },
  { t: 'Quality', s: 'scored per slice', accent: INK.emberLight, d: 'No hiding behind averages' },
  { t: 'Safety', s: 'adversarial probes', accent: INK.brass, d: 'Red-team suite, every build' },
];

const FAN_BUS_Y = 125;
const JOIN_BUS_Y = 258;
const GATE_Y = 290;
const GATE_H = 60;
const OUT_Y = 400;

/**
 * Nothing reaches a user on the model's say-so. Four independent checks run
 * on every candidate output, and any one of them can veto the release.
 */
export default function EvaluationGate() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 480"
      role="img"
      aria-label="Evaluation gate: a candidate output is checked for groundedness, policy, quality and safety in parallel; any failure routes it back to rework instead of shipping."
    >
      {/* ── Candidate output ───────────────────────────────────────── */}
      <DNode
        x={340}
        y={30}
        w={240}
        h={56}
        title="Candidate output"
        sub="not yet trusted"
        accent={INK.muted}
        delay={0.05}
      />

      {/* Fan-out bus */}
      <DEdge d={`M460,86 L460,${FAN_BUS_Y}`} accent={INK.muted} len={50} delay={0.2} opacity={0.45} />
      <DEdge
        d={`M${CHECK_CX[0]},${FAN_BUS_Y} L${CHECK_CX[3]},${FAN_BUS_Y}`}
        accent={INK.muted}
        len={700}
        delay={0.25}
        opacity={0.4}
      />
      <DLabel x={460} y={FAN_BUS_Y} text="ALL FOUR RUN IN PARALLEL" accent={INK.muted} delay={0.9} />

      {/* ── The four checks ────────────────────────────────────────── */}
      {CHECKS.map((c, i) => (
        <g key={c.t}>
          <DEdge
            d={`M${CHECK_CX[i]},${FAN_BUS_Y} L${CHECK_CX[i]},${CHECK_Y - 7}`}
            accent={c.accent}
            len={50}
            delay={0.35 + i * 0.07}
            opacity={0.5}
          />
          <DArrow x={CHECK_CX[i]} y={CHECK_Y - 7} dir="down" accent={c.accent} delay={0.8 + i * 0.07} size={4} />

          <DNode
            x={CHECK_X[i]}
            y={CHECK_Y}
            w={CHECK_W}
            h={CHECK_H}
            title={c.t}
            sub={c.s}
            accent={c.accent}
            delay={0.4 + i * 0.07}
          />

          <text
            className="d-sub d-fade"
            x={CHECK_CX[i]}
            y={CHECK_Y + CHECK_H + 16}
            textAnchor="middle"
            fontSize={8.2}
            fill={rgba(INK.muted, 0.95)}
            style={{ transitionDelay: `${0.7 + i * 0.07}s` }}
          >
            {c.d}
          </text>

          {/* Join into the gate bus */}
          <DEdge
            d={`M${CHECK_CX[i]},${CHECK_Y + CHECK_H + 26} L${CHECK_CX[i]},${JOIN_BUS_Y}`}
            accent={c.accent}
            len={40}
            delay={0.9 + i * 0.06}
            opacity={0.45}
          />
        </g>
      ))}

      {/* Join bus */}
      <DEdge
        d={`M${CHECK_CX[0]},${JOIN_BUS_Y} L${CHECK_CX[3]},${JOIN_BUS_Y}`}
        accent={INK.emberLight}
        len={700}
        delay={1.05}
        opacity={0.4}
      />
      <DEdge d={`M460,${JOIN_BUS_Y} L460,${GATE_Y - 7}`} accent={INK.emberLight} len={40} delay={1.15} flow opacity={0.6} />
      <DArrow x={460} y={GATE_Y - 7} dir="down" accent={INK.emberLight} delay={1.55} size={5} />

      {/* ── Release gate ───────────────────────────────────────────── */}
      <g className="d-fade" style={{ transitionDelay: '1.2s' }}>
        <rect
          x={340}
          y={GATE_Y}
          width={240}
          height={GATE_H}
          rx={12}
          fill={rgba(INK.emberLight, 0.1)}
          stroke={rgba(INK.emberLight, 0.5)}
          strokeWidth={1.4}
        />
        <rect x={340} y={GATE_Y} width={240} height={2.5} rx={1} fill={INK.emberLight} opacity={0.9} />
        <text className="d-title" x={460} y={GATE_Y + 25} textAnchor="middle" fontSize={14} dominantBaseline="middle">
          Release Gate
        </text>
        <text
          x={460}
          y={GATE_Y + 43}
          textAnchor="middle"
          fontSize={8.5}
          fill={rgba(INK.emberLight, 0.8)}
          dominantBaseline="middle"
          letterSpacing="0.08em"
        >
          ANY CHECK CAN VETO
        </text>
      </g>

      {/* ── Outcomes ───────────────────────────────────────────────── */}
      <DEdge d={`M420,${GATE_Y + GATE_H} L270,${GATE_Y + GATE_H} L270,${OUT_Y - 7}`} accent={INK.signal} len={220} delay={1.6} opacity={0.5} />
      <DArrow x={270} y={OUT_Y - 7} dir="down" accent={INK.signal} delay={2.05} size={4.5} />
      <DNode x={170} y={OUT_Y} w={200} h={58} title="Ship" sub="cited · logged · reversible" accent={INK.signal} delay={1.75} />

      <DEdge d={`M500,${GATE_Y + GATE_H} L650,${GATE_Y + GATE_H} L650,${OUT_Y - 7}`} accent={INK.ember} len={220} delay={1.6} opacity={0.5} />
      <DArrow x={650} y={OUT_Y - 7} dir="down" accent={INK.ember} delay={2.05} size={4.5} />
      <DNode x={550} y={OUT_Y} w={200} h={58} title="Block & rework" sub="with the reason attached" accent={INK.ember} delay={1.75} />

      {/* Rework returns to the top */}
      <DEdge
        d={`M750,${OUT_Y + 29} L880,${OUT_Y + 29} L880,58 L586,58`}
        accent={INK.ember}
        len={900}
        delay={2.1}
        dashed
        opacity={0.35}
      />
      <DArrow x={586} y={58} dir="left" accent={INK.ember} delay={2.7} size={4} />
      <text
        className="d-sub d-fade"
        x={872}
        y={235}
        fontSize={8}
        fill={rgba(INK.ember, 0.6)}
        textAnchor="middle"
        transform="rotate(-90 872 235)"
        style={{ transitionDelay: '2.7s' }}
      >
        REGENERATE OR ESCALATE
      </text>
    </svg>
  );
}

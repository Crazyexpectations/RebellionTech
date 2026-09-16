import { DNode, DEdge, DArrow, DStep, DLabel, INK, rgba } from './primitives';

const W = 128;
const STEP = 146.4;
const Y = 90;
const H = 64;
const X = Array.from({ length: 6 }, (_, i) => Math.round(30 + i * STEP));

const STAGES = [
  { n: '01', t: 'Collect', s: 'raw signal', accent: INK.muted, d: ['Source audit', 'Rights & consent'] },
  { n: '02', t: 'Curate', s: 'make it usable', accent: INK.signal, d: ['Clean, dedupe', 'Version the set'] },
  { n: '03', t: 'Label', s: 'teach the target', accent: INK.signal, d: ['Expert + synthetic', 'Inter-rater checks'] },
  { n: '04', t: 'Train', s: 'fit the model', accent: INK.ember, d: ['Sweeps, not guesses', 'Full run logs'] },
  { n: '05', t: 'Evaluate', s: 'try to break it', accent: INK.emberLight, d: ['Held-out + adversarial', 'Slice-level scores'] },
  { n: '06', t: 'Deploy', s: 'ship behind gates', accent: INK.brass, d: ['Shadow, then canary', 'Instant rollback'] },
];

/**
 * The build loop. The arrow that matters runs backwards: production
 * behaviour is the input to the next round of curation.
 */
export default function TrainingPipeline() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 330"
      role="img"
      aria-label="Six-stage training pipeline from collect through deploy, with a feedback loop from production back into curation."
    >
      {STAGES.map((s, i) => {
        const delay = 0.1 + i * 0.12;
        return (
          <g key={s.n}>
            <DStep x={X[i] + W / 2} y={Y - 26} n={s.n} accent={s.accent} delay={delay} />
            <DNode
              x={X[i]}
              y={Y}
              w={W}
              h={H}
              title={s.t}
              sub={s.s}
              accent={s.accent}
              delay={delay + 0.05}
            />
            {s.d.map((line, li) => (
              <text
                key={line}
                className="d-sub d-fade"
                x={X[i] + W / 2}
                y={Y + H + 18 + li * 13}
                fontSize={8.2}
                textAnchor="middle"
                fill={rgba(INK.muted, 0.95)}
                style={{ transitionDelay: `${delay + 0.3 + li * 0.05}s` }}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Forward arrows */}
      {X.slice(0, -1).map((x, i) => {
        const x1 = x + W;
        const x2 = X[i + 1] - 6;
        const cy = Y + H / 2;
        const delay = 0.3 + i * 0.12;
        return (
          <g key={x}>
            <DEdge d={`M${x1},${cy} L${x2},${cy}`} accent={STAGES[i + 1].accent} len={30} delay={delay} flow opacity={0.6} />
            <DArrow x={x2} y={cy} dir="right" accent={STAGES[i + 1].accent} delay={delay + 0.45} size={4} />
          </g>
        );
      })}

      {/* Feedback: production signal re-enters curation */}
      <DEdge
        d={`M${X[5] + W / 2},${Y + H + 46} L${X[5] + W / 2},262 L${X[1] + W / 2},262 L${X[1] + W / 2},${Y + H + 46}`}
        accent={INK.signal}
        len={900}
        delay={1.1}
        dashed
        opacity={0.45}
      />
      <DArrow x={X[1] + W / 2} y={Y + H + 50} dir="up" accent={INK.signal} delay={1.9} size={4.5} />
      <DLabel
        x={(X[1] + X[5]) / 2 + W / 2}
        y={262}
        text="PRODUCTION BEHAVIOUR → NEXT TRAINING SET"
        accent={INK.signal}
        delay={1.9}
      />

      {/* Gate annotation between evaluate and deploy */}
      <DLabel x={X[4] + W + 9} y={Y - 26} text="QUALITY GATE" accent={INK.emberLight} delay={1.0} anchor="middle" />
      <DEdge
        d={`M${X[4] + W + 9},${Y - 16} L${X[4] + W + 9},${Y + H / 2 - 8}`}
        accent={INK.emberLight}
        len={40}
        delay={1.0}
        dashed
        opacity={0.4}
      />
    </svg>
  );
}

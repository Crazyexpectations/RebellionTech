import { DEdge, DArrow, INK, rgba } from './primitives';

const CX = [78, 232, 386, 540, 694, 848];
const AXIS_Y = 168;

const PHASES = [
  { n: '01', t: 'Audit', s: '72 hours', accent: INK.signal, detail: 'What you actually need — and whether AI is even the answer.' },
  { n: '02', t: 'Frame', s: '1–2 weeks', accent: INK.signal, detail: 'Problem definition, success metrics, data reality check.' },
  { n: '03', t: 'Architect', s: '2–3 weeks', accent: INK.ember, detail: 'System design, model strategy, integration map, cost model.' },
  { n: '04', t: 'Build', s: '4–12 weeks', accent: INK.ember, detail: 'Knowledge engineering, training, iteration against real cases.' },
  { n: '05', t: 'Harden', s: '2–4 weeks', accent: INK.emberLight, detail: 'Adversarial testing, failure modes, guardrails, red team.' },
  { n: '06', t: 'Operate', s: 'ongoing', accent: INK.brass, detail: 'Monitor, evaluate, retrain. Or hand over the keys entirely.' },
];

/** Milestone timeline for a full engagement, audit through operation. */
export default function EngagementFlow() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 330"
      role="img"
      aria-label="Engagement timeline across six phases: audit, frame, architect, build, harden and operate."
    >
      {/* Spine */}
      <DEdge
        d={`M${CX[0]},${AXIS_Y} L${CX[5]},${AXIS_Y}`}
        accent={INK.ember}
        len={820}
        delay={0.1}
        opacity={0.35}
      />
      <DArrow x={CX[5] + 14} y={AXIS_Y} dir="right" accent={INK.brass} delay={1.1} size={5} />

      {PHASES.map((p, i) => {
        const above = i % 2 === 0;
        const delay = 0.2 + i * 0.13;
        const cx = CX[i];
        const boxY = above ? 44 : AXIS_Y + 34;
        const stemY1 = above ? 118 : AXIS_Y + 12;
        const stemY2 = above ? AXIS_Y - 12 : boxY;

        return (
          <g key={p.n}>
            {/* Milestone marker */}
            <g className="d-fade" style={{ transitionDelay: `${delay}s` }}>
              <circle cx={cx} cy={AXIS_Y} r={13} fill="#0b0b13" stroke={rgba(p.accent, 0.5)} strokeWidth={1.4} />
              <circle cx={cx} cy={AXIS_Y} r={5} fill={p.accent} opacity={0.9} />
            </g>

            {/* Stem */}
            <DEdge
              d={`M${cx},${stemY1} L${cx},${stemY2}`}
              accent={p.accent}
              len={70}
              delay={delay + 0.1}
              opacity={0.4}
            />

            {/* Label block */}
            <g className="d-fade" style={{ transitionDelay: `${delay + 0.15}s` }}>
              <text
                x={cx}
                y={boxY + 10}
                textAnchor="middle"
                fontSize={9}
                fill={rgba(p.accent, 0.85)}
                letterSpacing="0.12em"
              >
                {p.n}
              </text>
              <text className="d-title" x={cx} y={boxY + 30} textAnchor="middle" fontSize={15}>
                {p.t}
              </text>
              <text x={cx} y={boxY + 46} textAnchor="middle" fontSize={8.5} fill={rgba(p.accent, 0.75)} letterSpacing="0.06em">
                {p.s.toUpperCase()}
              </text>

              {/* Wrap the detail sentence onto two lines by word count. */}
              {wrap(p.detail, 26).map((line, li) => (
                <text
                  key={line}
                  className="d-sub"
                  x={cx}
                  y={boxY + 62 + li * 12}
                  textAnchor="middle"
                  fontSize={8}
                >
                  {line}
                </text>
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/** Greedy word wrap — SVG <text> has no automatic line breaking. */
function wrap(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

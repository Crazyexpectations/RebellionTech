import { DNode, DEdge, DArrow, DStep, DLabel, INK, rgba } from './primitives';

const ROW1_Y = 70;
const ROW2_Y = 250;
const NODE_W = 240;
const NODE_H = 62;
const XS = [40, 340, 640];

const STAGES = [
  {
    row: 0,
    i: 0,
    n: '01',
    title: 'Understand',
    sub: 'query → intent',
    accent: INK.signal,
    details: ['Normalise, expand, and classify', 'Reject what we cannot answer'],
  },
  {
    row: 0,
    i: 1,
    n: '02',
    title: 'Retrieve',
    sub: 'hybrid search',
    accent: INK.signal,
    details: ['Dense vectors + keyword (BM25)', 'Metadata filters, access rules'],
  },
  {
    row: 0,
    i: 2,
    n: '03',
    title: 'Rerank',
    sub: 'precision pass',
    accent: INK.ember,
    details: ['Cross-encoder scoring', 'Drop weak evidence entirely'],
  },
  {
    row: 1,
    i: 0,
    n: '04',
    title: 'Assemble',
    sub: 'build the context',
    accent: INK.ember,
    details: ['Budget tokens by value', 'Order by relevance, not recency'],
  },
  {
    row: 1,
    i: 1,
    n: '05',
    title: 'Generate',
    sub: 'grounded answer',
    accent: INK.emberLight,
    details: ['Domain-tuned model', 'Structured, typed output'],
  },
  {
    row: 1,
    i: 2,
    n: '06',
    title: 'Verify',
    sub: 'prove it, or refuse',
    accent: INK.brass,
    details: ['Claim-to-source checking', 'Abstain when unsupported'],
  },
];

/**
 * How a question becomes a grounded, cited answer. The step that most
 * teams skip is 06 — which is why their systems confabulate.
 */
export default function RetrievalPipeline() {
  return (
    <svg
      className="rb-diagram"
      viewBox="0 0 920 400"
      role="img"
      aria-label="Six-stage retrieval pipeline: understand, retrieve, rerank, assemble, generate and verify."
    >
      {STAGES.map((s) => {
        const y = s.row === 0 ? ROW1_Y : ROW2_Y;
        const x = XS[s.i];
        const delay = 0.1 + (s.row * 3 + s.i) * 0.14;

        return (
          <g key={s.n}>
            <DNode
              x={x}
              y={y}
              w={NODE_W}
              h={NODE_H}
              title={s.title}
              sub={s.sub}
              accent={s.accent}
              delay={delay}
            />
            <DStep x={x + NODE_W - 16} y={y + 14} n={s.n} accent={s.accent} delay={delay + 0.1} />

            {s.details.map((d, di) => (
              <text
                key={d}
                className="d-sub d-fade"
                x={x + 4}
                y={y + NODE_H + 18 + di * 13}
                fontSize={8.5}
                fill={rgba(INK.muted, 0.95)}
                style={{ transitionDelay: `${delay + 0.25 + di * 0.06}s` }}
              >
                • {d}
              </text>
            ))}
          </g>
        );
      })}

      {/* Within-row arrows */}
      {[0, 1].map((row) =>
        [0, 1].map((i) => {
          const y = (row === 0 ? ROW1_Y : ROW2_Y) + NODE_H / 2;
          const x1 = XS[i] + NODE_W;
          const x2 = XS[i + 1] - 7;
          const delay = 0.35 + (row * 3 + i) * 0.14;
          const accent = row === 0 ? INK.signal : INK.emberLight;
          return (
            <g key={`${row}-${i}`}>
              <DEdge d={`M${x1},${y} L${x2},${y}`} accent={accent} len={80} delay={delay} flow opacity={0.55} />
              <DArrow x={x2} y={y} dir="right" accent={accent} delay={delay + 0.5} size={4.5} />
            </g>
          );
        })
      )}

      {/* Wrap from end of row 1 into the start of row 2 */}
      <DEdge
        d={`M${XS[2] + NODE_W / 2},${ROW1_Y + NODE_H} L${XS[2] + NODE_W / 2},186 L${XS[0] + NODE_W / 2},186 L${
          XS[0] + NODE_W / 2
        },${ROW2_Y - 7}`}
        accent={INK.ember}
        len={800}
        delay={0.75}
        opacity={0.5}
      />
      <DArrow x={XS[0] + NODE_W / 2} y={ROW2_Y - 7} dir="down" accent={INK.ember} delay={1.5} size={4.5} />

      {/* Refusal path — the honest exit */}
      <DEdge
        d={`M${XS[2] + NODE_W / 2},${ROW2_Y + NODE_H} L${XS[2] + NODE_W / 2},372 L${XS[1] + NODE_W / 2},372 L${
          XS[1] + NODE_W / 2
        },${ROW2_Y + NODE_H + 6}`}
        accent={INK.muted}
        len={620}
        delay={1.6}
        dashed
        opacity={0.5}
      />
      <DLabel x={(XS[1] + XS[2]) / 2 + NODE_W / 2} y={372} text="UNSUPPORTED → REGENERATE OR ABSTAIN" accent={INK.muted} delay={2.2} />
    </svg>
  );
}

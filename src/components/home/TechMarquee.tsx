const ROW_A = [
  'PyTorch', 'Transformers', 'Vector Search', 'LangGraph', 'Ray', 'ONNX Runtime',
  'Postgres + pgvector', 'Triton', 'Weights & Biases', 'FastAPI', 'Kubernetes', 'DuckDB',
];

const ROW_B = [
  'RAG', 'Fine-tuning', 'LoRA / PEFT', 'Knowledge Graphs', 'Multi-Agent', 'Evaluation Harnesses',
  'Red Teaming', 'Distillation', 'Quantisation', 'Feature Stores', 'Drift Detection', 'Observability',
];

function Row({ items, reverse = false, duration }: { items: string[]; reverse?: boolean; duration: string }) {
  // The track holds the list twice so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];

  return (
    <div className="rb-marquee-wrap" style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="rb-marquee"
        style={{
          ['--marquee-dur' as string]: duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 1.6rem',
              fontFamily: 'var(--fm)',
              fontSize: '0.8rem',
              color: 'var(--t3)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: 'var(--em2)', opacity: 0.55, fontSize: '0.6rem' }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two counter-scrolling bands of the stack we actually work in. */
export default function TechMarquee() {
  return (
    <section
      className="rb-cv"
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--b)',
        borderBottom: '1px solid var(--b)',
        padding: '2.25rem 0',
        position: 'relative',
        overflow: 'hidden',
        // Fade both ends so items enter and leave instead of popping.
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Row items={ROW_A} duration="46s" />
        <Row items={ROW_B} duration="58s" reverse />
      </div>
    </section>
  );
}

'use client';

import Section from '@/components/ui/Section';
import { useInView, useCountUp } from '@/lib/hooks';
import { ACCENT } from '@/lib/site';

const NUMBERS = [
  {
    value: 72,
    suffix: 'h',
    label: 'Audit turnaround',
    note: 'A written architecture review, not a sales call.',
    accent: ACCENT.signal,
  },
  {
    value: 100,
    suffix: '%',
    label: 'IP transferred on build engagements',
    note: 'Code, weights, prompts, docs. No escrow, no asterisk.',
    accent: ACCENT.emberLight,
  },
  {
    value: 6,
    suffix: '',
    label: 'Layers engineered in-house',
    note: 'Interface to data foundation, plus observability.',
    accent: ACCENT.brass,
  },
  {
    value: 0,
    suffix: '',
    label: 'Black boxes shipped',
    note: 'If we cannot explain a decision, it does not go live.',
    accent: ACCENT.ember,
  },
];

function Metric({ item, index }: { item: (typeof NUMBERS)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const value = useCountUp(item.value, inView, 1500);

  return (
    <div
      ref={ref}
      className="pr-cell"
      style={{ ['--pr-accent' as string]: item.accent }}
    >
      <div className="rb-label" style={{ marginBottom: '1rem' }}>0{index + 1}</div>

      <div
        style={{
          fontFamily: 'var(--fd)',
          fontWeight: 700,
          fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: item.accent,
        }}
      >
        {value}
        <span style={{ opacity: 0.8 }}>{item.suffix}</span>
      </div>

      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--t1)', marginTop: '0.9rem' }}>
        {item.label}
      </div>
      <div
        style={{
          fontSize: '0.78rem',
          fontFamily: 'var(--fm)',
          color: 'var(--t3)',
          lineHeight: 1.65,
          marginTop: '0.35rem',
        }}
      >
        {item.note}
      </div>
    </div>
  );
}

export default function Principles() {
  return (
    <Section bg="base">
      <div
        aria-hidden
        className="rb-glow-blob"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 680,
          height: 420,
          background: 'radial-gradient(ellipse, rgba(239,59,35,.07) 0%, transparent 70%)',
        }}
      />

      <div
        className="rb-reveal"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        <div>
          <span className="rb-badge" style={{ marginBottom: '1.1rem' }}>Commitments</span>
          <h2>
            What we will <span className="rb-gt">put in writing</span>
          </h2>
        </div>
        <p style={{ maxWidth: 380, fontSize: '0.92rem', margin: 0 }}>
          We are a young firm. Rather than quote client counts we have not earned yet, here is what we
          commit to on every engagement.
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .pr-band { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--b2); }
          .pr-cell {
            padding: 2.2rem 1.5rem 2rem; position: relative;
            border-right: 1px solid var(--b); transition: background .3s;
          }
          .pr-cell:last-child { border-right: none; }
          .pr-cell::before {
            content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 2px;
            background: var(--pr-accent); transform: scaleX(0); transform-origin: 0 50%;
            transition: transform .5s cubic-bezier(.16,1,.3,1);
          }
          .pr-cell:hover { background: rgba(255,255,255,.016); }
          .pr-cell:hover::before { transform: scaleX(1); }
          @media (max-width: 900px) {
            .pr-band { grid-template-columns: 1fr 1fr; border-left: 1px solid var(--b); }
            .pr-cell { border-bottom: 1px solid var(--b); }
            .pr-cell:nth-child(2n) { border-right: none; }
          }
          @media (max-width: 500px) {
            .pr-band { grid-template-columns: 1fr; }
            .pr-cell { border-right: none; }
          }
        `,
        }}
      />

      <div className="pr-band">
        {NUMBERS.map((n, i) => (
          <Metric key={n.label} item={n} index={i} />
        ))}
      </div>
    </Section>
  );
}

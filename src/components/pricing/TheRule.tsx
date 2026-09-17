import Section, { SectionHead } from '@/components/ui/Section';
import { THE_RULE, type RuleBranch } from '@/lib/pricing';
import { accentTint } from '@/lib/site';

function Branch({ data, side }: { data: RuleBranch; side: 'left' | 'right' }) {
  const tint = accentTint(data.accent);
  const positive = data.verdict === 'YES';

  return (
    <div className={`${side === 'left' ? 'rb-left' : 'rb-right'} rb-card`} style={{ padding: '2rem', overflow: 'hidden' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${data.accent}, transparent)`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: tint.bg,
            border: `1px solid ${tint.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: data.accent,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {positive ? '✓' : '✕'}
        </span>
        <div>
          <div style={{ fontWeight: 700, color: data.accent, fontSize: '1.05rem', letterSpacing: '0.04em' }}>
            {data.verdict}
          </div>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--fm)', color: 'var(--t3)' }}>{data.sub}</div>
        </div>
      </div>

      <div
        style={{
          fontFamily: 'var(--fm)',
          fontSize: '0.74rem',
          color: data.accent,
          fontWeight: 600,
          marginBottom: '1rem',
          padding: '0.45rem 0.8rem',
          background: tint.bg,
          borderRadius: 7,
          border: `1px solid ${tint.border}`,
          display: 'inline-block',
        }}
      >
        → {data.route}
      </div>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, listStyle: 'none' }}>
        {data.examples.map((ex) => (
          <li key={ex} style={{ display: 'flex', gap: 10, fontSize: '0.86rem' }}>
            <span style={{ color: data.accent, flexShrink: 0 }}>›</span>
            <span style={{ color: 'var(--t2)' }}>{ex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TheRule() {
  return (
    <Section bg="base" hex id="rule" rail="The rule">
      <SectionHead
        badge="Decision framework"
        badgeTone="brass"
        title={<>The <span className="rb-gt3">one question</span> that decides everything</>}
        lead="Answer it honestly and the engagement model picks itself."
        maxWidth={560}
      />

      <div
        className="rb-reveal rb-card rb-corner"
        style={{
          padding: '2rem 2.25rem',
          marginBottom: '1.25rem',
          borderColor: 'var(--am-a25)',
          overflow: 'hidden',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, var(--am2), transparent)',
          }}
        />
        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
            fontWeight: 600,
            color: 'var(--t1)',
            lineHeight: 1.5,
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--fd)',
          }}
        >
          &ldquo;{THE_RULE.question}&rdquo;
        </p>
      </div>

      <div className="rb-grid-2">
        <Branch data={THE_RULE.yes} side="left" />
        <Branch data={THE_RULE.no} side="right" />
      </div>
    </Section>
  );
}

import Image from 'next/image';
import Section, { SectionHead } from '@/components/ui/Section';
import { ACCENT, accentTint } from '@/lib/site';

interface Founder {
  name: string;
  role: string;
  education: string;
  image: string;
  accent: string;
  background: string;
  focus: string;
  obsessions: string[];
}

const FOUNDERS: Founder[] = [
  {
    name: 'Garima Kalra',
    role: 'Founder & Lead Researcher',
    education: 'BITS Pilani — Computer Science, AI/ML Honours',
    image: '/founders/garimaf.png',
    accent: ACCENT.emberLight,
    background:
      'Computer science researcher working on intelligence that comes from understanding a domain rather than from adapting whichever model is currently fashionable. Her work spans representation learning, custom architectures and domain-specific systems across healthcare and media.',
    focus:
      'Garima leads research and model development. She designed the knowledge-engineering method we apply on every engagement, and the evaluation frameworks that decide whether a system is allowed to ship. Her position: a genuinely domain-aware system needs a different design philosophy from a fine-tuned general model, and pretending otherwise is why so many projects plateau.',
    obsessions: [
      'Representation learning and how knowledge gets organised',
      'Custom architectures for narrow, high-stakes problems',
      'Evaluation that survives contact with real inputs',
    ],
  },
  {
    name: 'Aurin Desai',
    role: 'Founder & System Architect',
    education: 'BITS Pilani — Computer Science, Advanced ML',
    image: '/founders/aurinf.png',
    accent: ACCENT.signal,
    background:
      'Engineer turned AI systems architect. Spent years working out why AI products fail in production — almost never at the model layer, almost always at the system layer. Built the infrastructure patterns that make our systems reliable under real load and real failure.',
    focus:
      'Aurin leads architecture and infrastructure. He designs the systems the intelligence lives inside: data pipelines, inference, orchestration, observability and the failure handling nobody thinks about until it matters. His principle: intelligence that cannot survive production conditions was never intelligence, it was a demo.',
    obsessions: [
      'System architecture and production reliability',
      'Scaling custom intelligence without trading away control',
      'Making failure modes explicit instead of surprising',
    ],
  },
];

function FounderCard({ f }: { f: Founder }) {
  const tint = accentTint(f.accent);

  return (
    <article className="rb-reveal rb-card rb-corner" style={{ padding: '2rem', overflow: 'hidden' }} data-glow={tint.border}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '12%',
          right: '12%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${f.accent}77, transparent)`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 16,
            overflow: 'hidden',
            flexShrink: 0,
            border: `1px solid ${tint.border}`,
            background: tint.bg,
            position: 'relative',
          }}
        >
          <Image
            src={f.image}
            alt={f.name}
            width={152}
            height={152}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 3 }}>{f.name}</h3>
          <div
            style={{
              fontFamily: 'var(--fm)',
              fontSize: '0.72rem',
              color: f.accent,
              letterSpacing: '0.06em',
              marginBottom: 5,
            }}
          >
            {f.role}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--t3)' }}>{f.education}</div>
        </div>
      </div>

      <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>{f.background}</p>

      <div className="rb-label" style={{ marginBottom: '0.7rem' }}>Works on</div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', marginBottom: '1.35rem' }}>
        {f.obsessions.map((o) => (
          <li key={o} style={{ display: 'flex', gap: 10, fontSize: '0.845rem' }}>
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: f.accent,
                flexShrink: 0,
                marginTop: 8,
                boxShadow: `0 0 8px ${f.accent}`,
              }}
            />
            <span style={{ color: 'var(--t2)' }}>{o}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          padding: '1.1rem 1.2rem',
          background: tint.bg,
          border: `1px solid ${tint.border}`,
          borderRadius: 10,
        }}
      >
        <p style={{ fontSize: '0.855rem', margin: 0, color: 'var(--t2)' }}>{f.focus}</p>
      </div>
    </article>
  );
}

export default function Founders() {
  return (
    <Section bg="alt" mesh>
      <SectionHead
        badge="Who builds this"
        title={<>Two people, and <span className="rb-gt">no account managers</span></>}
        lead="You will work directly with the people writing the code. That is a deliberate constraint on how many engagements we take, not an accident of being early."
        maxWidth={640}
      />

      <div className="rb-grid-2">
        {FOUNDERS.map((f) => (
          <FounderCard key={f.name} f={f} />
        ))}
      </div>
    </Section>
  );
}

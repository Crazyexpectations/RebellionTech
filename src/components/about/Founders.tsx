import Image from 'next/image';
import Section, { SectionHead } from '@/components/ui/Section';
import { ACCENT, accentTint, SITE } from '@/lib/site';

const OBSESSIONS = [
  {
    t: 'System architecture',
    d: 'Routing, state, tool execution and failure handling. The layer that decides whether a system survives its first real month.',
    accent: ACCENT.ember,
  },
  {
    t: 'Retrieval & knowledge engineering',
    d: 'Getting the right context in front of the model every time. Most hallucination problems are retrieval problems wearing a disguise.',
    accent: ACCENT.brass,
  },
  {
    t: 'Evaluation that survives reality',
    d: 'Benchmarks built from real traffic, scored per slice. Knowing whether a system is actually good is harder than building it.',
    accent: ACCENT.signal,
  },
  {
    t: 'Production reliability',
    d: 'Observability, drift detection, rehearsed rollback. Intelligence that cannot hold under load was never intelligence.',
    accent: ACCENT.emberLight,
  },
];

export default function Founders() {
  const tint = accentTint(ACCENT.ember);

  return (
    <Section bg="alt" mesh id="founder" rail="Who builds this">
      <SectionHead
        badge="Who builds this"
        title={<>One engineer, and <span className="rb-gt">no one to hide behind</span></>}
        lead="You work directly with the person writing the code. There is no account manager relaying messages, no junior team the work quietly gets handed to, and no ambiguity about who is responsible when something breaks."
        maxWidth={680}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .fd-shell { display: grid; grid-template-columns: 300px 1fr; gap: 2.5rem; align-items: start; }
          @media (max-width: 880px) { .fd-shell { grid-template-columns: 1fr; gap: 1.75rem; } }
          .fd-portrait { position: sticky; top: 100px; }
          @media (max-width: 880px) { .fd-portrait { position: static; } }
        `,
        }}
      />

      <article className="rb-reveal rb-card rb-corner" style={{ padding: '2.25rem', overflow: 'hidden' }} data-glow={tint.border}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background: `linear-gradient(90deg, transparent, ${ACCENT.emberLight}88, transparent)`,
          }}
        />

        <div className="fd-shell">
          {/* ── Portrait + identity ───────────────────────────────── */}
          <div className="fd-portrait">
            <div
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                border: `1px solid ${tint.border}`,
                background: tint.bg,
                marginBottom: '1.25rem',
                aspectRatio: '1 / 1',
                position: 'relative',
              }}
            >
              <Image
                src="/founders/aurinf.png"
                alt={SITE.founder.name}
                width={600}
                height={600}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Warm wash so the portrait sits inside the palette */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(5,5,8,.5) 100%), radial-gradient(circle at 70% 20%, rgba(239,59,35,.13), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            <h3 style={{ fontSize: '1.45rem', marginBottom: 5 }}>{SITE.founder.name}</h3>
            <div
              style={{
                fontFamily: 'var(--fm)',
                fontSize: '0.74rem',
                color: 'var(--em3)',
                letterSpacing: '0.06em',
                marginBottom: '0.7rem',
              }}
            >
              {SITE.founder.role}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--t3)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              BITS Pilani — Computer Science, Advanced Machine Learning
            </div>

            <a href={`mailto:${SITE.email}`} className="rb-btn rb-btn-ghost rb-btn-sm" style={{ width: '100%' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              Email directly
            </a>
          </div>

          {/* ── Narrative ─────────────────────────────────────────── */}
          <div>
            <p style={{ fontSize: '1rem', color: 'var(--t1)', fontWeight: 500, marginBottom: '1.1rem', lineHeight: 1.7 }}>
              Engineer turned AI systems architect. I started RebellionTech because I kept being handed the
              same broken thing to fix.
            </p>

            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              A model wired to an API, a demo that impressed a boardroom, and a system that fell apart the
              moment it met a real workflow. The failure was almost never at the model layer. It was
              retrieval nobody tuned, evaluation nobody built, permissions bolted on at the end, and failure
              modes nobody had thought about until a customer found them.
            </p>

            <p style={{ fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              So RebellionTech does the unglamorous part on purpose. I design the whole system — data through
              interface — measure whether it actually works, harden it against the cases that matter, and
              then hand you everything needed to run it without me. Being one person is a real constraint on
              how much I take on. It is also why nothing gets lost in translation.
            </p>

            <div className="rb-label" style={{ marginBottom: '1rem' }}>Where the work goes</div>
            <div className="rb-grid-2" style={{ gap: '0.85rem', marginBottom: '1.75rem' }}>
              {OBSESSIONS.map((o) => {
                const t = accentTint(o.accent);
                return (
                  <div
                    key={o.t}
                    style={{
                      padding: '1.1rem 1.2rem',
                      borderRadius: 11,
                      background: 'rgba(255,255,255,.015)',
                      border: '1px solid var(--b)',
                      borderLeft: `2px solid ${o.accent}`,
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--t1)', marginBottom: 5 }}>
                      {o.t}
                    </div>
                    <p style={{ fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>{o.d}</p>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                padding: '1.25rem 1.4rem',
                background: tint.bg,
                border: `1px solid ${tint.border}`,
                borderRadius: 11,
              }}
            >
              <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--t2)' }}>
                <strong style={{ color: 'var(--em3)' }}>What this means for you.</strong> Fewer concurrent
                engagements than an agency would take, and a far shorter path between a question and an
                answer. If the work needs specialists I do not have, I will bring them in and tell you
                exactly who is doing what — rather than quietly subcontracting it.
              </p>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}

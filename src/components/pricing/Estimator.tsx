'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Section, { SectionHead } from '@/components/ui/Section';
import { ACCENT, accentTint } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════════
   Indicative engagement estimator.

   Deliberately a range, never a quote. The multipliers below encode the
   same six cost factors documented further down the page — they are a
   transparent rule of thumb, not a pricing engine, and the copy says so.
   ═══════════════════════════════════════════════════════════════════ */

interface Option {
  id: string;
  label: string;
  sub: string;
  /** Multiplier applied to the tier's base range. */
  mult?: number;
  tier?: 0 | 1 | 2;
  ownership?: 'own' | 'operated' | 'unsure';
}

interface Question {
  id: string;
  prompt: string;
  note: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'ownership',
    prompt: 'Who runs the system once it works?',
    note: 'This is the question that decides your engagement model. Everything else only moves the number.',
    options: [
      { id: 'own', label: 'We do', sub: 'Hand it over and we take it from there', ownership: 'own' },
      { id: 'operated', label: 'You do', sub: 'Too critical or complex for us to operate', ownership: 'operated' },
      { id: 'unsure', label: 'Not sure yet', sub: 'Show me both paths', ownership: 'unsure' },
    ],
  },
  {
    id: 'scope',
    prompt: 'What are you actually building?',
    note: 'Sets the complexity tier, which sets the base range.',
    options: [
      { id: 't1', label: 'Assistant or internal search', sub: 'Chatbot, knowledge base, content tooling', tier: 0 },
      { id: 't2', label: 'Domain platform', sub: 'Industry-specific AI, decision support, workflow automation', tier: 1 },
      { id: 't3', label: 'Proprietary or multi-agent system', sub: 'Custom models, agent networks, intelligence infrastructure', tier: 2 },
    ],
  },
  {
    id: 'data',
    prompt: 'What state is your data in?',
    note: 'The single most common reason an estimate moves. Be honest here.',
    options: [
      { id: 'clean', label: 'Clean and labelled', sub: 'Structured, documented, ready to use', mult: 0.9 },
      { id: 'messy', label: 'It exists, but it is messy', sub: 'Scattered, inconsistent, partly undocumented', mult: 1.0 },
      { id: 'none', label: 'Barely any', sub: 'We would need to build collection and labelling first', mult: 1.35 },
    ],
  },
  {
    id: 'integration',
    prompt: 'How much does it have to plug into?',
    note: 'Integration surface drives both build cost and ongoing cost.',
    options: [
      { id: 'standalone', label: 'Standalone', sub: 'Little or no integration needed', mult: 0.9 },
      { id: 'few', label: 'A few systems', sub: 'Two or three integrations, batch or near-real-time', mult: 1.05 },
      { id: 'many', label: 'Many, in real time', sub: 'Several systems, live sync, strict latency budget', mult: 1.3 },
    ],
  },
  {
    id: 'timeline',
    prompt: 'How urgent is it?',
    note: 'We do not rush research. If urgency is required, it is priced accordingly.',
    options: [
      { id: 'flexible', label: 'Flexible', sub: 'Right beats fast', mult: 1.0 },
      { id: 'quarter', label: 'This quarter', sub: 'There is a date attached', mult: 1.12 },
      { id: 'urgent', label: 'Urgent', sub: 'Yesterday, ideally', mult: 1.3 },
    ],
  },
];

/* Base build ranges per tier, in rupees — mirrors TIERS in lib/pricing. */
const TIER_BASE: [number, number][] = [
  [50_000, 200_000],
  [200_000, 1_000_000],
  [500_000, 2_000_000],
];

const TIER_NAME = ['Tier 1 — AI-Powered Business Systems', 'Tier 2 — Domain Intelligence Systems', 'Tier 3 — Proprietary Intelligence Platforms'];
const TIER_ACCENT = [ACCENT.signal, ACCENT.brass, ACCENT.emberLight];

/** Monthly component that pairs with each path, per tier. */
const RETAINER: [number, number][] = [
  [10_000, 25_000],
  [15_000, 40_000],
  [25_000, 60_000],
];
const SUBSCRIPTION: [number, number][] = [
  [60_000, 100_000],
  [100_000, 150_000],
  [150_000, 250_000],
];

/** Round to an increment a human would actually say out loud. */
function tidy(n: number) {
  if (n >= 1_000_000) return Math.round(n / 100_000) * 100_000;
  if (n >= 100_000) return Math.round(n / 50_000) * 50_000;
  return Math.round(n / 10_000) * 10_000;
}

/** Lakh/crore shorthand, matching how the rest of the page quotes money. */
function inr(n: number) {
  if (n >= 10_000_000) {
    const v = n / 10_000_000;
    return `₹${v % 1 === 0 ? v : v.toFixed(1)}Cr`;
  }
  if (n >= 100_000) {
    const v = n / 100_000;
    return `₹${v % 1 === 0 ? v : v.toFixed(1)}L`;
  }
  return `₹${Math.round(n / 1000)}K`;
}

export default function Estimator() {
  const [answers, setAnswers] = useState<Record<string, Option>>({});

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === QUESTIONS.length;

  const choose = (qid: string, opt: Option) =>
    setAnswers((a) => ({ ...a, [qid]: opt }));

  const reset = () => setAnswers({});

  const result = useMemo(() => {
    if (!complete) return null;

    const tier = answers.scope?.tier ?? 0;
    const ownership = answers.ownership?.ownership ?? 'unsure';

    const mult = ['data', 'integration', 'timeline'].reduce(
      (acc, k) => acc * (answers[k]?.mult ?? 1),
      1
    );

    const [baseLo, baseHi] = TIER_BASE[tier];
    // The floor moves less than the ceiling — complexity widens a range
    // upward far more than it lifts the minimum.
    const lo = tidy(baseLo * (1 + (mult - 1) * 0.55));
    const hi = tidy(baseHi * mult);

    const drivers = ['data', 'integration', 'timeline']
      .map((k) => ({ q: QUESTIONS.find((q) => q.id === k)!, opt: answers[k] }))
      .filter((d) => (d.opt?.mult ?? 1) > 1.05)
      .map((d) => d.opt.label);

    return { tier, ownership, lo, hi, mult, drivers };
  }, [answers, complete]);

  return (
    <Section bg="base" id="estimate" rail="Estimator">
      <SectionHead
        badge="Interactive"
        badgeTone="cyan"
        title={<>Estimate your engagement <span className="rb-gt2">in five questions</span></>}
        lead="An indicative range built from the same factors described below. It is a rule of thumb, not a quote — but it is the same rule of thumb we start from."
        maxWidth={660}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .es-shell { display: grid; grid-template-columns: 1.25fr 1fr; gap: 1.5rem; align-items: start; }
          @media (max-width: 960px) { .es-shell { grid-template-columns: 1fr; } }
          .es-result { position: sticky; top: 96px; }
          @media (max-width: 960px) { .es-result { position: static; } }
          .es-opts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
          @media (max-width: 720px) { .es-opts { grid-template-columns: 1fr; } }
          .es-opt {
            text-align: left; cursor: pointer; font: inherit; color: inherit;
            background: rgba(255,255,255,.015); border: 1px solid var(--b);
            border-radius: 10px; padding: 0.85rem 0.95rem;
            transition: border-color .2s, background .2s, transform .2s;
          }
          .es-opt:hover { border-color: var(--b2); transform: translateY(-2px); }
          .es-opt[aria-pressed="true"] {
            border-color: var(--cy-a25); background: var(--cy-a08);
          }
        `,
        }}
      />

      <div className="es-shell">
        {/* ── Questions ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {QUESTIONS.map((q, i) => {
            // Reveal one step ahead of where the visitor has got to.
            const unlocked = i === 0 || Boolean(answers[QUESTIONS[i - 1].id]);
            const chosen = answers[q.id];

            if (!unlocked) return null;

            return (
              <div
                key={q.id}
                className="rb-card"
                style={{ padding: '1.4rem 1.5rem', animation: 'rbUp .45s cubic-bezier(.16,1,.3,1) both' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                  <span className="rb-label" style={{ color: chosen ? 'var(--cy2)' : 'var(--t3)' }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{q.prompt}</h3>
                </div>
                <p style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>{q.note}</p>

                <div className="es-opts">
                  {q.options.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className="es-opt"
                      aria-pressed={chosen?.id === o.id}
                      onClick={() => choose(q.id, o)}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.86rem',
                          fontWeight: 600,
                          color: chosen?.id === o.id ? 'var(--cy2)' : 'var(--t1)',
                          marginBottom: 3,
                        }}
                      >
                        {o.label}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--t3)', lineHeight: 1.55 }}>
                        {o.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Result ───────────────────────────────────────────────── */}
        <div className="es-result">
          <div className="rb-card rb-corner" style={{ padding: '1.75rem', overflow: 'hidden' }}>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(42,212,240,.6), transparent)',
              }}
            />

            {/* Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="rb-label">Estimate</span>
                <span className="rb-label" style={{ color: complete ? 'var(--cy2)' : 'var(--t3)' }}>
                  {answeredCount} / {QUESTIONS.length}
                </span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(answeredCount / QUESTIONS.length) * 100}%`,
                    background: 'linear-gradient(90deg, var(--cy), var(--cy2))',
                    borderRadius: 2,
                    transition: 'width .5s cubic-bezier(.16,1,.3,1)',
                  }}
                />
              </div>
            </div>

            {!result && (
              <div>
                <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                  Answer the questions on the left and a range appears here, along with the engagement model
                  that fits and what is driving the number.
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--t3)', margin: 0 }}>
                  Nothing is sent anywhere. This runs entirely in your browser.
                </p>
              </div>
            )}

            {result && (
              <div style={{ animation: 'rbUp .5s cubic-bezier(.16,1,.3,1) both' }}>
                {/* Tier */}
                <div
                  className="rb-chip"
                  style={{
                    background: accentTint(TIER_ACCENT[result.tier]).bg,
                    color: TIER_ACCENT[result.tier],
                    border: `1px solid ${accentTint(TIER_ACCENT[result.tier]).border}`,
                    marginBottom: '1rem',
                  }}
                >
                  {TIER_NAME[result.tier]}
                </div>

                {/* Headline range */}
                <div className="rb-label" style={{ marginBottom: 6 }}>
                  {result.ownership === 'operated' ? 'Setup fee' : 'Build fee'}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.7rem, 3.4vw, 2.3rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    color: 'var(--t1)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {inr(result.lo)} <span style={{ color: 'var(--t3)', fontWeight: 500 }}>–</span>{' '}
                  <span className="rb-gt2">{inr(result.hi)}</span>
                </div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--t3)', marginBottom: '1.4rem' }}>
                  one-time
                </div>

                {/* Ongoing */}
                {result.ownership !== 'unsure' && (
                  <div
                    style={{
                      padding: '1rem 1.1rem',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,.02)',
                      border: '1px solid var(--b)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div className="rb-label" style={{ marginBottom: 5 }}>
                      {result.ownership === 'operated' ? 'Infrastructure subscription' : 'Monthly retainer'}
                    </div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--em3)' }}>
                      {result.ownership === 'operated'
                        ? `${inr(SUBSCRIPTION[result.tier][0])} – ${inr(SUBSCRIPTION[result.tier][1])}`
                        : `${inr(RETAINER[result.tier][0])} – ${inr(RETAINER[result.tier][1])}`}
                      <span style={{ fontFamily: 'var(--fm)', fontSize: '0.68rem', color: 'var(--t3)', fontWeight: 400 }}>
                        {' '}
                        /month
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', margin: '0.5rem 0 0', lineHeight: 1.6 }}>
                      {result.ownership === 'operated'
                        ? 'We run, monitor and evolve the system. Ownership of the intelligence stays with us.'
                        : 'You own everything. We keep improving it — knowledge, features, performance.'}
                    </p>
                  </div>
                )}

                {result.ownership === 'unsure' && (
                  <p style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                    Because you are undecided on ownership, only the one-time figure is shown. The monthly
                    component differs sharply between the two paths — roughly{' '}
                    {inr(RETAINER[result.tier][0])}–{inr(RETAINER[result.tier][1])} if you own it, against{' '}
                    {inr(SUBSCRIPTION[result.tier][0])}–{inr(SUBSCRIPTION[result.tier][1])} if we operate it.
                  </p>
                )}

                {/* What moved it */}
                {result.drivers.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="rb-label" style={{ marginBottom: 7 }}>Pushing this upward</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {result.drivers.map((d) => (
                        <span
                          key={d}
                          className="rb-chip"
                          style={{ background: 'var(--em-a08)', color: 'var(--em3)', border: '1px solid var(--em-a25)' }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: 9,
                    background: 'var(--am-a08)',
                    border: '1px solid var(--am-a25)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <p style={{ fontSize: '0.78rem', margin: 0, lineHeight: 1.65 }}>
                    <strong style={{ color: 'var(--am2)' }}>This is not a quote.</strong> It is arithmetic on
                    five answers. The audit is what turns it into a number worth signing.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link href="/audit/" className="rb-btn rb-btn-fill rb-btn-sm" style={{ flex: '1 1 auto' }}>
                    Get the real number
                  </Link>
                  <button type="button" onClick={reset} className="rb-btn rb-btn-ghost rb-btn-sm">
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

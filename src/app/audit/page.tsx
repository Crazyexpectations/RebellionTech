import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Section, { SectionHead } from '@/components/ui/Section';
import AuditForm from '@/components/audit/AuditForm';
import { SITE } from '@/lib/site';
import { ACCENT, accentTint } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Architecture Audit',
  description:
    'A written architecture audit in 72 hours: what you are actually trying to build, the architecture we would use, where it fails in production, and a realistic budget — or a reason not to start.',
};

const DELIVERS = [
  {
    n: '01',
    t: 'Problem restatement',
    d: 'What you are actually trying to achieve, written back to you in a form you can circulate internally. This alone resolves more disagreement than people expect.',
    accent: ACCENT.signal,
  },
  {
    n: '02',
    t: 'Recommended architecture',
    d: 'The system we would build, layer by layer, with the specific technology choices named — plus the two alternatives we considered and why we set them aside.',
    accent: ACCENT.emberLight,
  },
  {
    n: '03',
    t: 'Failure analysis',
    d: 'Where this breaks in production, what each failure costs you, and what it takes to prevent or contain it. The section most proposals leave out.',
    accent: ACCENT.ember,
  },
  {
    n: '04',
    t: 'Data reality check',
    d: 'An honest read on whether your data can support what you want. Frequently this is the finding that changes the plan.',
    accent: ACCENT.brass,
  },
  {
    n: '05',
    t: 'Budget and timeline',
    d: 'A realistic range with the reasoning attached, so you can sanity-check any quote you receive — from us or from anyone else.',
    accent: ACCENT.signal,
  },
  {
    n: '06',
    t: 'A recommendation',
    d: 'Build it, build something smaller first, or do not build it at all. We commit to an answer rather than presenting options and leaving you to choose.',
    accent: ACCENT.brass,
  },
];

const FOR = [
  'You have a real problem and are not sure AI is the answer',
  'You have a prototype that demos well and fails in practice',
  'You have a quote from another firm and want it pressure-tested',
  'You are about to commit budget and want a second read first',
];

const NOT_FOR = [
  'You want a proposal to justify a decision already made',
  'You need a vendor to rubber-stamp an existing architecture',
  'You are collecting free consulting with no intention to build',
];

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Start here"
        title={
          <>
            A written architecture audit,{' '}
            <span className="rb-gt">back in 72 hours</span>
          </>
        }
        lead="Not a discovery call. Not a capabilities deck. A document that tells you what you are actually building, how we would build it, where it would break, and whether you should do it at all."
        facts={[
          { k: '72h', v: 'Turnaround' },
          { k: '6', v: 'Sections delivered' },
          { k: 'Yours', v: 'To keep, regardless' },
        ]}
      />

      {/* ── What you get ─────────────────────────────────────────── */}
      <Section bg="alt" mesh>
        <SectionHead
          badge="What you get"
          title={<>Six sections, <span className="rb-gt">written for engineers</span></>}
          lead="The audit is a self-contained deliverable. Take it, build from it yourself, or hand it to another firm. There is no obligation attached."
          maxWidth={640}
        />

        <div className="rb-grid-3">
          {DELIVERS.map((d, i) => {
            const tint = accentTint(d.accent);
            return (
              <div
                key={d.n}
                className="rb-depth rb-card rb-lift"
                style={{ padding: '1.6rem', transitionDelay: `${(i % 3) * 0.09}s`, overflow: 'hidden' }}
                data-glow={tint.border}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '15%',
                    right: '15%',
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${tint.border}, transparent)`,
                  }}
                />
                <div className="rb-label" style={{ color: d.accent, marginBottom: '0.8rem' }}>{d.n}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{d.t}</h3>
                <p style={{ fontSize: '0.855rem', margin: 0, lineHeight: 1.74 }}>{d.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Fit ──────────────────────────────────────────────────── */}
      <Section bg="base" hex>
        <SectionHead
          badge="Fit check"
          badgeTone="cyan"
          title={<>Whether this is <span className="rb-gt2">worth your time</span></>}
          maxWidth={560}
        />

        <div className="rb-grid-2">
          <div className="rb-left rb-card" style={{ padding: '1.9rem', overflow: 'hidden' }}>
            <span
              aria-hidden
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ACCENT.signal}, transparent)` }}
            />
            <div className="rb-label" style={{ color: 'var(--cy2)', marginBottom: '1.1rem' }}>Request one if</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none' }}>
              {FOR.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 11, fontSize: '0.885rem' }}>
                  <span style={{ color: 'var(--cy2)', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'var(--t2)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rb-right rb-card" style={{ padding: '1.9rem', overflow: 'hidden' }}>
            <span
              aria-hidden
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--t3), transparent)' }}
            />
            <div className="rb-label" style={{ marginBottom: '1.1rem' }}>Do not bother if</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none' }}>
              {NOT_FOR.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 11, fontSize: '0.885rem' }}>
                  <span style={{ color: 'var(--t3)', flexShrink: 0 }}>✕</span>
                  <span style={{ color: 'var(--t3)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Form ─────────────────────────────────────────────────── */}
      <Section bg="alt" id="request" narrow>
        <SectionHead
          badge="Request the audit"
          title={<>Tell us what you are <span className="rb-gt">trying to build</span></>}
          lead="Rough notes beat a polished brief. We would rather see the actual mess."
          align="center"
          maxWidth={560}
        />

        <div className="rb-reveal rb-card rb-corner" style={{ padding: '2.25rem', overflow: 'hidden' }}>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: '12%',
              right: '12%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,122,92,.6), transparent)',
            }}
          />
          <AuditForm />
        </div>

        <div
          className="rb-reveal"
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span className="rb-dot-live" />
          <span style={{ fontFamily: 'var(--fm)', fontSize: '0.74rem', color: 'var(--t2)' }}>
            {SITE.status.label} · Typical reply within one working day
          </span>
        </div>
      </Section>
    </>
  );
}

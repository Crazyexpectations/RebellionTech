'use client';

import { useMemo, useState } from 'react';
import { SITE } from '@/lib/site';

const STAGES = [
  'Just an idea',
  'Have a prototype',
  'In production, not working well',
  'Evaluating whether to start',
];

const BUDGETS = ['Under ₹1L', '₹1L – ₹5L', '₹5L – ₹20L', '₹20L+', 'Not sure yet'];

const TIMELINES = ['Exploring', 'Next quarter', 'This quarter', 'Urgent'];

interface FormState {
  name: string;
  org: string;
  email: string;
  stage: string;
  budget: string;
  timeline: string;
  problem: string;
}

const EMPTY: FormState = {
  name: '',
  org: '',
  email: '',
  stage: STAGES[0],
  budget: BUDGETS[4],
  timeline: TIMELINES[0],
  problem: '',
};

const field: React.CSSProperties = {
  width: '100%',
  background: 'var(--card2)',
  border: '1px solid var(--b2)',
  color: 'var(--t1)',
  borderRadius: 9,
  padding: '0.75rem 0.95rem',
  fontFamily: 'var(--f)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
};

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7, gap: 10 }}>
      <span className="rb-label">{children}</span>
      {hint && <span style={{ fontSize: '0.68rem', color: 'var(--t3)' }}>{hint}</span>}
    </div>
  );
}

/**
 * The site is a static export with no backend, so this composes a fully
 * formatted email and hands it to the visitor's mail client. A copy button
 * covers the case where no mail client is configured — the request still
 * reaches us either way.
 */
export default function AuditForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const valid = form.name.trim().length > 1 && emailValid && form.problem.trim().length > 20;

  const body = useMemo(
    () =>
      [
        `Name: ${form.name || '—'}`,
        `Organisation: ${form.org || '—'}`,
        `Email: ${form.email || '—'}`,
        '',
        `Stage: ${form.stage}`,
        `Budget: ${form.budget}`,
        `Timeline: ${form.timeline}`,
        '',
        'The problem:',
        form.problem || '—',
        '',
        '—',
        `Sent from ${SITE.domain}`,
      ].join('\n'),
    [form]
  );

  const subject = `Architecture audit request${form.org ? ` — ${form.org}` : ''}`;

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.location.href = mailto;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${SITE.email}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const err = (bad: boolean) => (touched && bad ? { borderColor: 'rgba(239,59,35,.6)' } : undefined);

  return (
    <form onSubmit={submit} noValidate>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .af-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          @media (max-width: 620px) { .af-row { grid-template-columns: 1fr; } }
          .af-field:focus { border-color: var(--em2) !important; box-shadow: 0 0 0 3px var(--em-a08); }
          .af-field::placeholder { color: var(--t3); }
          .af-opt {
            cursor: pointer; font-family: var(--fm); font-size: 0.74rem;
            padding: 0.5rem 0.85rem; border-radius: 999px;
            border: 1px solid var(--b2); background: transparent; color: var(--t2);
            transition: all .2s;
          }
          .af-opt:hover { border-color: var(--b3); color: var(--t1); }
          .af-opt[aria-pressed="true"] {
            border-color: var(--em-a25); background: var(--em-a08); color: var(--em3);
          }
        `,
        }}
      />

      <div className="af-row" style={{ marginBottom: '1.15rem' }}>
        <div>
          <Label hint="required">Your name</Label>
          <input
            className="af-field"
            style={{ ...field, ...err(form.name.trim().length < 2) }}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Priya Sharma"
            autoComplete="name"
          />
        </div>
        <div>
          <Label>Organisation</Label>
          <input
            className="af-field"
            style={field}
            value={form.org}
            onChange={(e) => set('org', e.target.value)}
            placeholder="Company or team"
            autoComplete="organization"
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.15rem' }}>
        <Label hint="required">Email</Label>
        <input
          className="af-field"
          style={{ ...field, ...err(!emailValid) }}
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="you@company.com"
          type="email"
          autoComplete="email"
          inputMode="email"
        />
      </div>

      {/* Chip selectors — faster than dropdowns on mobile */}
      {(
        [
          ['Where are you now?', 'stage', STAGES],
          ['Budget range', 'budget', BUDGETS],
          ['Timeline', 'timeline', TIMELINES],
        ] as const
      ).map(([label, key, options]) => (
        <div key={key} style={{ marginBottom: '1.15rem' }}>
          <Label>{label}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {options.map((o) => (
              <button
                key={o}
                type="button"
                className="af-opt"
                aria-pressed={form[key] === o}
                onClick={() => set(key, o)}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginBottom: '1.5rem' }}>
        <Label hint={`${form.problem.trim().length} / 20 min`}>The problem, in your own words</Label>
        <textarea
          className="af-field"
          style={{ ...field, minHeight: 150, resize: 'vertical', lineHeight: 1.7, ...err(form.problem.trim().length <= 20) }}
          value={form.problem}
          onChange={(e) => set('problem', e.target.value)}
          placeholder="What are you trying to do, what have you tried, and what is going wrong? Rough notes are fine — we would rather have the messy version than a polished brief."
        />
      </div>

      {touched && !valid && (
        <p style={{ fontSize: '0.82rem', color: 'var(--em3)', marginBottom: '1rem' }}>
          Add your name, a valid email and a little more detail on the problem, then try again.
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="submit" className="rb-btn rb-btn-fill" disabled={touched && !valid}>
          Send the request
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="m22 2-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button type="button" onClick={copy} className="rb-btn rb-btn-ghost">
          {copied ? 'Copied to clipboard' : 'Copy as text instead'}
        </button>
      </div>

      <p style={{ fontFamily: 'var(--fm)', fontSize: '0.7rem', color: 'var(--t3)', marginTop: '1.25rem', lineHeight: 1.7 }}>
        This opens your mail app with everything filled in — nothing is sent from this page and nothing is
        stored here. If no mail app opens, use the copy button and send it to{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </form>
  );
}

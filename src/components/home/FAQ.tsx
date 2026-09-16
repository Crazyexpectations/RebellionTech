'use client';

import { useState } from 'react';
import Section, { SectionHead } from '@/components/ui/Section';

const ITEMS = [
  {
    q: 'You are a new company. Why should I trust you with this?',
    a: 'You should not, on the strength of a website. Start with the architecture audit — it is scoped, cheap relative to a build, and it produces a document you can take to any engineer for a second opinion. Judge us on whether that document is sharper than what you already had. If it is not, you have lost a few days and learned something.',
  },
  {
    q: 'Do I actually own what you build?',
    a: 'On Build Fee engagements, yes — completely. Source code, model weights, training recipes, prompts, evaluation sets and runbooks transfer to you at completion. There is no license-back, no hosted dependency you cannot remove, and no clause that makes leaving expensive. Infrastructure Subscription engagements are different by design: there we operate the system, and that distinction is spelled out before anything is signed.',
  },
  {
    q: 'Why are your prices ranges instead of fixed numbers?',
    a: 'Because the honest answer depends on six things we cannot know before looking: problem complexity, the state of your data, whether a custom architecture is warranted, integration surface, how much domain framing we have to supply, and how urgent it is. A fixed number quoted before the audit is either padded to cover the unknown or is going to be revised later. We would rather quote after we know.',
  },
  {
    q: 'Can you just fine-tune a model for us? Or plug in an API?',
    a: 'Sometimes that genuinely is the right answer, and when it is we will say so and do it. What we will not do is call that an "AI system" and charge you for one. The value is rarely in the model call — it is in the retrieval, the evaluation and the operational layer around it.',
  },
  {
    q: 'What if the audit says we do not need AI?',
    a: 'Then that is what the audit says. A meaningful share of problems described to us as AI problems are reporting problems, data-quality problems or process problems wearing a costume. Telling you that early is the most useful thing we can do, and it costs you far less than finding out in month five.',
  },
  {
    q: 'How do you handle data privacy and compliance?',
    a: 'Access control lives in the retrieval layer, so the system physically cannot surface a document a given user is not entitled to see. Data handling, residency and retention are agreed in writing before ingestion begins. Where a deployment needs to stay inside your infrastructure, we build for that rather than routing your data through ours.',
  },
  {
    q: 'What does working with you actually feel like week to week?',
    a: 'Direct. You talk to the people building the system, not an account manager relaying messages. You get a written update with what moved, what broke and what we are uncertain about. When we are stuck, you hear it that week rather than at the end of the phase.',
  },
];

function Item({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;

  return (
    <div
      className="rb-reveal rb-card"
      style={{
        transitionDelay: `${index * 0.05}s`,
        borderColor: open ? 'var(--em-a25)' : undefined,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          textAlign: 'left',
          color: 'inherit',
          font: 'inherit',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--fd)',
            fontSize: '0.98rem',
            fontWeight: 600,
            color: open ? 'var(--em3)' : 'var(--t1)',
            letterSpacing: '-0.015em',
            transition: 'color .25s',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>

        <span
          aria-hidden
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            border: `1px solid ${open ? 'var(--em-a25)' : 'var(--b2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: open ? 'var(--em3)' : 'var(--t3)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform .3s cubic-bezier(.16,1,.3,1), color .25s, border-color .25s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* 0fr -> 1fr animates height without measuring the content. */}
      <div
        id={id}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows .4s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            style={{
              padding: '0 1.5rem 1.4rem',
              fontSize: '0.89rem',
              margin: 0,
              maxWidth: '72ch',
              lineHeight: 1.82,
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Section bg="base" hex>
      <SectionHead
        badge="Straight answers"
        title={<>Questions you should <span className="rb-gt">be asking</span></>}
        lead="Including the uncomfortable ones."
        maxWidth={600}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 880 }}>
        {ITEMS.map((item, i) => (
          <Item key={item.q} item={item} index={i} />
        ))}
      </div>

      {/* FAQ structured data helps this surface directly in search results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: ITEMS.map((i) => ({
              '@type': 'Question',
              name: i.q,
              acceptedAnswer: { '@type': 'Answer', text: i.a },
            })),
          }),
        }}
      />
    </Section>
  );
}

import type { ReactNode } from 'react';
import { ACCENT } from './site';

export interface Capability {
  n: string;
  title: string;
  short: string;
  desc: string;
  tags: string[];
  accent: string;
  icon: ReactNode;
  /** Longer breakdown, used on the Systems page. */
  detail: string[];
}

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const CAPABILITIES: Capability[] = [
  {
    n: '01',
    title: 'Custom Model Development',
    short: 'Models built for your problem, not adapted to it.',
    desc: 'Architectures chosen and trained against your data and your failure modes. Where a general model genuinely wins, we say so and use it — but the decision is made on evidence, not on convenience.',
    tags: ['Fine-tuning', 'Custom Architectures', 'Distillation'],
    accent: ACCENT.emberLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" opacity=".5" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity=".5" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" opacity=".5" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity=".5" />
        <path d="M5.5 12H9M15 12h3.5M12 5.5V9M12 15v3.5" />
      </svg>
    ),
    detail: [
      'Baseline first: we measure what an off-the-shelf model already achieves before proposing anything custom.',
      'Training runs are versioned, logged and reproducible — you get the recipe, not just the weights.',
      'Distillation and quantisation where latency or unit cost is the binding constraint.',
    ],
  },
  {
    n: '02',
    title: 'System Architecture',
    short: 'The part everyone skips, and the part that decides whether it works.',
    desc: 'Routing, state, tool execution, failure handling, cost control. Designed for the load you will actually have, with no black boxes and no component you cannot replace.',
    tags: ['Orchestration', 'State Design', 'Cost Modelling'],
    accent: ACCENT.ember,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <rect x="2" y="2" width="8" height="8" rx="2" />
        <rect x="14" y="2" width="8" height="8" rx="2" />
        <rect x="2" y="14" width="8" height="8" rx="2" />
        <rect x="14" y="14" width="8" height="8" rx="2" />
        <path d="M10 6h4M6 10v4M18 10v4M10 18h4" />
      </svg>
    ),
    detail: [
      'Every external call has a timeout, a retry policy and a defined degraded state.',
      'Cost per request is a design constraint from day one, not a bill you discover in month three.',
      'Components are swappable: changing model provider should be a config change, not a rewrite.',
    ],
  },
  {
    n: '03',
    title: 'Retrieval & Knowledge Engineering',
    short: 'Getting the right context in front of the model, every time.',
    desc: 'Hybrid retrieval, reranking, chunking strategies tuned to your documents, and a domain ontology that encodes how your field actually reasons. Most "hallucination" problems are retrieval problems.',
    tags: ['Hybrid Search', 'Reranking', 'Ontologies'],
    accent: ACCENT.brass,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    detail: [
      'Chunking and embedding strategy is chosen by measurement on your corpus, not by blog-post default.',
      'Access control lives in the retrieval layer, so a user can never be shown a document they cannot see.',
      'Every answer carries citations back to source spans — unsupported claims are blocked, not softened.',
    ],
  },
  {
    n: '04',
    title: 'Multi-Agent Orchestration',
    short: 'Many specialists, one chain of command.',
    desc: 'Agent systems that stay debuggable: one orchestrator owns control flow, specialists never call each other directly, and every decision leaves a trace you can replay.',
    tags: ['Planning', 'Tool Use', 'Traceability'],
    accent: ACCENT.signal,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M6.6 6.6 10 10M17.4 6.6 14 10M6.6 17.4 10 14M17.4 17.4 14 14" />
      </svg>
    ),
    detail: [
      'Bounded autonomy: agents get an explicit budget of steps, tools and spend.',
      'A critic agent must sign off before anything reaches the user or writes to a system of record.',
      'Full execution traces, so a bad answer can be reproduced and diagnosed months later.',
    ],
  },
  {
    n: '05',
    title: 'Evaluation, Safety & Red-Teaming',
    short: 'We try to break it before your users do.',
    desc: 'Benchmarks built from your real cases, adversarial suites, slice-level scoring, and hard gates in the deploy pipeline. If it cannot pass, it does not ship.',
    tags: ['Eval Harnesses', 'Adversarial Testing', 'Quality Gates'],
    accent: ACCENT.emberLight,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <path d="M12 2 3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6l-9-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    detail: [
      'Evaluation sets are drawn from your real traffic and edge cases, not from public benchmarks.',
      'Scores are reported per slice — aggregate accuracy hides the failures that actually hurt.',
      'Refusal behaviour is tested as rigorously as correctness. Knowing when to stop is a feature.',
    ],
  },
  {
    n: '06',
    title: 'Production & MLOps',
    short: 'Running it is most of the work.',
    desc: 'Deployment, observability, drift detection and retraining loops. Shadow and canary releases, instant rollback, and dashboards that tell you what changed and why.',
    tags: ['Observability', 'Drift Detection', 'Retraining'],
    accent: ACCENT.signal,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...s}>
        <path d="M3 17l5-6 4 4 5-7 4 5" />
        <path d="M3 21h18" />
        <circle cx="8" cy="11" r="1.4" fill="currentColor" opacity=".5" />
        <circle cx="17" cy="8" r="1.4" fill="currentColor" opacity=".5" />
      </svg>
    ),
    detail: [
      'New versions run in shadow against live traffic before anyone depends on them.',
      'Drift alerts are tied to business metrics, not just model statistics.',
      'Rollback is one command, and it is tested on a schedule rather than assumed to work.',
    ],
  },
];

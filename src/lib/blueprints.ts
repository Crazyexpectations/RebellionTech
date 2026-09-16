import { ACCENT } from './site';

export interface Blueprint {
  id: string;
  name: string;
  archetype: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  range: string;
  accent: string;
  /** One line for the selector list. */
  summary: string;
  problem: string;
  /** The part that actually decides whether this succeeds. */
  hardPart: string;
  /** Layer-by-layer build notes, keyed to the reference architecture. */
  layers: { layer: string; note: string }[];
  signals: string[];
  notFor: string;
}

export const BLUEPRINTS: Blueprint[] = [
  {
    id: 'executive-intelligence',
    name: 'Executive Intelligence',
    archetype: 'Cross-system briefing engine',
    tier: 'Tier 3',
    range: '₹5,00,000 – ₹20,00,000+',
    accent: ACCENT.emberLight,
    summary: 'Answers questions that span every system the business runs on.',
    problem:
      'Leadership needs answers that live across a CRM, a finance system, a ticketing tool and four years of documents. Today someone spends two days assembling each answer by hand, and it is stale by the time it lands.',
    hardPart:
      'Entitlements and freshness. A briefing engine that shows a regional head another region’s numbers is a compliance incident, and one that quietly serves last quarter’s figures is worse than no engine at all. Both have to be structural, not prompted.',
    layers: [
      { layer: 'Data', note: 'Connectors with incremental sync and per-source freshness SLAs. Every record carries its own as-of timestamp.' },
      { layer: 'Knowledge', note: 'Entity resolution across systems so one customer is one entity. Ontology encodes the org’s own vocabulary for metrics.' },
      { layer: 'Reasoning', note: 'Decomposes a question into sub-queries, runs them against structured and unstructured sources, reconciles conflicts explicitly.' },
      { layer: 'Orchestration', note: 'Entitlement filter applied at retrieval. Refusal path when a question crosses a boundary the asker cannot see.' },
      { layer: 'Interface', note: 'Briefings carry inline citations and an as-of line. Every number is clickable back to its source row.' },
    ],
    signals: ['Answers span 3+ systems', 'Manual assembly takes days', 'Strict access boundaries', 'Numbers must be defensible'],
    notFor: 'A team of eight with everything already in one dashboard. Buy a BI tool.',
  },
  {
    id: 'hiring-intelligence',
    name: 'Hiring Intelligence',
    archetype: 'Auditable screening system',
    tier: 'Tier 2',
    range: '₹2,00,000 – ₹10,00,000',
    accent: ACCENT.signal,
    summary: 'Screens at volume while staying explainable to a regulator.',
    problem:
      'Thousands of applications, a small team, and a genuine need to be consistent. Keyword filters miss good candidates and quietly encode whatever bias is in the keywords.',
    hardPart:
      'Every decision has to be explainable and every rejection defensible months later. That constraint rules out the highest-scoring black-box approaches, and it has to be designed in from the first sprint rather than bolted on before an audit.',
    layers: [
      { layer: 'Data', note: 'Structured parsing of heterogeneous CVs. Protected attributes are stripped at ingestion, not at scoring time.' },
      { layer: 'Knowledge', note: 'A competency ontology built with your hiring managers — what "senior" means here, not what it means on average.' },
      { layer: 'Reasoning', note: 'Scores each competency separately with a written rationale and an evidence span from the application.' },
      { layer: 'Orchestration', note: 'Anything near the threshold routes to a human queue. The system narrows; it never rejects unilaterally.' },
      { layer: 'Observability', note: 'Fairness metrics scored per slice on every batch, with drift alerts. Full audit log of every decision and its inputs.' },
    ],
    signals: ['High application volume', 'Consistency matters legally', 'Hiring criteria are genuinely domain-specific'],
    notFor: 'Hiring two people a year. The setup cost will never pay back.',
  },
  {
    id: 'knowledge-assistant',
    name: 'Domain Knowledge Assistant',
    archetype: 'Internal expertise, on demand',
    tier: 'Tier 1',
    range: '₹50,000 – ₹2,00,000',
    accent: ACCENT.brass,
    summary: 'Turns scattered internal documents into answers people trust.',
    problem:
      'The knowledge exists — in wikis, PDFs, Slack threads and three people’s heads. New staff take months to become useful, and those three people spend their days answering the same questions.',
    hardPart:
      'Document heterogeneity and staleness. A policy PDF, a Slack thread and a spreadsheet need entirely different chunking, and the assistant confidently quoting a superseded policy is worse than having no assistant.',
    layers: [
      { layer: 'Data', note: 'Per-source-type ingestion. Supersession tracking so a replaced document stops being retrievable as current.' },
      { layer: 'Knowledge', note: 'Hybrid retrieval tuned on a labelled question set drawn from your actual helpdesk history.' },
      { layer: 'Reasoning', note: 'Grounded answers with citations. Abstains when the corpus does not contain the answer, rather than reasoning from priors.' },
      { layer: 'Interface', note: 'Lives where people already work — Slack or Teams — because a separate portal will not be opened.' },
      { layer: 'Observability', note: 'Unanswered questions become a backlog of documentation gaps, which is often the most valuable output.' },
    ],
    signals: ['Repetitive internal questions', 'Long onboarding ramp', 'Documentation exists but is unfindable'],
    notFor: 'A corpus that is genuinely 30 pages. Just make it searchable.',
  },
  {
    id: 'content-engine',
    name: 'Brand Content Engine',
    archetype: 'Voice-consistent generation at volume',
    tier: 'Tier 2',
    range: '₹2,00,000 – ₹10,00,000',
    accent: ACCENT.ember,
    summary: 'Produces volume that still sounds like you and is still true.',
    problem:
      'Content output needs to multiply, but generic model output is recognisable at a glance and frequently invents specifics about the product that are not true.',
    hardPart:
      'Voice is not a prompt instruction — it is a distribution over word choice, sentence rhythm and what the brand refuses to say. Holding that steady across thousands of pieces, while every factual claim stays grounded in an approved source, is the whole problem.',
    layers: [
      { layer: 'Data', note: 'A curated corpus of work the brand is actually proud of, plus an explicit negative set of what to never sound like.' },
      { layer: 'Knowledge', note: 'A product-fact store that is the only permitted source for claims. Anything not in it cannot be asserted.' },
      { layer: 'Reasoning', note: 'Task-tuned generation with voice constraints, then a separate pass that checks each claim against the fact store.' },
      { layer: 'Orchestration', note: 'Review workflow with tracked edits — human corrections feed the next training round instead of evaporating.' },
      { layer: 'Observability', note: 'Voice-drift scoring against the reference corpus, so slow degradation is caught before an editor notices.' },
    ],
    signals: ['Content volume is a bottleneck', 'Brand voice is a real asset', 'Factual accuracy is non-negotiable'],
    notFor: 'Filler SEO pages. Those do not need us and increasingly do not work.',
  },
  {
    id: 'operations-copilot',
    name: 'Operations Copilot',
    archetype: 'Agents that act on real systems',
    tier: 'Tier 2',
    range: '₹2,00,000 – ₹10,00,000',
    accent: ACCENT.signal,
    summary: 'Executes multi-step work, safely, in systems that matter.',
    problem:
      'Routine operational work spans several tools and a dozen steps. It is too variable to script and too repetitive to keep doing by hand.',
    hardPart:
      'This is the only archetype here that writes to systems of record. Every safety property — dry runs, idempotency, confirmation thresholds, rollback — has to be real, because a confused agent with write access is a genuinely expensive failure mode.',
    layers: [
      { layer: 'Orchestration', note: 'One orchestrator owns control flow. Step, spend and time budgets are enforced per run.' },
      { layer: 'Reasoning', note: 'Plans the whole sequence and presents it before executing anything irreversible.' },
      { layer: 'Tooling', note: 'Typed tools with permission scopes and a mandatory dry-run mode. Writes are idempotent by construction.' },
      { layer: 'Knowledge', note: 'Runbook corpus encoding how your team actually handles the exceptions, not just the happy path.' },
      { layer: 'Observability', note: 'Every action logged with its rationale and a defined reversal. Rollback is rehearsed on a schedule.' },
    ],
    signals: ['Multi-tool repetitive workflows', 'Too variable for scripts', 'Clear rules for the exceptions'],
    notFor: 'Anything where a wrong action is unrecoverable. Keep a human in the loop.',
  },
  {
    id: 'wellness-companion',
    name: 'Wellness Companion',
    archetype: 'Supportive conversation with hard limits',
    tier: 'Tier 3',
    range: '₹5,00,000 – ₹20,00,000+',
    accent: ACCENT.emberLight,
    summary: 'Sustained supportive dialogue, with safety as architecture.',
    problem:
      'People need consistent, available, non-judgemental support between sessions with a human professional. Generic chat models drift into advice they have no business giving.',
    hardPart:
      'Everything here is a safety problem. Detecting escalation reliably, refusing to diagnose, never displacing professional care, and doing all of that while still feeling like a presence worth talking to. We do not take this one on without a clinical partner.',
    layers: [
      { layer: 'Orchestration', note: 'Risk classification runs on every turn, ahead of generation. Escalation routes out of the system entirely.' },
      { layer: 'Reasoning', note: 'Trained on a bounded interaction framework agreed with clinicians — reflective, never prescriptive.' },
      { layer: 'Knowledge', note: 'Per-user memory with explicit consent, user-visible, and erasable on request in full.' },
      { layer: 'Interface', note: 'Escalation paths and professional resources are always one tap away, not buried in a settings page.' },
      { layer: 'Observability', note: 'Clinical review of sampled transcripts on a fixed cadence, with a documented process for acting on findings.' },
    ],
    signals: ['Clinical partner involved', 'Support between professional sessions', 'Safety budget is real'],
    notFor: 'Replacing a therapist. It cannot, and we will not build something that implies it can.',
  },
];

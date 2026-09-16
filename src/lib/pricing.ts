import { ACCENT } from './site';

/**
 * Engagement models, complexity tiers and cost factors.
 * Prices are INR and intentionally quoted as ranges — see FACTORS for why.
 */

export interface PricingModel {
  title: string;
  tag: string;
  icon: string;
  accent: string;
  price: string;
  priceUnit: string;
  summary: string;
  includes: string[];
  examples: string[];
  think: string;
}

export const PRICING_MODELS: PricingModel[] = [
  {
    title: 'Build Fee',
    tag: 'One-Time',
    icon: '◈',
    accent: ACCENT.emberLight,
    price: '₹75K – ₹5L+',
    priceUnit: 'one-time',
    summary:
      'A one-time fee for creating a complete AI system. Research, architecture, knowledge engineering, development, testing and deployment. Ownership transfers fully to you at completion.',
    includes: [
      'Research & Problem Framing',
      'System Architecture',
      'Knowledge Engineering',
      'Development & Training',
      'Testing & Evaluation',
      'Deployment',
    ],
    examples: ['AI Assistants', 'Domain Platforms', 'Internal Tools', 'Knowledge Bases'],
    think: 'Build once. Own it.',
  },
  {
    title: 'Monthly Retainer',
    tag: 'Ongoing',
    icon: '◆',
    accent: ACCENT.brass,
    price: '₹10K – ₹25K+',
    priceUnit: '/month',
    summary:
      'You own the system. RebellionTech continuously improves it. Used when a client owns the intelligence and wants ongoing evolution — knowledge updates, feature additions and performance improvements.',
    includes: [
      'Knowledge Updates',
      'Prompt & Policy Improvements',
      'Workflow Enhancements',
      'New Feature Development',
      'Monitoring & Support',
    ],
    examples: ['Any owned system needing ongoing improvement'],
    think: 'Build once → improve continuously',
  },
  {
    title: 'Setup Fee',
    tag: 'Infrastructure Entry',
    icon: '◇',
    accent: ACCENT.signal,
    price: '₹4L – ₹10L+',
    priceUnit: 'one-time',
    summary:
      'Used when entering RebellionTech infrastructure. Covers full discovery, architecture design, integrations and initial deployment into a managed intelligence environment.',
    includes: [
      'Discovery Sessions',
      'Architecture Design',
      'System Integrations',
      'Configuration',
      'Initial Deployment',
    ],
    examples: ['Enterprise AI platforms', 'Multi-agent deployments', 'Intelligence infrastructure'],
    think: 'Infrastructure onboarding',
  },
  {
    title: 'Infrastructure Subscription',
    tag: 'Active Operation',
    icon: '⬡',
    accent: ACCENT.emberLight,
    price: '₹1L – ₹1.5L+',
    priceUnit: '/month',
    summary:
      'RebellionTech actively operates your intelligence systems. We run, monitor, engineer knowledge and continuously evolve capabilities. Used when the intelligence is too critical or complex to hand off.',
    includes: [
      'Knowledge Engineering',
      'Evaluation & Monitoring',
      'Optimisation',
      'Hosting & Infrastructure',
      'Vector Retrieval Systems',
      'Capability Evolution',
    ],
    examples: ['Executive Intelligence', 'Healthcare Platforms', 'Multi-Agent Systems'],
    think: 'Intelligence-as-infrastructure',
  },
];

export interface Tier {
  n: string;
  tier: string;
  name: string;
  price: string;
  accent: string;
  examples: string[];
  desc: string;
}

export const TIERS: Tier[] = [
  {
    n: '01',
    tier: 'Tier 1',
    name: 'AI-Powered Business Systems',
    price: '₹50,000 – ₹2,00,000',
    accent: ACCENT.signal,
    examples: ['AI Chatbots', 'AI Search', 'Internal Assistants', 'Content Systems'],
    desc: 'Intelligence applied to existing business workflows. Language-model systems with orchestration layers built on your data, processes and domain knowledge.',
  },
  {
    n: '02',
    tier: 'Tier 2',
    name: 'Domain Intelligence Systems',
    price: '₹2,00,000 – ₹10,00,000',
    accent: ACCENT.brass,
    examples: ['Industry-Specific AI', 'Knowledge Platforms', 'Decision Support', 'Workflow Automation'],
    desc: 'Deep domain specialisation. Adapted models and custom pipelines engineered around the nuances of specific industries and problem types.',
  },
  {
    n: '03',
    tier: 'Tier 3',
    name: 'Proprietary Intelligence Platforms',
    price: '₹5,00,000 – ₹20,00,000+',
    accent: ACCENT.emberLight,
    examples: ['Multi-Agent Systems', 'Research Platforms', 'Intelligence Infrastructure', 'Custom Architectures'],
    desc: 'Full research and development. Proprietary models built from scratch on domain-specific data. For organisations solving novel problems that demand custom-trained intelligence.',
  },
];

export const FACTORS = [
  {
    f: 'Problem Complexity',
    e: 'Novel domains require more research. Well-understood domains require less. The harder the problem, the deeper the investment.',
  },
  {
    f: 'Data Requirements',
    e: 'Do you have clean, labelled data? Do we need to build labelling infrastructure or generate synthetic data? This affects cost significantly.',
  },
  {
    f: 'Custom Architecture',
    e: 'Adapting existing models versus building from scratch. Custom architectures require more research, training cycles and validation.',
  },
  {
    f: 'Integration Complexity',
    e: 'Real-time requirements, edge deployment, existing infrastructure — these all affect implementation scope and ongoing cost.',
  },
  {
    f: 'Domain Expertise',
    e: 'How much do we contribute to problem framing? The less domain knowledge on the client side, the more RebellionTech must provide.',
  },
  {
    f: 'Timeline Flexibility',
    e: 'Urgency has a premium. We do not rush research — but if urgency is required, it is priced accordingly.',
  },
];

export interface RuleBranch {
  verdict: string;
  sub: string;
  route: string;
  accent: string;
  examples: string[];
}

/** The one question that picks your engagement model. */
export const THE_RULE: { question: string; yes: RuleBranch; no: RuleBranch } = {
  question: 'If RebellionTech disappeared tomorrow, would the system mostly keep working?',
  yes: {
    verdict: 'YES',
    sub: 'The system is self-sufficient',
    route: 'Build Fee + Monthly Retainer',
    accent: ACCENT.signal,
    examples: [
      'Domain AI platforms',
      'Chatbots & assistants',
      'Internal knowledge bases',
      'CRM and workflow assistants',
    ],
  },
  no: {
    verdict: 'NO',
    sub: 'RebellionTech is the infrastructure',
    route: 'Setup Fee + Infrastructure Subscription',
    accent: ACCENT.emberLight,
    examples: [
      'Executive intelligence systems',
      'Healthcare intelligence platforms',
      'Enterprise intelligence networks',
      'Multi-agent AI systems',
    ],
  },
};

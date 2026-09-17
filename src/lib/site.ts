/**
 * Single source of truth for brand, contact and navigation.
 * Change it here and it changes everywhere on the site.
 */

export const SITE = {
  name: 'RebellionTech',
  legalName: 'RebellionTech',
  domain: 'rebelliontech.in',
  url: 'https://rebelliontech.in',

  tagline: 'Intelligence that refuses to be generic.',
  shortPitch:
    'RebellionTech designs, builds and operates custom AI systems — not API wrappers. Research-grade engineering for organisations that need intelligence they actually own.',

  // ── Contact ──────────────────────────────────────────────────────
  // Every mail link, the audit form and the structured data read from here.
  email: 'aurindesai@gmail.com',
  location: 'India — working worldwide',

  founder: {
    name: 'Aurin Desai',
    role: 'Founder & Chief Executive Officer',
  },

  social: {
    github: 'https://github.com/Crazyexpectations',
    linkedin: '',
    x: '',
  },

  status: {
    open: true,
    label: 'Accepting new engagements',
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  desc: string;
}

export const NAV: NavItem[] = [
  { label: 'Systems', href: '/systems/', desc: 'What we build, and how it is engineered' },
  { label: 'Blueprints', href: '/blueprints/', desc: 'Reference architectures, diagrammed end to end' },
  { label: 'Research', href: '/research/', desc: 'Model taxonomy, methods and limits' },
  { label: 'Pricing', href: '/pricing/', desc: 'Engagement models and what drives cost' },
  { label: 'About', href: '/about/', desc: 'Who builds this, and why' },
];

export const CTA = {
  label: 'Architecture Audit',
  shortLabel: 'Get Audit',
  href: '/audit/',
} as const;

export const FOOTER_NAV = {
  explore: [
    { label: 'Systems', href: '/systems/' },
    { label: 'Blueprints', href: '/blueprints/' },
    { label: 'Research', href: '/research/' },
  ],
  company: [
    { label: 'Pricing', href: '/pricing/' },
    { label: 'About', href: '/about/' },
    { label: 'Architecture Audit', href: '/audit/' },
  ],
};

/** Brand accents, reused by JS that needs the palette as values. */
export const ACCENT = {
  ember: '#ef3b23',
  emberLight: '#ff7a5c',
  emberDeep: '#c41e0f',
  signal: '#2ad4f0',
  signalDeep: '#0e9bb8',
  brass: '#f0b64a',
  brassDeep: '#c98a2e',
} as const;

export type AccentKey = keyof typeof ACCENT;

/** Translucent fill + border for a given accent, at a consistent strength. */
export function accentTint(hex: string, fill = 0.08, border = 0.22) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    color: hex,
    bg: `rgba(${r},${g},${b},${fill})`,
    border: `rgba(${r},${g},${b},${border})`,
  };
}

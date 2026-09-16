import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/** Emitted as a static sitemap.xml at build time. */
export const dynamic = 'force-static';

const ROUTES = [
  { path: '/', priority: 1.0 },
  { path: '/systems/', priority: 0.9 },
  { path: '/blueprints/', priority: 0.9 },
  { path: '/pricing/', priority: 0.8 },
  { path: '/research/', priority: 0.7 },
  { path: '/about/', priority: 0.6 },
  { path: '/audit/', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));
}

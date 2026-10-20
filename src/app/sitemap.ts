import type { MetadataRoute } from 'next';
import { GUIDES } from '@/data/guides';
import { PROMPTS } from '@/data/prompts';
import { absoluteUrl, LAST_UPDATED, STATIC_PATHS } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const dyn = [...PROMPTS.map((p) => `/prompts/${p.slug}/`), ...GUIDES.map((g) => `/guides/${g.slug}/`)];
  return [...STATIC_PATHS, ...dyn].map((path) => ({
    url: absoluteUrl(path),
    lastModified: LAST_UPDATED,
    changeFrequency: path === '/' || path === '/prompts/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : dyn.includes(path) || path === '/prompts/' ? 0.8 : 0.4,
  }));
}

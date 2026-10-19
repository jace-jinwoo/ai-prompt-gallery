export const SITE_NAME = 'AI 프롬프트 갤러리';
export const SITE_TAGLINE = 'ChatGPT·Claude·Midjourney용 오리지널 프롬프트 템플릿을 변수만 채워 바로 복사';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.netlify.app').replace(/\/+$/, '');
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
export const LAST_UPDATED = '2026-10-19';
/** 프롬프트 상세를 제외한 정적 페이지 경로 (sitemap, 검증 스크립트 공통) */
export const STATIC_PATHS = ['/', '/prompts/', '/categories/', '/guides/', '/favorites/', '/about/', '/privacy/', '/terms/', '/contact/'];

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && ADSENSE_CLIENT !== '';

// Next.js 가 빌드 시 인라인하도록 환경변수를 정적으로 참조합니다.
export const ADSENSE_SLOTS = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || '',
  prompt: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PROMPT || '',
  content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || '',
} as const;

export type AdPlacement = keyof typeof ADSENSE_SLOTS;

/** 경로(예: /prompts/)를 절대 URL 로 변환합니다. */
export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

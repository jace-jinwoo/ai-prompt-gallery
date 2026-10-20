import type { Metadata } from 'next';
import Link from 'next/link';
import PromptBrowser from '@/components/PromptBrowser';
import { PROMPTS } from '@/data/prompts';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '프롬프트 라이브러리',
  description: `ChatGPT, Claude, Midjourney용 오리지널 프롬프트 ${PROMPTS.length}개. 도구·카테고리별 필터와 검색으로 찾고 변수만 채워 복사하세요.`,
  alternates: { canonical: '/prompts/' },
  openGraph: { url: '/prompts/', title: `프롬프트 라이브러리 | ${SITE_NAME}` },
};

export default function PromptsPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">프롬프트 라이브러리</h1>
      <p className="mt-2 text-gray-600">
        도구와 카테고리로 좁히거나 검색어로 찾아보세요. 항목을 열면 변수 입력, 복사, 예시 입력과 예상 출력 형식을 볼 수 있습니다. 처음이라면 <Link href="/guides/prompt-structure/" className="text-brand-700 underline">프롬프트 구성 가이드</Link>를 먼저 읽어 보세요.
      </p>
      <div className="mt-6"><PromptBrowser items={PROMPTS} /></div>
    </article>
  );
}

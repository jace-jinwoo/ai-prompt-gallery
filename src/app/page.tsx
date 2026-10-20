import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HomeSearch from '@/components/HomeSearch';
import JsonLd from '@/components/JsonLd';
import PromptCard from '@/components/PromptCard';
import { GUIDES } from '@/data/guides';
import { PROMPTS } from '@/data/prompts';
import { CATEGORY_LABELS, TOOL_LABELS, TOOL_NOTES, type CategoryId, type ToolId } from '@/data/types';
import { sortLatest } from '@/lib/prompt-search';
import { absoluteUrl, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export default function HomePage() {
  const popular = PROMPTS.filter((p) => p.popular).slice(0, 6);
  const latest = sortLatest(PROMPTS).slice(0, 4);
  const tools = Object.keys(TOOL_LABELS) as ToolId[];
  const cats = Object.keys(CATEGORY_LABELS) as CategoryId[];

  return (
    <div>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/'), inLanguage: 'ko-KR', description: SITE_TAGLINE }} />
      <section className="rounded-xl bg-brand-50 p-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{SITE_NAME}</h1>
        <p className="mt-2 text-gray-700">{SITE_TAGLINE}. 변수 칸만 채우면 내 상황에 맞는 프롬프트가 만들어집니다.</p>
        <div className="mt-4"><HomeSearch /></div>
      </section>

      <section aria-labelledby="tools-h" className="mt-10">
        <h2 id="tools-h" className="text-xl font-semibold text-gray-900">인기 도구별 프롬프트</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {tools.map((t) => (
            <li key={t}>
              <Link href={`/prompts/?tool=${t}`} className="block h-full rounded-lg border border-gray-200 p-4 hover:border-brand-600 hover:bg-brand-50">
                <span className="font-semibold text-gray-900">{TOOL_LABELS[t]} <span className="text-sm font-normal text-gray-500">({PROMPTS.filter((p) => p.tool === t).length}개)</span></span>
                <span className="mt-1 block text-sm text-gray-600">{TOOL_NOTES[t]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cat-h" className="mt-10">
        <h2 id="cat-h" className="text-xl font-semibold text-gray-900">카테고리 탐색</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {cats.map((c) => (
            <li key={c}><Link href={`/prompts/?category=${c}`} className="inline-block rounded-full border border-brand-200 px-3 py-1 text-sm text-brand-700 hover:bg-brand-50">{CATEGORY_LABELS[c]}</Link></li>
          ))}
          <li><Link href="/categories/" className="inline-block px-3 py-1 text-sm text-gray-600 underline">카테고리 설명 보기</Link></li>
        </ul>
      </section>

      <AdSlot placement="home" />

      <section aria-labelledby="pop-h" className="mt-10">
        <h2 id="pop-h" className="text-xl font-semibold text-gray-900">인기 프롬프트</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">{popular.map((p) => <PromptCard key={p.slug} p={p} />)}</ul>
      </section>

      <section aria-labelledby="new-h" className="mt-10">
        <h2 id="new-h" className="text-xl font-semibold text-gray-900">최근 추가된 프롬프트</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">{latest.map((p) => <PromptCard key={p.slug} p={p} />)}</ul>
      </section>

      <section aria-labelledby="guide-h" className="mt-10">
        <h2 id="guide-h" className="text-xl font-semibold text-gray-900">최신 안내 콘텐츠</h2>
        <ul className="mt-3 space-y-2">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}/`} className="font-medium text-brand-700 underline">{g.title}</Link>
              <span className="block text-sm text-gray-600">{g.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

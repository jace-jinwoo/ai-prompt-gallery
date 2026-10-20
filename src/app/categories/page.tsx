import type { Metadata } from 'next';
import Link from 'next/link';
import { PROMPTS } from '@/data/prompts';
import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS, type CategoryId } from '@/data/types';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '카테고리별 프롬프트',
  description: '글쓰기, 업무, 학습, 코딩, 마케팅, 이미지 생성 6개 카테고리로 프롬프트를 둘러보고 각 카테고리의 활용 방식을 확인하세요.',
  alternates: { canonical: '/categories/' },
  openGraph: { url: '/categories/', title: `카테고리별 프롬프트 | ${SITE_NAME}` },
};

export default function CategoriesPage() {
  const cats = Object.keys(CATEGORY_LABELS) as CategoryId[];
  return (
    <article>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">카테고리별 프롬프트</h1>
      <p className="mt-2 text-gray-600">작업 종류별로 프롬프트를 묶었습니다. 카테고리를 선택하면 해당 목록으로 이동합니다.</p>
      <div className="mt-6 space-y-8">
        {cats.map((c) => {
          const list = PROMPTS.filter((p) => p.category === c);
          return (
            <section key={c} aria-labelledby={`c-${c}`}>
              <h2 id={`c-${c}`} className="text-xl font-semibold text-gray-900">{CATEGORY_LABELS[c]} <span className="text-sm font-normal text-gray-500">({list.length}개)</span></h2>
              <p className="mt-1 text-gray-700">{CATEGORY_DESCRIPTIONS[c]}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {list.map((p) => <li key={p.slug}><Link href={`/prompts/${p.slug}/`} className="text-brand-700 underline">{p.title}</Link></li>)}
              </ul>
              <p className="mt-2 text-sm"><Link href={`/prompts/?category=${c}`} className="text-brand-700 underline">필터로 모아 보기</Link></p>
            </section>
          );
        })}
      </div>
    </article>
  );
}

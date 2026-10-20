import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { GUIDES, getGuide } from '@/data/guides';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}/` },
    openGraph: { url: `/guides/${g.slug}/`, title: `${g.title} | ${SITE_NAME}`, description: g.description },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug)!;
  return (
    <article>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description, dateModified: g.updatedAt, inLanguage: 'ko-KR', mainEntityOfPage: absoluteUrl(`/guides/${g.slug}/`) }} />
      <nav aria-label="현재 위치" className="text-sm text-gray-500">
        <Link href="/guides/" className="hover:text-brand-700">가이드</Link> <span aria-hidden="true">/</span> {g.title}
      </nav>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{g.title}</h1>
      <p className="mt-1 text-sm text-gray-500">최종 수정 {g.updatedAt}</p>
      {g.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">{s.heading}</h2>
          <div className="mt-2 space-y-3 text-gray-700">{s.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
        </section>
      ))}
      <AdSlot placement="content" />
      <p className="mt-8 text-gray-700">
        바로 써 보려면 <Link href="/prompts/" className="text-brand-700 underline">프롬프트 라이브러리</Link>로 이동하세요.
      </p>
    </article>
  );
}

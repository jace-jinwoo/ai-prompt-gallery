import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/data/guides';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '이용 안내와 프롬프트 가이드',
  description: '프롬프트 구성 요소, 결과 검증 체크리스트, 이미지 프롬프트 기초, 변수 템플릿 사용법을 담은 안내 모음입니다.',
  alternates: { canonical: '/guides/' },
  openGraph: { url: '/guides/', title: `이용 안내와 프롬프트 가이드 | ${SITE_NAME}` },
};

export default function GuidesPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">이용 안내와 프롬프트 가이드</h1>
      <p className="mt-2 text-gray-600">사이트 사용법과 프롬프트를 잘 쓰기 위한 기본기를 정리했습니다. 궁금한 점은 <Link href="/contact/" className="text-brand-700 underline">문의</Link>로 보내 주세요.</p>
      <ul className="mt-6 space-y-5">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <h2 className="text-lg font-semibold"><Link href={`/guides/${g.slug}/`} className="text-brand-700 underline">{g.title}</Link></h2>
            <p className="mt-1 text-gray-700">{g.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

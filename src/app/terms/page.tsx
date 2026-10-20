import type { Metadata } from 'next';
import Link from 'next/link';
import { LAST_UPDATED, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '이용약관',
  description: `${SITE_NAME} 이용 조건, 콘텐츠 이용 범위, 면책 및 AI 결과물 사용상 유의사항을 안내합니다.`,
  alternates: { canonical: '/terms/' },
  openGraph: { url: '/terms/', title: `이용약관 | ${SITE_NAME}` },
};

export default function TermsPage() {
  return (
    <article className="space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900">이용약관</h1>
      <p className="text-sm text-gray-500">시행일: {LAST_UPDATED}</p>
      <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900" role="note">이 문서는 기본 양식입니다. 운영자는 실제 운영 방식에 맞게 갱신하고 필요하면 전문가의 검토를 받으세요.</p>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. 서비스 내용</h2>
        <p className="mt-2">{SITE_NAME}는 프롬프트 템플릿을 무료로 열람·복사할 수 있게 제공하는 정보 서비스입니다. 회원가입은 없습니다.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. 콘텐츠 이용</h2>
        <p className="mt-2">프롬프트 템플릿은 개인적·업무적 용도로 자유롭게 복사해 사용할 수 있습니다. 다만 사이트 전체를 그대로 복제해 재배포하거나 운영자의 것처럼 표시하는 행위는 허용되지 않습니다.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. AI 결과물과 면책</h2>
        <p className="mt-2">프롬프트로 생성된 결과물은 부정확하거나 부적절할 수 있으며 그 사용에 대한 책임은 사용자에게 있습니다. 생성 이미지·글의 권리와 상업적 이용 조건은 이용하는 AI 서비스의 약관을 따릅니다. 이 사이트는 어떠한 결과의 정확성도 보증하지 않습니다.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. 금지 행위</h2>
        <p className="mt-2">서비스의 정상 운영을 방해하는 행위, 타인의 권리를 침해하는 목적으로 프롬프트를 사용하는 행위를 금지합니다.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. 변경과 문의</h2>
        <p className="mt-2">약관은 필요 시 변경될 수 있으며 변경 시 이 페이지에 게시합니다. 문의는 <Link href="/contact/" className="text-brand-700 underline">문의 페이지</Link>를 이용해 주세요.</p>
      </section>
    </article>
  );
}

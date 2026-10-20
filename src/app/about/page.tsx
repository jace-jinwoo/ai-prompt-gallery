import type { Metadata } from 'next';
import Link from 'next/link';
import { PROMPTS } from '@/data/prompts';
import { LAST_UPDATED, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: `${SITE_NAME}의 목적, 콘텐츠 작성 원칙(오리지널 작성, 예시 출력 검증 여부 구분), 운영 방식을 소개합니다.`,
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/', title: `서비스 소개 | ${SITE_NAME}` },
};

export default function AboutPage() {
  return (
    <article className="space-y-6 text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900">서비스 소개</h1>
      <p>{SITE_NAME}는 ChatGPT, Claude, Midjourney에서 바로 써 볼 수 있는 프롬프트 템플릿을 모아 둔 무료 정적 웹사이트입니다. 현재 {PROMPTS.length}개의 프롬프트가 있으며, 변수 칸을 채워 내 상황에 맞는 문장으로 바꾼 뒤 복사해 사용할 수 있습니다.</p>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">콘텐츠 작성 원칙</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>모든 프롬프트는 이 사이트를 위해 직접 새로 작성했으며, 다른 사람의 프롬프트나 이미지를 복제하지 않습니다.</li>
          <li>예상 출력 형식은 구조를 보여 주는 예시이며, 실제 모델로 검증하지 않은 경우 &quot;예시 형식(검증되지 않음)&quot;으로 표시합니다.</li>
          <li>AI 결과의 사실 여부는 사용자가 직접 확인해야 합니다. 의료·법률·재무 판단의 근거로 쓰지 마세요.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">개인정보와 저장</h2>
        <p className="mt-2">입력한 변수 값은 브라우저 안에서만 처리되며 서버로 전송되지 않습니다. 즐겨찾기는 이 브라우저의 로컬 저장소에만 저장됩니다. 자세한 내용은 <Link href="/privacy/" className="text-brand-700 underline">개인정보처리방침</Link>을 참고하세요.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900">운영</h2>
        <p className="mt-2">최종 갱신일은 {LAST_UPDATED}입니다. 오류 제보나 제안은 <Link href="/contact/" className="text-brand-700 underline">문의</Link> 페이지를 이용해 주세요. 이 사이트는 OpenAI, Anthropic, Midjourney와 제휴 관계가 없으며 각 이름은 해당 소유자의 상표입니다.</p>
      </section>
      <p><Link href="/prompts/" className="text-brand-700 underline">프롬프트 라이브러리 보러 가기</Link></p>
    </article>
  );
}

import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

const NAV = [
  { href: '/', label: '홈' },
  { href: '/prompts/', label: '프롬프트' },
  { href: '/categories/', label: '카테고리' },
  { href: '/guides/', label: '가이드' },
  { href: '/favorites/', label: '즐겨찾기' },
];

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-brand-700">{SITE_NAME}</Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-gray-700 hover:text-brand-700">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600">
        <nav aria-label="사이트 정보">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            <li><Link href="/about/" className="hover:text-brand-700">서비스 소개</Link></li>
            <li><Link href="/guides/" className="hover:text-brand-700">이용 안내·가이드</Link></li>
            <li><Link href="/privacy/" className="hover:text-brand-700">개인정보처리방침</Link></li>
            <li><Link href="/terms/" className="hover:text-brand-700">이용약관</Link></li>
            <li><Link href="/contact/" className="hover:text-brand-700">문의</Link></li>
          </ul>
        </nav>
        <p className="mt-4 text-xs text-gray-500">
          © {SITE_NAME}. 모든 프롬프트는 직접 작성한 오리지널 템플릿이며, 예시 출력은 실제 모델로 검증되지 않은 형식 예시입니다. AI 결과는 사용 전에 사실 여부를 직접 확인하세요.
        </p>
      </div>
    </footer>
  );
}

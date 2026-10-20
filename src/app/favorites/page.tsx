import type { Metadata } from 'next';
import FavoritesView from '@/components/FavoritesView';
import { PROMPTS } from '@/data/prompts';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '즐겨찾기',
  description: '즐겨찾기한 프롬프트를 모아 봅니다. 목록은 로그인 없이 이 브라우저의 로컬 저장소에만 저장되며 서버로 전송되지 않습니다.',
  alternates: { canonical: '/favorites/' },
  openGraph: { url: '/favorites/', title: `즐겨찾기 | ${SITE_NAME}` },
};

export default function FavoritesPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">즐겨찾기</h1>
      <p className="mt-2 text-gray-600">이 브라우저에 저장된 즐겨찾기입니다. 브라우저 데이터를 지우거나 다른 기기에서 열면 보이지 않을 수 있습니다.</p>
      <div className="mt-6"><FavoritesView items={PROMPTS} /></div>
    </article>
  );
}

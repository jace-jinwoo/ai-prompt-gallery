'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import type { PromptItem } from '@/data/types';
import { pruneFavorites, readFavorites, writeFavorites } from '@/lib/favorites';

export default function FavoritesView({ items }: { items: PromptItem[] }) {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    setIds(pruneFavorites(readFavorites(), items.map((p) => p.slug)));
  }, [items]);

  if (ids === null) return <p className="text-gray-600" role="status">불러오는 중...</p>;
  if (ids.length === 0) {
    return (
      <p className="rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-700">
        아직 즐겨찾기한 프롬프트가 없습니다. <Link href="/prompts/" className="text-brand-700 underline">프롬프트 목록</Link>에서 마음에 드는 항목의 상세 페이지를 열어 추가해 보세요.
      </p>
    );
  }
  const byId = new Map(items.map((p) => [p.slug, p]));
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ids.map((id) => byId.get(id)).filter((p): p is PromptItem => Boolean(p)).map((p) => <PromptCard key={p.slug} p={p} />)}
      </ul>
      <button
        type="button"
        onClick={() => {
          writeFavorites([]);
          setIds([]);
        }}
        className="mt-4 rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        즐겨찾기 모두 지우기
      </button>
    </div>
  );
}

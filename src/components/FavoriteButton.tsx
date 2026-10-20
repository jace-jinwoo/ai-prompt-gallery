'use client';

import { useEffect, useState } from 'react';
import { readFavorites, toggleFavorite, writeFavorites } from '@/lib/favorites';

export default function FavoriteButton({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFav(readFavorites().includes(slug));
  }, [slug]);

  function onClick() {
    const next = toggleFavorite(readFavorites(), slug);
    const ok = writeFavorites(next);
    setError(!ok);
    if (ok) setFav(next.includes(slug));
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={fav}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium ${fav ? 'border-brand-600 bg-brand-600 text-white' : 'border-brand-600 text-brand-700 hover:bg-brand-50'}`}
      >
        {fav ? '★ 즐겨찾기 해제' : '☆ 즐겨찾기 추가'}
      </button>
      {error && <p role="alert" className="mt-1 text-xs text-red-700">이 브라우저에서는 저장할 수 없습니다(사생활 보호 모드 또는 저장소 차단).</p>}
    </div>
  );
}

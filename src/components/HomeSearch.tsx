'use client';

import { useState } from 'react';

export default function HomeSearch() {
  const [q, setQ] = useState('');
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const t = q.trim();
        window.location.href = t ? `/prompts/?q=${encodeURIComponent(t)}` : '/prompts/';
      }}
      className="flex gap-2"
    >
      <label htmlFor="home-q" className="sr-only">프롬프트 검색</label>
      <input id="home-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="무엇을 하고 싶으세요? 예: 회의록, 요약, 제품 사진" className="w-full rounded-md border border-gray-300 px-3 py-2" />
      <button type="submit" className="shrink-0 rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">검색</button>
    </form>
  );
}

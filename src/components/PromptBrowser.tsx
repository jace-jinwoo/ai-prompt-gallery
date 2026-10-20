'use client';

import { useEffect, useMemo, useState } from 'react';
import PromptCard from './PromptCard';
import { CATEGORY_LABELS, TOOL_LABELS, type CategoryId, type PromptItem, type ToolId } from '@/data/types';
import { filterPrompts, sortLatest } from '@/lib/prompt-search';

export default function PromptBrowser({ items }: { items: PromptItem[] }) {
  const [query, setQuery] = useState('');
  const [tool, setTool] = useState<ToolId | 'all'>('all');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const q = sp.get('q');
      const t = sp.get('tool');
      const c = sp.get('category');
      if (q) setQuery(q.slice(0, 100));
      if (t && t in TOOL_LABELS) setTool(t as ToolId);
      if (c && c in CATEGORY_LABELS) setCategory(c as CategoryId);
    } catch {
      // 쿼리 해석 실패는 무시
    }
  }, []);

  const result = useMemo(() => sortLatest(filterPrompts(items, { query, tool, category })), [items, query, tool, category]);
  const sel = 'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm';

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="q" className="text-sm font-medium text-gray-800">검색</label>
          <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="예: 이메일, 회의록, 포스터" className={sel} />
        </div>
        <div>
          <label htmlFor="tool" className="text-sm font-medium text-gray-800">도구</label>
          <select id="tool" value={tool} onChange={(e) => setTool(e.target.value as ToolId | 'all')} className={sel}>
            <option value="all">전체</option>
            {(Object.keys(TOOL_LABELS) as ToolId[]).map((k) => <option key={k} value={k}>{TOOL_LABELS[k]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cat" className="text-sm font-medium text-gray-800">카테고리</label>
          <select id="cat" value={category} onChange={(e) => setCategory(e.target.value as CategoryId | 'all')} className={sel}>
            <option value="all">전체</option>
            {(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((k) => <option key={k} value={k}>{CATEGORY_LABELS[k]}</option>)}
          </select>
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-600" role="status">{result.length}개 프롬프트</p>
      {result.length === 0 ? (
        <p className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-700">조건에 맞는 프롬프트가 없습니다. 검색어를 줄이거나 필터를 &quot;전체&quot;로 바꿔 보세요.</p>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">{result.map((p) => <PromptCard key={p.slug} p={p} />)}</ul>
      )}
    </div>
  );
}

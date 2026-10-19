import type { CategoryId, PromptItem, ToolId } from '@/data/types';

export interface PromptFilter {
  query: string;
  tool: ToolId | 'all';
  category: CategoryId | 'all';
}

/** 검색어 공백 기준 AND 매칭(제목·요약·목적·키워드·도구명). 대소문자 무시. */
export function filterPrompts(items: PromptItem[], f: PromptFilter): PromptItem[] {
  const terms = f.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((p) => {
    if (f.tool !== 'all' && p.tool !== f.tool) return false;
    if (f.category !== 'all' && p.category !== f.category) return false;
    if (terms.length === 0) return true;
    const hay = [p.title, p.summary, p.purpose, p.tool, ...p.keywords].join(' ').toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

/** 작성일 내림차순(같으면 제목순). 원본 불변. */
export function sortLatest(items: PromptItem[]): PromptItem[] {
  return [...items].sort((a, b) => (a.createdAt === b.createdAt ? a.title.localeCompare(b.title, 'ko') : a.createdAt < b.createdAt ? 1 : -1));
}

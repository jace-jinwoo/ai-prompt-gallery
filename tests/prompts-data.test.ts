import { describe, expect, it } from 'vitest';
import { PROMPTS } from '@/data/prompts';
import { CATEGORY_LABELS, TOOL_LABELS } from '@/data/types';
import { extractVariables, missingVariables } from '@/lib/prompt-vars';
import { filterPrompts, sortLatest } from '@/lib/prompt-search';

describe('프롬프트 데이터 무결성', () => {
  it('최소 15개, 슬러그 중복 없음', () => {
    expect(PROMPTS.length).toBeGreaterThanOrEqual(15);
    expect(new Set(PROMPTS.map((p) => p.slug)).size).toBe(PROMPTS.length);
  });
  it('도구 3종을 모두 포함하고 유효한 도구·카테고리만 사용', () => {
    expect(new Set(PROMPTS.map((p) => p.tool))).toEqual(new Set(['chatgpt', 'claude', 'midjourney']));
    for (const p of PROMPTS) {
      expect(p.tool in TOOL_LABELS).toBe(true);
      expect(p.category in CATEGORY_LABELS).toBe(true);
    }
  });
  it('본문 변수와 variables 정의가 일치하고 예시 입력이 모든 변수를 채운다', () => {
    for (const p of PROMPTS) {
      expect(extractVariables(p.body).sort(), p.slug).toEqual(p.variables.map((v) => v.key).sort());
      expect(missingVariables(p.body, p.exampleInput), p.slug).toEqual([]);
    }
  });
  it('필수 필드가 비어 있지 않고 날짜 형식이 맞다', () => {
    for (const p of PROMPTS) {
      expect(p.description.length, p.slug).toBeGreaterThan(30);
      expect(p.useCases.length, p.slug).toBeGreaterThanOrEqual(2);
      expect(p.outputFormat, p.slug).not.toBe('');
      expect(p.createdAt, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it('related 가 존재하는 슬러그를 가리키고 자기 자신이 아니다', () => {
    const slugs = new Set(PROMPTS.map((p) => p.slug));
    for (const p of PROMPTS) for (const r of p.related) {
      expect(slugs.has(r), `${p.slug} → ${r}`).toBe(true);
      expect(r).not.toBe(p.slug);
    }
  });
  it('설명 문장이 서로 중복되지 않는다', () => {
    expect(new Set(PROMPTS.map((p) => p.description)).size).toBe(PROMPTS.length);
  });
});

describe('검색·정렬', () => {
  it('AND 검색과 필터', () => {
    expect(filterPrompts(PROMPTS, { query: '미드저니 포스터', tool: 'all', category: 'all' }).map((p) => p.slug)).toEqual(['midjourney-poster-typography-free']);
    expect(filterPrompts(PROMPTS, { query: '', tool: 'claude', category: 'all' }).every((p) => p.tool === 'claude')).toBe(true);
    expect(filterPrompts(PROMPTS, { query: 'zzzz없음', tool: 'all', category: 'all' })).toEqual([]);
  });
  it('최신순 정렬은 원본을 바꾸지 않는다', () => {
    const first = PROMPTS[0].slug;
    const s = sortLatest(PROMPTS);
    expect(PROMPTS[0].slug).toBe(first);
    expect(s[0].createdAt >= s[s.length - 1].createdAt).toBe(true);
  });
});

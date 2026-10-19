import { describe, expect, it } from 'vitest';
import { extractVariables, fillTemplate, missingVariables } from '@/lib/prompt-vars';

describe('extractVariables', () => {
  it('등장 순서대로 중복 없이 추출한다', () => {
    expect(extractVariables('{{주제}}에 대해 {{분량}} 쓰고 다시 {{주제}}')).toEqual(['주제', '분량']);
  });
  it('공백이 있는 표기와 변수 없는 본문을 처리한다', () => {
    expect(extractVariables('{{ 대상 }}')).toEqual(['대상']);
    expect(extractVariables('변수 없음 {단일} {{}}')).toEqual([]);
  });
});

describe('fillTemplate', () => {
  it('값으로 치환한다', () => {
    expect(fillTemplate('{{a}}-{{b}}-{{a}}', { a: '1', b: '2' })).toBe('1-2-1');
  });
  it('값이 없으면 keep 모드는 원문 유지, blank 모드는 빈 문자열', () => {
    expect(fillTemplate('x {{a}} y', {})).toBe('x {{a}} y');
    expect(fillTemplate('x {{a}} y', { a: '  ' }, 'blank')).toBe('x  y');
  });
  it('값 안의 $ 패턴과 {{}} 는 다시 치환되지 않는다', () => {
    expect(fillTemplate('{{a}}', { a: '$& {{b}}', b: 'X' })).toBe('$& {{b}}');
  });
  it('prototype 키로 오염되지 않는다', () => {
    expect(fillTemplate('{{constructor}}', {})).toBe('{{constructor}}');
  });
  it('원본 본문을 변경하지 않는다', () => {
    const body = '{{a}}';
    fillTemplate(body, { a: 'z' });
    expect(body).toBe('{{a}}');
  });
});

describe('missingVariables', () => {
  it('빈 값만 반환한다', () => {
    expect(missingVariables('{{a}} {{b}} {{c}}', { a: 'x', b: ' ' })).toEqual(['b', 'c']);
  });
});

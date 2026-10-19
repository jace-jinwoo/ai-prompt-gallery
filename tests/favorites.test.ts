import { describe, expect, it } from 'vitest';
import { parseFavorites, pruneFavorites, serializeFavorites, toggleFavorite } from '@/lib/favorites';

describe('favorites', () => {
  it('잘못된 저장값은 빈 배열', () => {
    expect(parseFavorites(null)).toEqual([]);
    expect(parseFavorites('not json')).toEqual([]);
    expect(parseFavorites('{"a":1}')).toEqual([]);
  });
  it('문자열만 남기고 중복을 제거한다', () => {
    expect(parseFavorites('["a",1,"a","","b",null]')).toEqual(['a', 'b']);
  });
  it('toggle 은 추가/제거하며 원본을 바꾸지 않는다', () => {
    const base = ['a'];
    expect(toggleFavorite(base, 'b')).toEqual(['b', 'a']);
    expect(toggleFavorite(base, 'a')).toEqual([]);
    expect(base).toEqual(['a']);
  });
  it('직렬화 왕복', () => {
    expect(parseFavorites(serializeFavorites(['x', 'y']))).toEqual(['x', 'y']);
  });
  it('prune 은 존재하는 슬러그만 남긴다', () => {
    expect(pruneFavorites(['a', 'gone', 'b'], ['a', 'b'])).toEqual(['a', 'b']);
  });
});

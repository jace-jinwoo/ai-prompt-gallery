/** 즐겨찾기: 순수 함수 + localStorage 래퍼(모든 접근 try/catch). */
export const FAVORITES_KEY = 'ai-prompt-gallery:favorites:v1';

/** 저장된 문자열을 안전하게 해석합니다. 잘못된 값이면 빈 배열. */
export function parseFavorites(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const out: string[] = [];
    for (const x of data) if (typeof x === 'string' && x !== '' && !out.includes(x)) out.push(x);
    return out;
  } catch {
    return [];
  }
}

export function serializeFavorites(list: string[]): string {
  return JSON.stringify(list);
}

/** 있으면 제거, 없으면 맨 앞에 추가한 새 배열을 반환합니다(원본 불변). */
export function toggleFavorite(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [id, ...list];
}

/** 존재하는 슬러그만 남깁니다(삭제된 프롬프트 정리). */
export function pruneFavorites(list: string[], validIds: Iterable<string>): string[] {
  const valid = new Set(validIds);
  return list.filter((x) => valid.has(x));
}

export function readFavorites(): string[] {
  try {
    return parseFavorites(window.localStorage.getItem(FAVORITES_KEY));
  } catch {
    return [];
  }
}

/** 저장에 성공하면 true. 사생활 보호 모드 등에서 실패하면 false. */
export function writeFavorites(list: string[]): boolean {
  try {
    window.localStorage.setItem(FAVORITES_KEY, serializeFavorites(list));
    return true;
  } catch {
    return false;
  }
}

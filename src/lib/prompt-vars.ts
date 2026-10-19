/**
 * 프롬프트 변수 치환 (순수 함수).
 * 변수 표기: {{변수명}} (앞뒤 공백 허용). 변수명에는 중괄호를 쓸 수 없습니다.
 */
const VAR_RE = /\{\{\s*([^{}\s][^{}]*?)\s*\}\}/g;

/** 본문에 등장하는 변수명을 처음 등장한 순서대로, 중복 없이 반환합니다. */
export function extractVariables(body: string): string[] {
  const seen = new Set<string>();
  for (const m of body.matchAll(VAR_RE)) seen.add(m[1]);
  return [...seen];
}

export type MissingMode = 'keep' | 'blank';

/**
 * 값으로 변수를 치환합니다. 한 번만 훑으므로 값 안에 {{...}} 가 있어도 다시 치환되지 않고,
 * `$&` 같은 특수 패턴도 문자 그대로 들어갑니다.
 * - 값이 없거나 공백뿐이면 missing 모드에 따라 {{변수}} 를 그대로 두거나('keep') 빈 문자열로 바꿉니다('blank').
 */
export function fillTemplate(body: string, values: Record<string, string>, missing: MissingMode = 'keep'): string {
  return body.replace(VAR_RE, (whole, key: string) => {
    const v = Object.prototype.hasOwnProperty.call(values, key) ? values[key] : undefined;
    if (v === undefined || v.trim() === '') return missing === 'keep' ? whole : '';
    return v;
  });
}

/** 값이 비어 있는 변수명 목록(본문 등장 순서). */
export function missingVariables(body: string, values: Record<string, string>): string[] {
  return extractVariables(body).filter((k) => {
    const v = Object.prototype.hasOwnProperty.call(values, k) ? values[k] : undefined;
    return v === undefined || v.trim() === '';
  });
}

export type ToolId = 'chatgpt' | 'claude' | 'midjourney';
export type CategoryId = 'writing' | 'work' | 'study' | 'code' | 'marketing' | 'image';

export const TOOL_LABELS: Record<ToolId, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  midjourney: 'Midjourney',
};

export const TOOL_NOTES: Record<ToolId, string> = {
  chatgpt: '대화형 텍스트 모델. 역할·맥락·출력 형식을 구분해 적을수록 결과를 다듬기 쉽습니다.',
  claude: '긴 문서 분석과 구조화에 자주 쓰입니다. <태그>로 입력 구간을 나누는 방식을 활용했습니다.',
  midjourney: '이미지 생성 도구. 영어 묘사 + 파라미터 형태이며, 파라미터 문법은 공식 문서에서 확인하세요.',
};

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  writing: '글쓰기·편집',
  work: '업무 생산성',
  study: '학습·리서치',
  code: '코딩·데이터',
  marketing: '마케팅·콘텐츠',
  image: '이미지 생성',
};

export const CATEGORY_DESCRIPTIONS: Record<CategoryId, string> = {
  writing: '초안 다듬기, 톤 변경, 요약처럼 글을 쓰고 고치는 작업에 쓰는 프롬프트입니다.',
  work: '회의록, 일정, 보고, 의사결정 정리 등 직장 업무를 빠르게 구조화하는 프롬프트입니다.',
  study: '개념 학습, 자료 읽기, 시험 준비를 돕는 프롬프트입니다. 사실 확인은 반드시 직접 하세요.',
  code: '코드 리뷰, 오류 분석, 데이터 정리 같은 개발 작업용 프롬프트입니다.',
  marketing: '상품 소개, 광고 문안, 콘텐츠 기획에 쓰는 프롬프트입니다.',
  image: 'Midjourney 같은 이미지 생성 도구에 넣을 장면 묘사 프롬프트입니다.',
};

export interface PromptVariable {
  /** 본문의 {{key}} 와 정확히 일치해야 합니다. */
  key: string;
  label: string;
  placeholder: string;
  /** 입력 칸 한 줄이면 false, 긴 텍스트면 true */
  multiline?: boolean;
}

export interface PromptItem {
  slug: string;
  title: string;
  tool: ToolId;
  category: CategoryId;
  /** 목적(한 문장) */
  purpose: string;
  /** 카드용 짧은 요약 */
  summary: string;
  /** 이 프롬프트만의 상세 설명 */
  description: string;
  /** 활용 사례 */
  useCases: string[];
  variables: PromptVariable[];
  /** 본문. 변수는 {{key}} 형식 */
  body: string;
  /** 예시 입력(변수 key → 값) */
  exampleInput: Record<string, string>;
  /** 예상 출력 형식 설명 */
  outputFormat: string;
  /** 예상 출력 형식의 골격 예시. 실제 모델로 검증하지 않은 형식 예시입니다. */
  exampleOutputShape: string;
  tips: string[];
  caveats?: string[];
  keywords: string[];
  /** 작성일 (YYYY-MM-DD) */
  createdAt: string;
  popular?: boolean;
  related: string[];
}

export interface SourceRef {
  label: string;
  url: string;
  /** 확인 수준 */
  status: string;
}

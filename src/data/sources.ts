import type { SourceRef } from './types';

/** 이번 작업에서 실제로 열람해 확인한 범위를 status 에 구분해 기록합니다(확인일 2026-10-19). */
export const SOURCES: SourceRef[] = [
  { label: 'Midjourney 공식 문서', url: 'https://docs.midjourney.com/', status: '접속 확인(첫 화면 "Learn about Midjourney"). 파라미터 세부 문법은 본문 미검증' },
  { label: 'OpenAI 프롬프트 엔지니어링 가이드', url: 'https://developers.openai.com/api/docs/guides/prompt-engineering', status: '이전 주소가 이 주소로 이동하는 응답만 확인. 본문 미열람' },
  { label: 'Anthropic(Claude) 프롬프트 엔지니어링 개요', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', status: '이전 주소가 이 주소로 이동하는 응답만 확인. 본문 미열람' },
];

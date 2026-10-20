# AI 프롬프트 갤러리 (ai-prompt-gallery)

ChatGPT, Claude, Midjourney용 오리지널 프롬프트 템플릿을 검색·필터하고, 변수를 채워 복사하고, 즐겨찾기로 모아 보는 한국어 정적 웹사이트입니다.
Next.js(App Router) + TypeScript + Tailwind CSS 3, `output: 'export'` 정적 배포(Netlify)를 전제로 합니다. 서버 API·DB·로그인은 없습니다.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 검색, 도구·카테고리 탐색, 인기·최신 프롬프트, 안내 콘텐츠 |
| `/prompts/` | 라이브러리: 검색 + 도구/카테고리 필터 (`?q=` `?tool=` `?category=` 쿼리 지원) |
| `/prompts/[slug]/` | 상세: 변수 입력, 실시간 미리보기, 복사, 즐겨찾기, 설명, 활용 사례, 예시 입력, 예상 출력 형식, FAQ, 공식 출처, 관련 프롬프트 |
| `/categories/` | 6개 카테고리 설명과 목록 |
| `/guides/` `/guides/[slug]/` | 이용 안내·프롬프트 가이드 4편 |
| `/favorites/` | 즐겨찾기 (localStorage) |
| `/about/` `/privacy/` `/terms/` `/contact/` | 소개·정책·문의 |
| `/sitemap.xml` `/robots.txt` `/icon.svg` | 빌드 시 생성 (`dynamic = 'force-static'`) |

## 데이터와 스키마

- 프롬프트: `src/data/prompts.ts` (타입: `src/data/types.ts`의 `PromptItem`). 모델(tool), 카테고리, 목적, 변수, 본문, 예시 입력, 예상 출력 형식, 작성일을 필드로 갖습니다. 별도 MDX/JSON 파서 없이 타입이 검사되는 TS 데이터 모듈을 사용했습니다.
- 변수는 본문에 `{{key}}` 형식으로 쓰고 `variables`에 같은 key를 정의합니다(테스트가 일치 여부를 검사).
- 가이드: `src/data/guides.ts`, 공식 출처 링크: `src/data/sources.ts`.
- 정적 경로: `prompts/[slug]`, `guides/[slug]`는 `generateStaticParams` + `dynamicParams = false`.

### 데이터 갱신 절차
1. `src/data/prompts.ts`에 항목 추가(슬러그는 영문 소문자·하이픈, 고유해야 함).
2. `npm test`로 무결성(변수 일치, 중복 슬러그, related 링크) 확인 → `npm run build` → `npm run verify`.
3. 슬러그는 `scripts/verify-static.mjs`가 데이터 파일에서 직접 읽으므로 스크립트를 수정할 필요가 없습니다.

## 콘텐츠 정책과 검증 상태

- 모든 프롬프트는 이 프로젝트를 위해 새로 작성한 오리지널 텍스트입니다(총 16개: ChatGPT 6, Claude 5, Midjourney 5). 타인의 프롬프트·이미지·특정 작가 스타일 지명을 포함하지 않습니다.
- **예상 출력 형식은 실제 모델로 검증하지 않은 형식 예시**이며 화면에 "예시 형식(검증되지 않음)"으로 표시됩니다. Midjourney 항목은 이미지 결과라 텍스트 예시를 두지 않았고, `--ar` 등 파라미터가 현재 버전에서 동작하는지도 검증하지 않았습니다.
- 공식 출처(2026-10-19 확인 상태): Midjourney 문서는 첫 화면 접속만 확인. OpenAI·Anthropic 문서는 이전 주소가 현재 주소로 이동한다는 응답만 확인했고 **본문은 열람하지 못했습니다**(화면에도 확인 상태를 표시).
- 도구별 기능·요금·정책 같은 외부 사실 수치는 사이트에 넣지 않았습니다.

## 즐겨찾기·입력값

즐겨찾기는 슬러그 목록만 `localStorage`(`ai-prompt-gallery:favorites:v1`)에 저장하며 모든 접근이 try/catch로 감싸져 있습니다. 저장이 막히면 화면에 안내를 표시합니다. 변수 입력값은 저장하지 않습니다.

## 로컬 실행

```bash
npm install
npm run dev        # 개발 서버
npm test           # 단위 테스트(vitest)
npm run typecheck
npm run build      # 정적 빌드 → out/
npm run verify     # out/ 검증: 필수 페이지(데이터 기반), 메타데이터, 내부 링크, sitemap, 광고 코드 미노출
```

## 환경변수

`.env.example` 참고. `NEXT_PUBLIC_*`는 빌드 시점에 인라인되므로 변경 후 재배포가 필요합니다.
광고(`AdSlot`)는 `NEXT_PUBLIC_ADSENSE_ENABLED=true`와 클라이언트·슬롯 ID가 모두 있을 때만 렌더링되며, 승인 전에는 `false`로 두세요.

## GitHub 연결 / Netlify 배포

1. GitHub(Private) 저장소에 push.
2. Netlify → Import an existing project → 저장소 선택. `netlify.toml`이 Build `npm run build`, Publish `out`을 지정합니다.
3. 환경변수(`NEXT_PUBLIC_SITE_URL` 등) 등록 후 배포. 배포 도메인이 정해지면 `NEXT_PUBLIC_SITE_URL`을 설정해야 canonical·sitemap이 올바릅니다.

## 검증 상태(솔직한 기록)

이 작업 환경은 npm 레지스트리 접속이 차단되어 `npm install`, `npm test`, `npm run build`, `npm run verify`를 **실행하지 못했습니다.** 코드는 직접 재검토(타입·import·링크)했으며, 첫 배포 전에 위 명령을 한 번 실행해 확인하세요.

## 알려진 한계

- 프롬프트는 16개로 시작했으며 실제 모델 출력 검증은 되어 있지 않습니다.
- 검색은 제목·요약·목적·키워드 기반의 단순 부분 일치입니다.

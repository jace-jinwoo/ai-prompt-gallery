import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import PromptCard from '@/components/PromptCard';
import PromptWorkbench from '@/components/PromptWorkbench';
import { PROMPTS, getPrompt } from '@/data/prompts';
import { SOURCES } from '@/data/sources';
import { CATEGORY_LABELS, TOOL_LABELS, type PromptItem } from '@/data/types';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMPTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrompt(slug);
  if (!p) return {};
  const path = `/prompts/${p.slug}/`;
  return {
    title: `${p.title} - ${TOOL_LABELS[p.tool]} 프롬프트`,
    description: `${p.purpose} ${p.summary}`,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${p.title} | ${SITE_NAME}`, description: p.summary },
  };
}

function faqOf(p: PromptItem) {
  const list = [
    { q: '이 프롬프트는 어떻게 쓰나요?', a: `변수 입력 칸(${p.variables.map((v) => v.label).join(', ')})을 채우면 아래 미리보기가 바뀝니다. 복사 버튼으로 복사해 ${TOOL_LABELS[p.tool]}에 붙여 넣으세요.` },
    { q: '예상 출력 형식은 실제 결과인가요?', a: '아니요. 실제 모델로 검증하지 않은 형식 예시이며, 모델 버전과 입력에 따라 결과는 달라질 수 있습니다.' },
  ];
  if (p.caveats?.length) list.push({ q: '사용할 때 주의할 점이 있나요?', a: p.caveats.join(' ') });
  return list;
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  const p = getPrompt(slug)!;
  const faq = faqOf(p);
  const related = p.related.map((s) => getPrompt(s)).filter((x): x is PromptItem => Boolean(x));
  const path = `/prompts/${p.slug}/`;
  const officialSources = SOURCES.filter((s) => (p.tool === 'chatgpt' ? s.label.includes('OpenAI') : p.tool === 'claude' ? s.label.includes('Anthropic') : s.label.includes('Midjourney')));

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'CreativeWork', name: p.title, description: p.description, url: absoluteUrl(path), inLanguage: 'ko-KR', datePublished: p.createdAt, keywords: p.keywords.join(', ') },
            { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
            { '@type': 'BreadcrumbList', itemListElement: [
              { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: '프롬프트', item: absoluteUrl('/prompts/') },
              { '@type': 'ListItem', position: 3, name: p.title, item: absoluteUrl(path) },
            ] },
          ],
        }}
      />
      <nav aria-label="현재 위치" className="text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-700">홈</Link> <span aria-hidden="true">/</span>{' '}
        <Link href="/prompts/" className="hover:text-brand-700">프롬프트</Link> <span aria-hidden="true">/</span> {p.title}
      </nav>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{p.title}</h1>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        <Link href={`/prompts/?tool=${p.tool}`} className="rounded bg-brand-600 px-2 py-0.5 font-medium text-white">{TOOL_LABELS[p.tool]}</Link>
        <Link href={`/prompts/?category=${p.category}`} className="rounded bg-brand-100 px-2 py-0.5 text-brand-900">{CATEGORY_LABELS[p.category]}</Link>
        <span className="text-gray-500">작성일 {p.createdAt}</span>
      </p>
      <p className="mt-3 text-gray-700"><span className="font-medium">목적:</span> {p.purpose}</p>

      <section aria-labelledby="work-h" className="mt-6">
        <h2 id="work-h" className="sr-only">프롬프트 만들기</h2>
        <PromptWorkbench p={p} />
      </section>

      <AdSlot placement="prompt" />

      <section aria-labelledby="desc-h" className="mt-10">
        <h2 id="desc-h" className="text-xl font-semibold text-gray-900">상세 설명</h2>
        <p className="mt-3 text-gray-700">{p.description}</p>
        {p.tips.length > 0 && (
          <>
            <h3 className="mt-4 font-semibold text-gray-900">사용 팁</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">{p.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          </>
        )}
      </section>

      <section aria-labelledby="use-h" className="mt-10">
        <h2 id="use-h" className="text-xl font-semibold text-gray-900">활용 사례</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">{p.useCases.map((u) => <li key={u}>{u}</li>)}</ul>
      </section>

      <section aria-labelledby="ex-h" className="mt-10">
        <h2 id="ex-h" className="text-xl font-semibold text-gray-900">예시 입력과 예상 출력 형식</h2>
        <h3 className="mt-3 font-semibold text-gray-900">예시 입력</h3>
        <dl className="mt-2 space-y-2 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-gray-800">
          {p.variables.map((v) => (
            <div key={v.key}>
              <dt className="font-medium">{v.label}</dt>
              <dd className="whitespace-pre-wrap">{p.exampleInput[v.key]}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-4 font-semibold text-gray-900">예상 출력 형식</h3>
        <p className="mt-1 text-gray-700">{p.outputFormat}</p>
        <p className="mt-3 inline-block rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900">예시 형식(검증되지 않음)</p>
        <pre className="mt-1 whitespace-pre-wrap break-words rounded-md bg-gray-50 p-3 text-sm text-gray-800">{p.exampleOutputShape}</pre>
        <p className="mt-1 text-xs text-gray-500">위 내용은 출력의 골격을 보여 주기 위한 예시이며 실제 모델에서 생성해 검증한 결과가 아닙니다.</p>
      </section>

      <section aria-labelledby="faq-h" className="mt-10">
        <h2 id="faq-h" className="text-xl font-semibold text-gray-900">자주 묻는 질문</h2>
        <dl className="mt-3 space-y-4">
          {faq.map((f) => (
            <div key={f.q}><dt className="font-medium text-gray-900">Q. {f.q}</dt><dd className="mt-1 text-gray-700">A. {f.a}</dd></div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="src-h" className="mt-10">
        <h2 id="src-h" className="text-xl font-semibold text-gray-900">공식 출처</h2>
        <p className="mt-2 text-sm text-gray-600">이 프롬프트의 문구는 직접 작성했습니다. 도구 사용법과 최신 기능은 아래 공식 문서에서 확인하세요.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
          {officialSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline hover:text-brand-900">{s.label}</a>
              <span className="block text-xs text-gray-500">확인 상태: {s.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot placement="content" />

      {related.length > 0 && (
        <section aria-labelledby="rel-h" className="mt-10">
          <h2 id="rel-h" className="text-xl font-semibold text-gray-900">관련 프롬프트</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">{related.map((r) => <PromptCard key={r.slug} p={r} />)}</ul>
        </section>
      )}
    </article>
  );
}

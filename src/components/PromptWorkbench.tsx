'use client';

import { useMemo, useState } from 'react';
import CopyButton from './CopyButton';
import FavoriteButton from './FavoriteButton';
import type { PromptItem } from '@/data/types';
import { fillTemplate, missingVariables } from '@/lib/prompt-vars';

export default function PromptWorkbench({ p }: { p: PromptItem }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const filled = useMemo(() => fillTemplate(p.body, values), [p.body, values]);
  const missing = useMemo(() => missingVariables(p.body, values), [p.body, values]);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">변수 입력</h3>
        <FavoriteButton slug={p.slug} />
      </div>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {p.variables.map((v) => {
          const id = `var-${v.key}`;
          const common = {
            id,
            value: values[v.key] ?? '',
            placeholder: v.placeholder,
            onChange: (e: { target: { value: string } }) => setValues((s) => ({ ...s, [v.key]: e.target.value })),
            className: 'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600',
          };
          return (
            <div key={v.key} className={v.multiline ? 'sm:col-span-2' : ''}>
              <label htmlFor={id} className="text-sm font-medium text-gray-800">{v.label}</label>
              {v.multiline ? <textarea rows={4} {...common} /> : <input type="text" {...common} />}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setValues({ ...p.exampleInput })} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">예시 입력 채우기</button>
        <button type="button" onClick={() => setValues({})} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">초기화</button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">완성된 프롬프트</h3>
        <CopyButton text={filled} label="프롬프트 복사" />
      </div>
      <pre aria-label="완성된 프롬프트 미리보기" className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-md bg-gray-50 p-3 text-sm text-gray-900">{filled}</pre>
      <p className="mt-2 text-sm text-gray-600" role="status">
        {missing.length === 0 ? '모든 변수가 채워졌습니다.' : `비어 있는 변수 ${missing.length}개: ${missing.join(', ')} (복사하면 {{변수}} 표기가 그대로 포함됩니다)`}
      </p>
    </div>
  );
}

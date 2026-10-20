import Link from 'next/link';
import { CATEGORY_LABELS, TOOL_LABELS, type PromptItem } from '@/data/types';

export default function PromptCard({ p }: { p: PromptItem }) {
  return (
    <li>
      <Link href={`/prompts/${p.slug}/`} className="block h-full rounded-lg border border-gray-200 p-4 hover:border-brand-600 hover:bg-brand-50">
        <span className="flex flex-wrap gap-2 text-xs">
          <span className="rounded bg-brand-600 px-2 py-0.5 font-medium text-white">{TOOL_LABELS[p.tool]}</span>
          <span className="rounded bg-brand-100 px-2 py-0.5 text-brand-900">{CATEGORY_LABELS[p.category]}</span>
        </span>
        <span className="mt-2 block font-semibold text-gray-900">{p.title}</span>
        <span className="mt-1 block text-sm text-gray-600">{p.summary}</span>
      </Link>
    </li>
  );
}

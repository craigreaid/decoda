import Link from "next/link";
import type { StorySummary } from "@/data/stories";

export default function StoryCard({ story }: { story: StorySummary }) {
  return (
    <Link
      href={`/stories/${story.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span aria-hidden className="text-4xl">
          {story.cover}
        </span>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Phase {story.phase}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {story.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{story.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {story.focusSounds.map((sound) => (
          <span
            key={sound}
            className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600"
          >
            {sound}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        {story.pageCount} pages · {story.wordCount} words · {story.level}
      </p>
    </Link>
  );
}

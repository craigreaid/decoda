"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Story } from "@/data/stories";

function highlight(line: string, sounds: string[]) {
  if (sounds.length === 0) return line;
  const escaped = sounds
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = line.split(regex);
  return parts.map((part, i) =>
    sounds.some((s) => s.toLowerCase() === part.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded bg-amber-200 px-0.5 text-slate-900"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function Reader({ story }: { story: Story }) {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );

  const lastPage = story.pages.length - 1;
  const isLast = page === lastPage;
  const progressPct = useMemo(
    () => Math.round(((page + 1) / story.pages.length) * 100),
    [page, story.pages.length],
  );

  async function markRead() {
    setStatus("saving");
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: story.id }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <Link
        href="/"
        className="text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to library
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Phase {story.phase}
        </span>
        {story.focusSounds.map((sound) => (
          <span
            key={sound}
            className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs text-amber-800"
          >
            {sound}
          </span>
        ))}
      </div>

      <h1 className="mt-3 flex items-center gap-3 text-3xl font-extrabold text-slate-900">
        <span aria-hidden className="text-4xl">
          {story.cover}
        </span>
        {story.title}
      </h1>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <article
        data-testid="reader-page"
        className="mt-6 min-h-[220px] rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Page {page + 1} of {story.pages.length}
        </p>
        <div className="space-y-4 font-reader text-2xl leading-relaxed text-slate-800">
          {story.pages[page].lines.map((line, i) => (
            <p key={i}>{highlight(line, story.focusSounds)}</p>
          ))}
        </div>
      </article>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={markRead}
            disabled={status === "saving" || status === "done"}
            data-testid="mark-read"
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-brand-700 disabled:opacity-60"
          >
            {status === "done"
              ? "✓ Marked as read"
              : status === "saving"
                ? "Saving…"
                : status === "error"
                  ? "Try again"
                  : "Mark as read"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Next
          </button>
        )}
      </div>

      {status === "done" && (
        <p
          data-testid="read-confirmation"
          className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          Nice reading! This story is saved to your progress.{" "}
          <Link href="/" className="underline">
            Back to library
          </Link>
        </p>
      )}
    </div>
  );
}

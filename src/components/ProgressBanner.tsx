"use client";

import { useEffect, useState } from "react";

interface Progress {
  total: number;
  completedCount: number;
  completedStoryIds: string[];
  percentComplete: number;
}

export default function ProgressBanner() {
  const [progress, setProgress] = useState<Progress | null>(null);

  async function refresh() {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.ok) setProgress(await res.json());
    } catch {
      /* ignore transient errors */
    }
  }

  useEffect(() => {
    refresh();
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (!progress) return null;

  return (
    <section
      aria-label="Reading progress"
      className="mb-8 rounded-2xl border border-brand-100 bg-brand-50 p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-800">Reading progress</p>
        <p
          data-testid="progress-count"
          className="text-sm font-medium text-brand-700"
        >
          {progress.completedCount} of {progress.total} stories read
        </p>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${progress.percentComplete}%` }}
        />
      </div>
    </section>
  );
}

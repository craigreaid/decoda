"use client";

import { useBrand } from "@/components/brand/BrandThemeProvider";
import { AppHeader, HeaderLink } from "@/components/chrome/AppHeader";
import { StoryCard } from "@/components/library/StoryCard";
import { Disclaimer } from "@/components/reader/Disclaimer";
import { cn } from "@/lib/cn";
import { getLevelsForStories } from "@/lib/stories";
import type { Story } from "@/lib/stories/types";
import { useMemo, useState } from "react";

export function LibraryView({ stories }: { stories: Story[] }) {
  const { brand } = useBrand();
  const levels = getLevelsForStories(stories);
  const [level, setLevel] = useState<number | "all">("all");

  const visible = useMemo(() => {
    if (level === "all") return stories;
    return stories.filter((story) => story.level === level);
  }, [level, stories]);

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <AppHeader trailing={<HeaderLink href="/">Home</HeaderLink>} />

      <main className="mx-auto w-full max-w-reader px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {brand.copy.libraryTitle}
        </h1>
        <p className="mt-3 text-base leading-reading tracking-reading text-text-primary">
          {brand.copy.libraryLead}
        </p>

        {stories.length > 0 ? (
          <>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by level">
              <FilterChip
                label="All levels"
                selected={level === "all"}
                onClick={() => setLevel("all")}
              />
              {levels.map((value) => (
                <FilterChip
                  key={value}
                  label={`Level ${value}`}
                  selected={level === value}
                  onClick={() => setLevel(value)}
                />
              ))}
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {visible.map((story) => (
                <li key={story.slug}>
                  <StoryCard story={story} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
            <p className="font-display text-lg font-semibold text-text-primary">
              {brand.copy.comingSoonNote ?? "More stories are coming."}
            </p>
            <p className="mt-2 text-base leading-reading tracking-reading text-text-primary">
              The reader is ready. Short pages will appear here when the first
              story pack is prepared.
            </p>
          </div>
        )}

        {brand.copy.showLiteracyDisclaimer ? (
          <div className="mt-10 border-t border-line pt-4">
            <Disclaimer />
          </div>
        ) : null}
      </main>
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-tap rounded-full px-4 text-sm font-semibold",
        selected
          ? "bg-accent text-[var(--on-accent)]"
          : "border border-line bg-paper text-text-primary",
      )}
    >
      {label}
    </button>
  );
}

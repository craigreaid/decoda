"use client";

import { PhysicalBooksTeaser } from "@/components/books/PhysicalBooksTeaser";
import { BrandLink } from "@/components/brand/BrandLink";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { StoryCard } from "@/components/library/StoryCard";
import { Disclaimer } from "@/components/reader/Disclaimer";
import { BrandMark } from "@/components/ui/BrandMark";
import { isFaithBrand } from "@/lib/brand/types";
import { cn } from "@/lib/cn";
import { withBrandQuery } from "@/lib/href";
import { getLevelsForStories } from "@/lib/stories";
import type { Story } from "@/lib/stories/types";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function LibraryView({ stories }: { stories: Story[] }) {
  const { brand } = useBrand();
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get("brand");
  const levels = getLevelsForStories(stories);
  const [level, setLevel] = useState<number | "all">("all");

  const visible = useMemo(() => {
    if (level === "all") return stories;
    return stories.filter((story) => story.level === level);
  }, [level, stories]);

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <header className="flex h-14 items-center justify-between border-b border-line bg-chrome px-4">
        <BrandMark name={brand.displayName} href={withBrandQuery("/", brandQuery)} compact />
        <BrandLink
          href="/"
          className="inline-flex min-h-tap items-center text-sm font-semibold text-accent no-underline"
        >
          Home
        </BrandLink>
      </header>

      <main className="mx-auto w-full max-w-reader px-4 py-8">
        <h1 className="font-chrome text-3xl font-semibold tracking-tight">
          {brand.copy.libraryTitle}
        </h1>
        <p className="font-chrome mt-3 text-base leading-relaxed text-text-primary">
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
          <div className="mt-8 rounded-2xl border border-line bg-chrome p-5">
            <p className="font-chrome text-lg font-semibold text-text-primary">
              {brand.copy.comingSoonNote ?? "More stories are coming."}
            </p>
            <p className="font-chrome mt-2 text-base leading-relaxed text-text-primary">
              This brand is wired for the same reader. Story packs can be added
              under <span className="font-semibold">content/{brand.id}</span>.
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-line pt-4">
          {isFaithBrand(brand.id) ? <Disclaimer /> : null}
          <PhysicalBooksTeaser className={isFaithBrand(brand.id) ? "mt-3" : undefined} />
        </div>
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
          : "border border-line bg-chrome text-text-primary",
      )}
    >
      {label}
    </button>
  );
}

"use client";

import { cn } from "@/lib/cn";

export function PageNav({
  page,
  pageCount,
  onBack,
  onNext,
  onSelect,
  nextLabel,
}: {
  page: number;
  pageCount: number;
  onBack: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
  nextLabel: string;
}) {
  const atStart = page <= 1;

  return (
    <nav aria-label="Story pages" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={atStart}
          className={cn(
            "inline-flex min-h-tap min-w-[48px] items-center justify-center rounded-full px-4 text-sm font-semibold",
            "border border-line bg-paper text-text-primary",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          Back
        </button>
        <p className="font-chrome text-sm text-muted" aria-hidden="true">
          {page} of {pageCount}
        </p>
        <button
          type="button"
          onClick={onNext}
          className={cn(
            "inline-flex min-h-tap min-w-[48px] items-center justify-center rounded-full px-4 text-sm font-semibold",
            "bg-accent text-[var(--on-accent)]",
          )}
        >
          {nextLabel}
        </button>
      </div>
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => {
          const pageNumber = index + 1;
          const current = pageNumber === page;
          return (
            <li key={pageNumber}>
              <button
                type="button"
                aria-label={`Page ${pageNumber}`}
                aria-current={current ? "page" : undefined}
                onClick={() => onSelect(pageNumber)}
                className={cn(
                  "grid min-h-tap min-w-tap place-items-center rounded-full",
                )}
              >
                <span
                  className={cn(
                    "block h-3 w-3 rounded-full",
                    current ? "bg-accent" : "bg-line",
                  )}
                />
                <span className="sr-only">Page {pageNumber}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

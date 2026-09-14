"use client";

import { PhysicalBooksTeaser } from "@/components/books/PhysicalBooksTeaser";
import { BrandLink } from "@/components/brand/BrandLink";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { BooksHubHome } from "@/components/home/BooksHubHome";
import { Disclaimer } from "@/components/reader/Disclaimer";
import { BrandMark } from "@/components/ui/BrandMark";
import { getBrandConfig } from "@/lib/brand/config";
import { FAITH_BRAND_IDS, isHubBrand } from "@/lib/brand/types";
import { cn } from "@/lib/cn";
import Link from "next/link";

export function HomeView() {
  const { brand } = useBrand();

  if (isHubBrand(brand.id)) {
    return <BooksHubHome brand={brand} />;
  }

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <header className="flex h-14 items-center border-b border-line bg-chrome px-4">
        <BrandMark name={brand.displayName} compact />
      </header>

      <main className="mx-auto w-full max-w-reader px-4 py-10">
        <p className="font-chrome text-sm font-semibold text-accent">
          {brand.copy.tagline}
        </p>
        <h1 className="font-chrome mt-3 text-4xl font-semibold leading-tight tracking-tight">
          {brand.copy.homeHeadline}
        </h1>
        <p className="font-chrome mt-5 text-lg leading-relaxed text-text-primary">
          {brand.copy.homeLead}
        </p>

        <BrandLink
          href="/library"
          className="mt-8 inline-flex min-h-tap items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-[var(--on-accent)] no-underline"
        >
          Open the library
        </BrandLink>

        {brand.copy.comingSoon ? (
          <p className="font-chrome mt-6 rounded-2xl border border-line bg-chrome px-4 py-3 text-base text-text-primary">
            {brand.copy.comingSoonNote} The reader, theme, and settings are
            ready for the first story pack.
          </p>
        ) : (
          <p className="font-chrome mt-6 text-base leading-relaxed text-text-primary">
            Start with Level 1. Each page stays short so a child can read, hear
            a page, and turn when ready.
          </p>
        )}

        <div className="mt-10 border-t border-line pt-5">
          <Disclaimer />
          <PhysicalBooksTeaser className="mt-3" />
        </div>

        <section className="mt-10" aria-label="Preview other brands">
          <h2 className="font-chrome text-sm font-semibold text-muted">
            Preview brands
          </h2>
          <p className="font-chrome mt-2 text-sm leading-relaxed text-muted">
            Same app. Add <span className="font-semibold">?brand=</span> to any
            URL, or pick a brand below.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {FAITH_BRAND_IDS.map((id) => {
              const option = getBrandConfig(id);
              const current = option.id === brand.id;
              return (
                <li key={id}>
                  <Link
                    href={`/?brand=${id}`}
                    className={cn(
                      "inline-flex min-h-tap items-center rounded-full px-4 text-sm font-semibold no-underline",
                      current
                        ? "bg-accent text-[var(--on-accent)]"
                        : "border border-line bg-chrome text-text-primary",
                    )}
                  >
                    {option.displayName}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="font-chrome mt-4 text-sm leading-relaxed text-muted">
            <Link
              href="/?brand=books"
              className="text-muted underline-offset-4 hover:text-text-primary hover:underline"
            >
              More from DecodaBooks
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

"use client";

import { AppHeader, HeaderLink } from "@/components/chrome/AppHeader";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { PHYSICAL_TEASER } from "@/lib/marketing";

export function BooksComingSoonView() {
  const { brand } = useBrand();

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <AppHeader
        trailing={
          <>
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/library">Library</HeaderLink>
          </>
        }
      />
      <main className="mx-auto w-full max-w-measure px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold text-accent-deep">
          {brand.displayName}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold leading-tight tracking-tight text-text-primary">
          {PHYSICAL_TEASER.kicker}
        </h1>
        <p className="prose-reading mt-5 text-text-primary">{PHYSICAL_TEASER.body}</p>
        <p className="prose-reading mt-5 text-text-primary">
          We will share bound early readers here when print is ready. Until then,
          the library is the place to practice — one short page at a time.
        </p>
      </main>
    </div>
  );
}

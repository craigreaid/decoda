"use client";

import { AppHeader, HeaderLink } from "@/components/chrome/AppHeader";
import { PathwayCards } from "@/components/home/PathwayCards";
import { PhysicalTeaser } from "@/components/home/PhysicalTeaser";
import { TrustRow } from "@/components/home/TrustRow";
import { useBrand } from "@/components/brand/BrandThemeProvider";

export function BooksHub() {
  const { brand } = useBrand();
  const props = brand.copy.valueProps ?? [];

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <AppHeader
        trailing={
          <>
            <HeaderLink href="/library">Library</HeaderLink>
            <HeaderLink href="/books">Physical books</HeaderLink>
          </>
        }
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="bg-canvas">
          <h1 className="font-display max-w-measure text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
            {brand.copy.homeHeadline}
          </h1>
          <p className="prose-reading mt-5 text-text-primary">{brand.copy.homeLead}</p>
          <ul className="prose-reading mt-8 list-disc space-y-3 pl-5 marker:text-accent text-text-primary">
            {props.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <PathwayCards />
        </div>

        <div className="mt-12">
          <PhysicalTeaser />
        </div>

        <div className="mt-12">
          <TrustRow />
        </div>
      </main>

      {brand.copy.footerLine ? (
        <footer className="border-t border-line">
          <p className="mx-auto max-w-6xl px-4 py-6 text-base tracking-reading text-muted sm:px-6">
            {brand.copy.footerLine}
          </p>
        </footer>
      ) : null}
    </div>
  );
}

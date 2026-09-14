"use client";

import { BrandLink } from "@/components/brand/BrandLink";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { AppHeader, HeaderLink } from "@/components/chrome/AppHeader";
import { PhysicalTeaser } from "@/components/home/PhysicalTeaser";
import { Disclaimer } from "@/components/reader/Disclaimer";
import { BIBLE_CTAS, BOOKS_CROSS_LINK } from "@/lib/marketing";
import { cn } from "@/lib/cn";

export function FaithHome() {
  const { brand } = useBrand();
  const isBible = brand.id === "bible";

  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <AppHeader
        trailing={
          <>
            <HeaderLink href="/library">Library</HeaderLink>
            <a
              href={BOOKS_CROSS_LINK.href}
              className="inline-flex min-h-tap items-center text-sm font-semibold text-accent-deep no-underline"
            >
              DecodaBooks
            </a>
          </>
        }
      />

      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="bg-canvas">
          <h1 className="font-display max-w-measure text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
            {brand.copy.homeHeadline}
          </h1>
          <p className="prose-reading mt-5 text-text-primary">{brand.copy.homeLead}</p>

          {brand.copy.supporting ? (
            <p className="prose-reading mt-5 text-text-primary">
              {brand.copy.supporting}
            </p>
          ) : null}

          {brand.copy.showLiteracyDisclaimer ? (
            <Disclaimer className="mt-5 max-w-measure" />
          ) : null}

          {brand.copy.highlights?.length ? (
            <ul className="prose-reading mt-8 list-disc space-y-2 pl-5 marker:text-accent text-text-primary">
              {brand.copy.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {isBible ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {BIBLE_CTAS.map((cta) => {
                const className = cn(
                  "inline-flex min-h-tap items-center justify-center rounded-full px-5 text-base font-semibold no-underline",
                  cta.variant === "primary" &&
                    "bg-accent text-[var(--on-accent)]",
                  cta.variant === "secondary" &&
                    "border border-line bg-paper text-text-primary",
                  cta.variant === "quiet" && "px-2 text-accent-deep",
                );

                if (cta.href.startsWith("/?brand=")) {
                  return (
                    <a key={cta.label} href={cta.href} className={className}>
                      {cta.label}
                    </a>
                  );
                }

                return (
                  <BrandLink key={cta.label} href={cta.href} className={className}>
                    {cta.label}
                  </BrandLink>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BrandLink
                href="/library"
                className="inline-flex min-h-tap items-center justify-center rounded-full bg-accent px-5 text-base font-semibold text-[var(--on-accent)] no-underline"
              >
                Open the library
              </BrandLink>
              <a
                href={BOOKS_CROSS_LINK.href}
                className="inline-flex min-h-tap items-center justify-center rounded-full border border-line bg-paper px-5 text-base font-semibold text-text-primary no-underline"
              >
                Explore DecodaBooks
              </a>
            </div>
          )}

          {brand.copy.comingSoon ? (
            <p className="font-chrome mt-8 max-w-measure rounded-2xl border border-line bg-paper px-4 py-3 text-base leading-reading tracking-reading text-text-primary">
              {brand.copy.comingSoonNote} The reader, theme, and settings are
              ready for the first story pack.
            </p>
          ) : null}
        </section>

        <p className="prose-reading mt-10 text-text-primary">
          {BOOKS_CROSS_LINK.prompt}{" "}
          <a
            href={BOOKS_CROSS_LINK.href}
            className="font-semibold text-accent-deep"
          >
            {BOOKS_CROSS_LINK.label}
          </a>
        </p>

        <div className="mt-10">
          <PhysicalTeaser />
        </div>
      </main>
    </div>
  );
}

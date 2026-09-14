import { BrandLink } from "@/components/brand/BrandLink";
import { BrandMark } from "@/components/ui/BrandMark";
import { BOOK_MOCKUPS } from "@/lib/books/mockups";
import { withBrandQuery } from "@/lib/href";
import type { BrandConfig } from "@/lib/brand/types";
import Image from "next/image";

export function BooksComingSoon({
  brand,
  brandQuery,
}: {
  brand: BrandConfig;
  brandQuery: string | null;
}) {
  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <header className="flex h-14 items-center justify-between gap-4 border-b border-line bg-chrome px-4">
        <BrandMark
          name={brand.displayName}
          href={withBrandQuery("/", brandQuery)}
          compact
        />
        <BrandLink
          href="/"
          className="inline-flex min-h-tap items-center text-sm font-semibold text-accent no-underline"
        >
          Home
        </BrandLink>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="font-chrome text-sm font-semibold uppercase tracking-wide text-accent">
          Preview
        </p>
        <h1 className="font-chrome mt-3 text-4xl font-semibold leading-tight tracking-tight">
          Coming soon
        </h1>
        <p className="font-chrome mt-5 text-lg leading-relaxed text-text-primary">
          Physical bound Decoda books parents can order. The first print run
          will be single-story Level books. Level collection volumes come next.
          Pages stay short and set in a calm, dyslexia-friendly type.
        </p>
        <p className="font-chrome mt-4 text-base leading-relaxed text-text-primary">
          The mockups below are from the DecodaBible faith line. A broader
          DecodaBooks line — including secular early readers alongside the faith
          brands — is also coming.
        </p>

        <ul className="mt-10 flex flex-col gap-8">
          {BOOK_MOCKUPS.map((mockup) => (
            <li key={mockup.src}>
              <figure className="overflow-hidden rounded-2xl border border-line bg-chrome">
                <Image
                  src={mockup.src}
                  alt={mockup.alt}
                  width={1280}
                  height={720}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 48rem, 100vw"
                  priority={mockup.src === BOOK_MOCKUPS[0].src}
                />
                <figcaption className="font-chrome px-4 py-3 text-sm leading-relaxed text-muted">
                  {mockup.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="font-chrome mt-10 rounded-2xl border border-line bg-chrome px-4 py-3 text-base leading-relaxed text-text-primary">
          This page is a preview to share. Books are not for sale yet — there
          is no cart or ordering here.
        </p>

        <p className="font-chrome mt-6 text-base leading-relaxed">
          <BrandLink
            href="/library"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Back to the library
          </BrandLink>
          <span className="text-muted"> · </span>
          <BrandLink
            href="/"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Home
          </BrandLink>
        </p>
      </main>
    </div>
  );
}

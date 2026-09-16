import { BrandLink } from "@/components/brand/BrandLink";
import { PhysicalBooksTeaser } from "@/components/books/PhysicalBooksTeaser";
import { BrandMark } from "@/components/ui/BrandMark";
import { getBrandConfig } from "@/lib/brand/config";
import { FAITH_BRAND_IDS, type BrandConfig } from "@/lib/brand/types";
import Link from "next/link";

const FAITH_CARD_LEAD: Record<(typeof FAITH_BRAND_IDS)[number], string> = {
  bible: "Short decodable Bible stories. Level 1 is in the library now.",
  quran: "A calm Quran reader. The first story pack is still being prepared.",
  torah: "A calm Torah reader. The first story pack is still being prepared.",
};

export function BooksHubHome({ brand }: { brand: BrandConfig }) {
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
        <p className="font-chrome mt-4 text-base leading-relaxed text-text-primary">
          Secular early readers are general decodable stories with no scripture
          framing. Faith experiences stay on their own brands.
        </p>

        <section className="mt-10" aria-labelledby="faith-paths-heading">
          <h2
            id="faith-paths-heading"
            className="font-chrome text-sm font-semibold text-muted"
          >
            Faith pathways
          </h2>
          <p className="font-chrome mt-2 text-sm leading-relaxed text-muted">
            Open a faith brand to use its reader. Add{" "}
            <span className="font-semibold">?brand=</span> to any URL, or pick a
            card below.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {FAITH_BRAND_IDS.map((id) => {
              const option = getBrandConfig(id);
              return (
                <li key={id}>
                  <Link
                    href={`/?brand=${id}`}
                    className="block rounded-2xl border border-line bg-chrome px-4 py-4 no-underline"
                  >
                    <p className="font-chrome text-base font-semibold text-text-primary">
                      {option.displayName}
                    </p>
                    <p className="font-chrome mt-1 text-sm leading-relaxed text-muted">
                      {FAITH_CARD_LEAD[id]}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="font-chrome mt-8 rounded-2xl border border-line bg-chrome px-4 py-3 text-base text-text-primary">
          {brand.copy.comingSoonNote} The first secular story pack is still being
          prepared.
        </p>

        <div className="mt-10 border-t border-line pt-5">
          <PhysicalBooksTeaser />
          <p className="font-chrome mt-3 text-sm leading-relaxed text-muted">
            <BrandLink
              href="/library"
              className="text-muted underline-offset-4 hover:text-text-primary hover:underline"
            >
              Story library
            </BrandLink>
          </p>
        </div>
      </main>
    </div>
  );
}

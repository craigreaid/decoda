import { BrandLink } from "@/components/brand/BrandLink";
import { PHYSICAL_TEASER } from "@/lib/marketing";

export function PhysicalTeaser() {
  return (
    <section
      aria-labelledby="physical-books-heading"
      className="rounded-2xl border border-line bg-paper px-5 py-6 sm:px-7 sm:py-7"
    >
      <h2
        id="physical-books-heading"
        className="font-display text-lg font-semibold text-accent-deep"
      >
        {PHYSICAL_TEASER.kicker}
      </h2>
      <p className="prose-reading mt-2 text-text-primary">{PHYSICAL_TEASER.body}</p>
      <BrandLink
        href={PHYSICAL_TEASER.href}
        className="mt-4 inline-flex min-h-tap items-center text-base font-semibold text-accent-deep no-underline"
      >
        {PHYSICAL_TEASER.cta}
      </BrandLink>
    </section>
  );
}

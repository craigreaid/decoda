"use client";

import { BrandLink } from "@/components/brand/BrandLink";

export function PraiseComplete({ title }: { title: string }) {
  return (
    <section className="mx-auto flex min-h-[60dvh] w-full max-w-reader flex-col items-start justify-center px-1 py-8">
      <p className="font-chrome text-sm font-semibold text-accent">You did it</p>
      <h1 className="font-chrome mt-3 text-3xl font-semibold tracking-tight text-text-primary">
        You read the whole story.
      </h1>
      <p className="font-chrome mt-4 text-lg leading-relaxed text-text-primary">
        You finished {title}. That was careful, steady reading.
      </p>
      <BrandLink
        href="/library"
        className="mt-8 inline-flex min-h-tap items-center justify-center rounded-full bg-accent px-5 text-base font-semibold text-[var(--on-accent)] no-underline"
      >
        Back to library
      </BrandLink>
    </section>
  );
}

import { BrandLink } from "@/components/brand/BrandLink";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-reader flex-col justify-center px-4">
      <h1 className="font-display text-3xl font-semibold text-text-primary">
        That page is not here
      </h1>
      <p className="mt-3 text-base leading-reading tracking-reading text-text-primary">
        Try the story library.
      </p>
      <BrandLink
        href="/library"
        className="mt-6 inline-flex min-h-tap items-center justify-center self-start rounded-full bg-accent px-5 text-base font-semibold text-[var(--on-accent)] no-underline"
      >
        Back to library
      </BrandLink>
    </main>
  );
}

"use client";

import { BrandLink } from "@/components/brand/BrandLink";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SoftRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-reader flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-semibold text-text-primary">
        That story is not in the library
      </h1>
      <p className="mt-3 text-base leading-reading tracking-reading text-text-primary">
        Taking you back to the story list.
      </p>
      <BrandLink
        href="/library"
        className="mt-6 inline-flex min-h-tap items-center justify-center self-start rounded-full bg-accent px-5 text-base font-semibold text-[var(--on-accent)] no-underline"
      >
        Go to library
      </BrandLink>
    </main>
  );
}

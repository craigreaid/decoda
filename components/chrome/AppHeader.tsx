"use client";

import { BrandLink } from "@/components/brand/BrandLink";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { BrandMark } from "@/components/ui/BrandMark";
import { withBrandQuery } from "@/lib/href";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

export function AppHeader({
  trailing,
}: {
  trailing?: ReactNode;
}) {
  const { brand } = useBrand();
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get("brand");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <BrandMark
          name={brand.displayName}
          href={withBrandQuery("/", brandQuery)}
          compact
        />
        {trailing ? (
          <nav aria-label="Site" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {trailing}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <BrandLink
      href={href}
      className="inline-flex min-h-tap items-center text-sm font-semibold text-accent-deep no-underline"
    >
      {children}
    </BrandLink>
  );
}

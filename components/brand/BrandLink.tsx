"use client";

import { withBrandQuery } from "@/lib/href";
import Link, { type LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

type BrandLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function BrandLink({ href, children, ...props }: BrandLinkProps) {
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const nextHref = withBrandQuery(typeof href === "string" ? href : href.pathname ?? "/", brand);

  return (
    <Link href={nextHref} {...props}>
      {children}
    </Link>
  );
}

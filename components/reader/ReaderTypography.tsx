"use client";

import { useBrand } from "@/components/brand/BrandThemeProvider";
import { cn } from "@/lib/cn";
import { readerFontClass } from "@/lib/reader-font";
import type { ReactNode } from "react";

export function ReaderTypography({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { prefs } = useBrand();

  return (
    <div
      className={cn("reader-body", readerFontClass(prefs.font), className)}
      style={{
        fontSize: `${prefs.textSize}px`,
        lineHeight: prefs.lineSpacing,
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useBrand } from "@/components/brand/BrandThemeProvider";
import { BooksHub } from "@/components/home/BooksHub";
import { FaithHome } from "@/components/home/FaithHome";

export function HomeView() {
  const { brand } = useBrand();

  if (brand.id === "books") {
    return <BooksHub />;
  }

  return <FaithHome />;
}

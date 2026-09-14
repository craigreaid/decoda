"use client";

import { useBrand } from "@/components/brand/BrandThemeProvider";
import { BooksHub } from "@/components/home/BooksHub";
import { FaithHome } from "@/components/home/FaithHome";
import { useLayoutEffect } from "react";

export function HomeView() {
  const { brand } = useBrand();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [brand.id]);

  if (brand.id === "books") {
    return <BooksHub />;
  }

  return <FaithHome />;
}

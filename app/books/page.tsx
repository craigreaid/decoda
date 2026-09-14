import { BooksComingSoon } from "@/components/books/BooksComingSoon";
import { getRequestBrandConfig } from "@/lib/brand/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical books",
  description: "Coming soon: physical bound Decoda books parents can order.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string | string[] }>;
}) {
  const brand = await getRequestBrandConfig();
  const params = await searchParams;
  const brandQuery = typeof params.brand === "string" ? params.brand : null;

  return <BooksComingSoon brand={brand} brandQuery={brandQuery} />;
}

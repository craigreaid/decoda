import { LibraryView } from "@/components/library/LibraryView";
import { getRequestBrand } from "@/lib/brand/server";
import { getStoriesForBrand } from "@/lib/stories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
};

export default async function LibraryPage() {
  const brand = await getRequestBrand();
  const stories = getStoriesForBrand(brand);

  return <LibraryView stories={stories} />;
}

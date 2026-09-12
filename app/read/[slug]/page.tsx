import { SoftRedirect } from "@/components/brand/SoftRedirect";
import { ReaderShell } from "@/components/reader/ReaderShell";
import { clampPage, withBrandQuery } from "@/lib/href";
import { getStoryBySlug } from "@/lib/stories";
import type { Metadata } from "next";
import { Suspense } from "react";

type ReadPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; brand?: string }>;
};

export async function generateMetadata({
  params,
}: ReadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  return {
    title: story?.title ?? "Story",
  };
}

export default async function ReadPage({ params, searchParams }: ReadPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const story = getStoryBySlug(slug);

  if (!story) {
    return <SoftRedirect href={withBrandQuery("/library", query.brand)} />;
  }

  const initialPage = clampPage(Number(query.page ?? 1), story.pages.length);

  return (
    <Suspense fallback={null}>
      <ReaderShell story={story} initialPage={initialPage} />
    </Suspense>
  );
}

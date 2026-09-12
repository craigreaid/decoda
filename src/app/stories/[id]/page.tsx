import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoryById, stories } from "@/data/stories";
import Reader from "@/components/Reader";

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const story = getStoryById(id);
  return {
    title: story ? `${story.title} · decoda` : "Story not found · decoda",
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) notFound();
  return <Reader story={story} />;
}

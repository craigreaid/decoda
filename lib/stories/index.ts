import { allStories, storiesByBrand } from "@/content/registry";
import type { BrandId } from "@/lib/brand/types";
import type { Story } from "./types";

export type { Story, StoryPage } from "./types";

export function getStoriesForBrand(brand: BrandId): Story[] {
  return [...storiesByBrand[brand]].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.title.localeCompare(b.title);
  });
}

export function getStoryBySlug(slug: string): Story | undefined {
  return allStories.find((story) => story.slug === slug);
}

export function getLevelsForStories(stories: Story[]): number[] {
  return [...new Set(stories.map((story) => story.level))].sort((a, b) => a - b);
}

export function countWords(pageBody: string): number {
  return pageBody
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

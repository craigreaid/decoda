import type { BrandId } from "@/lib/brand/types";
import type { Story } from "@/lib/stories/types";
import { bibleStories } from "./bible";
import { quranStories } from "./quran";
import { torahStories } from "./torah";

export const storiesByBrand: Record<BrandId, Story[]> = {
  bible: bibleStories,
  quran: quranStories,
  torah: torahStories,
};

export const allStories: Story[] = [
  ...bibleStories,
  ...quranStories,
  ...torahStories,
];

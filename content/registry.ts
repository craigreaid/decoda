import type { BrandId } from "@/lib/brand/types";
import type { Story } from "@/lib/stories/types";
import { bibleStories } from "./bible";
import { booksStories } from "./books";
import { quranStories } from "./quran";
import { torahStories } from "./torah";

export const storiesByBrand: Record<BrandId, Story[]> = {
  books: booksStories,
  bible: bibleStories,
  quran: quranStories,
  torah: torahStories,
  books: booksStories,
};

export const allStories: Story[] = [
  ...booksStories,
  ...bibleStories,
  ...quranStories,
  ...torahStories,
  ...booksStories,
];

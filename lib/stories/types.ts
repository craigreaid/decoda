import type { BrandId } from "@/lib/brand/types";

export type StoryPage = {
  id: string;
  body: string;
  focusWords?: string[];
  illustrationUrl?: string;
};

export type Story = {
  slug: string;
  title: string;
  level: number;
  brand: BrandId;
  pages: StoryPage[];
};

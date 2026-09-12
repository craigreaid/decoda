export const BRAND_IDS = ["bible", "quran", "torah"] as const;

export type BrandId = (typeof BRAND_IDS)[number];

export const DEFAULT_BRAND: BrandId = "bible";

export type BrandTheme = {
  canvas: string;
  text: string;
  accent: string;
};

export type BrandCopy = {
  tagline: string;
  homeHeadline: string;
  homeLead: string;
  libraryTitle: string;
  libraryLead: string;
  comingSoon: boolean;
  comingSoonNote?: string;
};

export type BrandConfig = {
  id: BrandId;
  displayName: string;
  domain: string;
  theme: BrandTheme;
  copy: BrandCopy;
};

export function isBrandId(value: string | null | undefined): value is BrandId {
  return value === "bible" || value === "quran" || value === "torah";
}

export const FAITH_BRAND_IDS = ["bible", "quran", "torah"] as const;
export const BRAND_IDS = ["bible", "quran", "torah", "books"] as const;

export type FaithBrandId = (typeof FAITH_BRAND_IDS)[number];
export type BrandId = (typeof BRAND_IDS)[number];

export const DEFAULT_BRAND: BrandId = "bible";
export const HUB_BRAND: BrandId = "books";

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
  return (BRAND_IDS as readonly string[]).includes(value ?? "");
}

export function isFaithBrand(
  value: string | null | undefined,
): value is FaithBrandId {
  return (FAITH_BRAND_IDS as readonly string[]).includes(value ?? "");
}

export function isHubBrand(value: string | null | undefined): value is "books" {
  return value === HUB_BRAND;
}

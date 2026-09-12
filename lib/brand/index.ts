export type { BrandConfig, BrandCopy, BrandId, BrandTheme } from "./types";
export { BRAND_IDS, DEFAULT_BRAND, isBrandId } from "./types";
export { BRANDS, getBrandConfig, PRODUCTION_HOSTS } from "./config";
export { brandFromHost, resolveBrand } from "./resolve";
export { getRequestBrand, getRequestBrandConfig } from "./server";

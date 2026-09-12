import { headers } from "next/headers";
import { getBrandConfig } from "./config";
import { DEFAULT_BRAND, isBrandId, type BrandId } from "./types";
import type { BrandConfig } from "./types";

export async function getRequestBrand(): Promise<BrandId> {
  const headerBrand = (await headers()).get("x-brand");
  if (isBrandId(headerBrand)) {
    return headerBrand;
  }
  return DEFAULT_BRAND;
}

export async function getRequestBrandConfig(): Promise<BrandConfig> {
  return getBrandConfig(await getRequestBrand());
}

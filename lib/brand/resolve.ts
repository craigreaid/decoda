import { PRODUCTION_HOSTS } from "./config";
import { DEFAULT_BRAND, isBrandId, type BrandId } from "./types";

export type BrandResolveInput = {
  queryBrand?: string | null;
  host?: string | null;
  envBrand?: string | null;
  cookieBrand?: string | null;
};

export function hostnameFromHost(host: string | null | undefined): string {
  if (!host) return "";
  return host.split(":")[0]?.trim().toLowerCase() ?? "";
}

export function brandFromHost(host: string | null | undefined): BrandId | null {
  const hostname = hostnameFromHost(host);
  return PRODUCTION_HOSTS[hostname] ?? null;
}

/**
 * Resolution order for local/dev and production:
 * 1. ?brand= override
 * 2. Host header (decodabooks.com, decodabible.com, decodaquran.com, decodatorah.com)
 * 3. BRAND env
 * 4. last-used cookie
 * 5. books
 */
export function resolveBrand(input: BrandResolveInput): BrandId {
  if (isBrandId(input.queryBrand)) {
    return input.queryBrand;
  }

  const fromHost = brandFromHost(input.host);
  if (fromHost) {
    return fromHost;
  }

  if (isBrandId(input.envBrand)) {
    return input.envBrand;
  }

  if (isBrandId(input.cookieBrand)) {
    return input.cookieBrand;
  }

  return DEFAULT_BRAND;
}

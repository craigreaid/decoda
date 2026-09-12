export function withBrandQuery(
  href: string,
  brand: string | null | undefined,
): string {
  if (!brand) {
    return href;
  }

  const [pathAndQuery, hash] = href.split("#");
  const url = new URL(pathAndQuery, "https://decoda.local");
  url.searchParams.set("brand", brand);
  const next = `${url.pathname}${url.search}`;
  return hash ? `${next}#${hash}` : next;
}

export function clampPage(page: number, pageCount: number): number {
  if (!Number.isFinite(page) || pageCount < 1) {
    return 1;
  }
  return Math.min(Math.max(Math.trunc(page), 1), pageCount);
}

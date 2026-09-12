"use client";

import { getBrandConfig } from "@/lib/brand/config";
import { isBrandId, type BrandConfig, type BrandId } from "@/lib/brand/types";
import {
  DEFAULT_PREFS,
  loadPrefs,
  savePrefs,
  type ReaderPrefs,
} from "@/lib/prefs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BrandContextValue = {
  brand: BrandConfig;
  prefs: ReaderPrefs;
  prefsReady: boolean;
  setPrefs: (next: Partial<ReaderPrefs>) => void;
};

const BrandContext = createContext<BrandContextValue | null>(null);

function applyDocumentChrome(brandId: BrandId, prefs: ReaderPrefs) {
  const root = document.documentElement;
  root.dataset.brand = brandId;
  root.dataset.contrast = prefs.contrast;
  root.dataset.reduceMotion = String(prefs.reduceMotion);
}

export function BrandThemeProvider({
  initialBrandId,
  children,
}: {
  initialBrandId: BrandId;
  children: ReactNode;
}) {
  const [brandId, setBrandId] = useState<BrandId>(initialBrandId);
  const [prefs, setPrefsState] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [prefsReady, setPrefsReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryBrand = params.get("brand");
    const nextBrand = isBrandId(queryBrand) ? queryBrand : initialBrandId;
    setBrandId(nextBrand);
    const stored = loadPrefs(nextBrand);
    setPrefsState(stored);
    applyDocumentChrome(nextBrand, stored);
    setPrefsReady(true);
  }, [initialBrandId]);

  useEffect(() => {
    if (!prefsReady) return;
    applyDocumentChrome(brandId, prefs);
    savePrefs(brandId, prefs);
  }, [brandId, prefs, prefsReady]);

  const setPrefs = useCallback((next: Partial<ReaderPrefs>) => {
    setPrefsState((current) => ({ ...current, ...next }));
  }, []);

  const value = useMemo<BrandContextValue>(
    () => ({
      brand: getBrandConfig(brandId),
      prefs,
      prefsReady,
      setPrefs,
    }),
    [brandId, prefs, prefsReady, setPrefs],
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within BrandThemeProvider");
  }
  return context;
}

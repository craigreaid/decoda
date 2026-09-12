import type { BrandId } from "@/lib/brand/types";

export const READING_FONTS = ["opendyslexic", "atkinson", "classic"] as const;
export type ReadingFont = (typeof READING_FONTS)[number];

export const TEXT_SIZES = [18, 22, 26, 30] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export const LINE_SPACINGS = [1.6, 1.8, 2.1] as const;
export type LineSpacing = (typeof LINE_SPACINGS)[number];

export const CONTRAST_MODES = ["default", "high"] as const;
export type ContrastMode = (typeof CONTRAST_MODES)[number];

export const SPEECH_RATES = [0.75, 0.9, 1.05] as const;
export type SpeechRate = (typeof SPEECH_RATES)[number];

export type ReaderPrefs = {
  font: ReadingFont;
  textSize: TextSize;
  lineSpacing: LineSpacing;
  contrast: ContrastMode;
  audioFollowAlong: boolean;
  reduceMotion: boolean;
  speechRate: SpeechRate;
};

export const DEFAULT_PREFS: ReaderPrefs = {
  font: "opendyslexic",
  textSize: 22,
  lineSpacing: 1.8,
  contrast: "default",
  audioFollowAlong: true,
  reduceMotion: false,
  speechRate: 0.9,
};

const DEVICE_KEY = "decoda:device-id";

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "ssr";
  }

  const existing = window.localStorage.getItem(DEVICE_KEY);
  if (existing) {
    return existing;
  }

  const id = window.crypto.randomUUID();
  window.localStorage.setItem(DEVICE_KEY, id);
  return id;
}

export function prefsStorageKey(brand: BrandId, deviceId: string): string {
  return `decoda:prefs:${brand}:${deviceId}`;
}

function isReadingFont(value: unknown): value is ReadingFont {
  return READING_FONTS.includes(value as ReadingFont);
}

function isTextSize(value: unknown): value is TextSize {
  return TEXT_SIZES.includes(value as TextSize);
}

function isLineSpacing(value: unknown): value is LineSpacing {
  return LINE_SPACINGS.includes(value as LineSpacing);
}

function isContrastMode(value: unknown): value is ContrastMode {
  return CONTRAST_MODES.includes(value as ContrastMode);
}

function isSpeechRate(value: unknown): value is SpeechRate {
  return SPEECH_RATES.includes(value as SpeechRate);
}

export function parsePrefs(raw: unknown): ReaderPrefs {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_PREFS;
  }

  const value = raw as Partial<ReaderPrefs>;
  return {
    font: isReadingFont(value.font) ? value.font : DEFAULT_PREFS.font,
    textSize: isTextSize(value.textSize) ? value.textSize : DEFAULT_PREFS.textSize,
    lineSpacing: isLineSpacing(value.lineSpacing)
      ? value.lineSpacing
      : DEFAULT_PREFS.lineSpacing,
    contrast: isContrastMode(value.contrast)
      ? value.contrast
      : DEFAULT_PREFS.contrast,
    audioFollowAlong:
      typeof value.audioFollowAlong === "boolean"
        ? value.audioFollowAlong
        : DEFAULT_PREFS.audioFollowAlong,
    reduceMotion:
      typeof value.reduceMotion === "boolean"
        ? value.reduceMotion
        : DEFAULT_PREFS.reduceMotion,
    speechRate: isSpeechRate(value.speechRate)
      ? value.speechRate
      : DEFAULT_PREFS.speechRate,
  };
}

export function loadPrefs(brand: BrandId): ReaderPrefs {
  if (typeof window === "undefined") {
    return DEFAULT_PREFS;
  }

  try {
    const raw = window.localStorage.getItem(
      prefsStorageKey(brand, getDeviceId()),
    );
    if (!raw) {
      return {
        ...DEFAULT_PREFS,
        reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
      };
    }
    return parsePrefs(JSON.parse(raw));
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(brand: BrandId, prefs: ReaderPrefs): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    prefsStorageKey(brand, getDeviceId()),
    JSON.stringify(prefs),
  );
}

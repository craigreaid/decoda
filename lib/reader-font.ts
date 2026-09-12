import type { ReadingFont } from "@/lib/prefs";

export function readerFontClass(font: ReadingFont): string {
  if (font === "atkinson") return "font-atkinson";
  if (font === "classic") return "font-classic";
  return "font-opendyslexic";
}

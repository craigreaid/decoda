import type { BrandConfig, BrandId, BrandTheme } from "./types";

const SHARED_SURFACE: Pick<
  BrandTheme,
  "canvas" | "paper" | "text" | "textMuted" | "line" | "focus"
> = {
  canvas: "#F7F3EC",
  paper: "#FFFCF7",
  text: "#2C2A26",
  textMuted: "#5C574E",
  line: "#E4DFD4",
  focus: "#4A6FA5",
};

/**
 * Brand kit v1. Body ink on cream is above 7:1
 * (#2C2A26 on #F7F3EC ≈ 13:1).
 */
export const BRANDS: Record<BrandId, BrandConfig> = {
  books: {
    id: "books",
    displayName: "DecodaBooks",
    domain: "decodabooks.com",
    theme: {
      ...SHARED_SURFACE,
      accent: "#5B7C6E",
      accentSoft: "#DCE8E2",
      accentDeep: "#2F3F38",
    },
    copy: {
      tagline: "Secular early readers, with paths to faith brands",
      homeHeadline: "Calm books. Many paths.",
      homeLead:
        "DecodaBooks is home for secular early-reader stories, with clear pathways to faith brands. Physical bound books are coming soon.",
      libraryTitle: "Story library",
      libraryLead: "Everyday decodable stories will appear here.",
      comingSoon: true,
      comingSoonNote: "First story pack still being prepared.",
      valueProps: [
        "Short, decodable pages — written for beginning readers and kids with dyslexia.",
        "Everyday stories here — general early readers with no scripture framing.",
        "Faith on its own brands — Bible, Quran, and Torah stay separate, same careful path.",
      ],
      footerLine:
        "A calm place to practice reading — one short page at a time.",
      showLiteracyDisclaimer: false,
    },
  },
  bible: {
    id: "bible",
    displayName: "DecodaBible",
    domain: "decodabible.com",
    theme: {
      ...SHARED_SURFACE,
      accent: "#4A6FA5",
      accentSoft: "#DCE6F2",
      accentDeep: "#2A3A52",
    },
    copy: {
      tagline: "A calm reader for beginning readers",
      homeHeadline: "Short stories. Steady steps.",
      homeLead:
        "DecodaBible is a calm reader for beginning readers and kids with dyslexia. Stories use small, decodable pages written for literacy practice.",
      libraryTitle: "Story library",
      libraryLead: "Pick a Level 1 story. Read one page at a time.",
      comingSoon: false,
      supporting:
        "Start with Level 1. Each page stays short so a child can read, hear a page, and turn when ready.",
      highlights: [
        "Level 1 in the library now",
        "Short pages built for practice",
        "Same careful path as DecodaBooks, on a faith brand",
      ],
      showLiteracyDisclaimer: true,
    },
  },
  quran: {
    id: "quran",
    displayName: "DecodaQuran",
    domain: "decodaquran.com",
    theme: {
      ...SHARED_SURFACE,
      accent: "#3D7A6A",
      accentSoft: "#D8EBE4",
      accentDeep: "#24453C",
    },
    copy: {
      tagline: "A calm Quran reader",
      homeHeadline: "A calm Quran reader.",
      homeLead:
        "DecodaQuran will offer short, decodable stories for beginning readers and kids with dyslexia. The first story pack is still being prepared.",
      libraryTitle: "Story library",
      libraryLead: "Levelled stories will appear here.",
      comingSoon: true,
      comingSoonNote: "First story pack still being prepared.",
      supporting:
        "Same careful path as DecodaBooks, on its own faith brand.",
      showLiteracyDisclaimer: true,
    },
  },
  torah: {
    id: "torah",
    displayName: "DecodaTorah",
    domain: "decodatorah.com",
    theme: {
      ...SHARED_SURFACE,
      accent: "#8B6B3D",
      accentSoft: "#F0E6D4",
      accentDeep: "#4A3A22",
    },
    copy: {
      tagline: "A calm Torah reader",
      homeHeadline: "A calm Torah reader.",
      homeLead:
        "DecodaTorah will offer short, decodable stories for beginning readers and kids with dyslexia. The first story pack is still being prepared.",
      libraryTitle: "Story library",
      libraryLead: "Levelled stories will appear here.",
      comingSoon: true,
      comingSoonNote: "First story pack still being prepared.",
      supporting:
        "Same careful path as DecodaBooks, on its own faith brand.",
      showLiteracyDisclaimer: true,
    },
  },
  books: {
    id: "books",
    displayName: "DecodaBooks",
    domain: "decodabooks.com",
    theme: {
      canvas: "#F4F1EA",
      text: "#1E1C19",
      accent: "#3F4F5A",
    },
    copy: {
      tagline: "Decodable early readers for every family",
      homeHeadline: "Calm books. Many paths.",
      homeLead:
        "DecodaBooks is the umbrella home for secular early-reader stories, with pathways to faith brands. Physical bound books are coming soon.",
      libraryTitle: "Story library",
      libraryLead: "Secular early-reader stories will appear here.",
      comingSoon: true,
      comingSoonNote: "Early-reader stories are coming.",
    },
  },
};

export function getBrandConfig(id: BrandId): BrandConfig {
  return BRANDS[id];
}

export const PRODUCTION_HOSTS: Record<string, BrandId> = {
  "decodabooks.com": "books",
  "www.decodabooks.com": "books",
  "decodabible.com": "bible",
  "www.decodabible.com": "bible",
  "decodaquran.com": "quran",
  "www.decodaquran.com": "quran",
  "decodatorah.com": "torah",
  "www.decodatorah.com": "torah",
  "decodabooks.com": "books",
  "www.decodabooks.com": "books",
};

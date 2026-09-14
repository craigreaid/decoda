import type { BrandConfig, BrandId } from "./types";

/**
 * Starter tokens. Body text on canvas is well above 7:1:
 * bible  #1F1A14 on #F7F0E4 ≈ 15.4:1
 * quran  #14201A on #EEF5F0 ≈ 15.8:1
 * torah  #1A1814 on #F3EEE6 ≈ 16.0:1
 * books  #1E1C19 on #F4F1EA ≈ 15.2:1
 */
export const BRANDS: Record<BrandId, BrandConfig> = {
  bible: {
    id: "bible",
    displayName: "DecodaBible",
    domain: "decodabible.com",
    theme: {
      canvas: "#F7F0E4",
      text: "#1F1A14",
      accent: "#0F5C62",
    },
    copy: {
      tagline: "Decodable stories for kids learning to read",
      homeHeadline: "Short stories. Steady steps.",
      homeLead:
        "DecodaBible is a calm reader for beginning readers and kids with dyslexia. Stories use small, decodable pages written for literacy practice.",
      libraryTitle: "Story library",
      libraryLead: "Pick a Level 1 story. Read one page at a time.",
      comingSoon: false,
    },
  },
  quran: {
    id: "quran",
    displayName: "DecodaQuran",
    domain: "decodaquran.com",
    theme: {
      canvas: "#EEF5F0",
      text: "#14201A",
      accent: "#1F6B4A",
    },
    copy: {
      tagline: "Decodable stories for kids learning to read",
      homeHeadline: "A calm reader. Stories are on the way.",
      homeLead:
        "DecodaQuran will offer short, decodable stories for beginning readers and kids with dyslexia. The first story pack is still being prepared.",
      libraryTitle: "Story library",
      libraryLead: "Levelled stories will appear here.",
      comingSoon: true,
      comingSoonNote: "More stories are coming.",
    },
  },
  torah: {
    id: "torah",
    displayName: "DecodaTorah",
    domain: "decodatorah.com",
    theme: {
      canvas: "#F3EEE6",
      text: "#1A1814",
      accent: "#243B6B",
    },
    copy: {
      tagline: "Decodable stories for kids learning to read",
      homeHeadline: "A calm reader. Stories are on the way.",
      homeLead:
        "DecodaTorah will offer short, decodable stories for beginning readers and kids with dyslexia. The first story pack is still being prepared.",
      libraryTitle: "Story library",
      libraryLead: "Levelled stories will appear here.",
      comingSoon: true,
      comingSoonNote: "More stories are coming.",
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
  "decodabible.com": "bible",
  "www.decodabible.com": "bible",
  "decodaquran.com": "quran",
  "www.decodaquran.com": "quran",
  "decodatorah.com": "torah",
  "www.decodatorah.com": "torah",
  "decodabooks.com": "books",
  "www.decodabooks.com": "books",
};

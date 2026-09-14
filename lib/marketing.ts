import type { BrandId } from "@/lib/brand/types";

export const PATHWAYS_HEADING = "Choose a path";

export const PATHWAYS_INTRO =
  "Start with secular early readers on DecodaBooks, or open a faith brand to use its reader.";

export const PATHWAY_CARDS: Array<{
  id: BrandId;
  name: string;
  kicker?: string;
  description: string;
  href: string;
}> = [
  {
    id: "books",
    name: "DecodaBooks",
    kicker: "secular",
    description:
      "Everyday decodable stories. First story pack still being prepared.",
    href: "/library?brand=books",
  },
  {
    id: "bible",
    name: "DecodaBible",
    description:
      "Short decodable Bible stories. Level 1 is in the library now.",
    href: "/library?brand=bible",
  },
  {
    id: "quran",
    name: "DecodaQuran",
    description:
      "A calm Quran reader. First story pack still being prepared.",
    href: "/?brand=quran",
  },
  {
    id: "torah",
    name: "DecodaTorah",
    description:
      "A calm Torah reader. First story pack still being prepared.",
    href: "/?brand=torah",
  },
];

export const PHYSICAL_TEASER = {
  kicker: "Physical books — coming soon",
  body: "Bound early readers are on the way. This site is an early preview of the reading experience while we get stories and print ready.",
  href: "/books",
  cta: "See what’s coming",
};

export const TRUST_ITEMS = [
  "Decodable pages",
  "Built for dyslexia-friendly reading",
  "Faith lines stay separate",
] as const;

export const BOOKS_CROSS_LINK = {
  prompt: "Looking for everyday (non-faith) early readers?",
  label: "Visit DecodaBooks",
  href: "/?brand=books",
};

export const BIBLE_CTAS = [
  { label: "Open Level 1", href: "/library", variant: "primary" as const },
  {
    label: "Explore DecodaBooks",
    href: "/?brand=books",
    variant: "secondary" as const,
  },
  {
    label: "Coming soon in print",
    href: "/books",
    variant: "quiet" as const,
  },
];

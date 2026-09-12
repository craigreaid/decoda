export interface StoryPage {
  /** Sentences shown together on one reader page. */
  lines: string[];
}

export interface Story {
  id: string;
  title: string;
  /** Phonics phase (UK Letters & Sounds style), 2–6. */
  phase: number;
  /** Short human label for the phase. */
  level: string;
  /** Target graphemes this story practises, e.g. ["sh", "ch"]. */
  focusSounds: string[];
  /** A handful of decodable "tricky"/high-frequency words used. */
  trickyWords: string[];
  blurb: string;
  /** Simple emoji used as cover art so we need no binary assets. */
  cover: string;
  pages: StoryPage[];
}

export const stories: Story[] = [
  {
    id: "sam-the-cat",
    title: "Sam the Cat",
    phase: 2,
    level: "Phase 2 · s a t p i n",
    focusSounds: ["s", "a", "t", "p", "i", "n"],
    trickyWords: ["the", "a"],
    blurb: "A tiny tale using only the very first sounds.",
    cover: "🐈",
    pages: [
      { lines: ["Sam is a cat.", "Sam sat."] },
      { lines: ["A rat ran.", "Sam ran at the rat."] },
      { lines: ["The rat is in a pit.", "Sam sat on the pit."] },
    ],
  },
  {
    id: "the-big-dig",
    title: "The Big Dig",
    phase: 3,
    level: "Phase 3 · digraphs",
    focusSounds: ["ck", "ng", "ll"],
    trickyWords: ["the", "we", "to"],
    blurb: "Dig, dig, dig! A digging story full of digraphs.",
    cover: "⛏️",
    pages: [
      { lines: ["We dig in the mud.", "A duck can quack."] },
      { lines: ["Dig for a big rock.", "The rock will not budge."] },
      { lines: ["We tug and tug.", "The rock rolls to the hill."] },
    ],
  },
  {
    id: "fish-and-chips",
    title: "Fish and Chips",
    phase: 3,
    level: "Phase 3 · sh ch th",
    focusSounds: ["sh", "ch", "th"],
    trickyWords: ["the", "she", "he"],
    blurb: "A seaside snack story to practise sh, ch and th.",
    cover: "🐟",
    pages: [
      { lines: ["She got fish and chips.", "The chips are hot."] },
      { lines: ["He had a chat.", "Then they had a dash."] },
      { lines: ["Munch, munch, crunch!", "This fish is fresh."] },
    ],
  },
  {
    id: "the-rain-train",
    title: "The Rain Train",
    phase: 4,
    level: "Phase 4 · adjacent consonants",
    focusSounds: ["ai", "tr", "nd"],
    trickyWords: ["said", "have", "like"],
    blurb: "Clatter and clang on a train in the rain.",
    cover: "🚂",
    pages: [
      { lines: ["The train ran in the rain.", "It went fast on the track."] },
      { lines: ["\"I like the train,\" said Fran.", "The train had a big grin."] },
      { lines: ["Stand back and wait.", "The train will stop at the end."] },
    ],
  },
  {
    id: "moonlight-owl",
    title: "The Moonlight Owl",
    phase: 5,
    level: "Phase 5 · oo ow igh",
    focusSounds: ["oo", "ow", "igh"],
    trickyWords: ["there", "people", "oh"],
    blurb: "A night-time story with a wise, hooting owl.",
    cover: "🦉",
    pages: [
      { lines: ["The owl sat high in the tree.", "The moon was bright."] },
      { lines: ["\"Whoo, whoo!\" cried the owl.", "It swooped down low."] },
      { lines: ["Now the owl flies home.", "Goodnight, wise owl."] },
    ],
  },
];

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}

export function summarize(story: Story) {
  const wordCount = story.pages.reduce(
    (total, page) =>
      total + page.lines.reduce((n, line) => n + line.split(/\s+/).filter(Boolean).length, 0),
    0,
  );
  return {
    id: story.id,
    title: story.title,
    phase: story.phase,
    level: story.level,
    focusSounds: story.focusSounds,
    trickyWords: story.trickyWords,
    blurb: story.blurb,
    cover: story.cover,
    pageCount: story.pages.length,
    wordCount,
  };
}

export type StorySummary = ReturnType<typeof summarize>;

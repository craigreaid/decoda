import { describe, expect, it } from "vitest";
import { getStoryById, stories, summarize } from "./stories";

describe("stories data", () => {
  it("has unique ids", () => {
    const ids = stories.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every story has at least one page with content", () => {
    for (const story of stories) {
      expect(story.pages.length).toBeGreaterThan(0);
      for (const page of story.pages) {
        expect(page.lines.length).toBeGreaterThan(0);
      }
    }
  });

  it("summarize counts words and pages", () => {
    const story = stories[0];
    const summary = summarize(story);
    expect(summary.pageCount).toBe(story.pages.length);
    expect(summary.wordCount).toBeGreaterThan(0);
  });

  it("getStoryById returns undefined for missing ids", () => {
    expect(getStoryById("nope")).toBeUndefined();
    expect(getStoryById(stories[0].id)?.id).toBe(stories[0].id);
  });
});

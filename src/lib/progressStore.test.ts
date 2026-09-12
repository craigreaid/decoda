import { beforeEach, describe, expect, it } from "vitest";
import { getProgress, markCompleted, resetProgress } from "./progressStore";
import { stories } from "@/data/stories";

describe("progressStore", () => {
  beforeEach(() => {
    resetProgress();
  });

  it("starts with zero completed stories", () => {
    const progress = getProgress();
    expect(progress.completedCount).toBe(0);
    expect(progress.total).toBe(stories.length);
    expect(progress.percentComplete).toBe(0);
  });

  it("marks a known story as completed", () => {
    const id = stories[0].id;
    const result = markCompleted(id);
    expect(result.ok).toBe(true);
    const progress = getProgress();
    expect(progress.completedCount).toBe(1);
    expect(progress.completedStoryIds).toContain(id);
  });

  it("rejects an unknown story", () => {
    const result = markCompleted("does-not-exist");
    expect(result.ok).toBe(false);
    expect(getProgress().completedCount).toBe(0);
  });

  it("is idempotent for the same story", () => {
    const id = stories[0].id;
    markCompleted(id);
    markCompleted(id);
    expect(getProgress().completedCount).toBe(1);
  });
});

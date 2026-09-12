import { stories } from "@/data/stories";

/**
 * A deliberately simple in-memory progress store so the platform has a real
 * server-side mutation to exercise end to end. In production this would be a
 * database keyed by an authenticated learner id.
 */
const completedStoryIds = new Set<string>();

export function getProgress() {
  const total = stories.length;
  const completed = [...completedStoryIds].filter((id) =>
    stories.some((s) => s.id === id),
  );
  return {
    total,
    completedCount: completed.length,
    completedStoryIds: completed,
    percentComplete: total === 0 ? 0 : Math.round((completed.length / total) * 100),
  };
}

export function markCompleted(storyId: string) {
  const exists = stories.some((s) => s.id === storyId);
  if (!exists) {
    return { ok: false as const, reason: "unknown_story" };
  }
  completedStoryIds.add(storyId);
  return { ok: true as const, progress: getProgress() };
}

export function resetProgress() {
  completedStoryIds.clear();
  return getProgress();
}

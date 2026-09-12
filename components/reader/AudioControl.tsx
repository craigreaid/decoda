"use client";

import { cn } from "@/lib/cn";

export function AudioControl({
  playing,
  paused,
  disabled,
  onToggle,
}: {
  playing: boolean;
  paused: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  const label = playing && !paused ? "Pause" : "Play";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={label}
      aria-pressed={playing && !paused}
      className={cn(
        "inline-flex min-h-tap min-w-tap items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold",
        "bg-accent-soft text-text-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {playing && !paused ? "❚❚" : "▶"}
      </span>
      <span>{label}</span>
    </button>
  );
}

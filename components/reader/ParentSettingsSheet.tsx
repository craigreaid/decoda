"use client";

import { useBrand } from "@/components/brand/BrandThemeProvider";
import { useFocusTrap } from "@/components/reader/useFocusTrap";
import { cn } from "@/lib/cn";
import {
  LINE_SPACINGS,
  SPEECH_RATES,
  TEXT_SIZES,
  type ContrastMode,
  type LineSpacing,
  type ReadingFont,
  type SpeechRate,
  type TextSize,
} from "@/lib/prefs";
import { useCallback, useId, useRef } from "react";

const FONT_OPTIONS: Array<{ id: ReadingFont; label: string }> = [
  { id: "opendyslexic", label: "OpenDyslexic" },
  { id: "atkinson", label: "Atkinson" },
  { id: "classic", label: "Classic" },
];

const SIZE_LABELS: Record<TextSize, string> = {
  18: "S",
  22: "M",
  26: "L",
  30: "XL",
};

const SPACING_LABELS: Record<LineSpacing, string> = {
  1.6: "Snug",
  1.8: "Roomy",
  2.1: "Open",
};

const RATE_LABELS: Record<SpeechRate, string> = {
  0.75: "Slow",
  0.9: "Steady",
  1.05: "Brisk",
};

function ChoiceRow<T extends string | number>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: Array<{ id: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-sm font-semibold text-text-primary">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={String(option.id)}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={cn(
                "min-h-tap min-w-tap rounded-full px-3 text-sm font-semibold",
                selected
                  ? "bg-accent text-[var(--on-accent)]"
                  : "border border-line bg-canvas text-text-primary",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  description: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-semibold text-text-primary">
          {label}
        </label>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-1 h-8 w-14 shrink-0 rounded-full",
          checked ? "bg-accent" : "bg-line",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full bg-[var(--on-accent)] transition-transform",
            checked ? "left-7" : "left-1 bg-canvas",
          )}
        />
      </button>
    </div>
  );
}

export function ParentSettingsSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { prefs, setPrefs } = useBrand();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const close = useCallback(() => onClose(), [onClose]);

  useFocusTrap(open, panelRef, close);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close settings"
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--text-primary)_36%,transparent)]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-canvas p-5 shadow-lg sm:rounded-3xl sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-text-primary">
              Parent settings
            </h2>
            <p className="mt-1 text-sm text-muted">
              Changes apply right away. They stay on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-full border border-line px-3 text-sm font-semibold"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <ChoiceRow
            legend="Text size"
            value={prefs.textSize}
            options={TEXT_SIZES.map((size) => ({
              id: size,
              label: SIZE_LABELS[size],
            }))}
            onChange={(textSize) => setPrefs({ textSize })}
          />
          <ChoiceRow
            legend="Reading font"
            value={prefs.font}
            options={FONT_OPTIONS}
            onChange={(font) => setPrefs({ font })}
          />
          <ChoiceRow
            legend="Line spacing"
            value={prefs.lineSpacing}
            options={LINE_SPACINGS.map((spacing) => ({
              id: spacing,
              label: SPACING_LABELS[spacing],
            }))}
            onChange={(lineSpacing) => setPrefs({ lineSpacing })}
          />
          <ChoiceRow
            legend="Contrast"
            value={prefs.contrast}
            options={[
              { id: "default" as ContrastMode, label: "Default" },
              { id: "high" as ContrastMode, label: "High" },
            ]}
            onChange={(contrast) => setPrefs({ contrast })}
          />
          <ChoiceRow
            legend="Read-aloud speed"
            value={prefs.speechRate}
            options={SPEECH_RATES.map((rate) => ({
              id: rate,
              label: RATE_LABELS[rate],
            }))}
            onChange={(speechRate) => setPrefs({ speechRate })}
          />
          <ToggleRow
            label="Audio follow-along"
            checked={prefs.audioFollowAlong}
            onChange={(audioFollowAlong) => setPrefs({ audioFollowAlong })}
            description="Highlight the word being read aloud."
          />
          <ToggleRow
            label="Reduce motion"
            checked={prefs.reduceMotion}
            onChange={(reduceMotion) => setPrefs({ reduceMotion })}
            description="This also honors your device motion setting."
          />
        </div>
      </div>
    </div>
  );
}

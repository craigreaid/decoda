import { cn } from "@/lib/cn";

export function BrandMark({
  name,
  href,
  compact = false,
  className,
}: {
  name: string;
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  const content = (
    <span className={cn("inline-flex min-h-tap items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-sm font-bold text-[var(--on-accent)]"
      >
        D
      </span>
      <span
        className={cn(
          "font-chrome font-semibold tracking-tight text-text-primary",
          compact ? "text-base" : "text-lg",
        )}
      >
        {name}
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} className="rounded-md no-underline">
      {content}
    </a>
  );
}

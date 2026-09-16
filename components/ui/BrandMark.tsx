import { cn } from "@/lib/cn";

export function BookPathMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <rect width="32" height="32" rx="8" fill="var(--accent-soft)" />
      <path
        d="M7.2 10.2c3.3-1.4 6.1-.2 8.8 1.2 2.7-1.4 5.5-2.6 8.8-1.2v11.1c-3.3-1.4-6.1-.2-8.8 1.2-2.7-1.4-5.5-2.6-8.8-1.2V10.2Z"
        fill="none"
        stroke="var(--accent-deep)"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.4v11.1"
        stroke="var(--accent-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9.2 26.2c2.3-1.5 4.2.3 6.8-.1 2.6-.4 4.5-1.7 6.8-.1"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
    <span className={cn("inline-flex min-h-tap items-center gap-2.5", className)}>
      <BookPathMark
        className={cn("shrink-0", compact ? "h-8 w-8" : "h-9 w-9")}
      />
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-text-primary",
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

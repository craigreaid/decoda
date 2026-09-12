import { LITERACY_DISCLAIMER } from "@/lib/disclaimer";
import { cn } from "@/lib/cn";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-chrome text-sm leading-relaxed text-muted",
        className,
      )}
    >
      {LITERACY_DISCLAIMER}
    </p>
  );
}

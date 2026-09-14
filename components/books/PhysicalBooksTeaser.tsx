import { BrandLink } from "@/components/brand/BrandLink";
import { cn } from "@/lib/cn";

export function PhysicalBooksTeaser({ className }: { className?: string }) {
  return (
    <p className={cn("font-chrome text-sm leading-relaxed text-muted", className)}>
      <BrandLink
        href="/books"
        className="text-muted underline-offset-4 hover:text-text-primary hover:underline"
      >
        Physical books — coming soon
      </BrandLink>
    </p>
  );
}

import { BrandLink } from "@/components/brand/BrandLink";
import type { Story } from "@/lib/stories/types";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-paper p-4">
      <p className="font-chrome text-sm font-semibold text-accent-deep">
        Level {story.level}
      </p>
      <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-text-primary">
        {story.title}
      </h2>
      <p className="font-chrome mt-2 text-sm text-muted">
        {story.pages.length} pages · one page at a time
      </p>
      <BrandLink
        href={`/read/${story.slug}?page=1`}
        className="mt-5 inline-flex min-h-tap items-center justify-center self-start rounded-full bg-accent px-5 text-sm font-semibold text-[var(--on-accent)] no-underline"
      >
        Read
      </BrandLink>
    </article>
  );
}

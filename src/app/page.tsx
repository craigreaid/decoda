import { stories, summarize } from "@/data/stories";
import StoryCard from "@/components/StoryCard";
import ProgressBanner from "@/components/ProgressBanner";

export default function LibraryPage() {
  const summaries = stories.map(summarize);
  const phases = [...new Set(summaries.map((s) => s.phase))].sort((a, b) => a - b);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Decodable Stories Library
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Short, phonics-controlled stories for early readers. Each story only
          uses sounds a child has already been taught, so they can decode every
          word with confidence.
        </p>
      </div>

      <ProgressBanner />

      {phases.map((phase) => (
        <section key={phase} className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Phase {phase}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summaries
              .filter((s) => s.phase === phase)
              .map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

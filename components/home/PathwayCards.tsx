import { getBrandConfig } from "@/lib/brand/config";
import {
  PATHWAY_CARDS,
  PATHWAYS_HEADING,
  PATHWAYS_INTRO,
} from "@/lib/marketing";

export function PathwayCards() {
  return (
    <section aria-labelledby="pathways-heading">
      <h2
        id="pathways-heading"
        className="font-display text-2xl font-semibold tracking-tight text-text-primary"
      >
        {PATHWAYS_HEADING}
      </h2>
      <p className="prose-reading mt-3 text-text-primary">{PATHWAYS_INTRO}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {PATHWAY_CARDS.map((card) => {
          const theme = getBrandConfig(card.id).theme;
          return (
            <li key={card.id}>
              <a
                href={card.href}
                className="flex min-h-tap overflow-hidden rounded-2xl border border-line bg-paper no-underline"
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 shrink-0"
                  style={{ backgroundColor: theme.accent }}
                />
                <span className="flex flex-1 flex-col px-5 py-4">
                  <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
                    {card.name}
                    {card.kicker ? (
                      <span className="ml-2 font-chrome text-sm font-medium tracking-reading text-muted">
                        ({card.kicker})
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 text-base leading-reading tracking-reading text-text-primary">
                    {card.description}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

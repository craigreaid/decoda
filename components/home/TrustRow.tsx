import { TRUST_ITEMS } from "@/lib/marketing";

export function TrustRow() {
  return (
    <section aria-label="What to expect" className="border-t border-line pt-8">
      <ul className="grid gap-4 sm:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item}
            className="font-display text-base font-semibold leading-snug tracking-tight text-accent-deep"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

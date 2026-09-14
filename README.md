# Decoda

Decodable stories for kids learning to read and kids with dyslexia.

One Next.js app serves an umbrella hub plus three faith brands. The same reader chrome and canvas are tinted by CSS variables (`data-brand` on `<html>`).

| Brand        | Domain            | Brand id | MVP content      |
| ------------ | ----------------- | -------- | ---------------- |
| DecodaBooks  | decodabooks.com   | `books`  | Hub + coming soon |
| DecodaBible  | decodabible.com   | `bible`  | Level 1 stories  |
| DecodaQuran  | decodaquran.com   | `quran`  | Theme hooks only |
| DecodaTorah  | decodatorah.com   | `torah`  | Theme hooks only |

**decodabooks.com** is planned as the umbrella host: secular early-reader books plus pathways to the faith brands. Faith domains stay on their own sites. Physical print is previewed at `/books` (coming soon — not for sale yet).

Stories on faith brands are **adapted literacy content**, not scripture quotes. Those products always show:

> Adapted story for learning to read — not a scripture quote.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build:

```bash
npm run build
npm start
```

Requires Node 20+.

## Brand switching

Brand is resolved in this order:

1. `?brand=bible|quran|torah|books` (local/dev override, kept on in-app links)
2. `Host` header (`decodabible.com` → bible, `decodaquran.com` → quran, `decodatorah.com` → torah, `decodabooks.com` → books)
3. `BRAND` env (see `.env.example`)
4. Last-used `decoda-brand` cookie
5. `bible`

Examples:

- [http://localhost:3000/?brand=bible](http://localhost:3000/?brand=bible)
- [http://localhost:3000/library?brand=quran](http://localhost:3000/library?brand=quran)
- [http://localhost:3000/?brand=torah](http://localhost:3000/?brand=torah)
- [http://localhost:3000/?brand=books](http://localhost:3000/?brand=books)
- [http://localhost:3000/books](http://localhost:3000/books) — physical books coming-soon page

The home page also has a “Preview brands” row on faith brands. The DecodaBooks hub home links to Bible, Quran, and Torah with `?brand=`.

## Reader

- `/` — brand-aware landing (faith reader home, or DecodaBooks hub)
- `/library` — leveled story cards, filter by level, Read
- `/read/[slug]?page=N` — one page at a time; deep links restore the page
- `/books` — quiet Coming soon preview of physical bound books (single-story Level books and Level collections)
- Missing slugs send the reader back to `/library`
- After the last page, a praise screen returns to the library

Keyboard: `←` `→` `Enter` to move, `Esc` to close settings.

Parent settings (text size, reading font, line spacing, contrast, follow-along, reduce motion) live in `localStorage`, keyed by brand and device, until auth exists.

Audio is a pluggable `AudioEngine`. The MVP adapter uses `speechSynthesis`. Nothing autoplays.

## Add a story

1. Create `content/<brand>/<slug>.json` using the `Story` shape.
2. Export it from `content/<brand>/index.ts`.
3. Keep early-level pages short (about 40 words or fewer).
4. Write original decodable text. Do not paste a Bible, Quran, or Torah translation.

See `content/README.md`.

Quran, Torah, and Books folders are empty on purpose so later packs can drop in without changing the reader.

## Fonts

Body defaults to self-hosted **OpenDyslexic**. Chrome uses **Atkinson Hyperlegible**. The parent toggle also offers **Classic** (Inter). All three are SIL-OFL fonts; files live in `app/fonts/` with a license note.

## Out of scope for this MVP

Parent auth, kid profiles, payments, print ordering, CMS admin, Quran/Torah/secular story packs, attaching DNS for decodabooks.com, and native apps.

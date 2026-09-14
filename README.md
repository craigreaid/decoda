# Decoda

A calm multi-brand reader for kids learning to read and kids with dyslexia.

One Next.js app serves four brands. Shared cream, paper, and ink tokens stay the same; `data-brand` on `<html>` tints accents.

| Brand        | Domain            | Brand id | Content                          |
| ------------ | ----------------- | -------- | -------------------------------- |
| DecodaBooks  | decodabooks.com   | `books`  | Hub + secular pack (coming soon) |
| DecodaBible  | decodabible.com   | `bible`  | Level 1 stories                  |
| DecodaQuran  | decodaquran.com   | `quran`  | Theme shell                      |
| DecodaTorah  | decodatorah.com   | `torah`  | Theme shell                      |

Faith-brand stories are **adapted literacy content**, not scripture quotes. Those brands show:

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

1. `?brand=books|bible|quran|torah` (local/dev override, kept on in-app links)
2. `Host` header (`decodabooks.com` → books, `decodabible.com` → bible, `decodaquran.com` → quran, `decodatorah.com` → torah)
3. `BRAND` env (see `.env.example`)
4. Last-used `decoda-brand` cookie
5. `books`

Examples:

- [http://localhost:3000/](http://localhost:3000/) — DecodaBooks hub
- [http://localhost:3000/?brand=bible](http://localhost:3000/?brand=bible)
- [http://localhost:3000/library?brand=quran](http://localhost:3000/library?brand=quran)
- [http://localhost:3000/?brand=torah](http://localhost:3000/?brand=torah)

## Reader

- `/` — brand-aware landing (Books hub, or a faith-brand home)
- `/library` — leveled story cards, filter by level, Read
- `/read/[slug]?page=N` — one page at a time; deep links restore the page
- `/books` — physical bound books, coming soon
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

Quran, Torah, and DecodaBooks folders can stay empty until a pack is ready. The reader chrome is already wired.

## Fonts

Marketing chrome uses **Nunito** (display) and **Lexend** (body/UI) via `next/font/google`.

The reader still defaults to self-hosted **OpenDyslexic**. Parent settings also offer **Atkinson Hyperlegible** and **Classic** (Inter). Those three are SIL-OFL fonts; files live in `app/fonts/` with a license note.

## Out of scope for this MVP

Parent auth, kid profiles, payments, CMS admin, Quran/Torah/Books story packs, print fulfillment, and native apps.

# Story packs

Add decodable stories as JSON modules under the brand folder, then export them from that folder’s `index.ts`.

```
content/
  bible/          # shipped in this MVP
  quran/          # empty hook — add packs later
  torah/          # empty hook — add packs later
  books/          # secular DecodaBooks packs later
  registry.ts     # brand → stories map
```

## Story shape

```ts
{
  slug: string;
  title: string;
  level: number;
  brand: "bible" | "quran" | "torah" | "books";
  pages: Array<{
    id: string;
    body: string;
    focusWords?: string[];
    illustrationUrl?: string;
  }>;
}
```

Early levels should stay near 40 words per page or fewer. Write original literacy adaptations — do not paste scripture translations.

Register a new file in `content/<brand>/index.ts`. The library and reader pick it up from `content/registry.ts`.

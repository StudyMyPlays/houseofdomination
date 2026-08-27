# Product photography

Drop product photos here, then flip the matching `media` line in
`lib/site-config.ts` from `{ kind: "garment", ... }` (or `"placeholder"`) to:

```ts
media: { kind: "image", src: "/products/domi-nation-flame-jort.jpg", alt: "…" }
```

Nothing else changes — every call site already renders `kind: "image"` through
`next/image` with a required `alt`, and each product in `site-config.ts` carries
a `TODO` with its exact swap line pre-written.

## Expected filenames

| File | Product |
| --- | --- |
| `domi-nation-flame-jort.jpg` | Domi Nation Flame Jort — jet black, front |
| `flame-jort-washed.jpg` | Flame Jort — washed black, back with DN pocket monogram |
| `sovereign-jean.jpg` | The Sovereign Jean |
| `rhinestone-trucker.jpg` | HOD Rhinestone Trucker |
| `domination-hoodie.jpg` | Domination Hoodie |
| `house-sweatpant.jpg` | The House Sweatpant |
| `house-tee.jpg` | The House Tee |
| `black-on-ivory-tee.jpg` | Black on Ivory Tee |

## Specs

- **Aspect ratio** 4:5 — cards crop with `object-cover`, so anything else loses
  edges. Lookbook panels are 3:4.
- **Size** 1600 × 2000 is plenty; the grid never serves more than 25vw.
- **Format** `.jpg` for photography, `.webp` if you have it (update the
  extension in the `src`). Next.js re-encodes and sizes at request time.
- **Ground** shoot on ivory (`#f1eee7`) or obsidian (`#0c0c0c`) so cards sit in
  the palette rather than fighting it.
- Write a real `alt` describing the garment, colourway, and view — not
  "product photo".

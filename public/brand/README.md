# Brand assets

These SVGs are **generated** — do not hand-edit them. The path data lives in
`lib/brand-mark.ts`; change it there and re-run:

```sh
pnpm brand
```

| File | Use |
| --- | --- |
| `hod-seal-ivory.svg` | Primary lockup — ivory mark on obsidian |
| `hod-seal-obsidian.svg` | Inverted, for light collateral and packaging |
| `hod-seal.svg` | Transparent ground, `currentColor` — for inlining |
| `hod-mark.svg` | Bare HD monogram, no type ring — small sizes, embroidery |

## In the app, use the components

Prefer the React components over these files anywhere inside the app — they
inherit `currentColor` and carry the accessible name:

- `<Monogram variant="seal" />` — the circular seal.
- `<Monogram variant="mark" />` — the bare HD monogram.
- `<Wordmark subline="Black on Ivory" />` — the signature wordmark, set live in
  the script face (`--font-script`) rather than shipped as a raster, so it stays
  sharp, reflows, and is selectable.

The static files here are for surfaces outside React: email, decks, print,
socials, and anything that needs a URL.

The favicon, apple-icon, and OG image in `app/` render from the same
`lib/brand-mark.ts` source, so all three surfaces stay in step.

/**
 * Single source of truth for the House of Domination seal.
 *
 * The path data lives here so the React component (components/brand/Monogram),
 * the generated favicon/apple-icon/OG images, and the standalone SVG files in
 * public/brand/ all draw the same mark. Change a stroke here, run `pnpm brand`,
 * and every surface follows.
 *
 * Geometry, on a 200 × 200 canvas centred at (100, 100):
 * - Type sits in a band between r=76 and r=91.
 * - The HD mark is scaled to clear that band.
 */
export const HD_MARK_PATHS = [
  // H — left stem
  "M62 58c3.4-.7 6.6-.2 7.3 1.4 2.6 6 3.4 24 2.6 44.5-.7 18.4-2.4 33.6-4.6 38.4-1 2.2-4.9 2.5-7 .6-1.4-1.3-1.6-4-1.2-11.4.9-16 2.2-49.4 2-62.9 0-6.7.2-9.6 1-10.6Z",
  // H — right stem, cut longer and driest at the tail
  "M97 50c3.6-1.2 6.7-.4 7.3 1.6 2.3 7.2 2.7 27.6 1.3 51.4-1.2 20.9-3.2 37.3-5.5 42-1.1 2.2-5 2.2-6.9.1-1.3-1.4-1.4-4.2-.7-12.2 1.5-17.6 3.4-54.5 3.4-70.9 0-8.6.3-11.3 1.1-12Z",
  // H — crossbar
  "M52 96c14.4-2.6 40.6-4.4 55.6-3.8 3.3.1 4.4 1 4 3.4-.5 3-2 3.9-7.4 4.4-13.4 1.2-38.7 2.6-49.5 2.7-4.7 0-6.2-.7-6.1-3 0-2 .8-3.2 3.4-3.7Z",
  // D — stem, topped where the bowl springs so the letter reads D and not b
  "M118 50c4-1 7 0 8 2 3 8 3 34 1 62-2 23-4 40-7 45-1 2-5 2-7 0-1-2-2-4-1-13 2-19 4-59 4-80 0-11 1-15 2-16Z",
  // D — bowl. It has to return to the stem near the baseline; stop it short and
  // the letter reads P.
  "M122 54c20-3 37 6 44 22 8 19 2 45-15 61-11 11-26 15-36 12-3-1-4-3-3-6 1-3 4-3 8-2 10 1 19-3 26-11 14-13 19-35 11-50-6-11-17-16-33-14-5 1-7 0-8-4 0-3 2-6 6-8Z",
] as const;

/**
 * The mark's own bounding box is off-centre and larger than the ring's inner
 * clearance, so the seal transform recentres and shrinks it; the bare mark only
 * needs recentring.
 */
const MARK_TRANSFORM = {
  seal: "translate(100 100) scale(0.70) translate(-107 -99)",
  mark: "translate(100 100) scale(0.98) translate(-107 -99)",
} as const;

export type MarkVariant = keyof typeof MARK_TRANSFORM;

export function markTransform(variant: MarkVariant) {
  return MARK_TRANSFORM[variant];
}

/**
 * Arcs for the type ring.
 *
 * `top` starts at 6 o'clock and sweeps clockwise, so its 50% point is 12 o'clock
 * with the tangent running left-to-right — text there reads upright. `bottom`
 * starts at 12 o'clock and sweeps anticlockwise for the same reason at 6
 * o'clock. Both are set with startOffset="50%" and textAnchor="middle".
 *
 * The radii differ (76 vs 91) because glyphs grow outward from the top arc and
 * inward from the bottom one; this puts both words in the same 76–91 band.
 */
export const RING_ARCS = {
  top: "M100 176 A76 76 0 0 1 100 24 A76 76 0 0 1 100 176",
  bottom: "M100 9 A91 91 0 0 0 100 191 A91 91 0 0 0 100 9",
} as const;

export const RING_TEXT = { top: "HOUSE OF", bottom: "DOMINATION" } as const;

/** Flanking dots, centred in the type band. */
export const RING_DOTS = [
  { cx: 17, cy: 100 },
  { cx: 183, cy: 100 },
] as const;

type BadgeOptions = {
  /** Mark and type colour. */
  fg: string;
  /** Ground; omit for a transparent badge. */
  bg?: string;
  /** Omit the circular type ring, leaving the bare HD mark. */
  ring?: boolean;
};

/**
 * The badge as a standalone SVG string — used to write public/brand/*.svg and
 * to feed the satori-rendered icons, which take SVG through a data URI.
 */
export function badgeSvg({ fg, bg = "none", ring = true }: BadgeOptions) {
  const variant: MarkVariant = ring ? "seal" : "mark";
  const ground = bg === "none" ? "" : `<rect width="200" height="200" fill="${bg}"/>`;

  const type = ring
    ? `<defs>
    <path id="hod-t" d="${RING_ARCS.top}"/>
    <path id="hod-b" d="${RING_ARCS.bottom}"/>
  </defs>
  <g fill="${fg}" font-family="Georgia, 'Times New Roman', serif" font-size="21" letter-spacing="4.2">
    <text><textPath href="#hod-t" startOffset="50%" text-anchor="middle">${RING_TEXT.top}</textPath></text>
    <text><textPath href="#hod-b" startOffset="50%" text-anchor="middle">${RING_TEXT.bottom}</textPath></text>
  </g>
  ${RING_DOTS.map((d) => `<circle cx="${d.cx}" cy="${d.cy}" r="5" fill="${fg}"/>`).join("")}`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="House of Domination">
  ${ground}
  ${type}
  <g fill="${fg}" transform="${markTransform(variant)}">${HD_MARK_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g>
</svg>`;
}

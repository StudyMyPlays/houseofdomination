import type { GarmentVariant } from "@/components/ui/Garment";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteName = "House of Domination";
export const tagline = "Built to be witnessed.";
export const siteDescription =
  "House of Domination. Rhinestone denim, elevated essentials, and pieces built to be witnessed.";

export const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "The House" },
  { href: "#lookbook", label: "Lookbook" },
] as const;

/**
 * Product/lookbook visuals come in three kinds:
 * - "garment": the house vector forms (see components/ui/Garment) — used for
 *   pieces we can render truthfully without photography.
 * - "placeholder": an abstract gradient stand-in.
 * - "image": real photography. Drop files in `public/products/` (see the README
 *   there for the expected filenames) and swap the one `media` line — every
 *   call site already renders it through next/image with a required alt.
 */
export type ProductMedia =
  | { kind: "placeholder"; from: string; via: string; to: string; angle: number; motif: 1 | 2 | 3 }
  | { kind: "garment"; variant: GarmentVariant; colorway: "black" | "ivory"; from: string; to: string }
  | { kind: "image"; src: string; alt: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  tag: string;
  collection: string;
  media: ProductMedia;
};

export function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}

export const products: Product[] = [
  {
    id: "domi-nation-flame-jort",
    name: "Domi Nation Flame Jort",
    price: 215,
    tag: "New arrival",
    collection: "Rhinestone denim",
    // TODO: swap to { kind: "image", src: "/products/domi-nation-flame-jort.jpg", alt: "Domi Nation Flame Jort in jet black denim with red and silver rhinestone side flames" } once photography is in public/products/.
    media: { kind: "garment", variant: "shorts", colorway: "black", from: "#1d1d1d", to: "#050505" },
  },
  {
    id: "flame-jort-washed",
    name: "Flame Jort — Washed",
    price: 215,
    tag: "New arrival",
    collection: "Rhinestone denim",
    // TODO: swap to { kind: "image", src: "/products/flame-jort-washed.jpg", alt: "Flame Jort in washed black denim, back view with the DN pocket monogram" } once photography is in public/products/.
    media: { kind: "garment", variant: "shorts", colorway: "ivory", from: "#3d3b38", to: "#171614" },
  },
  {
    id: "sovereign-jean",
    name: "The Sovereign Jean",
    price: 240,
    tag: "Best seller",
    collection: "Rhinestone denim",
    // TODO: swap to { kind: "image", src: "/products/sovereign-jean.jpg", alt: "The Sovereign Jean, rhinestone-embellished denim" } once photography is in public/products/.
    media: { kind: "placeholder", from: "#273344", via: "#10151d", to: "#8793a2", angle: 135, motif: 1 },
  },
  {
    id: "rhinestone-trucker",
    name: "HOD Rhinestone Trucker",
    price: 180,
    tag: "New arrival",
    collection: "Signature collection",
    // TODO: swap to { kind: "image", src: "/products/rhinestone-trucker.jpg", alt: "HOD Rhinestone Trucker jacket" } once photography is in public/products/.
    media: { kind: "garment", variant: "jacket", colorway: "black", from: "#2c2b28", to: "#0a0a0a" },
  },
  {
    id: "domination-hoodie",
    name: "Domination Hoodie",
    price: 120,
    tag: "Limited",
    collection: "Elevated essentials",
    // TODO: swap to { kind: "image", src: "/products/domination-hoodie.jpg", alt: "Domination Hoodie" } once photography is in public/products/.
    media: { kind: "garment", variant: "hoodie", colorway: "black", from: "#303030", to: "#0b0b0b" },
  },
  {
    id: "house-sweatpant",
    name: "The House Sweatpant",
    price: 110,
    tag: "Essential",
    collection: "Elevated essentials",
    // TODO: swap to { kind: "image", src: "/products/house-sweatpant.jpg", alt: "The House Sweatpant" } once photography is in public/products/.
    media: { kind: "garment", variant: "sweats", colorway: "black", from: "#26262a", to: "#08080a" },
  },
  {
    id: "house-tee",
    name: "The House Tee",
    price: 75,
    tag: "Essential",
    collection: "Elevated essentials",
    // TODO: swap to { kind: "image", src: "/products/house-tee.jpg", alt: "The House Tee" } once photography is in public/products/.
    media: { kind: "garment", variant: "tee", colorway: "ivory", from: "#efeadf", to: "#b6afa2" },
  },
  {
    id: "black-on-ivory-tee",
    name: "Black on Ivory Tee",
    price: 80,
    tag: "New arrival",
    collection: "Elevated essentials",
    // TODO: swap to { kind: "image", src: "/products/black-on-ivory-tee.jpg", alt: "Black on Ivory Tee" } once photography is in public/products/.
    media: { kind: "garment", variant: "tee", colorway: "black", from: "#232323", to: "#070707" },
  },
];

/** The forms that rotate through the hero, in carousel order. */
export const heroGarments: {
  id: string;
  variant: GarmentVariant;
  colorway: "black" | "ivory";
  label: string;
  caption: string;
}[] = [
  { id: "hoodie", variant: "hoodie", colorway: "black", label: "Hoodie", caption: "Heavyweight fleece, set-stone chest" },
  { id: "jort", variant: "shorts", colorway: "black", label: "Jort", caption: "Rhinestone flames, hand-set hem fade" },
  { id: "tee", variant: "tee", colorway: "ivory", label: "Tee", caption: "Boxed cotton, ivory run" },
  { id: "sweats", variant: "sweats", colorway: "black", label: "Sweats", caption: "Relaxed leg, banded cuff" },
  { id: "jacket", variant: "jacket", colorway: "black", label: "Trucker", caption: "Structured denim, stoned placket" },
];

export const lookbookPanels: { id: string; number: string; media: ProductMedia }[] = [
  {
    id: "look-01",
    number: "01",
    media: { kind: "placeholder", from: "#a69b91", via: "#353434", to: "#111111", angle: 160, motif: 2 },
  },
  {
    id: "look-02",
    number: "02",
    media: { kind: "placeholder", from: "#1a1d2b", via: "#2946d3", to: "#d8d1c4", angle: 30, motif: 3 },
  },
];

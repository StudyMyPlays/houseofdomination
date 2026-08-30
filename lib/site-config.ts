import type { GarmentVariant } from "@/components/ui/Garment";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteName = "House of Domination";
export const tagline = "Built to be witnessed.";
export const siteDescription =
  "House of Domination. Rhinestone denim, elevated essentials, and pieces built to be witnessed.";

export const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "The House" },
  { href: "#entrance", label: "Make an Entrance" },
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
    media: { kind: "image", src: "/products/merch-example-1.jpg", alt: "Black denim flame shorts with rhinestone detailing" },
  },
  {
    id: "flame-jort-studio-set",
    name: "Flame Jort — Studio Set",
    price: 215,
    tag: "New arrival",
    collection: "Rhinestone denim",
    media: { kind: "image", src: "/products/merch-example-2.jpg", alt: "Front and back views of black rhinestone flame shorts" },
  },
];

/** The photographed pieces that rotate through the hero, in carousel order. */
export const heroGarments = [
  { id: "flame-jort-front", src: "/products/merch-example-1.jpg", alt: "Black rhinestone flame shorts", label: "Flame Jort", caption: "Rhinestone flames, hand-set hem fade" },
  { id: "flame-jort-set", src: "/products/merch-example-2.jpg", alt: "Front and back views of black rhinestone flame shorts", label: "The Studio Set", caption: "One piece, two signatures" },
] as const;

export const lookbookPanels: { id: string; number: string; media: ProductMedia }[] = [
  { id: "look-01", number: "01", media: { kind: "image", src: "/products/merch-example-1.jpg", alt: "Black rhinestone flame shorts" } },
  { id: "look-02", number: "02", media: { kind: "image", src: "/products/merch-example-2.jpg", alt: "Front and back views of black rhinestone flame shorts" } },
];

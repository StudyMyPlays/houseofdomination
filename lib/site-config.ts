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
 * Product/lookbook visuals are abstract placeholders until real photography exists.
 * The "image" variant is the documented future swap point — components render it
 * with next/image and a required alt, so adding real photos needs no markup changes.
 */
export type ProductMedia =
  | { kind: "placeholder"; from: string; via: string; to: string; angle: number; motif: 1 | 2 | 3 }
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
    id: "sovereign-jean",
    name: "The Sovereign Jean",
    price: 240,
    tag: "Best seller",
    collection: "Signature collection",
    // TODO: swap to { kind: "image", src: "/products/sovereign-jean.jpg", alt: "The Sovereign Jean, rhinestone-embellished denim" } once photography is available.
    media: { kind: "placeholder", from: "#273344", via: "#10151d", to: "#8793a2", angle: 135, motif: 1 },
  },
  {
    id: "rhinestone-trucker",
    name: "HOD Rhinestone Trucker",
    price: 180,
    tag: "New arrival",
    collection: "Signature collection",
    // TODO: swap to { kind: "image", src: "/products/rhinestone-trucker.jpg", alt: "HOD Rhinestone Trucker jacket" } once photography is available.
    media: { kind: "placeholder", from: "#d2c7b7", via: "#6b625a", to: "#eee9df", angle: 135, motif: 2 },
  },
  {
    id: "domination-hoodie",
    name: "Domination Hoodie",
    price: 120,
    tag: "Limited",
    collection: "Signature collection",
    // TODO: swap to { kind: "image", src: "/products/domination-hoodie.jpg", alt: "Domination Hoodie" } once photography is available.
    media: { kind: "placeholder", from: "#343434", via: "#0b0b0b", to: "#5d5d5d", angle: 135, motif: 3 },
  },
  {
    id: "house-tee",
    name: "The House Tee",
    price: 75,
    tag: "Essential",
    collection: "Signature collection",
    // TODO: swap to { kind: "image", src: "/products/house-tee.jpg", alt: "The House Tee" } once photography is available.
    media: { kind: "placeholder", from: "#eee8dc", via: "#9a938a", to: "#1c1c1c", angle: 135, motif: 1 },
  },
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

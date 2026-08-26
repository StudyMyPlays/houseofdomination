import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { formatPrice, type Product } from "@/lib/site-config";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <PlaceholderMedia media={product.media} className="absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 border border-ivory/30 opacity-0 transition-opacity duration-200 ease [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
        />
        <span className="absolute left-4 top-4 border border-ivory/10 bg-obsidian/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[.15em] text-ivory backdrop-blur-sm">
          {product.tag}
        </span>
        <AddToCartButton
          product={product}
          className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-200 ease focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        />
      </div>
      <div className="flex items-start justify-between gap-4 py-4">
        <div>
          <h3 className="font-serif text-xl italic">{product.name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-rhinestone">{product.collection}</p>
        </div>
        <p className="font-mono text-xs">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}

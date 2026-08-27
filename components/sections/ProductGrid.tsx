import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/site-config";

export function ProductGrid() {
  return (
    <section id="shop" className="bg-ivory px-5 py-20 text-obsidian md:px-10 md:py-28">
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.25em] text-blood">01 / The drop</p>
        <h2 className="mt-3 font-serif text-5xl italic tracking-tight md:text-7xl">New arrivals</h2>
      </div>
      <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

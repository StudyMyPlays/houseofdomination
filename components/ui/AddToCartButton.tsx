"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useCart } from "@/components/providers/CartProvider";
import type { Product } from "@/lib/site-config";

export function AddToCartButton({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={cn(
        "border border-ivory/10 bg-obsidian/80 px-4 py-2 font-mono text-[9px] uppercase tracking-[.18em] text-ivory backdrop-blur-sm transition-[background-color,transform] duration-150 ease active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-obsidian",
        className,
      )}
    >
      {justAdded ? "Added ✓" : "Add to cart"}
    </button>
  );
}

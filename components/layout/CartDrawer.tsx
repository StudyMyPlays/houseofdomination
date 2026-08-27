"use client";

import { useDialog } from "@/hooks/useDialog";
import { useCart } from "@/components/providers/CartProvider";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { formatPrice } from "@/lib/site-config";
import { cn } from "@/lib/cn";

const OUTLINE_BUTTON =
  "border border-ivory/70 px-6 py-3 font-mono text-[10px] uppercase tracking-[.2em] text-ivory transition-[background-color,color,transform] duration-150 ease active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ivory [@media(hover:hover)_and_(pointer:fine)]:hover:text-obsidian";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const panelRef = useDialog(open, onClose);
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-obsidian/70 backdrop-blur-sm transition-opacity duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        inert={!open}
        style={{ transformOrigin: "right" }}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[90vw] max-w-[420px] flex-col bg-card text-ivory transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span id="cart-drawer-title" className="font-mono text-[10px] uppercase tracking-[.2em] text-rhinestone">
            Cart {items.length > 0 && `(${items.reduce((n, i) => n + i.quantity, 0)})`}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="font-mono text-[10px] uppercase tracking-[.2em] transition-transform duration-150 ease active:scale-[0.97]"
          >
            Close ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl italic">Your cart is empty.</p>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
              Add something built to be witnessed.
            </p>
            <button type="button" onClick={onClose} className={cn(OUTLINE_BUTTON, "mt-2")}>
              Continue shopping
            </button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6 py-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                <PlaceholderMedia media={item.product.media} className="h-20 w-16 shrink-0" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-serif text-base italic">{item.product.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[.15em] text-rhinestone">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.15em]">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="transition-transform duration-150 ease active:scale-[0.97]"
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.product.name}`}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="transition-transform duration-150 ease active:scale-[0.97]"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-blood transition-transform duration-150 ease active:scale-[0.97]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[.15em]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button type="button" onClick={onClose} className={cn(OUTLINE_BUTTON, "mt-4 w-full")}>
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

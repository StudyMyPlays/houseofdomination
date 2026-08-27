"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/lib/site-config";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Client-side, in-memory cart only — no persistence and no backend/checkout.
 * State resets on refresh; wiring this to real commerce is out of scope here.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) return current.filter((item) => item.product.id !== productId);
      return current.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
    });
  }, []);

  const count = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.quantity * item.product.price, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, updateQuantity }),
    [items, count, subtotal, addItem, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

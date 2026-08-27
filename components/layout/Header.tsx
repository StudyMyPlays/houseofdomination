"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { navLinks, siteName } from "@/lib/site-config";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { useCart } from "@/components/providers/CartProvider";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/layout/CartDrawer";

const ANNOUNCEMENT = "Free shipping on orders over $150 — worldwide delivery";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <header className="relative z-20 text-ivory">
      <div className="h-8 overflow-hidden border-b border-border bg-blood text-center font-mono text-[10px] uppercase tracking-[.24em]">
        <p className="sr-only">{ANNOUNCEMENT}</p>
        <div aria-hidden="true" className="marquee-track flex w-max items-center gap-12 whitespace-nowrap py-2">
          <span>{ANNOUNCEMENT}</span>
          <span>✦</span>
          <span>{ANNOUNCEMENT}</span>
          <span>✦</span>
        </div>
      </div>
      <div className="absolute inset-x-0 top-8 flex w-full items-center justify-between px-5 py-5 md:px-10">
        <Link href="#top" aria-label={`${siteName} — home`} className="flex items-center gap-3">
          {/* Bare mark in the bar — the seal's type ring is illegible below ~48px. */}
          <Monogram variant="mark" title="" className="h-8 w-8 shrink-0 text-ivory" />
          <Wordmark className="hidden text-2xl text-ivory sm:inline-flex" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[.2em] md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.2em]">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={cartOpen}
            onClick={() => setCartOpen(true)}
            className="hidden transition-transform duration-150 ease active:scale-[0.97] sm:block"
          >
            Cart ({count})
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
            className="transition-transform duration-150 ease active:scale-[0.97] md:hidden"
          >
            Menu
          </button>
        </div>
      </div>
      <MobileNav id="mobile-nav" open={menuOpen} onClose={closeMenu} />
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </header>
  );
}

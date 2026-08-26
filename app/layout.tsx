import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, Geist_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "House of Domination — Built to be witnessed",
  description: "House of Domination. Rhinestone denim, elevated essentials, and pieces built to be witnessed.",
};

function Header() {
  return <>
    <div className="h-8 overflow-hidden border-b border-border bg-blood text-center font-mono text-[10px] uppercase tracking-[.24em] text-ivory"><div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap py-2">FREE SHIPPING ON ORDERS OVER $150 <span>✦</span> WORLDWIDE DELIVERY <span>✦</span> FREE SHIPPING ON ORDERS OVER $150 <span>✦</span> WORLDWIDE DELIVERY <span>✦</span></div></div>
    <header className="absolute top-8 z-20 flex w-full items-center justify-between px-5 py-5 text-ivory md:px-10">
      <a href="#top" className="font-mono text-xs font-bold tracking-[.2em]">H/D</a>
      <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[.2em] md:flex"><a href="#shop">Shop</a><a href="#story">The House</a><a href="#lookbook">Lookbook</a></nav>
      <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.2em]"><a href="#shop" className="hidden sm:block">Cart (0)</a><button aria-label="Open menu" className="md:hidden">Menu</button></div>
    </header>
  </>;
}
function Footer() { return <footer className="border-t border-border px-5 py-10 md:px-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-rhinestone">House of Domination</p><p className="mt-3 font-serif text-3xl italic">Built to be witnessed.</p></div><div className="flex gap-6 font-mono text-[10px] uppercase tracking-[.15em] text-rhinestone"><a href="#top">Instagram</a><a href="#top">Terms</a><a href="#top">Contact</a></div></div><p className="mt-16 font-mono text-[9px] uppercase tracking-[.15em] text-rhinestone/60">© 2024 HOD. All rights reserved.</p></footer>; }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${archivo.variable} ${bodoni.variable} ${mono.variable} bg-background`}><body><Header />{children}<Footer /></body></html>; }

import Link from "next/link";
import { siteName, tagline } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-rhinestone">{siteName}</p>
          <p className="mt-3 font-serif text-3xl italic">{tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex gap-6 font-mono text-[10px] uppercase tracking-[.15em] text-rhinestone">
          <Link href="#top">Instagram</Link>
          <Link href="#top">Terms</Link>
          <Link href="#top">Contact</Link>
        </nav>
      </div>
      <p className="mt-16 font-mono text-[9px] uppercase tracking-[.15em] text-rhinestone/60">
        © {new Date().getFullYear()} HOD. All rights reserved.
      </p>
    </footer>
  );
}

import Link from "next/link";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { siteName, tagline } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 md:px-10">
      <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
        <div>
          <Wordmark subline="Black on Ivory" className="items-start text-4xl text-ivory" sublineClassName="text-rhinestone" />
          <p className="mt-6 font-serif text-3xl italic text-rhinestone">{tagline}</p>
        </div>

        <div className="flex flex-col gap-8 md:items-end">
          <WaitlistForm className="md:text-right" />
          <nav aria-label="Footer" className="flex gap-6 font-mono text-[10px] uppercase tracking-[.15em] text-rhinestone">
            <Link href="#top">Instagram</Link>
            <Link href="#top">Terms</Link>
            <Link href="#top">Contact</Link>
          </nav>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between gap-6">
        <p className="font-mono text-[9px] uppercase tracking-[.15em] text-rhinestone/60">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
        <Monogram variant="seal" title="" className="h-14 w-14 shrink-0 text-ivory/30" />
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { siteName, tagline } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 md:px-10">
      <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
        <div>
          <Image src="/logo-primary.png" alt="House of Domination — Black on Ivory" width={420} height={180} className="h-auto w-72 object-contain object-left" />
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
        <Image src="/logo-secondary.png" alt="House of Domination secondary emblem" width={96} height={96} className="size-16 shrink-0 rounded-full object-cover opacity-70" />
      </div>
    </footer>
  );
}

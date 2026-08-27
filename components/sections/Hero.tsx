import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GarmentStage } from "@/components/ui/GarmentStage";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-graphite px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,#4a463f_0%,#202020_38%,#0a0a0a_78%)] opacity-90"
      />
      {/* A single raking highlight, angled across the stage like a studio strip light. */}
      <div
        aria-hidden="true"
        className="absolute right-[6%] top-[-10%] h-[70vw] w-[22vw] rotate-12 bg-[linear-gradient(100deg,transparent_18%,rgba(201,192,177,.28)_48%,transparent_74%)] blur-[2px]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        <div className="lg:pr-6">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[.3em] text-electric-blue">
            Vol. 04 — The Sovereign Collection
          </p>

          <h1 className="font-serif text-[clamp(3.6rem,10vw,9rem)] leading-[.78] tracking-[-.07em]">
            Built to
            <br />
            <span className="ml-[9vw] italic text-rhinestone lg:ml-[5vw]">be</span>
            <br />
            witnessed.
          </h1>

          <p className="mt-8 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[.1em] text-rhinestone">
            Rhinestone denim and elevated essentials for the ones who refuse to blend in.
          </p>

          <div className="mt-9">
            <WaitlistForm />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href="#shop">Shop the drop</Button>
            <p className="font-mono text-[9px] uppercase tracking-[.2em] text-rhinestone/70">
              Vol. 05 · Waitlist open
            </p>
          </div>
        </div>

        <div className="relative">
          {/* The signature, ghosted behind the stage as a watermark. */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2">
            <Image src="/logo-secondary.png" alt="" aria-hidden="true" width={420} height={420} className="size-[clamp(10rem,28vw,24rem)] rounded-full object-cover opacity-[.07]" />
          </div>
          <GarmentStage className="relative z-10" />
        </div>
      </div>

      <p className="relative z-10 mt-12 hidden text-right font-mono text-[9px] uppercase tracking-[.2em] text-rhinestone md:block">
        Scroll to enter <span className="ml-3">↓</span>
      </p>
    </section>
  );
}

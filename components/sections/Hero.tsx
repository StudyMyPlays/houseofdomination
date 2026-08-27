import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="grain relative flex min-h-[90vh] items-end overflow-hidden bg-graphite px-5 pb-10 pt-32 md:min-h-screen md:px-10 md:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_36%,#555149_0%,#242424_33%,#0c0c0c_73%)] opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[19%] h-[46vw] w-[26vw] rotate-12 border border-rhinestone/20 bg-[linear-gradient(100deg,transparent_20%,#c9c0b1_48%,#303030_54%,transparent_72%)] opacity-50 blur-[1px]"
      />
      <div className="relative z-10 max-w-5xl">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[.3em] text-rhinestone">
          Vol. 04 — The Sovereign Collection
        </p>
        <h1 className="max-w-4xl font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[.76] tracking-[-.08em]">
          Built to
          <br />
          <span className="ml-[12vw] italic text-rhinestone">be</span>
          <br />
          witnessed.
        </h1>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Button href="#shop">Shop the drop</Button>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[.1em] text-rhinestone">
            Rhinestone denim and elevated essentials for the ones who refuse to blend in.
          </p>
        </div>
      </div>
      <p className="absolute bottom-8 right-10 hidden font-mono text-[9px] uppercase tracking-[.2em] text-rhinestone md:block">
        Scroll to enter <span className="ml-3">↓</span>
      </p>
    </section>
  );
}

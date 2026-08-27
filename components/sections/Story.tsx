import { Sparkle } from "@/components/ui/Sparkle";
import { Button } from "@/components/ui/Button";

export function Story() {
  return (
    <section id="story" className="bg-blood px-5 py-24 text-ivory md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Sparkle className="text-4xl" />
          <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[.22em]">03 / The house</p>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <h2 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[.82] tracking-[-.05em]">
            Not made for
            <br />
            <span className="italic text-rhinestone">the background.</span>
          </h2>
          <p className="mt-10 max-w-lg font-mono text-xs uppercase leading-[1.8] tracking-[.12em] text-ivory/80">
            House of Domination is a uniform for the unapologetic. Every piece is cut with intention, finished by
            hand, and made to take up space. We believe your clothes should enter the room before you do.
          </p>
          <div className="mt-10">
            <Button href="#shop">Shop the collection</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

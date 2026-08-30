import Image from "next/image";
import { lookbookPanels, type ProductMedia } from "@/lib/site-config";

export function Lookbook() {
  return (
    <section id="entrance" aria-labelledby="entrance-title" className="bg-obsidian px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-blood">02 / The entrance</p>
          <h2 id="entrance-title" className="mt-4 font-serif text-6xl italic leading-[.85] md:text-8xl">
            Make an
            <br />
            entrance.
          </h2>
          <p className="mt-8 max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[.12em] text-rhinestone">
            For late nights, bright lights, and every room that needs a little more presence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {lookbookPanels.map((panel, index) => {
            const media = panel.media as Extract<ProductMedia, { kind: "image" }>;
            return (
            <div
              key={panel.id}
              className={`relative aspect-[3/4] overflow-hidden border border-ivory/10 bg-obsidian${index === 1 ? " sm:mt-8" : ""}`}
            >
              <Image src={media.src} alt={media.alt} fill sizes="(min-width: 768px) 36vw, 90vw" className="object-contain p-3" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,rgba(158,27,33,.16),transparent_45%,rgba(35,87,214,.18))]" />
              <span aria-hidden="true" className="absolute bottom-5 left-5 font-serif text-5xl italic text-ivory/80">{panel.number}</span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

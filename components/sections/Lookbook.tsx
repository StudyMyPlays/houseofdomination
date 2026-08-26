import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { lookbookPanels } from "@/lib/site-config";

export function Lookbook() {
  return (
    <section id="lookbook" className="bg-obsidian px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-blood">02 / Lookbook</p>
          <h2 className="mt-4 font-serif text-6xl italic leading-[.85] md:text-8xl">
            Make an
            <br />
            entrance.
          </h2>
          <p className="mt-8 max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[.12em] text-rhinestone">
            For late nights, bright lights, and every room that needs a little more presence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {lookbookPanels.map((panel, index) => (
            <PlaceholderMedia
              key={panel.id}
              media={panel.media}
              className={`relative aspect-[3/4]${index === 1 ? " sm:mt-8" : ""}`}
            >
              <span aria-hidden="true" className="absolute bottom-5 left-5 font-serif text-5xl italic text-ivory/80">
                {panel.number}
              </span>
            </PlaceholderMedia>
          ))}
        </div>
      </div>
    </section>
  );
}

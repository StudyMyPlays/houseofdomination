import Image from "next/image";
import { cn } from "@/lib/cn";
import { heroGarments } from "@/lib/site-config";

/**
 * The hero's product stage: a single, still shot of the lead piece.
 */
export function GarmentStage({ className }: { className?: string }) {
  const garment = heroGarments[0];

  return (
    <div className={cn("relative select-none", className)}>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
        <div className="relative h-full w-full overflow-hidden rounded-sm border border-ivory/10 bg-obsidian/40 p-3 shadow-2xl shadow-blood/20 md:p-6">
          <Image
            src={garment.src}
            alt={garment.alt}
            fill
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="object-contain p-2 mix-blend-screen md:p-5"
            priority
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(158,27,33,.16),transparent_42%,rgba(35,87,214,.2))]" />
        </div>

        {/* Light pooled under the stage, so the form reads as standing in a room. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[16%] bottom-[7%] h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(216,209,196,.3),transparent_70%)] blur-xl"
        />
      </div>

      <div className="mt-6 text-center">
        <p className="font-serif text-2xl italic text-ivory">{garment.label}</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-rhinestone/80">{garment.caption}</p>
      </div>
    </div>
  );
}

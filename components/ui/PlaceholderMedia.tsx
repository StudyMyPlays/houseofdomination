import Image from "next/image";
import { cn } from "@/lib/cn";
import { Garment } from "@/components/ui/Garment";
import { LineArtMotif } from "@/components/ui/LineArtMotif";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { ProductMedia } from "@/lib/site-config";

type PlaceholderMediaProps = {
  media: ProductMedia;
  monogram?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Renders product/lookbook visuals across the three media kinds: "garment"
 * (house vector form on a lit ground), "placeholder" (abstract gradient
 * stand-in), and "image" — the swap point for real photography. Same call
 * sites, no markup changes needed once photos exist.
 */
export function PlaceholderMedia({ media, monogram = "H", className, children }: PlaceholderMediaProps) {
  if (media.kind === "image") {
    return (
      <RevealOnScroll className={cn("relative overflow-hidden", className)}>
        <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        {children}
      </RevealOnScroll>
    );
  }

  if (media.kind === "garment") {
    return (
      <RevealOnScroll className={cn("grain relative overflow-hidden", className)}>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 30%, ${media.from}, ${media.to} 78%)` }}
        />
        <Garment
          variant={media.variant}
          colorway={media.colorway}
          className="absolute inset-0 p-6 transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
        />
        {children}
      </RevealOnScroll>
    );
  }

  const { from, via, to, angle, motif } = media;

  return (
    <RevealOnScroll className={cn("grain relative overflow-hidden", className)}>
      <div aria-hidden="true" className="absolute inset-0 text-ivory">
        <div className="absolute inset-0" style={{ background: `linear-gradient(${angle}deg, ${from}, ${via} 55%, ${to})` }} />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 68% 28%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)" }}
        />
        <LineArtMotif variant={motif} />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-serif text-[110px] italic leading-none text-ivory/20 transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110">
          {monogram}
        </div>
      </div>
      {children}
    </RevealOnScroll>
  );
}

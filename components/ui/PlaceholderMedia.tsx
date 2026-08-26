import Image from "next/image";
import { cn } from "@/lib/cn";
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
 * Renders product/lookbook visuals. The "placeholder" branch is today's
 * abstract stand-in (gradient + grain + line-art motif + monogram); the
 * "image" branch is the documented swap point for real photography — same
 * call sites, no markup changes needed once photos exist.
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

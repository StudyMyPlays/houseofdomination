"use client";

import { cn } from "@/lib/cn";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

/**
 * `ref` (and the IntersectionObserver watching it) must stay on an
 * unclipped element: a clip-path that hides the target is itself enough
 * to make the browser report zero intersection, which would deadlock the
 * reveal. So the outer div carries layout/positioning only, and the
 * clip-path animates on an inner full-size wrapper instead.
 */
export function RevealOnScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div ref={ref} className={className}>
      <div
        className={cn(
          "relative h-full w-full transition-[clip-path] duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          revealed ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
        )}
      >
        {children}
      </div>
    </div>
  );
}

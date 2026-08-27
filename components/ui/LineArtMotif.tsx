import { cn } from "@/lib/cn";

type LineArtMotifProps = {
  variant: 1 | 2 | 3;
  className?: string;
};

/**
 * Low-opacity hairline SVG texture layered over placeholder media so product
 * cards read as intentional compositions rather than identical gradient tiles.
 */
export function LineArtMotif({ variant, className }: LineArtMotifProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-[0.14] mix-blend-overlay", className)}
    >
      {variant === 1 && <path d="M100 8 L192 100 L100 192 L8 100 Z" stroke="currentColor" strokeWidth="0.5" />}
      {variant === 2 && (
        <>
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
      {variant === 3 && (
        <g stroke="currentColor" strokeWidth="0.35">
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="200" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 40 + 20} x2="200" y2={i * 40 + 20} />
          ))}
        </g>
      )}
    </svg>
  );
}

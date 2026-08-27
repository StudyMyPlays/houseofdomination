"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { HD_MARK_PATHS, RING_ARCS, RING_DOTS, RING_TEXT, markTransform } from "@/lib/brand-mark";

type MonogramProps = {
  /** Circular seal with "House of Domination" set around the HD brush mark, or the bare mark. */
  variant?: "seal" | "mark";
  className?: string;
  /** Accessible name. Pass "" when an adjacent label already names the brand. */
  title?: string;
};

/**
 * The House of Domination monogram, authored as vector so it stays crisp at
 * favicon size and at hero scale. Both variants inherit `currentColor`, so the
 * mark works ivory-on-obsidian and black-on-ivory without a second asset.
 *
 * Geometry and path data are shared with the generated icons and the static
 * SVGs via lib/brand-mark. Use `mark` below roughly 48px — the type ring is
 * illegible at that size.
 */
export function Monogram({ variant = "seal", className, title = "House of Domination" }: MonogramProps) {
  const labelled = title.length > 0;
  // React's generated ids carry punctuation; strip it so the value is a safe fragment identifier.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const topArc = `hod-top-${uid}`;
  const bottomArc = `hod-bottom-${uid}`;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      role={labelled ? "img" : "presentation"}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? title : undefined}
      className={cn("h-10 w-10", className)}
    >
      {variant === "seal" && (
        <>
          <defs>
            <path id={topArc} d={RING_ARCS.top} />
            <path id={bottomArc} d={RING_ARCS.bottom} />
          </defs>
          <g
            fill="currentColor"
            fontSize="21"
            letterSpacing="4.2"
            style={{ fontFamily: "var(--font-bodoni), Georgia, serif" }}
          >
            <text>
              <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle">
                {RING_TEXT.top}
              </textPath>
            </text>
            <text>
              <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle">
                {RING_TEXT.bottom}
              </textPath>
            </text>
          </g>
          {RING_DOTS.map((dot) => (
            <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r="5" fill="currentColor" />
          ))}
        </>
      )}
      <g fill="currentColor" transform={markTransform(variant)}>
        {HD_MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

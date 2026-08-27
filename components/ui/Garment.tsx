import { cn } from "@/lib/cn";

export type GarmentVariant = "hoodie" | "sweats" | "tee" | "shorts" | "jacket";

type Colorway = "black" | "ivory";

type GarmentProps = {
  variant: GarmentVariant;
  /** Fabric colourway. "black" is the house default; "ivory" is the off-white run. */
  colorway?: Colorway;
  className?: string;
};

const FABRIC: Record<Colorway, { lit: string; base: string; shade: string; seam: string; edge: string }> = {
  // The black run needs a light contour rather than a dark one — it is shown on
  // near-black grounds, where a dark edge would dissolve the silhouette.
  black: { lit: "#5a5750", base: "#242422", shade: "#0a0a0a", seam: "#8a8377", edge: "#736d62" },
  ivory: { lit: "#f6f3ec", base: "#ded9cd", shade: "#8f8a7e", seam: "#4a473d", edge: "#6d6759" },
};

/**
 * Vector garments used as the hero's rotating product forms and as product-card
 * art. Drawn rather than photographed so the site ships with no art dependency,
 * stays sharp at any size, and carries the house rhinestone treatment —
 * dot-pattern flames and a scattered hem fade — straight from the denim
 * programme.
 *
 * Each garment is assembled from separate panels (body, sleeves, legs, cuffs).
 * The strokes where panels meet are the point: they read as construction seams.
 * The lighting gradient is in user space, so every panel is lit by the same
 * source instead of each one re-running the ramp inside its own bounding box.
 */
export function Garment({ variant, colorway = "black", className }: GarmentProps) {
  const id = `${variant}-${colorway}`;
  const fabric = FABRIC[colorway];

  return (
    <svg viewBox="0 0 320 400" fill="none" aria-hidden="true" className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id={`fabric-${id}`} gradientUnits="userSpaceOnUse" x1="52" y1="40" x2="272" y2="372">
          <stop offset="0%" stopColor={fabric.lit} />
          <stop offset="38%" stopColor={fabric.base} />
          <stop offset="100%" stopColor={fabric.shade} />
        </linearGradient>
        <radialGradient id={`contact-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        {/* The rhinestone field: two offset stones per tile reads as hand-set, not printed. */}
        <pattern id={`stones-${id}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2.4" cy="2.4" r="1.6" fill="#f6f4ef" />
          <circle cx="6.9" cy="6.9" r="1.1" fill="#a49d90" />
        </pattern>
        <pattern id={`stones-red-${id}`} width="6.5" height="6.5" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#c0272d" />
        </pattern>
        <linearGradient id={`fade-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="236" x2="0" y2="300">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="384" rx="112" ry="14" fill={`url(#contact-${id})`} />

      <g
        fill={`url(#fabric-${id})`}
        stroke={fabric.edge}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeOpacity="0.55"
      >
        {PANELS[variant]}
      </g>

      <g
        stroke={fabric.seam}
        strokeWidth="1.1"
        strokeDasharray="4 4"
        strokeOpacity="0.55"
        fill="none"
        strokeLinecap="round"
      >
        {STITCHING[variant]}
      </g>

      <Rhinestones variant={variant} id={id} seam={fabric.seam} />
    </svg>
  );
}

/** The house stone work, placed per garment. */
function Rhinestones({ variant, id, seam }: { variant: GarmentVariant; id: string; seam: string }) {
  const silver = `url(#stones-${id})`;
  const red = `url(#stones-red-${id})`;

  if (variant === "shorts") {
    return (
      <g>
        <defs>
          {/* Hem fade: the scatter thins out as it climbs the leg. */}
          <mask id={`hemmask-${id}`}>
            <rect x="60" y="236" width="200" height="70" fill={`url(#fade-${id})`} />
          </mask>
        </defs>
        <path d={FLAME_OUTER} fill={red} />
        <path d={FLAME_INNER} fill={silver} />
        <path d="M70 236H157L150 300H74Z" fill={silver} mask={`url(#hemmask-${id})`} opacity="0.9" />
        <path d="M163 236H250L246 300H170Z" fill={silver} mask={`url(#hemmask-${id})`} opacity="0.9" />
      </g>
    );
  }

  if (variant === "hoodie") {
    return <path d="M124 254 L196 254 L192 288 L128 288 Z" fill={silver} opacity="0.75" />;
  }

  if (variant === "sweats") {
    return <path d={FLAME_INNER} transform="translate(-52 26) scale(0.72)" fill={silver} opacity="0.8" />;
  }

  if (variant === "jacket") {
    return <path d="M186 152 L216 152 L216 180 L186 180 Z" fill={silver} opacity="0.8" />;
  }

  // Tee: a stitched house ring rather than stones, so the ivory run stays quiet.
  return (
    <circle
      cx="160"
      cy="206"
      r="27"
      fill="none"
      stroke={seam}
      strokeWidth="3"
      strokeDasharray="1.5 5.5"
      strokeLinecap="round"
      opacity="0.85"
    />
  );
}

/* Side flame, lifted from the rhinestone denim programme — red outline, silver fill. */
const FLAME_OUTER =
  "M204 126c19 13 30 34 30 59 0 23-9 46-22 64-4 6-14 1-10-6 11-17 17-36 16-55-1-17-8-33-19-45-5-6 1-21 5-17Z";
const FLAME_INNER =
  "M207 148c13 12 20 28 20 45 0 17-6 34-16 47-3 4-10 0-7-5 8-13 13-28 12-42-1-12-6-23-14-32-3-4 3-15 5-13Z";

/* ---------------------------------------------------------------------------
 * Panels. Sleeves and legs are separate paths so the joins read as seams and
 * the legs get a real gap between them instead of a hairline slit.
 * ------------------------------------------------------------------------ */

const PANELS: Record<GarmentVariant, React.ReactNode> = {
  hoodie: (
    <>
      {/* Hood, sitting behind the shoulders. */}
      <path d="M108 96C104 48 216 48 212 96 190 112 130 112 108 96Z" />
      {/* Sleeves — cut into the shoulder line so the body panel hides the join. */}
      <path d="M104 94 58 118C40 126 30 152 26 188L15 288C13 300 20 308 32 310L60 314C72 316 80 309 80 297V196C80 158 86 120 104 94Z" />
      <path d="M216 94 262 118C280 126 290 152 294 188L305 288C307 300 300 308 288 310L260 314C248 316 240 309 240 297V196C240 158 234 120 216 94Z" />
      {/* Cuffs */}
      <path d="M14 282 46 288 42 314 10 308Z" />
      <path d="M306 282 274 288 278 314 310 308Z" />
      {/* Body */}
      <path d="M104 92H216L232 108C238 132 240 162 240 200V330C240 342 232 348 220 348H100C88 348 80 342 80 330V200C80 162 82 132 88 108Z" />
      {/* Kangaroo pocket */}
      <path d="M116 248H204L200 302H120Z" />
    </>
  ),

  jacket: (
    <>
      <path d="M92 96 60 108C42 116 34 142 30 178L20 268C18 280 25 288 37 290L64 294C76 296 84 289 84 277V178C84 144 86 120 92 96Z" />
      <path d="M228 96 260 108C278 116 286 142 290 178L300 268C302 280 295 288 283 290L256 294C244 296 236 289 236 277V178C236 144 234 120 228 96Z" />
      {/* Body */}
      <path d="M106 88H214L230 100C236 122 238 146 238 174V318C238 330 231 336 219 336H101C89 336 82 330 82 318V174C82 146 84 122 90 100Z" />
      {/* Collar points */}
      <path d="M120 86 160 104 132 118 108 96Z" />
      <path d="M200 86 160 104 188 118 212 96Z" />
      {/* Chest pockets with flap */}
      <path d="M104 150H140V186H104Z" />
      <path d="M180 150H216V186H180Z" />
    </>
  ),

  // One continuous outline: on a short sleeve the body and sleeve share a
  // single cut line, so splitting it into panels only invents a seam.
  tee: (
    <path d="M116 78C124 66 196 66 204 78L254 96C274 106 286 130 292 168L250 186 240 164V330C240 340 234 344 224 344H96C86 344 80 340 80 330V164L70 186 28 168C34 130 46 106 66 96Z" />
  ),

  sweats: (
    <>
      {/* Legs, split with a real gap. */}
      <path d="M74 100H156V178L148 356C147 366 141 370 132 370H92C83 370 77 366 76 356L68 178Z" />
      <path d="M164 100H246V178L252 356C251 366 245 370 236 370H196C187 370 181 366 180 356L172 178Z" />
      {/* Cuffs */}
      <path d="M77 336H150L148 358H78Z" />
      <path d="M170 336H243L242 358H172Z" />
      {/* Waistband, drawn last so it caps the rise. */}
      <path d="M74 58H246V102H74Z" />
    </>
  ),

  shorts: (
    <>
      <path d="M68 104H157V172L148 296C147 306 141 310 131 310H88C78 310 72 306 71 296L62 172Z" />
      <path d="M163 104H252L258 172L249 296C248 306 242 310 232 310H189C179 310 173 306 172 296L163 172Z" />
      <path d="M70 62H250V106H70Z" />
    </>
  ),
};

const STITCHING: Record<GarmentVariant, React.ReactNode> = {
  hoodie: (
    <>
      <path d="M120 98C136 112 184 112 200 98" />
      <path d="M144 106 142 168M176 106 178 166" />
      <path d="M120 276H200" />
      <path d="M104 92 88 108M216 92 232 108" />
    </>
  ),
  jacket: (
    <>
      <path d="M160 106 160 334" />
      <path d="M88 132H232" />
      <path d="M106 158H138M182 158H214" />
    </>
  ),
  tee: (
    <>
      <path d="M126 82C136 96 184 96 194 82" />
      <path d="M98 98 82 152M222 98 238 152" />
      <path d="M88 332H232" />
    </>
  ),
  sweats: (
    <>
      <path d="M96 76C120 88 200 88 224 76" />
      <path d="M112 178 118 336M208 178 202 336" />
    </>
  ),
  shorts: (
    <>
      <path d="M84 78C110 92 210 92 236 78" />
      <path d="M78 110C96 124 120 128 136 124L131 166" />
      <path d="M242 110C226 124 204 128 188 124" />
      <path d="M74 292H148M172 292H246" />
    </>
  ),
};

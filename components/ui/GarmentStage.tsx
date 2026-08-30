"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { heroGarments } from "@/lib/site-config";

const AUTOPLAY_MS = 4200;

/**
 * The hero's 3D product stage: the house forms laid out in a perspective
 * coverflow, the centre piece facing the viewer and its neighbours turned away
 * into depth. It auto-advances, tilts a few degrees toward a fine pointer, and
 * exposes prev/next plus dot controls for everyone else.
 *
 * Motion is opt-out — under `prefers-reduced-motion` the stage holds still,
 * autoplay never starts, and the pointer tilt is not wired up.
 */
export function GarmentStage({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const paused = useRef(false);
  const count = heroGarments.length;

  const go = useCallback((delta: number) => setActive((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      if (!paused.current) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduced, go]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - box.top) / box.height - 0.5) * -7,
      y: ((event.clientX - box.left) / box.width - 0.5) * 11,
    });
  };

  const current = heroGarments[active];

  return (
    <div className={cn("relative select-none", className)}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="House of Domination new arrivals"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        onFocus={() => { paused.current = true; }}
        onBlur={() => { paused.current = false; }}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
        className="relative mx-auto aspect-[4/5] w-full max-w-[560px] [perspective:1400px]"
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 500ms cubic-bezier(.22,.61,.36,1)",
          }}
        >
          {heroGarments.map((garment, index) => {
            // Shortest signed distance around the ring, so wrapping never slides the long way.
            let offset = index - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const distance = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <div
                key={garment.id}
                aria-hidden={!isActive}
                className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
                style={{
                  transform: `translateX(${offset * 42}%) translateZ(${-distance * 190}px) rotateY(${offset * -34}deg) scale(${1 - distance * 0.06})`,
                  opacity: distance > 2 ? 0 : 1 - distance * 0.34,
                  zIndex: count - distance,
                  filter: isActive ? "none" : `blur(${distance * 1.4}px)`,
                  transition: reduced
                    ? "none"
                    : "transform 850ms cubic-bezier(.22,.61,.36,1), opacity 850ms ease, filter 850ms ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-sm border border-ivory/10 bg-obsidian/40 p-3 shadow-2xl shadow-blood/20 md:p-6">
                  <Image
                    src={garment.src}
                    alt={garment.alt}
                    fill
                    sizes="(min-width: 1024px) 44vw, 90vw"
                    className="object-contain p-2 mix-blend-screen md:p-5"
                    priority={isActive}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(158,27,33,.16),transparent_42%,rgba(35,87,214,.2))]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Light pooled under the stage, so the forms read as standing in a room. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[16%] bottom-[7%] h-24 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(216,209,196,.3),transparent_70%)] blur-xl"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <StageButton label="Previous piece" onClick={() => go(-1)}>←</StageButton>

        <div className="min-w-[15rem] text-center">
          <p aria-live="polite" className="font-serif text-2xl italic text-ivory">
            {current.label}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[.18em] text-rhinestone/80">{current.caption}</p>
        </div>

        <StageButton label="Next piece" onClick={() => go(1)}>→</StageButton>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {heroGarments.map((garment, index) => (
          <button
            key={garment.id}
            type="button"
            aria-label={`Show the ${garment.label}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "h-[3px] rounded-full transition-all duration-300 ease",
              index === active ? "w-8 bg-electric-blue" : "w-3 bg-ivory/25 hover:bg-electric-blue/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function StageButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center border border-ivory/25 text-sm text-rhinestone transition-[background-color,color,transform] duration-150 ease hover:bg-ivory hover:text-obsidian active:scale-[0.94]"
    >
      {children}
    </button>
  );
}

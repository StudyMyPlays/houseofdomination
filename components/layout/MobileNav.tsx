"use client";

import Link from "next/link";
import { useDialog } from "@/hooks/useDialog";
import { navLinks } from "@/lib/site-config";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ id, open, onClose }: MobileNavProps) {
  const panelRef = useDialog(open, onClose);

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      inert={!open}
      style={{ transformOrigin: "top" }}
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-obsidian px-6 py-6 text-ivory transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden",
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center justify-between">
        <span id={`${id}-title`} className="font-mono text-[10px] uppercase tracking-[.2em] text-rhinestone">
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="font-mono text-[10px] uppercase tracking-[.2em] transition-transform duration-150 ease active:scale-[0.97]"
        >
          Close ✕
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-16 flex flex-1 flex-col justify-center gap-6">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
            className={cn(
              "font-serif text-5xl italic leading-none transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

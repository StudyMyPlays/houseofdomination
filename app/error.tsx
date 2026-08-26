"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-obsidian px-5 text-center text-ivory">
      <p className="font-mono text-[10px] uppercase tracking-[.3em] text-rhinestone">Error</p>
      <h1 className="font-serif text-6xl italic leading-none md:text-8xl">Something slipped.</h1>
      <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[.12em] text-rhinestone">
        An unexpected error occurred. Try again, or head back to the house.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center border border-ivory/70 px-6 py-3 font-mono text-[10px] uppercase tracking-[.2em] text-ivory transition-[background-color,color,transform] duration-150 ease active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ivory [@media(hover:hover)_and_(pointer:fine)]:hover:text-obsidian"
      >
        Try again
      </button>
    </main>
  );
}

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-obsidian px-5 text-center text-ivory">
      <p className="font-mono text-[10px] uppercase tracking-[.3em] text-rhinestone">404</p>
      <h1 className="font-serif text-6xl italic leading-none md:text-8xl">Not witnessed here.</h1>
      <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[.12em] text-rhinestone">
        This page doesn&apos;t exist. Head back and find something built to be seen.
      </p>
      <Button href="/">Back to the house</Button>
    </main>
  );
}

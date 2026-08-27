import { cn } from "@/lib/cn";

export function Sparkle({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("font-serif text-rhinestone", className)}>
      ✦
    </span>
  );
}

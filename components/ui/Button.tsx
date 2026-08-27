import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
};

export function Button({ href, children, variant = "outline", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center border px-6 py-3 font-mono text-[10px] uppercase tracking-[.2em] transition-[background-color,color,transform] duration-150 ease active:scale-[0.97]",
        variant === "outline" && "border-ivory/70 text-ivory hover:bg-ivory hover:text-obsidian",
        variant === "solid" && "border-ivory bg-ivory text-obsidian hover:bg-transparent hover:text-ivory",
        className,
      )}
    >
      {children}
    </Link>
  );
}

import { cn } from "@/lib/cn";
import { siteName } from "@/lib/site-config";

type WordmarkProps = {
  /** Small caps line beneath the signature, e.g. "Black on Ivory". Omit for the bare signature. */
  subline?: string;
  className?: string;
  sublineClassName?: string;
};

/**
 * The signature wordmark — "House of • Domination" — set as live text in the
 * script face rather than shipped as a raster. It stays sharp at every size,
 * reflows on narrow screens, and is selectable/readable by screen readers.
 */
export function Wordmark({ subline, className, sublineClassName }: WordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="font-script inline-flex items-center whitespace-nowrap leading-[1.15]">
        <span>House&nbsp;of</span>
        <span aria-hidden="true" className="mx-[.28em] mt-[.06em] inline-block h-[.16em] w-[.16em] rounded-full bg-current" />
        <span>{siteName.split(" ").at(-1)}</span>
      </span>
      {subline ? (
        <span
          className={cn(
            "mt-[.35em] font-sans text-[.2em] font-medium uppercase tracking-[.34em]",
            sublineClassName,
          )}
        >
          {subline}
        </span>
      ) : null}
    </span>
  );
}

"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Status = { state: "idle" | "pending" | "done" | "error"; message: string };

const IDLE: Status = { state: "idle", message: "" };

/**
 * Drop waitlist capture. Posts to /api/waitlist, keeps the button disabled for
 * the round trip, and reports the outcome through a live region so the result
 * is announced rather than only seen.
 */
export function WaitlistForm({ className }: { className?: string }) {
  const emailId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(IDLE);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "pending") return;

    const form = event.currentTarget;
    const company = (new FormData(form).get("company") as string | null) ?? "";
    setStatus({ state: "pending", message: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = (await response.json()) as { ok: boolean; message: string };

      if (data.ok) {
        setStatus({ state: "done", message: data.message });
        setEmail("");
      } else {
        setStatus({ state: "error", message: data.message });
      }
    } catch {
      setStatus({ state: "error", message: "Couldn't reach the house. Try again." });
    }
  }

  const pending = status.state === "pending";

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-md", className)} noValidate>
      <label htmlFor={emailId} className="font-mono text-[10px] uppercase tracking-[.22em] text-rhinestone">
        Join the waitlist — Vol. 05
      </label>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.state !== "idle") setStatus(IDLE);
          }}
          aria-describedby={status.message ? statusId : undefined}
          aria-invalid={status.state === "error" || undefined}
          className="min-w-0 flex-1 border border-ivory/25 bg-transparent px-4 py-3 font-mono text-xs tracking-[.06em] text-ivory placeholder:text-rhinestone/40 focus:border-ivory/70 focus:outline-none"
        />

        {/* Honeypot — off-screen and untabbable, so only bots reach it. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
        />

        <button
          type="submit"
          disabled={pending}
          className="border border-ivory bg-ivory px-6 py-3 font-mono text-[10px] uppercase tracking-[.2em] text-obsidian transition-[background-color,color,transform,opacity] duration-150 ease hover:bg-transparent hover:text-ivory active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Sending…" : "Get early access"}
        </button>
      </div>

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-[1.1rem] font-mono text-[10px] uppercase tracking-[.16em]",
          status.state === "error" ? "text-blood" : "text-rhinestone",
        )}
      >
        {status.message}
      </p>
    </form>
  );
}

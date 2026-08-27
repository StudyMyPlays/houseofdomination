import { NextResponse } from "next/server";

/**
 * Waitlist signups for the next drop.
 *
 * Storage is deliberately pluggable and, right now, deliberately not durable:
 * `persist` holds addresses in module memory, which resets on every deploy and
 * is per-instance on a serverless host. Point it at the real destination
 * (Supabase table, Klaviyo/Mailchimp list, CRM webhook) when one exists — the
 * route contract and the form do not change.
 */
const signups = new Set<string>();

// RFC-perfect email validation isn't possible with a regex; this rejects the
// obvious typos and leaves final verification to the confirmation email.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function persist(email: string) {
  signups.add(email);
  console.info(`[waitlist] ${email} joined (${signups.size} in memory)`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const { email, company } = (body ?? {}) as { email?: unknown; company?: unknown };

  // Honeypot: real people never see this field, bots fill it in. Answer 200 so
  // the bot has nothing to tune against.
  if (typeof company === "string" && company.length > 0) {
    return NextResponse.json({ ok: true, message: "You're on the list." });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim()) || email.length > 254) {
    return NextResponse.json({ ok: false, message: "That email doesn't look right." }, { status: 422 });
  }

  const normalized = email.trim().toLowerCase();

  if (signups.has(normalized)) {
    return NextResponse.json({ ok: true, message: "You're already on the list." });
  }

  await persist(normalized);

  return NextResponse.json({ ok: true, message: "You're on the list. Watch your inbox." });
}

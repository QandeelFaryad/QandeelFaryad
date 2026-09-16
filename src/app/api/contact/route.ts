/**
 * Handles every form on the site: project inquiries, job applications, and
 * newsletter sign-ups. Messages are emailed through Resend when configured:
 *
 *   RESEND_API_KEY      — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    — inbox that receives submissions
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "QORLIQ <site@qorliq.com>"
 *
 * Without them, submissions are logged in development and rejected in production.
 */

type Kind = "project" | "application" | "newsletter";

const LIMITS: Record<string, number> = { message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-instance throttle: 5 submissions per IP per minute.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function clean(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (throttled(ip)) {
    return Response.json({ error: "Too many submissions. Please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see this field.
  if (clean(body.website)) return Response.json({ ok: true });

  const kind = clean(body.kind) as Kind;
  if (!["project", "application", "newsletter"].includes(kind)) {
    return Response.json({ error: "Unknown form." }, { status: 400 });
  }

  const email = clean(body.email);
  const name = clean(body.name);
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (kind !== "newsletter" && !name) {
    return Response.json({ error: "Please tell us your name." }, { status: 400 });
  }

  const fields: [string, string][] =
    kind === "project"
      ? [
          ["Name", name],
          ["Email", email],
          ["Company", clean(body.company)],
          ["Services", Array.isArray(body.services) ? body.services.map((s) => clean(s, 60)).join(", ") : ""],
          ["Budget", clean(body.budget)],
          ["Timeline", clean(body.timeline)],
          ["Message", clean(body.message, LIMITS.message)],
        ]
      : kind === "application"
        ? [
            ["Role", clean(body.role)],
            ["Name", name],
            ["Email", email],
            ["Portfolio", clean(body.portfolio)],
            ["LinkedIn", clean(body.linkedin)],
            ["Message", clean(body.message, LIMITS.message)],
          ]
        : [["Email", email]];

  const subject =
    kind === "project"
      ? `New project inquiry — ${name}`
      : kind === "application"
        ? `Application: ${clean(body.role) || "Open application"} — ${name}`
        : `Newsletter sign-up — ${email}`;
  const text = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n\n");

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] Email not configured — would send:\n${subject}\n\n${text}`);
      return Response.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not set");
    return Response.json({ error: "Our form is temporarily unavailable." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL || "QORLIQ Website <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return Response.json({ error: "We couldn't send your message." }, { status: 502 });
  }
  return Response.json({ ok: true });
}

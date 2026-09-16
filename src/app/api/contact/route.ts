/**
 * Handles every form on the site: project inquiries, job applications, and
 * newsletter sign-ups.
 *
 * Email delivery (Resend):
 *   RESEND_API_KEY      — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    — inbox that receives submissions
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. "QORLIQ <site@qorliq.com>"
 *
 * Optional, each activates only when set:
 *   TURNSTILE_SECRET_KEY            — Cloudflare Turnstile server key (bot protection)
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  — the matching public key (renders the widget)
 *   CRM_WEBHOOK_URL                 — POSTed a JSON copy of every submission
 *   CRM_WEBHOOK_TOKEN               — sent as a bearer token with that request
 *
 * Without Resend configured, submissions are logged in development and rejected
 * in production.
 */

type Kind = "project" | "application" | "newsletter";

const LIMITS: Record<string, number> = { message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-instance throttle: 5 submissions per IP per minute.
// Serverless instances are short-lived, so Turnstile is the real protection.
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

/** Verify the Cloudflare Turnstile token, when bot protection is configured. */
async function botCheck(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("[contact] Turnstile verification failed", err);
    return false;
  }
}

async function send(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

/** Mirror the submission into a CRM or automation tool, if one is configured. */
async function toCrm(body: Record<string, unknown>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ ...body, source: "qorliq.com", receivedAt: new Date().toISOString() }),
    });
  } catch (err) {
    // Never fail the visitor's submission because the CRM is down.
    console.error("[contact] CRM webhook failed", err);
  }
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

  if (!(await botCheck(clean(body.turnstileToken, 4000), ip))) {
    return Response.json({ error: "We couldn't verify that you're human. Please try again." }, { status: 400 });
  }

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
          ["Page", clean(body.page, 500)],
          ["Campaign", clean(body.utm, 500)],
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
        : [
            ["Email", email],
            ["Page", clean(body.page, 500)],
          ];

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

  await toCrm({ kind, ...Object.fromEntries(fields) });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const from = CONTACT_FROM_EMAIL || "QORLIQ <onboarding@resend.dev>";

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] Email not configured — would send:\n${subject}\n\n${text}`);
      return Response.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not set");
    return Response.json({ error: "Our form is temporarily unavailable." }, { status: 503 });
  }

  try {
    await send({
      from,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: email,
      subject,
      text,
    });
  } catch (err) {
    console.error("[contact] Resend error", err);
    return Response.json({ error: "We couldn't send your message." }, { status: 502 });
  }

  // Acknowledge the sender so they know it arrived. Never block on this.
  if (kind !== "newsletter") {
    const first = name.split(" ")[0];
    const acknowledgement =
      kind === "project"
        ? `Hi ${first},\n\nThanks for getting in touch with QORLIQ. We've received your enquiry and a member of our team will reply within one business day.\n\nHere's what you sent us:\n\n${text}\n\nIf anything changes in the meantime, just reply to this email.\n\n— QORLIQ\nsupport@qorliq.com · +44 7401921690\nA digital services brand operated by HOORAB GROUP OF COMPANIES LTD`
        : `Hi ${first},\n\nThanks for applying to QORLIQ. We've received your application and review every one — we'll be in touch within two weeks.\n\n— QORLIQ\nsupport@qorliq.com`;
    try {
      await send({
        from,
        to: [email],
        subject: kind === "project" ? "We've received your enquiry — QORLIQ" : "We've received your application — QORLIQ",
        text: acknowledgement,
      });
    } catch (err) {
      console.error("[contact] Acknowledgement email failed", err);
    }
  }

  return Response.json({ ok: true });
}

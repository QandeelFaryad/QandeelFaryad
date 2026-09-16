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
 * Storage (Supabase, see supabase/README.md):
 *   NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRET_KEY — every submission is saved to
 *   the database for the admin panel, and CVs go to the private "cvs" bucket.
 *
 * A submission succeeds when it is saved or emailed. With neither configured,
 * submissions are logged in development and rejected in production.
 */

import { PROJECT_STAGES, SERVICE_OPTIONS, SERVICE_QUESTIONS } from "@/lib/content";
import { createServiceClient, isServiceConfigured } from "@/lib/supabase/service";

type Kind = "project" | "application" | "newsletter";

const LIMITS: Record<string, number> = { message: 5000 };
const CV_MAX_BYTES = 10 * 1024 * 1024;
const CV_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
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

/** A loose phone check: optional +, then 6–15 digits with common separators. */
function validPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").length;
  return /^\+?[\d\s().-]+$/.test(phone) && digits >= 6 && digits <= 15;
}

/** Accepts "example.com" as well as full URLs; returns "" for blank and null when invalid. */
function normaliseUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return null;
    return url.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

type Detail = { service: string; question: string; answer: string };

/** Keep only answers to questions we actually ask, for services the visitor picked. */
function serviceDetails(body: Record<string, unknown>): Detail[] {
  const picked = Array.isArray(body.services) ? body.services : [];
  const raw = body.details && typeof body.details === "object" ? (body.details as Record<string, unknown>) : {};
  const out: Detail[] = [];
  for (const service of SERVICE_OPTIONS) {
    const questions = SERVICE_QUESTIONS[service.slug];
    const given = raw[service.slug];
    if (!questions || !picked.includes(service.label) || !given || typeof given !== "object") continue;
    for (const q of questions) {
      const value = (given as Record<string, unknown>)[q.id];
      const answer = q.options
        ? (Array.isArray(value) ? value : [value]).filter((v): v is string => q.options!.includes(v as string)).join(", ")
        : clean(value, 200);
      if (answer) out.push({ service: service.label, question: q.label, answer });
    }
  }
  return out;
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

/**
 * Save the submission for the admin panel. Returns "skipped" when Supabase isn't
 * configured, so email alone can still deliver it.
 */
async function save(
  kind: Kind,
  body: Record<string, unknown>,
  who: { name: string; email: string },
  cv: File | null,
  project?: { phone: string; whatsapp: boolean; siteUrl: string; stage: string; details: Detail[] },
): Promise<"saved" | "skipped" | "failed"> {
  if (!isServiceConfigured()) return "skipped";
  const db = createServiceClient();
  try {
    if (kind === "project") {
      const { error } = await db.from("inquiries").insert({
        name: who.name,
        email: who.email,
        company: clean(body.company) || null,
        phone: project?.phone || null,
        whatsapp: project?.whatsapp ?? false,
        site_url: project?.siteUrl || null,
        stage: project?.stage || null,
        details: project?.details ?? [],
        services: Array.isArray(body.services) ? body.services.map((s) => clean(s, 60)).filter(Boolean) : [],
        budget: clean(body.budget) || null,
        timeline: clean(body.timeline) || null,
        message: clean(body.message, LIMITS.message) || null,
        page: clean(body.page, 500) || null,
        referrer: clean(body.referrer, 500) || null,
        utm: clean(body.utm, 500) || null,
      });
      if (error) throw error;
    } else if (kind === "application") {
      let cvPath: string | null = null;
      if (cv) {
        const base = (cv.name.replace(/\.[^.]+$/, "") || "cv").replace(/[^a-z0-9-_]+/gi, "-").slice(0, 60);
        cvPath = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}-${base}.${CV_TYPES[cv.type]}`;
        const { error } = await db.storage.from("cvs").upload(cvPath, cv, { contentType: cv.type });
        if (error) throw error;
      }
      const { error } = await db.from("applications").insert({
        role: clean(body.role) || null,
        name: who.name,
        email: who.email,
        portfolio: clean(body.portfolio) || null,
        linkedin: clean(body.linkedin) || null,
        message: clean(body.message, LIMITS.message) || null,
        cv_path: cvPath,
      });
      if (error) throw error;
    } else {
      const { error } = await db
        .from("subscribers")
        .upsert({ email: who.email.toLowerCase(), page: clean(body.page, 500) || null }, { onConflict: "email", ignoreDuplicates: true });
      if (error) throw error;
    }
    return "saved";
  } catch (err) {
    console.error(`[contact] Saving ${kind} to Supabase failed`, err);
    return "failed";
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (throttled(ip)) {
    return Response.json({ error: "Too many submissions. Please try again in a minute." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  let cv: File | null = null;
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await request.formData();
      body = JSON.parse(String(form.get("payload") ?? "{}"));
      const file = form.get("cv");
      cv = file instanceof File && file.size > 0 ? file : null;
    } else {
      body = await request.json();
    }
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
  if (cv && (kind !== "application" || !CV_TYPES[cv.type])) {
    return Response.json({ error: "Please upload your CV as a PDF or Word document." }, { status: 400 });
  }
  if (cv && cv.size > CV_MAX_BYTES) {
    return Response.json({ error: "Your CV is larger than 10MB. Please upload a smaller file." }, { status: 400 });
  }

  let project: Parameters<typeof save>[4];
  if (kind === "project") {
    const phone = clean(body.phone, 30);
    if (phone && !validPhone(phone)) {
      return Response.json({ error: "Please check your phone number, including the country code." }, { status: 400 });
    }
    const siteUrl = normaliseUrl(clean(body.site_url));
    if (siteUrl === null) {
      return Response.json({ error: "Please check your website address, e.g. yourcompany.com." }, { status: 400 });
    }
    const stage = clean(body.stage);
    project = {
      phone,
      whatsapp: Boolean(phone) && (body.whatsapp === "on" || body.whatsapp === true),
      siteUrl,
      stage: PROJECT_STAGES.includes(stage) ? stage : "",
      details: serviceDetails(body),
    };
  }

  const fields: [string, string][] =
    kind === "project" && project
      ? [
          ["Name", name],
          ["Email", email],
          ["Phone", project.phone && `${project.phone}${project.whatsapp ? " (WhatsApp)" : ""}`],
          ["Company", clean(body.company)],
          ["Website", project.siteUrl],
          ["Services", Array.isArray(body.services) ? body.services.map((s) => clean(s, 60)).join(", ") : ""],
          ...project.details.map((d): [string, string] => [`${d.service} — ${d.question}`, d.answer]),
          ["Project stage", project.stage],
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
  const stored = await save(kind, body, { name, email }, cv, project);
  if (stored === "failed" && cv) {
    return Response.json({ error: "We couldn't upload your CV. Please try again, or share a link instead." }, { status: 502 });
  }
  if (cv && stored === "saved") fields.push(["CV", "Uploaded — download it from the admin panel"]);

  const text = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n\n");

  await toCrm({ kind, ...Object.fromEntries(fields) });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const from = CONTACT_FROM_EMAIL || "QORLIQ <onboarding@resend.dev>";

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    if (stored === "saved") return Response.json({ ok: true });
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] Email not configured — would send:\n${subject}\n\n${text}`);
      return Response.json({ ok: true });
    }
    console.error("[contact] Neither Supabase nor RESEND_API_KEY / CONTACT_TO_EMAIL are set");
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
    // Already saved for the admin panel, so the visitor's submission still counts.
    if (stored !== "saved") return Response.json({ error: "We couldn't send your message." }, { status: 502 });
  }

  // Acknowledge the sender so they know it arrived. Never block on this.
  if (kind !== "newsletter") {
    const first = name.split(" ")[0];
    const acknowledgement =
      kind === "project"
        ? `Hi ${first},\n\nThanks for getting in touch with QORLIQ. We've received your enquiry and a member of our team will reply within one business day.\n\nHere's what you sent us:\n\n${text}\n\nIf anything changes in the meantime, just reply to this email.\n\n— QORLIQ\nsupport@qorliq.com\nA digital services brand operated by HOORAB GROUP OF COMPANIES LTD`
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

"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PlusIcon } from "./icons";
import { PillSubmit } from "./ui";
import { COUNTRIES, PROJECT_STAGES, SERVICE_OPTIONS, SERVICE_QUESTIONS } from "@/lib/content";
import { SITE } from "@/lib/site";

/* ----------------------------------------------------------------- Accordion */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="flex flex-col">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-t border-line last:border-b">
            <h3>
              <button
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="font-display text-[clamp(18px,2.2vw,24px)] font-semibold tracking-[-0.015em] text-ink">
                  {it.q}
                </span>
                <PlusIcon
                  className={`size-6 shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className="grid transition-all duration-400 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <p className="max-w-[760px] pb-7 text-[16px] leading-[1.6] text-muted">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------- helpers */
type Status = "idle" | "sending" | "sent" | "error";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile. Renders only when a site key is configured; the API
 * route skips verification when its secret is absent, so forms keep working
 * either way.
 */
function Turnstile() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!TURNSTILE_KEY || !ref.current) return;
    const id = "cf-turnstile-script";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  if (!TURNSTILE_KEY) return null;
  return <div ref={ref} className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" />;
}

/** The token Turnstile writes into the form, if it is active. */
function turnstileToken(form: HTMLFormElement) {
  const input = form.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  return input?.value ?? "";
}

/** Where the lead came from: the page they were on, plus any campaign tags. */
function leadContext() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm = [...params.entries()]
    .filter(([k]) => k.startsWith("utm_") || k === "gclid" || k === "fbclid")
    .map(([k, v]) => `${k}=${v}`)
    .join(" · ");
  return {
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || "",
    utm,
  };
}

async function submit(payload: Record<string, unknown>, file?: File | null) {
  let init: RequestInit;
  if (file && file.size > 0) {
    // Files need multipart; everything else rides along as a JSON field.
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    body.set("cv", file);
    init = { method: "POST", body };
  } else {
    init = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) };
  }
  const res = await fetch("/api/contact", init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
}

const field =
  "w-full rounded-2xl border border-line bg-white px-5 py-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
const labelClass = "font-display text-[13px] font-bold uppercase text-ink";

/** Chevron for <select>, inlined so turning off the native appearance keeps the affordance. */
const selectArrow = {
  backgroundImage:
    "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%235a6283%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E)",
};

function Field({
  label,
  children,
  htmlFor,
  optional,
}: {
  label: string;
  children: ReactNode;
  htmlFor: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label} {optional ? <span className="font-sans text-[12px] font-medium normal-case text-muted">(optional)</span> : null}
      </label>
      {children}
    </div>
  );
}

/** Invisible to people; bots that fill it in are silently ignored. */
function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-2xl bg-accent/10 px-5 py-4 text-[15px] text-ink">
      {message} You can also email us at{" "}
      <a href={`mailto:${SITE.email}`} className="font-semibold underline">
        {SITE.email}
      </a>
      .
    </p>
  );
}

function Chip({
  selected,
  onClick,
  children,
  role = "checkbox",
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  role?: "checkbox" | "radio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={`rounded-2xl border px-5 py-4 text-left font-display text-[14px] font-bold uppercase transition-all duration-200 ${
        selected
          ? "border-accent bg-accent text-ink"
          : "border-line bg-white text-ink hover:-translate-y-0.5 hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------- ProjectInquiry */
const BUDGETS = ["$0 – $1k", "$1k – $5k", "$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+"];
const TIMELINES = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Flexible"];
const STEP_TITLES = {
  services: "What do you need?",
  specifics: "A few specifics",
  scope: "Scope & budget",
  you: "About you",
};
type StepKey = keyof typeof STEP_TITLES;
/** Service slug → question id → answer (several for multi-choice questions). */
type Answers = Record<string, Record<string, string | string[]>>;

const optionalTag = <span className="font-sans text-[12px] font-medium normal-case text-muted">(optional)</span>;

/** Multi-step project inquiry with a confirmation screen. The specifics step only appears when a picked service has follow-up questions. */
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [stage, setStage] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");
  const [name, setName] = useState("");
  const heading = useRef<HTMLHeadingElement | null>(null);
  const moved = useRef(false);
  const id = useId();

  const asked = SERVICE_OPTIONS.filter((s) => services.includes(s.label) && SERVICE_QUESTIONS[s.slug]);
  const steps: StepKey[] = ["services", ...(asked.length ? (["specifics"] as const) : []), "scope", "you"];
  const current = steps[step];
  const last = step === steps.length - 1;

  // Pre-select a service when arriving from e.g. /contact?service=branding.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = SERVICE_OPTIONS.find((s) => s.slug === slug);
    if (match) setServices([match.label]);
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step, status]);

  const go = (next: number) => {
    setHint("");
    moved.current = true;
    setStep(next);
  };

  const nextFromStep = () => {
    if (current === "services" && services.length === 0) return setHint("Pick at least one service to continue.");
    if (current === "scope" && !budget) return setHint("Choose a budget range to continue.");
    go(step + 1);
  };

  const answer = (slug: string, qid: string, value: string | string[]) =>
    setAnswers((cur) => ({ ...cur, [slug]: { ...cur[slug], [qid]: value } }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!last) return nextFromStep();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Only send answers for services that are still selected.
    const details = Object.fromEntries(asked.map((s) => [s.slug, answers[s.slug] ?? {}]));
    setStatus("sending");
    setError("");
    try {
      await submit({
        kind: "project",
        services,
        details,
        stage,
        budget,
        timeline,
        ...leadContext(),
        ...data,
        turnstileToken: turnstileToken(e.currentTarget),
      });
      setName(String(data.name ?? "").split(" ")[0]);
      moved.current = true;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-8 rounded-3xl bg-cloud p-8 sm:p-12" aria-live="polite">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent font-display text-[24px] font-semibold tracking-[-0.015em] text-ink">
          ✓
        </span>
        <div className="flex flex-col gap-4">
          <h3 ref={heading} tabIndex={-1} className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-ink outline-none">
            Thanks{name ? `, ${name}` : ""}. We&apos;re on it.
          </h3>
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-muted">
            A strategist will reply within one business day with next steps.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/case-studies" className="font-display text-[14px] font-bold uppercase text-ink underline-offset-4 hover:text-accent hover:underline">
            Browse our work while you wait →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-8" noValidate={!last}>
      <Honeypot />

      {/* Progress */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-wide text-muted">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span className="hidden sm:inline">{STEP_TITLES[current]}</span>
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {steps.map((key, i) => (
            <span key={key} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
              />
            </span>
          ))}
        </div>
      </div>

      <h3
        ref={heading}
        tabIndex={-1}
        className="font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.015em] uppercase leading-[1.1] text-ink outline-none"
      >
        {STEP_TITLES[current]}
      </h3>

      <div key={current} className="animate-step flex flex-col gap-6">
        {current === "services" ? (
          <div role="group" aria-label="Services" className="grid gap-3 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((s) => (
              <Chip
                key={s.slug}
                selected={services.includes(s.label)}
                onClick={() =>
                  setServices((cur) => (cur.includes(s.label) ? cur.filter((x) => x !== s.label) : [...cur, s.label]))
                }
              >
                {s.label}
              </Chip>
            ))}
          </div>
        ) : null}

        {current === "specifics" ? (
          <>
            <p className="text-[15px] text-muted">All optional — answer what you can so our first reply is more useful.</p>
            {asked.map((s) => (
              <div key={s.slug} className="flex flex-col gap-5 border-t border-line pt-6">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">{s.label}</p>
                {SERVICE_QUESTIONS[s.slug].map((q) => {
                  const value = answers[s.slug]?.[q.id];
                  const qid = `${id}-${s.slug}-${q.id}`;
                  if (!q.options) {
                    return (
                      <Field key={q.id} label={q.label} htmlFor={qid}>
                        <input
                          id={qid}
                          className={field}
                          placeholder={q.placeholder}
                          maxLength={200}
                          value={typeof value === "string" ? value : ""}
                          onChange={(e) => answer(s.slug, q.id, e.target.value)}
                        />
                      </Field>
                    );
                  }
                  const picked = Array.isArray(value) ? value : value ? [value] : [];
                  return (
                    <div key={q.id} className="flex flex-col gap-3">
                      <p className={labelClass}>{q.label}</p>
                      <div role={q.multi ? "group" : "radiogroup"} aria-label={q.label} className="flex flex-wrap gap-3">
                        {q.options.map((o) => (
                          <Chip
                            key={o}
                            role={q.multi ? "checkbox" : "radio"}
                            selected={picked.includes(o)}
                            onClick={() =>
                              answer(
                                s.slug,
                                q.id,
                                q.multi
                                  ? picked.includes(o) ? picked.filter((x) => x !== o) : [...picked, o]
                                  : value === o ? "" : o,
                              )
                            }
                          >
                            {o}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        ) : null}

        {current === "scope" ? (
          <>
            <div className="flex flex-col gap-3">
              <p className={labelClass}>Is this a new project? {optionalTag}</p>
              <div role="radiogroup" aria-label="Project stage" className="grid gap-3 sm:grid-cols-2">
                {PROJECT_STAGES.map((p) => (
                  <Chip key={p} role="radio" selected={stage === p} onClick={() => setStage(stage === p ? "" : p)}>
                    {p}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className={labelClass}>Project budget</p>
              <div role="radiogroup" aria-label="Project budget" className="grid gap-3 sm:grid-cols-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} role="radio" selected={budget === b} onClick={() => setBudget(b)}>
                    {b}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className={labelClass}>Timeline {optionalTag}</p>
              <div role="radiogroup" aria-label="Timeline" className="grid gap-3 sm:grid-cols-2">
                {TIMELINES.map((t) => (
                  <Chip key={t} role="radio" selected={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {current === "you" ? (
          <>
            <Field label="Your name" htmlFor={`${id}-name`}>
              <input id={`${id}-name`} name="name" className={field} placeholder="Full name" autoComplete="name" required />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email address" htmlFor={`${id}-email`}>
                <input id={`${id}-email`} name="email" type="email" className={field} placeholder="you@example.com" autoComplete="email" required />
              </Field>
              <Field label="Company" htmlFor={`${id}-company`}>
                <input id={`${id}-company`} name="company" className={field} placeholder="e.g. Acme Corp" autoComplete="organization" required />
              </Field>
            </div>
            <Field label="Country" htmlFor={`${id}-country`}>
              <select id={`${id}-country`} name="country" className={`${field} appearance-none bg-[length:16px] bg-[right_1.25rem_center] bg-no-repeat pr-12`} style={selectArrow} defaultValue="" autoComplete="country-name" required>
                <option value="" disabled>
                  Select your country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Field label="Phone" htmlFor={`${id}-phone`}>
                  <input
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    className={field}
                    placeholder="+44 7700 900123"
                    autoComplete="tel"
                    maxLength={30}
                    required
                  />
                </Field>
                <label className="flex items-center gap-2.5 text-[14px] text-muted">
                  <input type="checkbox" name="whatsapp" className="size-4 accent-accent" />
                  This number is on WhatsApp
                </label>
              </div>
              <Field label="Current website" htmlFor={`${id}-site`}>
                {/* Not type="url": that would reject "example.com" without https://. The server normalises it. */}
                <input
                  id={`${id}-site`}
                  name="site_url"
                  inputMode="url"
                  className={field}
                  placeholder="yourcompany.com"
                  autoComplete="url"
                  maxLength={300}
                  required
                />
              </Field>
            </div>
            <Field label="Tell us about the project" htmlFor={`${id}-message`}>
              <textarea
                id={`${id}-message`}
                name="message"
                className={`${field} min-h-[140px] resize-y`}
                placeholder="Goals, links, anything that helps us understand what you're building…"
                required
              />
            </Field>
            <p className="text-[13px] text-muted">{[services.join(", "), stage, budget, timeline].filter(Boolean).join(" · ")}</p>
          </>
        ) : null}
      </div>

      {hint ? (
        <p role="alert" className="text-[14px] font-semibold text-accent">
          {hint}
        </p>
      ) : null}
      {status === "error" ? <ErrorNote message={error} /> : null}
      {last ? <Turnstile /> : null}

      <div className="flex flex-wrap items-center gap-6">
        {!last ? (
          <PillSubmit>Continue</PillSubmit>
        ) : (
          <PillSubmit disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Inquiry"}</PillSubmit>
        )}
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="font-display text-[14px] font-bold uppercase text-muted transition-colors hover:text-ink"
          >
            ← Back
          </button>
        ) : null}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------- ApplicationForm */
const CV_TYPES = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const CV_MAX_MB = 10;

export function ApplicationForm({ role, allowCv = false }: { role: string; allowCv?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const id = useId();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const cv = form.get("cv");
    form.delete("cv");
    const file = cv instanceof File && cv.size > 0 ? cv : null;
    if (file && file.size > CV_MAX_MB * 1024 * 1024) {
      setStatus("error");
      setError(`Your CV is larger than ${CV_MAX_MB}MB. Please upload a smaller file or share a link instead.`);
      return;
    }
    const data = Object.fromEntries(form);
    setStatus("sending");
    try {
      await submit({ kind: "application", role, ...leadContext(), ...data, turnstileToken: turnstileToken(e.currentTarget) }, file);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-5" aria-live="polite">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">✓</span>
        <h3 className="font-display text-[28px] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-ink">Application received</h3>
        <p className="text-[16px] leading-[1.6] text-muted">
          Thanks for applying. Our team reviews every application and will get back to you within two weeks.
        </p>
        <Link href="/about" className="font-display text-[14px] font-bold uppercase text-ink hover:text-accent">
          Meet the team →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <Honeypot />
      <Field label="Full name" htmlFor={`${id}-name`}>
        <input id={`${id}-name`} name="name" className={field} autoComplete="name" required />
      </Field>
      <Field label="Email" htmlFor={`${id}-email`}>
        <input id={`${id}-email`} name="email" type="email" className={field} autoComplete="email" required />
      </Field>
      <Field label="Portfolio / GitHub" htmlFor={`${id}-portfolio`}>
        <input id={`${id}-portfolio`} name="portfolio" type="url" className={field} placeholder="https://" required />
      </Field>
      <Field label="LinkedIn" htmlFor={`${id}-linkedin`} optional>
        <input id={`${id}-linkedin`} name="linkedin" type="url" className={field} placeholder="https://" />
      </Field>
      {allowCv ? (
        <Field label="CV" htmlFor={`${id}-cv`} optional>
          <input
            id={`${id}-cv`}
            name="cv"
            type="file"
            accept={CV_TYPES}
            className={`${field} file:mr-4 file:rounded-full file:border-0 file:bg-cloud file:px-4 file:py-2 file:font-display file:text-[12px] file:font-bold file:uppercase file:text-ink`}
          />
          <span className="text-[12px] text-muted">PDF or Word, up to {CV_MAX_MB}MB.</span>
        </Field>
      ) : null}
      <Field label="Why QORLIQ?" htmlFor={`${id}-message`} optional>
        <textarea id={`${id}-message`} name="message" className={`${field} min-h-[120px] resize-y`} />
      </Field>
      {status === "error" ? <ErrorNote message={error} /> : null}
      <Turnstile />
      <PillSubmit disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit Application"}</PillSubmit>
    </form>
  );
}

/* ----------------------------------------------------------- NewsletterForm */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      await submit({ kind: "newsletter", ...leadContext(), ...data, turnstileToken: turnstileToken(e.currentTarget) });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  if (status === "sent") {
    return (
      <p aria-live="polite" className="font-display text-[18px] font-bold uppercase text-accent">
        You&apos;re in. See you in your inbox. ✓
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex w-full max-w-[520px] flex-col gap-3">
      <Honeypot />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          className="flex-1 rounded-full border border-white/15 bg-white/[0.06] px-6 py-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-accent"
        />
        <PillSubmit disabled={status === "sending"}>{status === "sending" ? "…" : "Subscribe"}</PillSubmit>
      </div>
      <Turnstile />
      {status === "error" ? (
        <p role="alert" className="text-[14px] text-white/80">
          {error}
        </p>
      ) : null}
    </form>
  );
}

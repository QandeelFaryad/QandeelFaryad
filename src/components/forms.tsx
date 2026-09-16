"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PlusIcon } from "./icons";
import { PillButton, PillSubmit } from "./ui";
import { SERVICE_OPTIONS } from "@/lib/content";
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
                <span className="font-display text-[clamp(18px,2.2vw,24px)] font-bold text-ink">
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

async function submit(payload: Record<string, unknown>) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
}

const field =
  "w-full rounded-2xl border border-line bg-white px-5 py-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
const labelClass = "font-display text-[13px] font-bold uppercase text-ink";

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
const BUDGETS = ["$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+"];
const TIMELINES = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Flexible"];
const STEPS = ["What do you need?", "Budget & timeline", "About you"];

/** Three-step project inquiry with a confirmation screen. */
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");
  const [name, setName] = useState("");
  const heading = useRef<HTMLHeadingElement | null>(null);
  const moved = useRef(false);
  const id = useId();

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
    if (step === 0 && services.length === 0) return setHint("Pick at least one service to continue.");
    if (step === 1 && !budget) return setHint("Choose a budget range to continue.");
    go(step + 1);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return nextFromStep();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError("");
    try {
      await submit({ kind: "project", services, budget, timeline, ...data });
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
        <span className="flex size-14 items-center justify-center rounded-full bg-accent font-display text-[24px] font-bold text-ink">
          ✓
        </span>
        <div className="flex flex-col gap-4">
          <h3 ref={heading} tabIndex={-1} className="font-display text-[clamp(28px,4vw,44px)] font-bold uppercase leading-[1.05] text-ink outline-none">
            Thanks{name ? `, ${name}` : ""}. We&apos;re on it.
          </h3>
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-muted">
            A strategist will reply within one business day with next steps.
            {SITE.bookingUrl ? " Want to skip the back-and-forth? Grab a time that suits you." : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {SITE.bookingUrl ? <PillButton href={SITE.bookingUrl}>Book a Call Now</PillButton> : null}
          <Link href="/case-studies" className="font-display text-[14px] font-bold uppercase text-ink underline-offset-4 hover:text-accent hover:underline">
            Browse our work while you wait →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-8" noValidate={step < 2}>
      <Honeypot />

      {/* Progress */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-wide text-muted">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="hidden sm:inline">{STEPS.map((s, i) => (i === step ? s : null))}</span>
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
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
        className="font-display text-[clamp(24px,3vw,34px)] font-bold uppercase leading-[1.1] text-ink outline-none"
      >
        {STEPS[step]}
      </h3>

      <div key={step} className="animate-step flex flex-col gap-6">
        {step === 0 ? (
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

        {step === 1 ? (
          <>
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
              <p className={labelClass}>
                Timeline <span className="font-sans text-[12px] font-medium normal-case text-muted">(optional)</span>
              </p>
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

        {step === 2 ? (
          <>
            <Field label="Your name" htmlFor={`${id}-name`}>
              <input id={`${id}-name`} name="name" className={field} placeholder="Full name" autoComplete="name" required />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email address" htmlFor={`${id}-email`}>
                <input id={`${id}-email`} name="email" type="email" className={field} placeholder="you@example.com" autoComplete="email" required />
              </Field>
              <Field label="Company" htmlFor={`${id}-company`} optional>
                <input id={`${id}-company`} name="company" className={field} placeholder="e.g. Acme Corp" autoComplete="organization" />
              </Field>
            </div>
            <Field label="Tell us about the project" htmlFor={`${id}-message`} optional>
              <textarea
                id={`${id}-message`}
                name="message"
                className={`${field} min-h-[140px] resize-y`}
                placeholder="Goals, links, anything that helps us understand what you're building…"
              />
            </Field>
            <p className="text-[13px] text-muted">
              {services.join(", ")} · {budget}
              {timeline ? ` · ${timeline}` : ""}
            </p>
          </>
        ) : null}
      </div>

      {hint ? (
        <p role="alert" className="text-[14px] font-semibold text-accent">
          {hint}
        </p>
      ) : null}
      {status === "error" ? <ErrorNote message={error} /> : null}

      <div className="flex flex-wrap items-center gap-6">
        {step < STEPS.length - 1 ? (
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
export function ApplicationForm({ role }: { role: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const id = useId();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      await submit({ kind: "application", role, ...data });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-5" aria-live="polite">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent font-display text-[20px] font-bold text-ink">✓</span>
        <h3 className="font-display text-[28px] font-bold uppercase leading-[1.05] text-ink">Application received</h3>
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
      <Field label="Why QORLIQ?" htmlFor={`${id}-message`} optional>
        <textarea id={`${id}-message`} name="message" className={`${field} min-h-[120px] resize-y`} />
      </Field>
      {status === "error" ? <ErrorNote message={error} /> : null}
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
      await submit({ kind: "newsletter", ...data });
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
      {status === "error" ? (
        <p role="alert" className="text-[14px] text-white/80">
          {error}
        </p>
      ) : null}
    </form>
  );
}

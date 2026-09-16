import Link from "next/link";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent-deep focus:ring-2 focus:ring-accent/25";
export const labelClass = "text-[12px] font-bold uppercase tracking-wide text-ink";

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint ? <p className="text-[12px] leading-[1.5] text-muted">{hint}</p> : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  back,
  actions,
}: {
  title: string;
  description?: ReactNode;
  back?: { href: string; label: string };
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      {back ? (
        <Link href={back.href} className="self-start text-[13px] font-semibold text-muted hover:text-ink">
          ← {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-display text-[clamp(22px,3vw,30px)] font-semibold uppercase leading-[1.1] tracking-[-0.015em] text-ink">
            {title}
          </h1>
          {description ? <p className="text-[14px] text-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white ${className}`}>{children}</div>;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-spark/12 text-spark-deep",
  contacted: "bg-accent/15 text-accent-deep",
  reviewing: "bg-accent/15 text-accent-deep",
  interview: "bg-[#6d5dfc]/12 text-[#4b3dd1]",
  won: "bg-[#1f9d55]/12 text-[#177a42]",
  hired: "bg-[#1f9d55]/12 text-[#177a42]",
  published: "bg-[#1f9d55]/12 text-[#177a42]",
  open: "bg-[#1f9d55]/12 text-[#177a42]",
  lost: "bg-ink/8 text-muted",
  rejected: "bg-ink/8 text-muted",
  archived: "bg-ink/8 text-muted",
  closed: "bg-ink/8 text-muted",
  draft: "bg-[#e0a100]/15 text-[#8a6300]",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        STATUS_STYLES[status] ?? "bg-ink/8 text-muted"
      }`}
    >
      {status}
    </span>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-start gap-3 p-8">
      <p className="font-display text-[18px] font-semibold uppercase text-ink">{title}</p>
      <p className="max-w-[520px] text-[14px] leading-[1.6] text-muted">{body}</p>
      {action}
    </Card>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-soft"
          : "inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink transition-colors hover:border-ink/30"
      }
    >
      {children}
    </Link>
  );
}

/** Status filter chips for list pages. */
export function FilterTabs({
  base,
  current,
  options,
  query,
}: {
  base: string;
  current: string;
  options: { value: string; label: string; count?: number }[];
  query?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
      {options.map((o) => {
        const params = new URLSearchParams();
        if (o.value) params.set("status", o.value);
        if (query) params.set("q", query);
        const href = params.size ? `${base}?${params}` : base;
        const active = current === o.value;
        return (
          <Link
            key={o.value || "all"}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide transition-colors ${
              active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
            }`}
          >
            {o.label}
            {typeof o.count === "number" ? <span className={active ? "ml-1.5 text-white/60" : "ml-1.5 text-muted"}>{o.count}</span> : null}
          </Link>
        );
      })}
    </div>
  );
}

export function SearchBox({ base, query, status, placeholder }: { base: string; query: string; status?: string; placeholder: string }) {
  return (
    <form action={base} className="flex w-full max-w-[360px] gap-2" role="search">
      {status ? <input type="hidden" name="status" value={status} /> : null}
      <label htmlFor="admin-search" className="sr-only">
        Search
      </label>
      <input id="admin-search" name="q" defaultValue={query} placeholder={placeholder} className={inputClass} />
    </form>
  );
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

export function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/London" });
}

/** Escape user text for PostgREST `or=(…ilike…)` filters. */
export function ilikeTerm(q: string) {
  return `%${q.replace(/[%_,()*\\]/g, " ").trim()}%`;
}

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";
import { Magnetic, MarqueeTrack } from "./motion";

/* ---------------------------------------------------------------- PillButton */
const pillClass =
  "group inline-flex shrink-0 items-center gap-3 rounded-full bg-accent py-3 pl-6 pr-3 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60";

function PillInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative block overflow-hidden font-display text-[14px] font-bold uppercase leading-[1.25] text-ink whitespace-nowrap">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      <span className="flex size-7 items-center justify-center rounded-[14px] bg-ink text-white transition-transform duration-200 group-hover:rotate-45">
        <ArrowUpRight className="size-3" />
      </span>
    </>
  );
}

export function PillButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  return (
    <Magnetic>
      {external ? (
        <a
          href={href}
          className={`${pillClass} ${className}`}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <PillInner>{children}</PillInner>
        </a>
      ) : (
        <Link href={href} className={`${pillClass} ${className}`}>
          <PillInner>{children}</PillInner>
        </Link>
      )}
    </Magnetic>
  );
}

/** Same look as PillButton, for form submits and in-page actions. */
export function PillSubmit({
  children,
  type = "submit",
  disabled,
  onClick,
  className = "",
}: {
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Magnetic>
      <button type={type} disabled={disabled} onClick={onClick} className={`${pillClass} ${className}`}>
        <PillInner>{children}</PillInner>
      </button>
    </Magnetic>
  );
}

/* --------------------------------------------------------------- SectionLabel */
export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="dot-ping size-2 rounded-full bg-accent" />
      <p
        className={`font-display text-[13px] font-bold uppercase tracking-wide whitespace-nowrap ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ ImageFill */
/**
 * On-brand placeholder used for every photographic area in the design.
 * The original Figma frames use placeholder image fills, so we render a
 * tasteful branded gradient in their place. Drop a real `src` in to swap
 * any placeholder for a committed image under /public.
 */
export function ImageFill({
  label,
  src,
  className = "",
  seed = 0,
  rounded = "rounded-3xl",
  priority = false,
}: {
  label?: string;
  src?: string;
  className?: string;
  seed?: number;
  rounded?: string;
  /** Load immediately — use for above-the-fold images only. */
  priority?: boolean;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={label ?? ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={`h-full w-full object-cover ${rounded} ${className}`}
      />
    );
  }
  const gradients = [
    "linear-gradient(135deg,#2b1857,#c24a2c)",
    "linear-gradient(135deg,#1a1440,#7a2a5e)",
    "linear-gradient(160deg,#3b1c6e,#ff5a2c)",
    "linear-gradient(135deg,#0b0b0f,#5b2366)",
    "linear-gradient(200deg,#9e3a45,#2b1857)",
  ];
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden ${rounded} ${className}`}
      style={{ background: gradients[seed % gradients.length] }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_45%)]" />
      {label ? (
        <span className="relative m-4 font-display text-[11px] font-bold uppercase tracking-widest text-white/70">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- Marquee */
export function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={`flex w-full items-center overflow-hidden py-14 ${
        dark ? "bg-ink" : "bg-accent"
      }`}
    >
      <MarqueeTrack>
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10 pr-10">
            <span
              className={`font-display text-[40px] font-bold uppercase md:text-[64px] ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {it}
            </span>
            <span className={`size-3 rotate-45 ${dark ? "bg-accent" : "bg-ink"}`} />
          </span>
        ))}
      </MarqueeTrack>
    </div>
  );
}

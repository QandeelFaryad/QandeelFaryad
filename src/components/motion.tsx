"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------- Reveal */
/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  scale = false,
  clip = false,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  scale?: boolean;
  /** Curtain-wipe reveal for images. */
  clip?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${clip ? "reveal-clip" : scale ? "reveal-scale" : "reveal"} ${shown ? "is-visible" : ""} ${className}`}
      style={clip ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {clip ? (
        // Clip an inner layer: IntersectionObserver treats a fully clipped target as invisible.
        <div className="reveal-clip-inner" style={{ transitionDelay: `${delay}ms` }}>
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}

/* ------------------------------------------------------------------ Counter */
/** Counts up from 0 to `value` when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------- helpers */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** How long the first-visit intro (see IntroOverlay) still covers the page. */
function introRemaining() {
  if (document.documentElement.classList.contains("intro-seen")) return 0;
  return Math.max(0, 2100 - performance.now());
}

/* -------------------------------------------------------------- SplitReveal */
/** Reveals a headline word by word, each word rising out of a clipping mask. */
export function SplitReveal({
  text,
  as: Tag = "span",
  delay = 0,
  stagger = 70,
  highlight = [],
  className = "",
}: {
  text: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  /** Words that get an orange underline drawn in after they appear. */
  highlight?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setOffset(introRemaining());
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`split ${shown ? "is-visible" : ""} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className={`split-word ${highlight.includes(w) ? "split-hl" : ""}`}>
              <span
                className="split-inner"
                style={{
                  // Two delays for highlighted words: the rise, then the underline.
                  transitionDelay: highlight.includes(w)
                    ? `${offset + delay + i * stagger}ms, ${offset + delay + i * stagger + 650}ms`
                    : `${offset + delay + i * stagger}ms`,
                }}
              >
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ----------------------------------------------------------------- Parallax */
/** Drifts its content vertically as it scrolls past, inside a clipping frame. */
export function Parallax({
  children,
  strength = 50,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const rect = o.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when entering from below, +1 when leaving at the top.
      const progress = (vh - rect.top) / (vh + rect.height) * 2 - 1;
      i.style.transform = `translate3d(0, ${(-progress * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={outer} className={`relative overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -strength, bottom: -strength }}
      >
        {children}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- HorizontalScroll */
/**
 * On large screens, pins its content and scrolls the track sideways as the
 * page scrolls down. Falls back to a normal grid on small screens and for
 * reduced-motion users.
 */
export function HorizontalScroll({
  header,
  children,
  gridClassName = "",
  trackClassName = "",
}: {
  header?: ReactNode;
  children: ReactNode;
  gridClassName?: string;
  trackClassName?: string;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const t = track.current;
    const o = outer.current;
    if (!enabled || !t || !o) {
      if (t) t.style.transform = "";
      return;
    }
    const measure = () => setDistance(Math.max(0, t.scrollWidth - (t.parentElement?.clientWidth ?? 0)));
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    measure();

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = o.getBoundingClientRect();
      const span = o.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const d = Math.max(0, t.scrollWidth - (t.parentElement?.clientWidth ?? 0));
      t.style.transform = `translate3d(${(-p * d).toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <div className="flex flex-col gap-16">
        {header}
        <div className={gridClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={outer} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-14 overflow-hidden">
        {header}
        <div className="overflow-visible">
          <div ref={track} className={`flex w-max will-change-transform ${trackClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Magnetic */
/** Pulls its child gently toward the cursor on fine-pointer devices. */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const leave = () => {
      el.style.transition = "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- ReadingProgress */
/** Thin accent bar at the top of the viewport tracking progress through #article. */
export function ReadingProgress({ targetId = "article" }: { targetId?: string }) {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-spark" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

/* ---------------------------------------------------------------- ScrubText */
/**
 * Words brighten one by one as the paragraph scrolls through the viewport.
 * Pass several parts to style segments differently (e.g. a muted tail).
 */
export function ScrubText({
  parts,
  as: Tag = "p",
  className = "",
}: {
  parts: { text: string; className?: string }[];
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters the lower 15% of the screen, 1 when the bottom passes 45%.
      const p = (vh * 0.85 - rect.top) / (rect.height + vh * 0.4);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = parts.flatMap((part, pi) =>
    part.text.split(" ").filter(Boolean).map((w) => ({ w, className: part.className, pi })),
  );
  return (
    <Tag ref={ref} className={className} style={{ "--n": words.length } as React.CSSProperties}>
      {words.map((word, i) => (
        <span key={i} className={`scrub-word ${word.className ?? ""}`} style={{ "--i": i } as React.CSSProperties}>
          {word.w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* --------------------------------------------------------------------- Tilt */
/** Tilts its child toward the pointer in 3D, with a soft moving glare. */
export function Tilt({
  children,
  max = 6,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg)`;
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      el.dataset.tilting = "true";
    };
    const leave = () => {
      el.style.transition = "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
      delete el.dataset.tilting;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt relative h-full [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- PointerGlow */
/** A soft light that trails the pointer across its parent section. */
export function PointerGlow({ size = 640 }: { size?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = ref.current;
    const host = glow?.parentElement;
    if (!glow || !host) return;
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let active = false;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      glow.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`;
      raf = active || Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!active) {
        active = true;
        if (pos.x === 0 && pos.y === 0) Object.assign(pos, target);
        glow.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      active = false;
      glow.style.opacity = "0";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 -z-10 rounded-full opacity-0 mix-blend-soft-light transition-opacity duration-700"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(25,217,213,0.45) 0%, rgba(255,90,44,0.18) 38%, transparent 70%)",
      }}
    />
  );
}

/* --------------------------------------------------------------- ScrollFade */
/** Drifts up and fades out as the page scrolls past the top of the viewport. */
export function ScrollFade({
  children,
  speed = 0.35,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.2) return;
      el.style.transform = `translate3d(0, ${(-y * speed).toFixed(1)}px, 0)`;
      el.style.opacity = String(Math.max(0, 1 - y / (vh * 0.8)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ MarqueeTrack */
/**
 * Endless horizontal strip whose speed follows scroll velocity and whose
 * direction flips with scroll direction.
 */
export function MarqueeTrack({ children, speed = 1.2 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      boost += (Math.min(40, Math.abs(dy)) * 0.6 - boost) * 0.1;
      if (visible) {
        const half = el.scrollWidth / 2;
        x -= (speed + boost) * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        const skew = Math.max(-8, Math.min(8, boost * 0.35 * dir));
        el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${(-skew).toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed]);

  return (
    <div ref={ref} className="flex shrink-0 items-center whitespace-nowrap will-change-transform">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- BackToTop */
/** Floating button with a ring that fills as you read down the page. */
export function BackToTop() {
  const ring = useRef<SVGCircleElement | null>(null);
  const [shown, setShown] = useState(false);
  const C = 2 * Math.PI * 22;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShown(window.scrollY > window.innerHeight * 0.8);
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [C]);

  const toTop = async () => {
    const { getLenis } = await import("./experience");
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--color-spark)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <span className="relative text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
    </button>
  );
}

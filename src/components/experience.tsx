"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------- SmoothScroll */
let lenis: Lenis | null = null;

/** The active smooth-scroll instance, if any (null for reduced-motion users). */
export function getLenis() {
  return lenis;
}

/** Inertia-based smooth scrolling for wheel/trackpad input. Touch stays native. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Keep Lenis in sync with the scroll reset Next.js does on navigation
  // (skipping the first render so a reload keeps its restored position).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------ CustomCursor */
/**
 * A label bubble that follows the pointer over elements with a `data-cursor`
 * attribute (e.g. `data-cursor="View"`). Desktop / fine pointers only.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let current: string | null = null;
    let raf = 0;

    const loop = () => {
      const k = reduced ? 1 : 0.2;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const next = (e.target as Element | null)?.closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? null;
      if (next !== current) {
        current = next;
        setLabel(next);
      }
    };
    const leave = () => {
      current = null;
      setLabel(null);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Hide the bubble as soon as a navigation starts.
  const pathname = usePathname();
  useEffect(() => setLabel(null), [pathname]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <div
        className={`flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-spark font-display text-[13px] font-bold uppercase text-ink transition-[scale,opacity] duration-300 ease-out ${
          label ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {label} ↗
      </div>
    </div>
  );
}

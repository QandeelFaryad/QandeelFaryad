"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { holdRevealsUntil } from "./motion";

/** Curtain closing, before the route change starts. */
const COVER_MS = 420;
/** Shortest time the loader stays up, counted from the click. */
const MIN_MS = 950;
/** Curtain opening. Keep in sync with .route-loader.is-out in globals.css. */
const EXIT_MS = 650;
/** Lift the curtain anyway if the route never changes. */
const GIVE_UP_MS = 8000;

type Phase = "idle" | "in" | "out";

/**
 * Brand loader for moving between pages: a navy curtain closes, the QORLIQ
 * mark (from Loader.zip) assembles, and the curtain lifts on the new page.
 * Covers internal link clicks; back/forward stay instant.
 */
export default function RouteLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const busy = useRef(false);
  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);
  const firstPath = useRef(pathname);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, Math.max(0, ms)));
  };

  const lift = (delay: number) => {
    clearTimers();
    later(() => setPhase("out"), delay);
    later(() => {
      setPhase("idle");
      busy.current = false;
    }, delay + EXIT_MS);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.hasAttribute("download") || a.hasAttribute("data-no-loader")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (hash jumps, filters) and non-page files keep their normal behaviour.
      if (url.pathname === location.pathname) return;
      if (url.pathname.startsWith("/api/") || /\.[a-z0-9]+$/i.test(url.pathname)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Take over from <Link> (it skips clicks that are already prevented).
      e.preventDefault();
      // From here on pages arrive client-side, under the curtain: their hero reveals
      // must wait for it via holdRevealsUntil(), not run on CSS from mount.
      document.documentElement.classList.remove("first-load");
      if (busy.current) return;
      busy.current = true;
      startedAt.current = performance.now();
      clearTimers();
      setPhase("in");
      later(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
      later(() => lift(0), GIVE_UP_MS);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // The new page has rendered: hold its headline reveals until the curtain lifts.
  // (This component sits before the page in the tree, so this runs before their effects.)
  useEffect(() => {
    // Back/forward skip the click handler; drop the flag here too so those pages
    // use the JS reveals as well. (The initial render is a hard load and keeps it.)
    if (pathname !== firstPath.current) document.documentElement.classList.remove("first-load");
    if (!busy.current) return;
    const wait = startedAt.current + MIN_MS - performance.now();
    holdRevealsUntil(performance.now() + Math.max(0, wait) + 250);
    lift(wait);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => clearTimers, []);

  if (phase === "idle") return null;

  return (
    <div
      className={`route-loader ${phase === "out" ? "is-out" : ""}`}
      role="status"
      style={{ viewTransitionName: "route-loader" }}
    >
      <span className="sr-only">Loading page</span>
      <div className="route-loader-stage" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="route-loader-mark">
          <path
            className="route-loader-teal"
            d="M54.02,30.88C65.07,0.46,40.66-7.87,23.46,16.73l1.32,4.71c19.2-19.02,19.22,12.36,6.01,21.41l3.6,12.85l15.72,5.98l-4.46-15.92C49.18,41.41,51.99,36.41,54.02,30.88z"
          />
          <path
            className="route-loader-arc"
            d="M27.96,34.02c-16.14,15.92-14.55-9.68-4.89-17.38l-1.19-4.22c-8.03,7.8-14.28,19.79-14.67,31.1C7.05,62.1,24.14,52.41,30.37,42.6C29.69,40.16,28.38,35.52,27.96,34.02z"
          />
        </svg>
        <div className="route-loader-bar"><span /></div>
      </div>
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { holdRevealsUntil } from "./motion";
import BrandLoader from "./BrandLoader";
import { useMessages } from "@/i18n/client";

/** Loader fading in, before the route change starts. */
const COVER_MS = 420;
/** Shortest time the loader stays up, counted from the click. */
const MIN_MS = 950;
/** Loader fading out. Keep in sync with .route-loader.is-out in globals.css. */
const EXIT_MS = 650;
/** Lift the curtain anyway if the route never changes. */
const GIVE_UP_MS = 8000;

type Phase = "idle" | "in" | "out";

/**
 * Brand loader for moving between pages: the signature loader (BrandLoader)
 * fades in, the route changes underneath, and it fades out on the new page.
 * Covers internal link clicks; back/forward stay instant.
 */
export default function RouteLoader() {
  const router = useRouter();
  const t = useMessages();
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
      <span className="sr-only">{t.common.loadingPage}</span>
      <BrandLoader caption={t.loader.caption} subtitle={t.loader.subtitle} />
    </div>
  );
}

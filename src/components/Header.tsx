"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons";
import { PillButton } from "./ui";
import { getLenis } from "./experience";
import { HEADER_LINKS, NAV_LINKS, SITE } from "@/lib/site";

const HEADER_HEIGHT = 88;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed header: transparent over the hero, solid once scrolled, tucks away
 * while scrolling down and returns on scroll up.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setAtTop(y < 40);
      if (y < HEADER_HEIGHT) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
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
  }, []);

  // Reset on navigation.
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Let sticky elements (e.g. filter bars) sit just below the visible header.
  const visible = open || !hidden;
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", visible ? `${HEADER_HEIGHT}px` : "0px");
  }, [visible]);

  // Menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      closeButton.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    getLenis()?.start();
    document.body.style.overflow = "";
    if (wasOpen.current) {
      wasOpen.current = false;
      menuButton.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const solid = !atTop;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent px-5 py-3 font-display text-[13px] font-bold uppercase text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${solid ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"}`}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className={`container-x flex items-center justify-between transition-[padding] duration-500 ${solid ? "py-3" : "py-5"}`}>
          <Link href="/" className="flex shrink-0 items-center" aria-label="QORLIQ home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/qorliq-logo-white.svg"
              alt="QORLIQ"
              className={`w-auto transition-[height] duration-500 ${solid ? "h-8" : "h-9"}`}
              style={{ height: solid ? 32 : 36 }}
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
              {HEADER_LINKS.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-sweep pb-1 font-display text-[14px] font-bold uppercase whitespace-nowrap transition-colors ${
                      active ? "text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden md:block">
              <PillButton href="/contact">Start a Project</PillButton>
            </div>
            <button
              ref={menuButton}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="flex size-12 items-center justify-center rounded-3xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over menu */}
      <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`} inert={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          id="site-menu"
          aria-label="Main"
          className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-y-auto bg-ink px-8 py-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-8 w-auto" />
            <button
              ref={closeButton}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex size-12 items-center justify-center rounded-3xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <ul className="mt-12 flex flex-col gap-1">
            {NAV_LINKS.map((l, i) => {
              const active = isActive(pathname, l.href);
              return (
                <li
                  key={l.href}
                  className={`transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
                >
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center justify-between border-b border-white/10 py-3.5 font-display text-[clamp(24px,min(3.8vh,8vw),34px)] font-bold uppercase whitespace-nowrap transition-colors hover:text-accent ${
                      active ? "text-accent" : "text-white"
                    }`}
                  >
                    {active ? (
                      <span className="absolute -left-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent" aria-hidden="true" />
                    ) : null}
                    {l.label}
                    <span className="text-accent opacity-0 transition-[opacity,translate] group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-10">
            <PillButton href="/contact">Start a Project</PillButton>
          </div>
        </nav>
      </div>
    </>
  );
}

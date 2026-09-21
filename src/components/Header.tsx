"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "@/i18n/link";
import { useLocale, useMessages } from "@/i18n/client";
import { LOCALES, LOCALE_COOKIE, LOCALE_NAMES, localePath, splitLocale, type Locale } from "@/i18n/config";
import { MenuIcon, CloseIcon } from "./icons";
import { PillButton } from "./ui";
import { getLenis } from "./experience";
import { HEADER_LINKS, NAV_LINKS } from "@/lib/site";

const HEADER_HEIGHT = 96;

/** `path` is the current path with its language prefix already removed. */
function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

/** The same page in another language, remembering the choice for next time. */
function languageHref(locale: Locale, path: string) {
  return localePath(locale, path);
}
function rememberLanguage(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

/**
 * Language menu for the header bar. Plain links rather than client navigation:
 * each language has its own root layout, and data-no-loader keeps RouteLoader
 * from taking the click over.
 */
function LanguageMenu({ path }: { path: string }) {
  const locale = useLocale();
  const t = useMessages();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={`${t.common.language}: ${LOCALE_NAMES[locale]}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 items-center gap-2 rounded-3xl bg-white/10 px-4 font-display text-[13px] font-bold uppercase text-white transition-colors hover:bg-white/20"
      >
        <GlobeIcon className="size-4" />
        {locale}
      </button>
      {open ? (
        <ul className="absolute end-0 top-full mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-ink py-2 shadow-2xl">
          {LOCALES.map((l) => (
            <li key={l}>
              <a
                href={languageHref(l, path)}
                hrefLang={l}
                lang={l}
                data-no-loader
                aria-current={l === locale ? "true" : undefined}
                onClick={() => rememberLanguage(l)}
                className={`flex items-center justify-between gap-4 px-5 py-2.5 text-[15px] transition-colors hover:bg-white/10 ${
                  l === locale ? "text-accent" : "text-white"
                }`}
              >
                {LOCALE_NAMES[l]}
                <span className="font-display text-[11px] font-bold uppercase text-white/40">{l}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Fixed header: transparent over the hero, solid once scrolled, tucks away
 * while scrolling down and returns on scroll up.
 */
export default function Header() {
  const t = useMessages();
  const locale = useLocale();
  const { path } = splitLocale(usePathname());
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
  }, [path]);

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
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      closeButton.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    getLenis()?.start();
    document.documentElement.style.overflow = "";
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
        className="sr-only z-[70] rounded-full bg-accent px-5 py-3 font-display text-[13px] font-bold uppercase text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.common.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${solid ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"}`}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className={`container-x flex items-center justify-between transition-[padding] duration-500 ${solid ? "py-3" : "py-4"}`}>
          <Link href="/" className="flex shrink-0 items-center" aria-label={t.common.homeLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/qorliq-logo-white.svg"
              alt="QORLIQ"
              className="w-auto transition-[height] duration-500"
              style={{ height: solid ? 40 : 52 }}
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <nav aria-label={t.common.primaryNav} className="hidden items-center gap-5 lg:flex lg:gap-7">
              {HEADER_LINKS.map((l) => {
                const active = isActive(path, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-sweep pb-1 font-display text-[14px] font-bold uppercase whitespace-nowrap transition-colors ${
                      active ? "text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    {t.nav[l.key]}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden md:block">
              <PillButton href="/contact">{t.common.startProject}</PillButton>
            </div>
            <div className="hidden md:block">
              <LanguageMenu path={path} />
            </div>
            <button
              ref={menuButton}
              aria-label={t.common.openMenu}
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

      {/* Slide-over menu: from the right, or from the left in right-to-left languages */}
      <div className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`} inert={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 touch-none bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          id="site-menu"
          aria-label={t.common.mainNav}
          className={`absolute end-0 top-0 flex h-dvh w-full max-w-[460px] flex-col bg-ink px-8 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-10 w-auto" />
            <button
              ref={closeButton}
              aria-label={t.common.closeMenu}
              onClick={() => setOpen(false)}
              className="flex size-12 items-center justify-center rounded-3xl bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          {/* Only the link list scrolls: the close button and the CTA stay put, so they
              are reachable even on a short screen where the list has to be scrolled.
              min-h-0 is what lets a flex child shrink below its content and actually
              scroll; -mx-6/px-6 keeps the active dot at -start-5 out of the clip.

              data-lenis-prevent is what makes it scroll on a touch screen at all: we
              stop Lenis while the menu is open, and a stopped Lenis preventDefaults
              every touchmove on the page (lenis.mjs, "if (this.isStopped ...)"), which
              takes nested scrollers down with it. The attribute makes Lenis skip the
              gesture and leave it to the browser. */}
          <ul
            data-lenis-prevent
            className="-mx-6 mt-8 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-6"
          >
            {NAV_LINKS.map((l, i) => {
              const active = isActive(path, l.href);
              return (
                <li
                  key={l.href}
                  className={`transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0 rtl:-translate-x-8"
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
                      <span className="absolute -start-5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent" aria-hidden="true" />
                    ) : null}
                    {t.nav[l.key]}
                    <span className="text-accent opacity-0 transition-[opacity,translate] group-hover:translate-x-1 group-hover:opacity-100 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Languages, as plain links (see LanguageMenu) */}
          <div className="flex shrink-0 flex-wrap gap-2 pt-5" role="group" aria-label={t.common.language}>
            {LOCALES.map((l) => (
              <a
                key={l}
                href={languageHref(l, path)}
                hrefLang={l}
                lang={l}
                data-no-loader
                aria-current={l === locale ? "true" : undefined}
                onClick={() => rememberLanguage(l)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                  l === locale ? "border-accent text-accent" : "border-white/15 text-white/80 hover:border-white/40 hover:text-white"
                }`}
              >
                {LOCALE_NAMES[l]}
              </a>
            ))}
          </div>

          <div className="shrink-0 pt-5">
            <PillButton href="/contact">{t.common.startProject}</PillButton>
          </div>
        </nav>
      </div>
    </>
  );
}

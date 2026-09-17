"use client";

import Script from "next/script";
import Link from "next/link";
import { CONSENT_KEY, GA_ID, GTM_ID } from "@/lib/analytics";
import { useCallback, useEffect, useState } from "react";

const KEY = CONSENT_KEY;

type Choice = "accepted" | "rejected" | null;

function read(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/** Lets the footer (or anywhere else) reopen the banner. */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("qorliq:cookie-settings"));
}

/**
 * Cookie banner. Google Tag Manager and Google Analytics load from the root layout
 * in Consent Mode (see lib/analytics.ts); choosing here updates their consent.
 * Plausible, if configured, loads only after the visitor accepts:
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN — e.g. "qorliq.com" (no cookies, but gated anyway)
 */
/** Consent Mode's gtag(): the dataLayer expects the arguments object itself, not an array. */
function gtag(..._args: unknown[]) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

export default function Consent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [visible, setVisible] = useState(false);

  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const hasAnalytics = Boolean(plausible || GA_ID || GTM_ID);

  useEffect(() => {
    const saved = read();
    setChoice(saved);
    // Nothing to consent to if no analytics are configured.
    if (!saved && hasAnalytics) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener("qorliq:cookie-settings", reopen);
    return () => window.removeEventListener("qorliq:cookie-settings", reopen);
  }, [hasAnalytics]);

  const decide = useCallback((value: Exclude<Choice, null>) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage blocked — the choice just won't persist */
    }
    setChoice(value);
    setVisible(false);
    gtag("consent", "update", { analytics_storage: value === "accepted" ? "granted" : "denied" });
  }, []);

  return (
    <>
      {choice === "accepted" && plausible ? (
        <Script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {visible ? (
        <div
          role="dialog"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-[680px] rounded-3xl border border-white/10 bg-ink p-6 shadow-2xl sm:inset-x-5 sm:bottom-5 sm:p-7"
        >
          <p className="font-display text-[15px] font-bold uppercase text-white">Cookies</p>
          <p className="mt-3 text-[14px] leading-[1.6] text-on-dark">
            We use essential cookies to make this site work. With your permission we&apos;d also
            like to measure which pages are useful. Read our{" "}
            <Link href="/legal/cookies" className="font-semibold text-white underline underline-offset-2">
              cookie policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => decide("accepted")}
              className="rounded-full bg-accent px-6 py-3 font-display text-[13px] font-bold uppercase text-ink transition-transform hover:-translate-y-0.5"
            >
              Accept analytics
            </button>
            <button
              onClick={() => decide("rejected")}
              className="rounded-full border border-white/25 px-6 py-3 font-display text-[13px] font-bold uppercase text-white transition-colors hover:border-white/60"
            >
              Essential only
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import type { Messages } from "./messages/en";

/** The strings client components need; the root layout passes these down. */
export type ClientMessages = Pick<Messages, "common" | "nav" | "form" | "consent" | "loader" | "blog" | "process">;

const I18nContext = createContext<{ locale: Locale; messages: ClientMessages } | null>(null);

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: ClientMessages; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

export const useMessages = () => useI18n().messages;

/** Outside the provider (e.g. an admin page reusing a site component) this is English. */
export function useLocale(): Locale {
  return useContext(I18nContext)?.locale ?? DEFAULT_LOCALE;
}

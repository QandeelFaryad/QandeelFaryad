import type { Locale } from "./config";
import type { Messages } from "./messages/en";

const loaders: Record<Locale, () => Promise<Messages>> = {
  en: () => import("./messages/en").then((m) => m.default),
  ar: () => import("./messages/ar").then((m) => m.default),
  ru: () => import("./messages/ru").then((m) => m.default),
  es: () => import("./messages/es").then((m) => m.default),
  fr: () => import("./messages/fr").then((m) => m.default),
  pt: () => import("./messages/pt").then((m) => m.default),
};

/** One language's messages. Safe anywhere on the server, including route handlers. */
export function loadMessages(locale: Locale): Promise<Messages> {
  return loaders[locale]();
}

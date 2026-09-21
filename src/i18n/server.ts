import { lang } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "./config";
import { loadMessages } from "./load";
import type { Messages } from "./messages/en";

/** The current page's language, from the [lang] root segment. Server components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Every string on the site, in the current page's language (or `locale`). */
export async function getMessages(locale?: Locale): Promise<Messages> {
  return loadMessages(locale ?? (await getLocale()));
}

/** A site path in the current page's language. */
export async function href(path: string) {
  return localePath(await getLocale(), path);
}

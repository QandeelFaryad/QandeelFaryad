"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "./config";
import { useLocale } from "./client";

/**
 * next/link, but site paths stay in the current language: href="/services" on an
 * Arabic page goes to /ar/services. External links, mailto: and #hashes pass
 * through untouched.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localePath(locale, href) : href} {...props} />;
}

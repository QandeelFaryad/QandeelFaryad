import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

/** Date format follows the page language via LegalPage; this is the last revision. */
const UPDATED = "2026-09-16";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.privacy;
  return pageMetadata("/legal/privacy", t.title, fmt(t.description, { entity: SITE.legal.entity, name: SITE.name }));
}

export default async function Page() {
  const t = (await getMessages()).legal.privacy;
  return <LegalPage title={t.title} intro={t.intro} updated={UPDATED} sections={t.sections} />;
}

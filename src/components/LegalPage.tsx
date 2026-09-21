import type { ReactNode } from "react";
import PageShell from "./PageShell";
import PageHero from "./PageHero";
import { SITE } from "@/lib/site";
import { getLocale, getMessages } from "@/i18n/server";
import { DATE_LOCALES } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import type { LegalSection } from "@/i18n/messages/en";

/** Placeholders the policy text can use. */
function legalVars(country: string) {
  return {
    entity: SITE.legal.entity,
    name: SITE.name,
    companyNo: SITE.legal.companyNo,
    vat: SITE.legal.vat,
    country,
    email: SITE.email,
  };
}

/**
 * Shared layout for the policy pages. Content is a starting point drafted from
 * the company details — have it reviewed before launch. Translations carry a note
 * that the English version prevails.
 */
export default async function LegalPage({
  title,
  intro,
  updated,
  sections,
  children,
}: {
  title: string[];
  intro: string;
  /** ISO date (YYYY-MM-DD); shown in the page's language. */
  updated: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  const [m, locale] = await Promise.all([getMessages(), getLocale()]);
  const t = m.legal;
  const date = new Date(`${updated}T00:00:00Z`).toLocaleDateString(DATE_LOCALES[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const vars = legalVars(m.company.country);
  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={title} sub={fmt(intro, vars)} />

      <article className="bg-white">
        <div className="container-x [padding-block:96px]">
          <div className="mx-auto flex max-w-[820px] flex-col gap-10">
            <p className="text-[14px] font-semibold uppercase tracking-wide text-muted">{fmt(t.lastUpdated, { date })}</p>

            {t.translationNote ? (
              <p className="rounded-2xl border border-line bg-cloud px-5 py-4 text-[14px] leading-[1.6] text-ink/80">{t.translationNote}</p>
            ) : null}

            {sections.map((s, i) => (
              <section key={s.heading} className="flex flex-col gap-4">
                <h2 className="font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.015em] uppercase leading-[1.15] text-ink">
                  <span className="me-3 text-spark">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body.map((block, bi) =>
                  Array.isArray(block) ? (
                    <ul key={bi} className="prose-qorliq flex flex-col gap-2">
                      {block.map((item) => (
                        <li key={item}>{fmt(item, vars)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={bi} className="text-[16px] leading-[1.75] text-ink/80">
                      {fmt(block, vars)}
                    </p>
                  ),
                )}
              </section>
            ))}

            {children}

            <div className="mt-6 rounded-3xl bg-cloud p-8">
              <p className="font-display text-[18px] font-bold uppercase text-ink">{t.contactUs}</p>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                {fmt(t.tradingAs, vars)}
                <br />
                {fmt(t.companyLine, { no: SITE.legal.companyNo, vat: SITE.legal.vat })}
                <br />
                {fmt(t.registeredLine, { country: m.company.country, location: m.company.location })}
                <br />
                <a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:text-accent">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

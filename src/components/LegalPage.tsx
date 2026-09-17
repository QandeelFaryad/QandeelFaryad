import type { ReactNode } from "react";
import PageShell from "./PageShell";
import PageHero from "./PageHero";
import { SITE } from "@/lib/site";

export type LegalSection = { heading: string; body: (string | string[])[] };

/**
 * Shared layout for the policy pages. Content is a starting point drafted from
 * the company details — have it reviewed before launch.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  children,
}: {
  eyebrow: string;
  title: string[];
  intro: string;
  updated: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} titleLines={title} sub={intro} />

      <article className="bg-white">
        <div className="container-x [padding-block:96px]">
          <div className="mx-auto flex max-w-[820px] flex-col gap-10">
            <p className="text-[14px] font-semibold uppercase tracking-wide text-muted">
              Last updated: {updated}
            </p>

            {sections.map((s, i) => (
              <section key={s.heading} className="flex flex-col gap-4">
                <h2 className="font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.015em] uppercase leading-[1.15] text-ink">
                  <span className="mr-3 text-spark">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body.map((block, bi) =>
                  Array.isArray(block) ? (
                    <ul key={bi} className="prose-qorlic flex flex-col gap-2">
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={bi} className="text-[16px] leading-[1.75] text-ink/80">
                      {block}
                    </p>
                  ),
                )}
              </section>
            ))}

            {children}

            <div className="mt-6 rounded-3xl bg-cloud p-8">
              <p className="font-display text-[18px] font-bold uppercase text-ink">Contact us</p>
              <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                {SITE.legal.entity} (trading as {SITE.name})
                <br />
                Company Reg. No. {SITE.legal.companyNo} · VAT {SITE.legal.vat}
                <br />
                Registered in the {SITE.legal.country} · {SITE.location}
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

import Link from "@/i18n/link";
import { PillButton } from "./ui";
import { SITE } from "@/lib/site";
import { getMessages } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import CookieSettingsLink from "./CookieSettingsLink";

const SOCIALS = SITE.socials.filter((s) => s.href);

export default async function Footer() {
  const t = await getMessages();
  const l = t.footer.links;
  const cols = [
    {
      title: t.footer.columns.services,
      links: [
        [l.websiteDesign, "/services#website-design"],
        [l.ecommerce, "/services#ecommerce-store"],
        [l.applications, "/services#application-development"],
        [l.seo, "/services#seo-ranking"],
        [l.paidAds, "/services#paid-ads"],
        [l.automation, "/services#automation-ai"],
      ],
    },
    {
      title: t.footer.columns.solutions,
      links: [
        [l.microsoftCsp, "/microsoft-csp"],
        [l.brandIdentity, "/services#brand-identity"],
        [l.leadGeneration, "/services#lead-generation"],
        [l.industries, "/industries"],
      ],
    },
    {
      title: t.footer.columns.legal,
      legal: true,
      links: [
        [l.privacy, "/legal/privacy"],
        [l.cookies, "/legal/cookies"],
        [l.terms, "/legal/terms"],
      ],
    },
    {
      title: t.footer.columns.company,
      links: [
        [l.about, "/about"],
        [l.caseStudies, "/case-studies"],
        [l.blog, "/blog"],
        [l.careers, "/careers"],
        [l.contact, "/contact"],
      ],
    },
  ];

  return (
    <footer className="bg-ink">
      <div className="container-x flex flex-col gap-20 pb-10 pt-30 [padding-top:120px]">
        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link href="/contact" data-cursor={t.common.cursor.letsTalk} className="group" aria-label={t.footer.ctaLabel}>
            <h2 aria-hidden="true" className="max-w-[1303px] whitespace-pre-wrap font-display text-[clamp(40px,7vw,80px)] font-bold tracking-[-0.015em] uppercase leading-[0.95] text-white">
              {/* Letter by letter for the hover wave; Arabic has to stay joined, so it animates as one word. */}
              {(t.footer.cta.match(/[؀-ۿ]/) ? [t.footer.cta] : t.footer.cta.split("")).map((ch, i) => (
                <span key={i} className="wave-letter" style={{ transitionDelay: `${i * 18}ms` }}>
                  {ch}
                </span>
              ))}
            </h2>
          </Link>
          <PillButton href="/contact">{t.common.startProject}</PillButton>
        </div>

        <hr className="border-white/10" />

        {/* Links */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex w-full max-w-[280px] flex-col gap-6">
            <Link href="/" className="flex items-center" aria-label={t.common.homeLabel}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-12 w-auto" />
            </Link>
            <p className="text-[14px] leading-[1.6] text-on-dark">
              {t.company.brandLine}. {t.footer.blurb}
            </p>
            <div className="flex flex-col gap-1 text-[14px] text-on-dark">
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              <span>{t.company.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {cols.map((col) => (
              <div key={col.title} className="flex w-[160px] flex-col gap-4">
                <p className="font-display text-[14px] font-bold uppercase text-white">{col.title}</p>
                {col.links.map(([label, href]) => (
                  <Link key={href} href={href} className="link-sweep w-fit pb-0.5 text-[14px] text-on-dark hover:text-white">
                    {label}
                  </Link>
                ))}
                {col.legal ? <CookieSettingsLink label={t.footer.cookieSettings} /> : null}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[640px] text-[13px] leading-[1.6] text-on-dark">
            {fmt(t.footer.legalLine, {
              year: new Date().getFullYear(),
              entity: SITE.legal.entity,
              companyNo: SITE.legal.companyNo,
              vat: SITE.legal.vat,
              country: t.company.country,
            })}
          </p>
          <div className="flex flex-wrap gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-semibold text-white hover:text-accent"
              >
                {s.label}
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="text-[14px] font-semibold text-white hover:text-accent">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

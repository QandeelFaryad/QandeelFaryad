import Link from "next/link";
import { PillButton } from "./ui";
import { SITE } from "@/lib/site";
import CookieSettingsLink from "./CookieSettingsLink";

const COLS = [
  {
    title: "Services",
    links: [
      ["Website Design", "/services#website-design"],
      ["E-Commerce", "/services#ecommerce-store"],
      ["Applications", "/services#application-development"],
      ["SEO & Ranking", "/services#seo-ranking"],
      ["Paid Ads", "/services#paid-ads"],
      ["Automation & AI", "/services#automation-ai"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Microsoft CSP", "/microsoft-csp"],
      ["Brand Identity", "/services#brand-identity"],
      ["Lead Generation", "/services#lead-generation"],
      ["Industries", "/industries"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/legal/privacy"],
      ["Cookie Policy", "/legal/cookies"],
      ["Terms of Use", "/legal/terms"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Case Studies", "/case-studies"],
      ["Blog", "/blog"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
];


const SOCIALS = SITE.socials.filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="container-x flex flex-col gap-20 pb-10 pt-30 [padding-top:120px]">
        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link href="/contact" data-cursor="Let's talk" className="group" aria-label="Let's work together — start a project">
            <h2 aria-hidden="true" className="max-w-[1303px] whitespace-pre-wrap font-display text-[clamp(40px,7vw,80px)] font-semibold tracking-[-0.015em] uppercase leading-[0.95] text-white">
              {"Let's work together".split("").map((ch, i) => (
                <span key={i} className="wave-letter" style={{ transitionDelay: `${i * 18}ms` }}>
                  {ch}
                </span>
              ))}
            </h2>
          </Link>
          <PillButton href="/contact">Start a Project</PillButton>
        </div>

        <hr className="border-white/10" />

        {/* Links */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex w-full max-w-[280px] flex-col gap-6">
            <Link href="/" className="flex items-center" aria-label="QORLIQ home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/brand/qorliq-logo-white.svg" alt="QORLIQ" className="h-12 w-auto" />
            </Link>
            <p className="text-[14px] leading-[1.6] text-on-dark">
              {SITE.legal.brandLine}. We help businesses build a stronger digital presence,
              improve customer reach, automate operations, and grow with reliable technology.
            </p>
            <div className="flex flex-col gap-1 text-[14px] text-on-dark">
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              <span>{SITE.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            {COLS.map((col) => (
              <div key={col.title} className="flex w-[160px] flex-col gap-4">
                <p className="font-display text-[14px] font-bold uppercase text-white">
                  {col.title}
                </p>
                {col.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="link-sweep w-fit pb-0.5 text-[14px] text-on-dark hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
                {col.title === "Legal" ? <CookieSettingsLink /> : null}
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[640px] text-[13px] leading-[1.6] text-on-dark">
            © {new Date().getFullYear()} {SITE.legal.entity}. All rights reserved. Company Reg. No.{" "}
            {SITE.legal.companyNo} · VAT {SITE.legal.vat} · Registered in the {SITE.legal.country}.
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

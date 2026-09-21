import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, PillButton } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ContactForm, Accordion } from "@/components/forms";
import { PartnerStrip } from "@/components/profile";
import { SITE, callHref } from "@/lib/site";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.contact;
  return pageMetadata("/contact", t.title, t.description);
}

export default async function ContactPage() {
  const m = await getMessages();
  const t = m.contact;
  const faq = t.faq.map((f) => ({ q: f.q, a: fmt(f.a, { entity: SITE.legal.entity, country: m.company.country }) }));

  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub} />

      {/* Split: form + channels */}
      <section className="bg-white">
        <div className="container-x grid gap-16 [padding-block:120px] lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionLabel>{t.inquiryLabel}</SectionLabel>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-10">
            <SectionLabel>{t.infoLabel}</SectionLabel>
            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">{t.getInTouch}</p>
              <a href={`mailto:${SITE.email}`} dir="ltr" className="w-fit text-[18px] font-medium text-ink hover:text-accent">
                {SITE.email}
              </a>
              <a href={SITE.url} dir="ltr" className="w-fit text-[18px] font-medium text-ink hover:text-accent" target="_blank" rel="noopener noreferrer">
                www.qorliq.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">{t.whereWeAre}</p>
              <p className="text-[16px] leading-[1.6] text-ink">{m.company.location}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">{t.companyLabel}</p>
              <p className="text-[15px] leading-[1.7] text-muted">
                {fmt(t.brand, { name: SITE.name })}
                <br />
                {fmt(t.operatedBy, { entity: SITE.legal.entity })}
                <br />
                {fmt(t.companyNo, { no: SITE.legal.companyNo })}
                <br />
                {fmt(t.vat, { vat: SITE.legal.vat })}
              </p>
            </div>

            <div className="rounded-3xl bg-cloud p-8">
              <p className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">{t.callHeading}</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">{t.callBody}</p>
              <div className="mt-5">
                <PillButton href={callHref(t.callSubject)}>{t.bookCall}</PillButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location band */}
      <section className="bg-cloud">
        <div className="container-x py-6">
          <div className="brand-gradient-animated relative flex h-[220px] items-center justify-center overflow-hidden rounded-3xl px-6 text-center">
            <span className="font-display text-[clamp(14px,2vw,20px)] font-semibold uppercase tracking-widest text-white/85">{m.company.location}</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 [padding-block:120px]">
          <Reveal><SectionLabel>{t.faqLabel}</SectionLabel></Reveal>
          <Reveal delay={100}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </section>

      <PartnerStrip />
    </PageShell>
  );
}

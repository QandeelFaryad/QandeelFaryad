import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, PillButton } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ContactForm, Accordion } from "@/components/forms";
import { PartnerStrip } from "@/components/profile";
import { SITE, callHref, pageMeta } from "@/lib/site";

const FAQ = [
  {
    q: "What services does QORLIQ offer?",
    a: "Website design, e-commerce stores, application development, Microsoft solutions, lead generation, SEO and ranking, paid ads, brand identity, and automation and AI. You can work with us on a single service or a complete digital foundation.",
  },
  {
    q: "How does a project run?",
    a: "We follow a clear process from consultation to planning, design, development, launch, and support. Timelines and scope are agreed up front so the project stays organised and you always know what happens next.",
  },
  {
    q: "Where are you based, and who do you work with?",
    a: `QORLIQ is a digital services brand operated by ${SITE.legal.entity}, registered in the ${SITE.legal.country} and serving clients internationally. We work with startups, small businesses, growing companies, and established organisations.`,
  },
  {
    q: "Do you support Microsoft 365 and Azure?",
    a: "Yes. We handle Microsoft 365 setup, business email, Teams, SharePoint, Exchange Online, Defender, security and compliance settings, licensing support, and cloud migration planning. See our Microsoft Solutions page for detail.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing is transparent and quoted per project after an initial consultation, so it matches your goals and budget. Tell us what you need and we'll come back with a clear proposal.",
  },
];

export const metadata = pageMeta(
  "Contact",
  "Tell us about your project. QORLIQ is ready to support your business with professional digital solutions designed for growth.",
);

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="LET'S WORK TOGETHER"
        titleLines={["LET'S BUILD", "YOUR DIGITAL", "FUTURE"]}
        sub="Whether you need a website, online store, application, branding, digital marketing, automation, AI, or Microsoft solutions, our team is ready to help you move forward with confidence."
      />

      {/* Split: form + channels */}
      <section className="bg-white">
        <div className="container-x grid gap-16 [padding-block:120px] lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionLabel>PROJECT INQUIRY</SectionLabel>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-10">
            <SectionLabel>CONTACT INFORMATION</SectionLabel>
            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">Get in touch</p>
              <a href={`mailto:${SITE.email}`} className="text-[18px] font-medium text-ink hover:text-accent">
                {SITE.email}
              </a>
              <a href={SITE.phone.href} className="text-[18px] font-medium text-ink hover:text-accent">
                {SITE.phone.label}
              </a>
              <a
                href={SITE.url}
                className="text-[18px] font-medium text-ink hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.qorliq.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">Where we are</p>
              <p className="text-[16px] leading-[1.6] text-ink">{SITE.location}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-display text-[13px] font-bold uppercase text-accent">Company</p>
              <p className="text-[15px] leading-[1.7] text-muted">
                Brand: {SITE.name}
                <br />
                Operated by: {SITE.legal.entity}
                <br />
                Company Reg. No. {SITE.legal.companyNo}
                <br />
                VAT: {SITE.legal.vat}
              </p>
            </div>

            <div className="rounded-3xl bg-cloud p-8">
              <p className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">Prefer a real-time call?</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                {SITE.bookingUrl ? "Pick a 30-minute slot that suits you." : "Email us and we'll find a time that works."}
              </p>
              <div className="mt-5">
                <PillButton href={callHref()}>Book a Call</PillButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Location band */}
      <section className="bg-cloud">
        <div className="container-x py-6">
          <div className="brand-gradient-animated relative flex h-[220px] items-center justify-center overflow-hidden rounded-3xl px-6 text-center">
            <span className="font-display text-[clamp(14px,2vw,20px)] font-semibold tracking-[-0.015em] uppercase tracking-widest text-white/85">
              {SITE.location}
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 [padding-block:120px]">
          <Reveal><SectionLabel>FREQUENTLY ASKED QUESTIONS</SectionLabel></Reveal>
          <Reveal delay={100}>
            <Accordion items={FAQ} />
          </Reveal>
        </div>
      </section>

      <PartnerStrip />
    </PageShell>
  );
}

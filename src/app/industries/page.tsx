import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { PartnerStrip } from "@/components/profile";
import { SITE, pageMeta } from "@/lib/site";

const SECTORS = [
  { no: "01", title: "TECHNOLOGY & SAAS", body: "We partner with hyper-growth tech companies and enterprise SaaS giants to build intuitive product interfaces, marketing websites, and high-performance design systems.", tags: ["Product Design", "Next.js Dev", "Design Systems"] },
  { no: "02", title: "HEALTHCARE & WELLNESS", body: "Designing digital experiences that bridge the gap between patient care and absolute clarity. Clean, accessible, and certified with global standards.", tags: ["UX Audit", "Accessibility", "Patient Portals"] },
  { no: "03", title: "FINANCE & FINTECH", body: "Empowering next-generation financial institutions with clear dashboards, robust consumer mobile apps, and visually distinct brand languages.", tags: ["Data Vis", "Mobile App", "Security First"] },
  { no: "04", title: "E-COMMERCE & RETAIL", body: "Ultra-fast headless architectures optimized for conversions, immersive interactive 3D product previews, and cohesive brand design.", tags: ["Shopify Plus", "Conversion Rate", "Branding"] },
  { no: "05", title: "REAL ESTATE & ARCHITECTURE", body: "High-fidelity digital storefronts for structural developers and design practices, offering cinematic rendering integration and editorial catalogs.", tags: ["3D Showcases", "Editorial", "Webflow"] },
  { no: "06", title: "EDUCATION & EDTECH", body: "Crafting engaging spaces for virtual classrooms, professional learning ecosystems, and high-performance knowledge platforms.", tags: ["LMS Design", "Interactivity", "Identity"] },
  { no: "07", title: "MEDIA & ENTERTAINMENT", body: "High-octane design and immersive interactions for production houses, digital streaming collectives, and creative broadcast teams.", tags: ["Motion Design", "Interactive", "React"] },
  { no: "08", title: "SUSTAINABILITY & CLEANTECH", body: "Championing carbon-aware software, renewable energy platforms, and environmental networks with sustainable tech systems.", tags: ["Green Hosting", "Energy APIs", "Data Systems"] },
];

const WHY = [
  { no: "01", title: "INDUSTRY EXPERTISE", body: "Our teams are highly specialized. We don't just assign designers; we deploy domain experts who understand your sector's regulatory and commercial landscape." },
  { no: "02", title: "TAILORED SOLUTIONS", body: "No cookie-cutter templates. Every system, wireframe, logo, and line of code is engineered with your unique growth targets and customer behavior in mind." },
  { no: "03", title: "PROVEN RESULTS", body: "We track performance and conversions. Our designs have helped secure millions in funding and drive double-digit improvements in digital engagement." },
  { no: "04", title: "LONG-TERM PARTNERSHIP", body: "We build systems to last. Our comprehensive brand guides and pristine design systems ensure your internal teams can expand gracefully." },
];


export const metadata = pageMeta(
  "Industries",
  "From seed-stage SaaS to global healthcare platforms, we translate industry complexity into clear, award-winning interfaces.",
);

export default function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        titleLines={["DESIGNING FOR THE", "WORLD'S CORE SECTORS"]}
        sub="We work with startups, small businesses, growing companies, and established organisations across a wide range of sectors, adapting each solution to how that industry actually operates."
        stats={[
          { value: SITE.stats.projects, label: "Projects Delivered" },
          { value: SITE.stats.industries, label: "Industries Served" },
        ]}
      />

      {/* Sector grid */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <SectionLabel>SECTOR EXPERTISE</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-accent">( {SITE.stats.industries} industries served )</span>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {SECTORS.map((s, i) => (
              <Reveal key={s.no} delay={(i % 2) * 80} scale>
                <Tilt max={4}>
                <div className="group flex h-full flex-col gap-5 rounded-3xl border border-line bg-white p-8 transition-colors duration-300 hover:border-accent">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[20px] font-bold text-accent">{s.no}</span>
                  </div>
                  <h3 className="font-display text-[clamp(20px,2.4vw,28px)] font-bold uppercase text-ink transition-colors group-hover:text-accent">
                    {s.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-ink/75">{s.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium uppercase text-ink/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal><SectionLabel dark>WHY CHOOSE QORLIQ</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-[820px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] text-white">
              A specialized approach for ambitious businesses
            </h2>
          </Reveal>
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.no} delay={i * 80}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-bold text-accent">{w.no}</span>
                  <h3 className="font-display text-[22px] font-bold uppercase text-white">{w.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-on-dark">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnerStrip />

      <CtaBanner heading="LET'S MAKE SOMETHING AMAZING TOGETHER" />
    </PageShell>
  );
}

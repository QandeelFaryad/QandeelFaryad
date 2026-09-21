import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ApplicationForm } from "@/components/forms";
import { OPEN_APPLICATION, type Role } from "@/lib/content";
import { getRole, getRoles } from "@/lib/data";
import { isServiceConfigured } from "@/lib/supabase/service";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/en";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [...(await getRoles()), OPEN_APPLICATION].map((r) => ({ slug: r.slug }));
}

/**
 * A role as shown on this page. The built-in open application is translated;
 * roles from the admin panel are shown as written.
 */
async function localRole(slug: string, m: Messages): Promise<Role | undefined> {
  if (slug === OPEN_APPLICATION.slug) return { ...OPEN_APPLICATION, ...m.careers.openApplication };
  return getRole(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const m = await getMessages();
  const role = await localRole(slug, m);
  if (!role) return {};
  return pageMetadata(`/careers/${slug}`, `${role.title} · ${m.meta.careersSuffix}`, role.summary);
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-ink">{title}</h2>
      <ul className="prose-qorliq">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const m = await getMessages();
  const t = m.careers;
  const [role, roles] = await Promise.all([localRole(slug, m), getRoles()]);
  if (!role) notFound();
  const open = slug === OPEN_APPLICATION.slug;
  const others = roles.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow={fmt(t.eyebrowRole, { dept: role.dept.toUpperCase() })} titleLines={[role.title]} sub={role.summary}>
        <div className="mt-10 flex flex-wrap gap-3">
          {[role.dept, role.loc].map((tag) => (
            <span key={tag} className="rounded-full border border-white/25 px-4 py-2 text-[13px] font-semibold uppercase text-white">
              {tag}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <div className="container-x grid gap-16 [padding-block:96px] lg:grid-cols-[1fr_440px] lg:items-start">
          <div className="flex flex-col gap-12">
            <Link href="/careers" className="font-display text-[13px] font-bold uppercase text-muted transition-colors hover:text-accent">
              {t.allRoles}
            </Link>
            <Reveal>
              <List title={open ? t.tellUs : t.whatYoullDo} items={role.responsibilities} />
            </Reveal>
            <Reveal delay={80}>
              <List title={open ? t.whatHelps : t.whatYoullBring} items={role.requirements} />
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl bg-cloud p-8">
                <p className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">{t.remoteHeading}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{t.remoteBody}</p>
                <Link href="/careers" className="mt-4 inline-block font-display text-[13px] font-bold uppercase text-accent hover:underline">
                  {t.seeBenefits}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line p-8">
              <SectionLabel>{t.apply}</SectionLabel>
              <div className="mt-6">
                {/* The English title goes with the application, so it reads the same in the admin panel. */}
                <ApplicationForm role={open ? OPEN_APPLICATION.title : role.title} allowCv={isServiceConfigured()} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {others.length ? (
        <section className="bg-cloud">
          <div className="container-x flex flex-col gap-10 [padding-block:96px]">
            <Reveal><SectionLabel>{t.otherRoles}</SectionLabel></Reveal>
            <div className="flex flex-col border-b border-line">
              {others.map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}`}
                  className="group flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-display text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                    {r.title}
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                    {r.loc} <span className="inline-block text-accent transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}

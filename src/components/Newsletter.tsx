import { Reveal } from "./motion";
import { NewsletterForm } from "./forms";
import { getMessages } from "@/i18n/server";

export default async function Newsletter() {
  const t = (await getMessages()).blog;
  return (
    <section className="bg-ink">
      <div className="container-x flex flex-col items-center gap-8 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.015em] uppercase text-white">{t.newsletterHeading}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-[560px] text-[16px] leading-[1.6] text-on-dark">{t.newsletterBody}</p>
        </Reveal>
        <Reveal delay={200} className="flex w-full justify-center">
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}

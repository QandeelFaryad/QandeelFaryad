import { Reveal } from "./motion";
import { NewsletterForm } from "./forms";

export default function Newsletter() {
  return (
    <section className="bg-ink">
      <div className="container-x flex flex-col items-center gap-8 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.015em] uppercase text-white">
            Stay in the loop.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-[560px] text-[16px] leading-[1.6] text-on-dark">
            Receive a curated selection of digital strategy insights, design files, and industry
            trends directly in your inbox. No spam.
          </p>
        </Reveal>
        <Reveal delay={200} className="flex w-full justify-center">
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}

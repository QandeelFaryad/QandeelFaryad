import { Reveal, Tilt } from "./motion";
import { SectionLabel } from "./ui";
import { DELIVERED } from "@/lib/content";

/* ------------------------------------------------------------- Capabilities */
/** What we have built and delivered. */
export function Capabilities({
  dark = false,
  label = "CAPABILITIES",
  heading = "WHAT WE'VE BUILT",
}: {
  dark?: boolean;
  label?: string;
  heading?: string;
}) {
  return (
    <section id="capabilities" className={`scroll-mt-28 ${dark ? "bg-ink" : "bg-cloud"}`}>
      <div className="container-x flex flex-col gap-14 [padding-block:120px]">
        <div className="flex flex-col gap-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <SectionLabel dark={dark}>{label}</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-accent">
                ( {DELIVERED.length} areas delivered )
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={`max-w-[900px] font-display text-[clamp(28px,4.4vw,52px)] font-bold uppercase leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              {heading}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERED.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 80} scale>
              <Tilt max={4}>
                <div className={`flex h-full flex-col gap-3 rounded-3xl p-8 ${dark ? "bg-white/[0.04]" : "bg-white"}`}>
                  <span className="font-display text-[18px] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`font-display text-[clamp(18px,2vw,22px)] font-bold uppercase leading-[1.15] ${dark ? "text-white" : "text-ink"}`}>
                    {c.title}
                  </h3>
                  <p className={`text-[15px] leading-[1.65] ${dark ? "text-on-dark" : "text-muted"}`}>{c.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

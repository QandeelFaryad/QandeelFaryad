import { renderOg, ogSize } from "@/lib/og";
import { CASE_STUDIES, getCaseStudy } from "@/lib/content";

export const alt = "QORLIQ case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return renderOg({ eyebrow: `CASE STUDY · ${study?.sector ?? ""}`, title: study?.name ?? "Case Study" });
}

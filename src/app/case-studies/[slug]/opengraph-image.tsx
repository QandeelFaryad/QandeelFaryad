import { renderOg, ogSize } from "@/lib/og";
import { getCaseStudies, getCaseStudy } from "@/lib/data";

export const alt = "QORLIQ case study";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = await getCaseStudy((await params).slug);
  return renderOg({ eyebrow: `CASE STUDY · ${study?.sector ?? ""}`, title: study?.name ?? "Case Study" });
}

import { renderOg, ogSize } from "@/lib/og";
import { getPost, getPosts } from "@/lib/data";

// Social cards stay in English: the image renderer has no Arabic or Cyrillic font.
export const alt = "QORLIQ Journal";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  return renderOg({ eyebrow: `JOURNAL · ${post?.cat.toUpperCase() ?? ""}`, title: post?.title ?? "Journal" });
}

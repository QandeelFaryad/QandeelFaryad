import { renderOg, ogSize } from "@/lib/og";
import { POSTS, getPost } from "@/lib/content";

export const alt = "QORLIQ Journal";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOg({ eyebrow: `JOURNAL · ${post?.cat.toUpperCase() ?? ""}`, title: post?.title ?? "Journal" });
}

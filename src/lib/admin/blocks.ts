import type { PostBlock } from "@/lib/content";

/**
 * Blog bodies are edited as plain text:
 *   blank line   → new paragraph
 *   ## Heading   → section heading
 *   > Quote      → pull quote
 *   - item       → bullet list (consecutive lines)
 */
export function textToBlocks(text: string): PostBlock[] {
  const blocks: PostBlock[] = [];
  for (const chunk of text.replace(/\r\n/g, "\n").split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      blocks.push({ type: "list", items: lines.map((l) => l.replace(/^[-*]\s+/, "")) });
    } else if (lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3).trim() });
      if (lines.length > 1) blocks.push({ type: "p", text: lines.slice(1).join(" ") });
    } else if (lines.every((l) => l.startsWith(">"))) {
      blocks.push({ type: "quote", text: lines.map((l) => l.replace(/^>\s?/, "")).join(" ") });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function blocksToText(blocks: PostBlock[]): string {
  return blocks
    .map((b) =>
      b.type === "h2"
        ? `## ${b.text}`
        : b.type === "quote"
          ? `> ${b.text}`
          : b.type === "list"
            ? b.items.map((i) => `- ${i}`).join("\n")
            : b.text,
    )
    .join("\n\n");
}

/** Rough reading time at ~220 words per minute. */
export function readingTime(blocks: PostBlock[], excerpt = "") {
  const words = [excerpt, ...blocks.map((b) => (b.type === "list" ? b.items.join(" ") : b.text))]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

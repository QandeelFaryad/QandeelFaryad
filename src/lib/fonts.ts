import { Geist, Syne, Tajawal, Unbounded } from "next/font/google";

/**
 * Self-hosted at build time. globals.css maps --font-sans / --font-display onto
 * these per language: Syne (display) has no Cyrillic or Arabic, so Russian
 * headings use Unbounded and Arabic uses Tajawal for both headings and text.
 * Tajawal and Unbounded aren't preloaded, so other languages never fetch them.
 *
 * Tajawal rather than a display Arabic face like Noto Kufi: one family for both
 * roles keeps an Arabic page's fonts at ~130KB instead of ~490KB.
 */
export const geist = Geist({ subsets: ["latin", "cyrillic"], display: "swap", variable: "--font-geist" });
export const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" });
export const unbounded = Unbounded({ subsets: ["cyrillic"], display: "swap", variable: "--font-unbounded", preload: false });
export const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-arabic",
  preload: false,
});

export const fontVariables = [geist, syne, unbounded, tajawal].map((f) => f.variable).join(" ");

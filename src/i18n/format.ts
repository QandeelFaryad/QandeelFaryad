/** Fills {placeholders}: fmt("Step {n} of {total}", { n: 1, total: 4 }). */
export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** "16 Sept 2026" in the given language; falls back to `fallback` for bad input. */
export function formatDate(iso: string | undefined, dateLocale: string, fallback: string) {
  if (!iso) return fallback;
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? fallback
    : d.toLocaleDateString(dateLocale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

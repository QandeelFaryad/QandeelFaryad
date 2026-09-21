/**
 * Site-wide settings, taken from the QORLIQ Company Profile 2026.
 * Anything marked "set me" should be filled in before launch — empty values are
 * hidden in the UI rather than rendered as dead links.
 */
export const SITE = {
  name: "QORLIQ",
  wordmark: "qorliq",
  tagline: "Digital Solutions for Modern Business Growth",
  description:
    "QORLIQ is a professional digital services brand operated by HOORAB GROUP OF COMPANIES LTD, helping businesses grow with websites, e-commerce, applications, digital marketing, brand identity, automation, AI, and Microsoft cloud services.",
  // www is the primary domain: Vercel must serve www and redirect the apex to it,
  // or every sitemap, canonical and social URL built from this is a redirect.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.qorliq.com",

  email: "support@qorliq.com",
  location: "United Kingdom / Serving Clients Internationally",

  /** Set me: social profile URLs. Entries with an empty href are not shown. */
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
  ],

  /** Registered company details (Company Profile, page 3). */
  legal: {
    entity: "HOORAB GROUP OF COMPANIES LTD",
    brandLine: "QORLIQ is a digital services brand operated by HOORAB GROUP OF COMPANIES LTD",
    companyNo: "15800546",
    vat: "GB-506539390",
    country: "United Kingdom",
    established: "2024",
  },

  /**
   * Company at a glance (Company Profile, page 4). The profile's "6 years of
   * experience" is dropped: the company was established in 2024.
   */
  stats: {
    projects: 60,
    countries: 9,
    industries: 15,
    satisfaction: 96,
  },
};

/** Navigation. Labels live in the messages (nav.<key>); hrefs are English paths. */
export type NavLink = { key: "home" | "services" | "microsoftCsp" | "caseStudies" | "industries" | "about" | "blog" | "careers" | "contact"; href: string };

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "microsoftCsp", href: "/microsoft-csp" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "industries", href: "/industries" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

/** Shown directly in the header bar (desktop); everything else is in the menu. */
export const HEADER_LINKS: NavLink[] = NAV_LINKS.slice(0, 3);

/** Where to send someone who wants to talk: an email to arrange a time. */
export function callHref(subject: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

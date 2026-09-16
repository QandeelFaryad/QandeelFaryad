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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.qorliq.com",

  email: "support@qorliq.com",
  phone: { label: "+44 7401921690", href: "tel:+447401921690" },
  location: "United Kingdom / Serving Clients Internationally",

  /** Calendly / Cal.com link for "Book a Call". Set NEXT_PUBLIC_BOOKING_URL. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",

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

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Microsoft CSP", href: "/microsoft-csp" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/** Shown directly in the header bar (desktop); everything else is in the menu. */
export const HEADER_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Microsoft CSP", href: "/microsoft-csp" },
];

/** Metadata helper so page titles and social previews stay in sync. */
export function pageMeta(title: string, description: string) {
  return {
    title,
    description,
    // Child metadata replaces the parent's openGraph object, so re-attach the
    // site-wide card; routes with their own opengraph-image file override it.
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

/** Where to send someone who wants to talk, preferring a booking link. */
export function callHref() {
  return SITE.bookingUrl || `mailto:${SITE.email}?subject=${encodeURIComponent("Let's book a call")}`;
}

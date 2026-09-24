/**
 * Structural content and the values the contact form submits. Everything visitors
 * read is in src/i18n/messages (one file per language); what's here is either
 * data (slugs, images, partner names) or the English fallback for content the
 * admin panel manages (case studies, posts, roles).
 */

/* ------------------------------------------------------------------ Services */
/** Options shown as chips in the contact form (slugs double as ?service= values). */
export const SERVICE_OPTIONS = [
  { slug: "website-design", label: "Website Design" },
  { slug: "web-development", label: "Web Development" },
  { slug: "ecommerce-store", label: "E-Commerce Store" },
  { slug: "application-development", label: "Application Development" },
  { slug: "crm", label: "CRM" },
  { slug: "microsoft-csp", label: "Microsoft CSP" },
  { slug: "ux-ui", label: "UX/UI Design" },
  { slug: "government-api", label: "Government API Integration" },
  { slug: "lead-generation", label: "Lead Generation" },
  { slug: "seo-ranking", label: "SEO & Ranking" },
  { slug: "paid-ads", label: "Paid Ads" },
  { slug: "brand-identity", label: "Branding" },
  { slug: "automation-ai", label: "AI & Automation" },
];

/** How far along the project is — shapes the kind of quote more than anything else. */
export const PROJECT_STAGES = ["New build", "Redesign / rebuild", "Improve existing", "Ongoing support"];
/** Countries offered in the contact form. Also used server-side to validate the choice. */
export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo", "Congo (DRC)", "Costa Rica", "Côte d'Ivoire", "Croatia",
  "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Türkiye", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];


/**
 * ISO 3166 codes for COUNTRIES, so the form can show each name in the page's
 * language (Intl.DisplayNames) while still submitting the English name above.
 */
export const COUNTRY_CODES: Record<string, string> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo": "CG",
  "Congo (DRC)": "CD",
  "Costa Rica": "CR",
  "Côte d'Ivoire": "CI",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Greece": "GR",
  "Grenada": "GD",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao": "MO",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "North Korea": "KP",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Türkiye": "TR",
  "Turkmenistan": "TM",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican City": "VA",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
};

/**
 * Follow-up questions shown only for the services a visitor picks. All optional.
 * Questions with `options` render as chips (`multi` allows several); the rest are short text.
 */
export type ServiceQuestion = { id: string; label: string; options?: string[]; multi?: boolean; placeholder?: string };

export const SERVICE_QUESTIONS: Record<string, ServiceQuestion[]> = {
  "microsoft-csp": [
    { id: "seats", label: "How many users or seats?", options: ["1 – 10", "11 – 50", "51 – 250", "250+"] },
    { id: "tenant", label: "Do you already have a Microsoft 365 tenant?", options: ["Yes", "No", "Not sure"] },
  ],
  "ecommerce-store": [
    { id: "platform", label: "Preferred platform", options: ["Shopify", "WooCommerce", "Custom build", "Not sure"] },
    { id: "products", label: "Roughly how many products?", options: ["Under 50", "50 – 500", "500 – 5,000", "5,000+"] },
  ],
  "application-development": [
    { id: "platforms", label: "Where should it run?", options: ["Web", "iOS", "Android", "Cross-platform"], multi: true },
  ],
  crm: [
    { id: "current", label: "What do you use today?", options: ["Nothing yet", "Spreadsheets", "HubSpot", "Salesforce", "Zoho", "Other"] },
  ],
  "government-api": [
    { id: "api", label: "Which API or service?", placeholder: "e.g. HMRC MTD, Companies House, GOV.UK Pay" },
  ],
  "seo-ranking": [{ id: "market", label: "Which country or region are you targeting?", placeholder: "e.g. United Kingdom" }],
  "paid-ads": [
    { id: "market", label: "Which country or region are you targeting?", placeholder: "e.g. United Kingdom" },
    { id: "spend", label: "Current monthly ad spend", options: ["Not started yet", "Under $1k", "$1k – $5k", "$5k – $20k", "$20k+"] },
  ],
};

export type Service = { slug: string; no: string; title: string; body: string; tags: string[] };

/** Products & services (Company Profile, page 5). */
export const SERVICES: Service[] = [
  {
    slug: "website-design",
    no: "01",
    title: "WEBSITE DESIGN",
    body: "We design professional, modern, and responsive websites that help businesses present their brand clearly and attract customers. Our websites are built with clean layouts, strong user experience, mobile-friendly design, and business-focused content.",
    tags: ["Responsive", "UX", "Business Content"],
  },
  {
    slug: "ecommerce-store",
    no: "02",
    title: "E-COMMERCE STORE",
    body: "We build e-commerce stores that help businesses sell products online with a smooth customer journey. From product pages and checkout setup to payment integration and store structure, we create online shops designed for sales and growth.",
    tags: ["Shopify", "WooCommerce", "Payments"],
  },
  {
    slug: "application-development",
    no: "03",
    title: "APPLICATION DEVELOPMENT",
    body: "We develop web and business applications that support customer service, internal operations, bookings, workflows, dashboards, and digital processes.",
    tags: ["Web Apps", "Dashboards", "Workflows"],
  },
  {
    slug: "microsoft-csp",
    no: "04",
    title: "MICROSOFT CSP",
    body: "As a Cloud Solution Provider partner, QORLIQ supports businesses with Microsoft licensing and cloud solutions, including Microsoft 365, Azure, security, productivity tools, and cloud-based business services. These solutions help companies modernise their operations and improve collaboration.",
    tags: ["Microsoft 365", "Azure", "Licensing"],
  },
  {
    slug: "lead-generation",
    no: "05",
    title: "LEAD GENERATION",
    body: "We help businesses generate quality leads through digital strategies, landing pages, advertising campaigns, forms, funnels, and targeted outreach systems. Our goal is to help clients attract the right customers and convert interest into business opportunities.",
    tags: ["Landing Pages", "Funnels", "Outreach"],
  },
  {
    slug: "seo-ranking",
    no: "06",
    title: "SEO & RANKING",
    body: "We improve website visibility through search engine optimisation, keyword planning, technical SEO, content structure, on-page improvements, and ranking strategies. Our SEO work helps businesses increase organic traffic and build long-term online presence.",
    tags: ["Technical SEO", "Keywords", "Organic Traffic"],
  },
  {
    slug: "paid-ads",
    no: "07",
    title: "PAID ADS",
    body: "We create and manage paid advertising campaigns across platforms such as Google, Facebook, Instagram, TikTok, Snapchat, and other relevant channels. Our paid ads services focus on reach, leads, conversions, and measurable business results.",
    tags: ["Google", "Meta", "TikTok"],
  },
  {
    slug: "brand-identity",
    no: "08",
    title: "BRAND IDENTITY",
    body: "We help businesses create a professional brand image through logo design, colour direction, visual style, brand assets, and social media presentation. A strong brand identity helps businesses look credible, consistent, and memorable.",
    tags: ["Logo Design", "Visual Style", "Brand Assets"],
  },
  {
    slug: "automation-ai",
    no: "09",
    title: "AUTOMATION & AI",
    body: "We support businesses with automation and AI solutions that save time, reduce manual work, and improve efficiency. This includes workflow automation, AI-powered content support, customer response systems, business tools, and process improvement.",
    tags: ["Workflow Automation", "AI Tools", "Efficiency"],
  },
];

/** Partners and certifications (Company Profile, page 11).
 *  `w`/`h` are the logo's own display size in CSS pixels; the files are drawn at
 *  twice that for retina. Sizes are optically balanced, not uniform — a square
 *  mark reads heavier than a wordmark, so it is set shorter on purpose. */
export type Partner = { name: string; logo: string; w: number; h: number };

export const PARTNERS: Partner[] = [
  { name: "Microsoft", logo: "/assets/partners/microsoft.webp", w: 126, h: 27 },
  { name: "Stripe", logo: "/assets/partners/stripe.webp", w: 91, h: 38 },
  { name: "Google", logo: "/assets/partners/google.webp", w: 115, h: 38 },
  { name: "Meta", logo: "/assets/partners/meta.webp", w: 126, h: 26 },
  { name: "TikTok Marketing Partner", logo: "/assets/partners/tiktok.webp", w: 126, h: 29 },
  { name: "Snapchat", logo: "/assets/partners/snapchat.webp", w: 40, h: 40 },
  { name: "Shopify", logo: "/assets/partners/shopify.webp", w: 126, h: 37 },
  { name: "WooCommerce", logo: "/assets/partners/woocommerce.webp", w: 126, h: 25 },
  { name: "Ingram Micro", logo: "/assets/partners/ingram-micro.webp", w: 126, h: 21 },
  { name: "Infinigate Cloud", logo: "/assets/partners/infinigate-cloud.webp", w: 126, h: 34 },
  { name: "Zylliq", logo: "/assets/partners/zylliq.webp", w: 125, h: 38 },
  { name: "Makarim Altamayuz", logo: "/assets/partners/makarim.webp", w: 126, h: 23 },
  { name: "Nafth Safqa", logo: "/assets/partners/nafth-safqa.webp", w: 93, h: 38 },
  { name: "Aramak Real Estate", logo: "/assets/partners/aramak.webp", w: 98, h: 38 },
];

/* -------------------------------------------------------------- Case studies */
export type CaseStudy = {
  slug: string;
  image: string;
  name: string;
  subtitle: string;
  sector: string;
  summary: string;
  tags: string[];
  industry: string;
  challenge: string;
  delivered: string;
  solution: string;
  results: string;
};

/** The two case studies documented in the Company Profile (page 7). */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "microsoft-cloud-productivity-transformation",
    image: "/assets/work/microsoft-cloud.jpg",
    name: "MICROSOFT CLOUD & PRODUCTIVITY TRANSFORMATION",
    subtitle: "Microsoft 365, Cloud Collaboration & Security Setup",
    sector: "PROFESSIONAL SERVICES",
    summary:
      "A structured Microsoft 365 environment with business email, Teams, and SharePoint — giving the client a secure, organised digital workplace.",
    tags: ["Microsoft 365", "Cloud Migration", "Security"],
    industry: "Professional Services / Small-to-large Business",
    challenge:
      "The client needed a more reliable and professional digital working environment. Their team was using different email accounts, manual file sharing, and basic communication tools, which made collaboration slower and increased the risk of missed information. They also required a more secure setup for business email, document access, and daily team communication.",
    delivered:
      "QORLIQ supported the client with Microsoft cloud solutions, including Microsoft 365 setup, business email configuration, Teams collaboration, SharePoint document structure, Exchange Online support, user account setup, security guidance, and cloud migration planning.",
    solution:
      "We reviewed the client's current working process and created a structured Microsoft 365 environment suitable for their business needs. Professional email accounts were configured, Teams was prepared for internal communication, and SharePoint was organised for secure document storage and controlled access. We also provided guidance on user roles, data security, and basic compliance settings to help the business operate more professionally.",
    results:
      "The client received a cleaner, more secure, and more organised digital workplace. Team communication improved, business documents became easier to access and manage, and the company gained a professional cloud-based foundation for future growth. The project helped reduce manual work, improve collaboration, and support the client's long-term digital transformation.",
  },
  {
    slug: "website-branding-digital-growth",
    image: "/assets/work/website-branding.jpg",
    name: "WEBSITE, BRANDING & DIGITAL GROWTH PROJECT",
    subtitle: "Business Website, Brand Identity & Lead Generation Setup",
    sector: "STARTUP / SERVICE-BASED",
    summary:
      "A modern, mobile-friendly website with brand identity, SEO structure, and lead generation forms built for customer acquisition.",
    tags: ["Website Design", "Brand Identity", "Lead Generation"],
    industry: "Startup / Service-Based Business",
    challenge:
      "The client needed a professional online presence to build trust, present services clearly, and generate enquiries from potential customers. Their existing digital setup was limited, with no strong website structure, weak brand presentation, and no proper system for capturing leads or supporting marketing activity.",
    delivered:
      "QORLIQ delivered website design, brand identity support, content structure, landing page planning, lead generation forms, SEO setup, paid advertising guidance, and digital marketing support. The project focused on creating a strong foundation for visibility, credibility, and business growth.",
    solution:
      "We designed a clean, modern, and mobile-friendly website that clearly presented the client's services, business value, and contact options. The brand identity was improved through consistent visual direction, professional layout, service sections, and clear call-to-action areas. Lead generation forms were added to support customer enquiries, while SEO structure and marketing-ready pages were prepared to help the client attract the right audience.",
    results:
      "The client gained a more professional digital presence and a stronger platform for customer acquisition. The website made the business look more credible, improved service presentation, and created a clear path for visitors to make enquiries. The project helped the client move from a basic online presence to a structured digital foundation ready for marketing, sales, and long-term growth.",
  },
];

/** Secondary imagery used in case study galleries. */
/** One picture per service, for the home page's scrolling service list (see ServiceShowcase). */
export const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = { // alt text is translated in messages.services.<slug>.imageAlt
  "website-design": { src: "/assets/detail/sketch.jpg", alt: "Website wireframes sketched on paper" },
  "ecommerce-store": { src: "/assets/office/studio.jpg", alt: "A maker crafting products to sell" },
  "application-development": { src: "/assets/detail/code.jpg", alt: "Application code on a screen" },
  "microsoft-csp": { src: "/assets/work/microsoft-cloud.jpg", alt: "Cloud servers in a data centre" },
  "lead-generation": { src: "/assets/detail/whiteboard.jpg", alt: "Mapping a sales funnel on a whiteboard" },
  "seo-ranking": { src: "/assets/journal/web-performance-best-practices.jpg", alt: "Light trails from fast-moving traffic" },
  "paid-ads": { src: "/assets/office/culture.jpg", alt: "A team planning a campaign with sticky notes" },
  "brand-identity": { src: "/assets/journal/color-psychology-in-digital-design.jpg", alt: "A fan of brand colour swatches" },
  "automation-ai": { src: "/assets/journal/future-of-digital-design-2026.jpg", alt: "Close-up of a circuit board" },
};


/* --------------------------------------------------------------------- Posts */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  /** Cover photo in /public/assets/journal. */
  image: string;
  cat: string;
  /** Display date, in English. */
  date: string;
  /** ISO date (YYYY-MM-DD), for formatting in the page's language. */
  published?: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  featured?: boolean;
  body: PostBlock[];
};

/**
 * Journal posts used when Supabase isn't connected (see lib/data.ts). Empty
 * until real articles are written — the blog page shows a "coming soon" state.
 */
export const POSTS: Post[] = [];

export const POST_CATEGORIES = ["DESIGN", "DEVELOPMENT", "BRANDING", "STRATEGY"];


/** Standalone photography used around the site. */
export const PHOTOS = {
  team: { src: "/assets/office/team.jpg", alt: "The QORLIQ team working together" },
  studio: { src: "/assets/office/studio.jpg", alt: "A designer at work in the studio" },
  culture: { src: "/assets/office/culture.jpg", alt: "Life at QORLIQ: a team working session" },
};

/* --------------------------------------------------------------------- Roles */
export type Role = {
  slug: string;
  title: string;
  dept: string;
  loc: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

/** Open positions. Empty until real vacancies exist. */
export const ROLES: Role[] = [];

export const OPEN_APPLICATION: Role = {
  slug: "open-application",
  title: "Open Application",
  dept: "Any team",
  loc: "Remote / Anywhere",
  summary: "Don't see your role? We're always looking for exceptional designers, engineers, and strategists. Tell us what you'd bring.",
  responsibilities: ["Tell us the kind of work you want to do", "Share projects you're proud of", "Let us know where and how you like to work"],
  requirements: ["A portfolio, GitHub, or case studies", "Evidence of craft and care", "Curiosity about what we do"],
};

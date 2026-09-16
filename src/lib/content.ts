/**
 * Content for case studies, journal posts, and open roles.
 * NOTE: project details, results, and article copy are placeholder text —
 * replace with real client work before launch.
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

/** Microsoft solutions covered on the dedicated page (Company Profile, page 6). */
export const MICROSOFT_SOLUTIONS = [
  { title: "Microsoft 365", body: "Licensing, business email, and the productivity apps your team works in every day." },
  { title: "Azure", body: "Cloud infrastructure and services, sized and configured around how your business actually runs." },
  { title: "SharePoint", body: "Structured document storage with controlled access, so files are easy to find and safe to share." },
  { title: "Microsoft Defender", body: "Threat protection across identities, devices, email, and cloud apps." },
  { title: "Teams", body: "Internal communication and meetings, set up with the channels and permissions that suit your teams." },
  { title: "Exchange Online", body: "Professional business email, hosted, secured, and supported." },
  { title: "Security & Compliance", body: "User roles, data protection, and baseline compliance settings configured to your requirements." },
  { title: "Cloud Migration", body: "Planning and moving your accounts, files, and services to the cloud with minimal disruption." },
];

/** Project areas (Company Profile, page 8). */
export const PROJECT_AREAS = [
  "Business websites",
  "E-commerce stores",
  "Web applications",
  "Landing pages",
  "Brand identity projects",
  "Paid advertising campaigns",
  "SEO improvement projects",
  "Lead generation systems",
  "Microsoft cloud and productivity support",
  "Automation and AI workflow solutions",
];

/** Why businesses choose QORLIQ (Company Profile, page 9). */
export const STRENGTHS = [
  { title: "EXPERIENCED BUSINESS APPROACH", body: "QORLIQ operates under HOORAB GROUP OF COMPANIES LTD, giving the brand a strong business foundation and a professional approach to client service." },
  { title: "COMPLETE DIGITAL SERVICES", body: "We provide a wide range of services under one brand, including websites, e-commerce, applications, branding, SEO, paid ads, lead generation, automation, AI, and Microsoft solutions." },
  { title: "RELIABLE SERVICE", body: "We focus on clear timelines, proper communication, and professional delivery so clients can move forward with confidence." },
  { title: "AFFORDABLE AND PRACTICAL SOLUTIONS", body: "Our services are designed to support businesses at different stages, from startups to growing companies, with solutions that match their goals and budget." },
  { title: "FAST AND STRUCTURED DELIVERY", body: "We follow a clear process from consultation to planning, design, development, launch, and support. This helps projects stay organised and efficient." },
  { title: "STRONG CUSTOMER SUPPORT", body: "We believe support is an important part of every service. Our team works closely with clients to understand their needs and provide guidance throughout the project." },
  { title: "QUALITY STANDARDS", body: "Every project is handled with care, from design and content to functionality, performance, and user experience." },
  { title: "CLIENT BENEFITS", body: "Working with QORLIQ helps businesses save time, build a professional image, reach more customers, improve digital performance, and prepare for long-term growth." },
];

export const BADGES = [
  "UK REGISTERED COMPANY",
  "GLOBAL SERVICE DELIVERY",
  "MICROSOFT SOLUTIONS EXPERTISE",
  "AI & AUTOMATION CAPABILITIES",
  "DEDICATED SUPPORT",
  "TRANSPARENT PRICING",
  "END-TO-END DIGITAL SERVICES",
];

/** Partners and certifications (Company Profile, page 11). */
export const PARTNERS = [
  "Microsoft",
  "Stripe",
  "Google",
  "Meta",
  "TikTok Marketing Partner",
  "Snapchat",
  "Shopify",
  "WooCommerce",
  "Ingram Micro",
  "Infinigate Cloud",
  "Zylliq",
  "Makarim Altamayuz",
  "Nafth Safqa",
  "Aramak Real Estate",
];

/** Vision, mission, and values (Company Profile, page 3). */
export const VISION =
  "Our vision is to become a trusted digital solutions partner for businesses that want to grow with confidence, professionalism, and modern technology. We aim to support companies by building strong digital foundations that help them compete, expand, and succeed in their markets.";

export const MISSION =
  "Our mission is to deliver high-quality digital services that create real value for businesses. We work to provide practical, reliable, and effective solutions that help our clients improve their online presence, reach more customers, generate better leads, increase sales, and manage their digital operations more efficiently.";

export const VALUES = [
  "QUALITY",
  "CUSTOMER SATISFACTION",
  "PROFESSIONALISM",
  "TRUST",
  "INNOVATION",
  "LONG-TERM GROWTH",
];

/** About copy (Company Profile, page 2). */
export const ABOUT = {
  whoWeAre: [
    "QORLIQ is a digital services brand created to help businesses grow in a fast-changing digital world. Operated by HOORAB GROUP OF COMPANIES LTD, QORLIQ focuses on delivering practical, professional, and result-driven solutions for startups, small businesses, growing companies, and established organisations.",
    "Our work is built around one clear purpose: helping businesses improve their online presence, attract customers, increase sales, and operate more efficiently through technology.",
    "From website design and e-commerce development to lead generation, SEO, paid advertising, automation, AI, and Microsoft solutions, QORLIQ provides digital services that support real business growth.",
  ],
  ourStory:
    "QORLIQ was developed under HOORAB GROUP with the vision of building a trusted digital services brand that combines creativity, technology, and business understanding. The company was established to meet the growing demand for professional digital solutions that are not only visually strong but also commercially effective. Many businesses need more than just a website; they need a complete digital foundation that supports marketing, customer communication, sales, automation, and long-term growth. QORLIQ was created to fill that gap by offering reliable, structured, and affordable digital services with a strong focus on quality, communication, and client satisfaction.",
  whatWeDo:
    "QORLIQ helps businesses design, build, promote, and improve their digital operations. We provide services across web development, e-commerce, application development, SEO, paid advertising, brand identity, lead generation, automation, AI, and Microsoft cloud solutions. Our approach is simple: understand the business, identify the goal, build the right solution, and support the client with professional service from start to finish.",
};

/** CEO message (Company Profile, page 10). */
export const CEO_MESSAGE = {
  heading: "BUILDING TRUST THROUGH QUALITY & INTEGRITY",
  body: [
    "At HOORAB GROUP, our journey is driven by a clear vision of building a business that stands for trust, quality, and long-term value. From the beginning, the goal has been to create more than just a company. The goal has been to build a strong business foundation that connects products, opportunities, and markets with professionalism and purpose.",
    "Our CEO believes that real business success is built on commitment, consistency, and strong relationships. With a focus on retail, wholesale, sourcing, distribution, and digital business solutions, HOORAB GROUP was established to meet market needs through reliable supply solutions and customer-focused service.",
    "Through QORLIQ, we are extending that same vision into the digital services sector. Businesses today need trusted partners who understand technology, branding, marketing, and growth. QORLIQ was created to support those needs with professional digital solutions that help companies move forward with confidence. The vision behind the company is simple: to grow through honesty, deliver through quality, and build partnerships that last.",
  ],
  quote:
    "Our vision for HOORAB GROUP and QORLIQ is built on trust, quality, and long-term business growth. We believe in creating strong partnerships, delivering reliable solutions, and building a company that stands for professionalism and consistency in every market we serve.",
  attribution: "CEO, HOORAB GROUP OF COMPANIES LTD",
};

/* ------------------------------------------------------------- Capabilities */
/** Work QORLIQ has delivered — the capability list confirmed by the team. */
export const DELIVERED = [
  { title: "CRM", body: "CRM setup, customisation, and integration so sales and support teams work from a single record of the customer." },
  { title: "Applications", body: "Web and business applications covering bookings, workflows, dashboards, and internal operations." },
  { title: "Web Development", body: "Business websites, landing pages, and e-commerce stores built to be fast, responsive, and easy to update." },
  { title: "Lead Generation", body: "Landing pages, forms, funnels, and campaign setup that turn traffic into qualified enquiries." },
  { title: "Microsoft CSP", body: "Microsoft licensing through the Cloud Solution Provider programme, with Microsoft 365, Azure, security, and migration support." },
  { title: "UX/UI", body: "Research-led interface design: user journeys, wireframes, prototypes, and design systems teams can build on." },
  { title: "Government API Integration", body: "Connecting platforms to government and regulated APIs, including the authentication, data handling, and compliance that requires." },
  { title: "Branding", body: "Logo design, colour direction, visual style, and brand assets that keep every touchpoint consistent." },
  { title: "AI Integration", body: "Bringing AI into existing products and processes — assistants, content support, and customer response systems." },
  { title: "Automation", body: "Automating manual workflows across the tools a business already uses, saving time and reducing errors." },
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
export const DETAIL_IMAGES = [
  { src: "/assets/detail/interface.jpg", alt: "Interface design on a laptop screen" },
  { src: "/assets/detail/mobile.jpg", alt: "The product running on a phone" },
  { src: "/assets/detail/workspace.jpg", alt: "Workspace mid-project" },
  { src: "/assets/detail/sketch.jpg", alt: "Early wireframe sketches" },
  { src: "/assets/detail/code.jpg", alt: "Front-end code for the build" },
  { src: "/assets/detail/whiteboard.jpg", alt: "Mapping flows on a whiteboard" },
];

export function detailImage(i: number) {
  return DETAIL_IMAGES[((i % DETAIL_IMAGES.length) + DETAIL_IMAGES.length) % DETAIL_IMAGES.length];
}

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function nextCaseStudy(slug: string) {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}

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
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  featured?: boolean;
  body: PostBlock[];
};

/**
 * Journal posts. Empty until real articles are written — the blog page shows a
 * "coming soon" state while this is empty.
 */
export const POSTS: Post[] = [];

export const POST_CATEGORIES = ["DESIGN", "DEVELOPMENT", "BRANDING", "STRATEGY"];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, count = 3) {
  const post = getPost(slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.cat === post?.cat);
  const rest = others.filter((p) => p.cat !== post?.cat);
  return [...same, ...rest].slice(0, count);
}

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

export function getRole(slug: string) {
  return slug === OPEN_APPLICATION.slug ? OPEN_APPLICATION : ROLES.find((r) => r.slug === slug);
}

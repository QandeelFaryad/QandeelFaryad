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

export const POSTS: Post[] = [
  {
    slug: "future-of-digital-design-2026",
    image: "/assets/journal/future-of-digital-design-2026.jpg",
    cat: "Design",
    date: "Feb 14, 2026",
    readTime: "8 min read",
    title: "The Future of Digital Design in 2026",
    excerpt: "An exhaustive study on generative tools, semantic layouts, and how high-contrast spatial systems are shifting consumer expectations.",
    author: "Hana Vester",
    featured: true,
    body: [
      { type: "p", text: "Every year brings a new wave of tools, and every year the fundamentals matter more. In 2026 the gap between a generated layout and a designed experience has never been easier to see." },
      { type: "h2", text: "Generative tools are the new grid" },
      { type: "p", text: "Generative tools now produce competent layouts in seconds. That hasn't made designers less relevant — it has moved the craft up a level, from arranging boxes to deciding what deserves attention in the first place." },
      { type: "quote", text: "When anyone can produce a layout, the value is in knowing which layout is true to the product." },
      { type: "h2", text: "Semantic layouts" },
      { type: "p", text: "Interfaces increasingly adapt to context: the device, the moment, and what the person is trying to do. Designing the rules behind a layout is now as important as designing the layout itself." },
      { type: "list", items: ["Design tokens that describe intent, not just values", "Components that know their priority on the page", "Content models that travel across screens and surfaces"] },
      { type: "h2", text: "High contrast, high clarity" },
      { type: "p", text: "Bold type, strong contrast, and fewer decorative layers are winning — not as a trend, but because they hold up across dark mode, small screens, and accessibility settings." },
    ],
  },
  {
    slug: "why-motion-design-matters",
    image: "/assets/journal/why-motion-design-matters.jpg",
    cat: "Design",
    date: "Feb 10, 2026",
    readTime: "6 min read",
    title: "Why Motion Design Matters More Than Ever",
    excerpt: "In a world of short attention spans, motion guides eyes, drives narrative, and breathes living energy into layouts.",
    author: "Elena Rostova",
    body: [
      { type: "p", text: "Motion is often treated as polish — something added at the end if there's time. We think that's backwards. Motion is how an interface explains itself." },
      { type: "h2", text: "Motion communicates continuity" },
      { type: "p", text: "When a thumbnail grows into a full page, the user understands they're looking at the same thing, closer. Without that transition, they have to re-orient on every click." },
      { type: "quote", text: "Good motion answers the question: where did that come from, and where did it go?" },
      { type: "h2", text: "Restraint is part of the craft" },
      { type: "list", items: ["Keep transitions under 400ms for navigation", "Move small things more than big things", "Always honour reduced-motion preferences"] },
      { type: "p", text: "The best motion is felt more than noticed. If people comment on your animations, they may be doing too much." },
    ],
  },
  {
    slug: "building-scalable-design-systems",
    image: "/assets/journal/building-scalable-design-systems.jpg",
    cat: "Development",
    date: "Feb 04, 2026",
    readTime: "10 min read",
    title: "Building Scalable Design Systems",
    excerpt: "How we approach multi-brand design tokens, components and standard alignment rules for enterprise-level teams.",
    author: "Marc Vester",
    body: [
      { type: "p", text: "A design system isn't a Figma file or a component library. It's an agreement between teams about how decisions get made — and the tools are there to make that agreement easy to keep." },
      { type: "h2", text: "Start with an audit" },
      { type: "p", text: "Before designing anything new, catalogue what already exists. Most organisations discover dozens of variants of the same component, each solving a slightly different problem." },
      { type: "h2", text: "Tokens before components" },
      { type: "list", items: ["Primitive tokens: the raw palette and scales", "Semantic tokens: what a value means (surface, danger, focus)", "Component tokens: the few overrides a component truly needs"] },
      { type: "quote", text: "If a token name describes a colour instead of a purpose, it will be wrong the day you add a second brand." },
      { type: "h2", text: "Govern lightly" },
      { type: "p", text: "The systems that last have clear owners, a simple contribution path, and a changelog people actually read. Heavy approval processes push teams back to building their own." },
    ],
  },
  {
    slug: "art-of-brand-storytelling",
    image: "/assets/journal/art-of-brand-storytelling.jpg",
    cat: "Branding",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    title: "The Art of Brand Storytelling",
    excerpt: "Behind the curtain of crafting timeless visual narratives that make digital software products feel deeply human.",
    author: "Tariq Mahmood",
    body: [
      { type: "p", text: "Software brands often describe features. Memorable ones describe a change in someone's day. That shift — from what it does to what it makes possible — is where storytelling starts." },
      { type: "h2", text: "Find the tension" },
      { type: "p", text: "Every good story has a problem worth solving. We start brand work by writing down the frustration a customer feels before they find the product, in their own words." },
      { type: "quote", text: "A brand is the promise. The product is the proof." },
      { type: "h2", text: "Make it visual" },
      { type: "p", text: "Typography, colour, and motion should carry the same story as the words. If the copy says calm and the interface shouts, people believe the interface." },
    ],
  },
  {
    slug: "ux-research-methods-that-work",
    image: "/assets/journal/ux-research-methods-that-work.jpg",
    cat: "Strategy",
    date: "Jan 15, 2026",
    readTime: "9 min read",
    title: "UX Research Methods That Work",
    excerpt: "Ditch the generic surveys. We explore concrete field-testing methods that yield high-density, actionable insights.",
    author: "Sarah Jenkins",
    body: [
      { type: "p", text: "Surveys tell you what people say. Research that changes products shows you what people do. Here are the methods we reach for first." },
      { type: "h2", text: "Contextual inquiry" },
      { type: "p", text: "Sit with people while they do the real task, in the real place. You'll see the sticky notes, the workarounds, and the second monitor nobody mentioned." },
      { type: "h2", text: "Five-second tests" },
      { type: "p", text: "Show a page for five seconds, then ask what it was for. It's a fast, brutal check on whether your hierarchy is doing its job." },
      { type: "list", items: ["Recruit from real customers, not just colleagues", "Watch more, ask less", "Share raw clips, not just summaries"] },
      { type: "quote", text: "The most valuable research finding is the one that surprises the team." },
    ],
  },
  {
    slug: "web-performance-best-practices",
    image: "/assets/journal/web-performance-best-practices.jpg",
    cat: "Development",
    date: "Dec 18, 2025",
    readTime: "8 min read",
    title: "Web Performance Best Practices",
    excerpt: "Engineered speed models. Learn about NextJS rendering paths, asset compression, and optimal core web metrics.",
    author: "Nils Sjöberg",
    body: [
      { type: "p", text: "Speed is a feature people feel before they can name it. A fast site feels trustworthy; a slow one feels broken, even when it isn't." },
      { type: "h2", text: "Render as little as possible, as early as possible" },
      { type: "p", text: "Static generation and server components let most of a marketing site ship as plain HTML. Save client-side JavaScript for the parts that are genuinely interactive." },
      { type: "h2", text: "Images do the heavy lifting" },
      { type: "list", items: ["Serve modern formats at the size they're displayed", "Reserve space to avoid layout shift", "Lazy-load anything below the fold"] },
      { type: "quote", text: "Performance budgets only work when they're checked on every pull request." },
    ],
  },
  {
    slug: "color-psychology-in-digital-design",
    image: "/assets/journal/color-psychology-in-digital-design.jpg",
    cat: "Design",
    date: "Nov 30, 2025",
    readTime: "5 min read",
    title: "Color Psychology in Digital Design",
    excerpt: "How strategic chromatic registers map to user trust, actions, and overall aesthetic longevity across SaaS products.",
    author: "Hana Vester",
    body: [
      { type: "p", text: "Colour sets expectations before a single word is read. Used well, it guides action. Used carelessly, it creates noise that people learn to ignore." },
      { type: "h2", text: "One signal colour" },
      { type: "p", text: "Pick a single colour for action and protect it. When everything is highlighted, nothing is." },
      { type: "h2", text: "Meaning is cultural" },
      { type: "p", text: "Red means danger in one market and celebration in another. Test colour choices with the people who will actually use the product." },
      { type: "quote", text: "Contrast is not a style choice. It's whether someone can read your interface at all." },
    ],
  },
];

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

/* ---------------------------------------------------------------------- Team */
/** Placeholder team: replace names, roles, and photos with the real team. */
export const TEAM = [
  { name: "ALEX CHEN", role: "Creative Director", image: "/assets/team/person-1.jpg" },
  { name: "SARAH KIM", role: "Lead Designer", image: "/assets/team/person-2.jpg" },
  { name: "MARCUS RIVERA", role: "Head of Development", image: "/assets/team/person-3.jpg" },
  { name: "PRIYA PATEL", role: "Strategy Lead", image: "/assets/team/person-4.jpg" },
  { name: "JAMES OKAFOR", role: "Brand Director", image: "/assets/team/person-5.jpg" },
  { name: "LENA MÜLLER", role: "UX Research Lead", image: "/assets/team/person-6.jpg" },
];

/** Standalone photography used around the site. */
export const PHOTOS = {
  team: { src: "/assets/office/team.jpg", alt: "The QORLIQ team working together" },
  studio: { src: "/assets/office/studio.jpg", alt: "A designer at work in the studio" },
  culture: { src: "/assets/office/culture.jpg", alt: "Life at QORLIQ: a team working session" },
};

/** Small round avatars, reusing the team portraits. */
export function avatar(i: number) {
  return TEAM[((i % TEAM.length) + TEAM.length) % TEAM.length].image;
}

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

export const ROLES: Role[] = [
  {
    slug: "senior-product-designer",
    title: "Senior Product Designer",
    dept: "Design",
    loc: "Remote / Full-Time",
    summary: "Lead end-to-end product design for SaaS and fintech clients, from discovery workshops to shipped design systems.",
    responsibilities: ["Run discovery and research with client teams", "Design flows, prototypes, and high-fidelity UI", "Contribute to and maintain client design systems", "Mentor mid-level designers through critique"],
    requirements: ["6+ years designing digital products", "A portfolio showing shipped, complex work", "Fluency in Figma and prototyping tools", "Comfort presenting to founders and executives"],
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer (React / NextJS)",
    dept: "Engineering",
    loc: "Remote / Full-Time",
    summary: "Build fast, accessible, beautifully animated websites and product interfaces with our design team.",
    responsibilities: ["Build marketing sites and product UI in Next.js", "Implement motion and interaction with care for performance", "Own accessibility and Core Web Vitals on your projects", "Pair closely with designers on the details"],
    requirements: ["4+ years with React and TypeScript", "Strong CSS and animation skills", "Experience with the Next.js App Router", "An eye for design detail"],
  },
  {
    slug: "brand-strategist",
    title: "Brand Strategist",
    dept: "Strategy",
    loc: "New York City / Hybrid",
    summary: "Shape positioning, messaging, and brand narratives that give our identity work a clear foundation.",
    responsibilities: ["Lead brand workshops with client leadership", "Develop positioning and messaging frameworks", "Brief and collaborate with identity designers", "Present strategy with clarity and conviction"],
    requirements: ["5+ years in brand strategy", "Experience with technology or B2B brands", "Excellent writing and facilitation skills", "Comfort working in a design-led team"],
  },
  {
    slug: "motion-designer",
    title: "Motion Designer",
    dept: "Design",
    loc: "London Office / Hybrid",
    summary: "Bring brands and interfaces to life with motion systems, launch films, and interaction prototypes.",
    responsibilities: ["Create motion guidelines for brand systems", "Produce launch and social animations", "Prototype UI interactions with engineers", "Keep motion accessible and purposeful"],
    requirements: ["3+ years in motion design", "After Effects plus a UI prototyping tool", "A reel showing brand and product work", "Understanding of easing and timing principles"],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    dept: "Operations",
    loc: "Remote / Contract",
    summary: "Keep ambitious design and development projects on track, on budget, and enjoyable for everyone involved.",
    responsibilities: ["Plan milestones and manage timelines", "Be the day-to-day contact for clients", "Remove blockers for designers and engineers", "Report clearly on scope, budget, and risk"],
    requirements: ["3+ years managing digital projects", "Agency or consultancy experience", "Calm, clear communication", "Familiarity with design and dev workflows"],
  },
];

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

/**
 * Every string on the public site, in English. This is the source of truth: the
 * other languages are typed as `Messages`, so a missing or extra key fails the
 * build. {placeholders} are filled with fmt() from ../format.
 *
 * Values the contact form submits (service names, project stages, budgets,
 * timelines, answer options) stay in English whatever the page language, so the
 * admin panel and notification emails keep reading the same; only their labels
 * are translated here, keyed by the English value.
 */
const en = {
  meta: {
    siteTitle: "QORLIQ — Digital Solutions for Modern Business Growth",
    description:
      "QORLIQ is a professional digital services brand operated by HOORAB GROUP OF COMPANIES LTD, helping businesses grow with websites, e-commerce, applications, digital marketing, brand identity, automation, AI, and Microsoft cloud services.",
    services: {
      title: "Services",
      description:
        "Websites, e-commerce, applications, Microsoft solutions, lead generation, SEO, paid ads, brand identity, and automation & AI.",
    },
    microsoftCsp: {
      title: "Microsoft CSP",
      description:
        "Microsoft licensing through the Cloud Solution Provider programme: Microsoft 365, Azure, SharePoint, Teams, Exchange Online, Defender, security and compliance, and cloud migration.",
    },
    industries: {
      title: "Industries",
      description:
        "From seed-stage SaaS to global healthcare platforms, we translate industry complexity into clear, award-winning interfaces.",
    },
    about: {
      title: "About",
      description:
        "QORLIQ is a digital services brand operated by HOORAB GROUP OF COMPANIES LTD, helping businesses grow through practical, professional digital solutions.",
    },
    caseStudies: {
      title: "Case Studies",
      description:
        "How QORLIQ helped clients modernise their workplace with Microsoft 365 and build a website, brand identity, and lead generation foundation.",
    },
    contact: {
      title: "Contact",
      description:
        "Tell us about your project. QORLIQ is ready to support your business with professional digital solutions designed for growth.",
    },
    blog: {
      title: "Journal",
      description: "Deep dives into user behavior, engineering, brand strategy, and creative systems from our global team.",
    },
    careers: {
      title: "Careers",
      description: "Join a remote-first team of designers, engineers, and strategists crafting work for leading global brands.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How {entity} collects, uses, and protects personal data through the {name} website.",
    },
    terms: { title: "Terms of Use", description: "The terms that apply when you use the {name} website." },
    cookies: { title: "Cookie Policy", description: "Which cookies the {name} website uses, and how to control them." },
    notFound: "Page not found",
    /** Appended to a job title: "Designer · Careers". */
    careersSuffix: "Careers",
  },

  company: {
    tagline: "Digital Solutions for Modern Business Growth",
    brandLine: "QORLIQ is a digital services brand operated by HOORAB GROUP OF COMPANIES LTD",
    location: "United Kingdom / Serving Clients Internationally",
    /** As in "Registered in the United Kingdom". */
    country: "the United Kingdom",
  },

  common: {
    startProject: "Start a Project",
    skipToContent: "Skip to content",
    homeLabel: "QORLIQ home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    mainNav: "Main",
    language: "Language",
    backToTop: "Back to top",
    loadingPage: "Loading page",
    /** The bubble that follows the pointer over links. */
    cursor: { view: "View", read: "Read", next: "Next", letsTalk: "Let's talk" },
  },

  nav: {
    home: "Home",
    services: "Services",
    microsoftCsp: "Microsoft CSP",
    caseStudies: "Case Studies",
    industries: "Industries",
    about: "About",
    blog: "Blog",
    careers: "Careers",
    contact: "Contact",
  },

  footer: {
    cta: "Let's work together",
    ctaLabel: "Let's work together — start a project",
    blurb:
      "We help businesses build a stronger digital presence, improve customer reach, automate operations, and grow with reliable technology.",
    columns: { services: "Services", solutions: "Solutions", legal: "Legal", company: "Company" },
    links: {
      websiteDesign: "Website Design",
      ecommerce: "E-Commerce",
      applications: "Applications",
      seo: "SEO & Ranking",
      paidAds: "Paid Ads",
      automation: "Automation & AI",
      microsoftCsp: "Microsoft CSP",
      brandIdentity: "Brand Identity",
      leadGeneration: "Lead Generation",
      industries: "Industries",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      terms: "Terms of Use",
      about: "About Us",
      caseStudies: "Case Studies",
      blog: "Blog",
      careers: "Careers",
      contact: "Contact",
    },
    cookieSettings: "Cookie settings",
    legalLine: "© {year} {entity}. All rights reserved. Company Reg. No. {companyNo} · VAT {vat} · Registered in {country}.",
  },

  loader: { caption: "Preparing your experience", subtitle: "A moment of possibility." },

  consent: {
    dialogLabel: "Cookie choices",
    title: "Cookies",
    before: "We use essential cookies to make this site work. With your permission we'd also like to measure which pages are useful. Read our",
    link: "cookie policy",
    after: ".",
    accept: "Accept analytics",
    reject: "Essential only",
  },

  sections: {
    ctaHeading: "READY TO BUILD SOMETHING EXCEPTIONAL?",
    ctaSub: "Let's turn your vision into a digital experience that performs.",
    ctaFuture: "LET'S BUILD YOUR DIGITAL FUTURE TOGETHER",
  },

  home: {
    heroLines: ["DIGITAL SOLUTIONS", "FOR MODERN", "BUSINESS GROWTH"],
    /** The hero word that gets the orange underline; must appear in heroLines. */
    heroHighlight: "GROWTH",
    heroIntro:
      "QORLIQ is a digital services brand operated by HOORAB GROUP OF COMPANIES LTD, supporting businesses with modern websites, e-commerce platforms, applications, digital marketing, brand identity, automation, AI, and Microsoft cloud services.",
    glance: "Company at a glance",
    stats: {
      projectsCompleted: "Projects completed",
      countriesServed: "Countries served",
      industriesServed: "Industries served",
      clientSatisfaction: "Client satisfaction",
    },
    whoWeAre: "WHO WE ARE",
    whoWeAreLead: "QORLIQ is a digital services brand created to help businesses grow in a fast-changing digital world.",
    whoWeAreFollow:
      "We deliver practical, professional, and result-driven solutions for startups, small businesses, and established organisations.",
    satisfactionRate: "Client satisfaction rate",
    projectsAcross: "Projects across {n} countries",
    marquee: ["WEBSITES", "E-COMMERCE", "APPLICATIONS", "MICROSOFT CSP", "CRM", "LEAD GENERATION", "AI"],
    servicesLabel: "PRODUCTS & SERVICES",
    allServices: "All Services",
    microsoftLabel: "MICROSOFT CSP",
    microsoftHeading: "Microsoft licensing, Azure, and a secure cloud workplace",
    microsoftBody:
      "As a Cloud Solution Provider partner we handle licensing, business email, Teams, SharePoint, Defender, and cloud migration — set up and supported so your team can work securely from anywhere.",
    microsoftCta: "Explore Microsoft CSP",
    caseStudiesLabel: "CASE STUDIES",
    caseStudiesCta: "View Case Studies",
    metricsLabel: "COMPANY AT A GLANCE",
    metricTags: { delivered: "( Delivered )", global: "( Global )", reach: "( Reach )" },
    ctaSub:
      "Whether you need a website, online store, application, branding, digital marketing, automation, AI, or Microsoft solutions, our team is ready to help.",
  },

  /** Keyed by service slug. */
  services: {
    "website-design": {
      title: "WEBSITE DESIGN",
      body: "We design professional, modern, and responsive websites that help businesses present their brand clearly and attract customers. Our websites are built with clean layouts, strong user experience, mobile-friendly design, and business-focused content.",
      tags: ["Responsive", "UX", "Business Content"],
      imageAlt: "Website wireframes sketched on paper",
    },
    "ecommerce-store": {
      title: "E-COMMERCE STORE",
      body: "We build e-commerce stores that help businesses sell products online with a smooth customer journey. From product pages and checkout setup to payment integration and store structure, we create online shops designed for sales and growth.",
      tags: ["Shopify", "WooCommerce", "Payments"],
      imageAlt: "A maker crafting products to sell",
    },
    "application-development": {
      title: "APPLICATION DEVELOPMENT",
      body: "We develop web and business applications that support customer service, internal operations, bookings, workflows, dashboards, and digital processes.",
      tags: ["Web Apps", "Dashboards", "Workflows"],
      imageAlt: "Application code on a screen",
    },
    "microsoft-csp": {
      title: "MICROSOFT CSP",
      body: "As a Cloud Solution Provider partner, QORLIQ supports businesses with Microsoft licensing and cloud solutions, including Microsoft 365, Azure, security, productivity tools, and cloud-based business services. These solutions help companies modernise their operations and improve collaboration.",
      tags: ["Microsoft 365", "Azure", "Licensing"],
      imageAlt: "Cloud servers in a data centre",
    },
    "lead-generation": {
      title: "LEAD GENERATION",
      body: "We help businesses generate quality leads through digital strategies, landing pages, advertising campaigns, forms, funnels, and targeted outreach systems. Our goal is to help clients attract the right customers and convert interest into business opportunities.",
      tags: ["Landing Pages", "Funnels", "Outreach"],
      imageAlt: "Mapping a sales funnel on a whiteboard",
    },
    "seo-ranking": {
      title: "SEO & RANKING",
      body: "We improve website visibility through search engine optimisation, keyword planning, technical SEO, content structure, on-page improvements, and ranking strategies. Our SEO work helps businesses increase organic traffic and build long-term online presence.",
      tags: ["Technical SEO", "Keywords", "Organic Traffic"],
      imageAlt: "Light trails from fast-moving traffic",
    },
    "paid-ads": {
      title: "PAID ADS",
      body: "We create and manage paid advertising campaigns across platforms such as Google, Facebook, Instagram, TikTok, Snapchat, and other relevant channels. Our paid ads services focus on reach, leads, conversions, and measurable business results.",
      tags: ["Google", "Meta", "TikTok"],
      imageAlt: "A team planning a campaign with sticky notes",
    },
    "brand-identity": {
      title: "BRAND IDENTITY",
      body: "We help businesses create a professional brand image through logo design, colour direction, visual style, brand assets, and social media presentation. A strong brand identity helps businesses look credible, consistent, and memorable.",
      tags: ["Logo Design", "Visual Style", "Brand Assets"],
      imageAlt: "A fan of brand colour swatches",
    },
    "automation-ai": {
      title: "AUTOMATION & AI",
      body: "We support businesses with automation and AI solutions that save time, reduce manual work, and improve efficiency. This includes workflow automation, AI-powered content support, customer response systems, business tools, and process improvement.",
      tags: ["Workflow Automation", "AI Tools", "Efficiency"],
      imageAlt: "Close-up of a circuit board",
    },
  },

  servicesPage: {
    eyebrow: "PRODUCTS & SERVICES",
    title: ["OUR SERVICES"],
    sub: "QORLIQ helps businesses design, build, promote, and improve their digital operations — from the first website to automation, AI, and Microsoft cloud services.",
    listLabel: "Service list",
    offerLabel: "WHAT WE OFFER",
    offerHeading: "Understand the business, identify the goal, build the right solution.",
    dedicatedPage: "Dedicated page →",
    enquire: "Enquire →",
    processLabel: "HOW WE WORK",
    processHeading: "FAST AND STRUCTURED DELIVERY",
    process: [
      { title: "CONSULTATION", body: "We start by understanding the business, the goal, and what success looks like." },
      { title: "PLANNING", body: "Scope, structure, and timelines agreed up front so the project stays organised." },
      { title: "DESIGN & BUILD", body: "Design, development, and content brought together into the finished solution." },
      { title: "LAUNCH & SUPPORT", body: "Going live, then ongoing guidance and improvements as the business grows." },
    ],
  },

  capabilities: {
    label: "CAPABILITIES",
    heading: "WHAT WE'VE BUILT",
    count: "( {n} areas delivered )",
    items: [
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
    ],
  },

  /** The "How we work" book on the services page. */
  process: {
    stepsLabel: "Steps",
    coverTop: "How we",
    coverBottom: "work",
    brand: "The QORLIQ Method",
    chapters: "{n} chapters",
    scrollToOpen: "Scroll to open",
    chapter: "Chapter {n}",
    running: "QORLIQ · How we work",
    next: "Next",
    /** Points the way the text reads: "→" here, "←" in right-to-left languages. */
    arrow: "→",
    startProject: "Start your project →",
  },

  microsoftCsp: {
    eyebrow: "MICROSOFT CSP PARTNER",
    title: ["MICROSOFT", "CSP & CLOUD", "SOLUTIONS"],
    sub: "As a Cloud Solution Provider partner, QORLIQ supplies Microsoft licensing and supports the cloud services around it — Microsoft 365, Azure, security, productivity tools, and cloud-based business services.",
    cta: "Talk to Us About Licensing",
    coverLabel: "WHAT WE COVER",
    solutions: [
      { title: "Microsoft 365", body: "Licensing, business email, and the productivity apps your team works in every day." },
      { title: "Azure", body: "Cloud infrastructure and services, sized and configured around how your business actually runs." },
      { title: "SharePoint", body: "Structured document storage with controlled access, so files are easy to find and safe to share." },
      { title: "Microsoft Defender", body: "Threat protection across identities, devices, email, and cloud apps." },
      { title: "Teams", body: "Internal communication and meetings, set up with the channels and permissions that suit your teams." },
      { title: "Exchange Online", body: "Professional business email, hosted, secured, and supported." },
      { title: "Security & Compliance", body: "User roles, data protection, and baseline compliance settings configured to your requirements." },
      { title: "Cloud Migration", body: "Planning and moving your accounts, files, and services to the cloud with minimal disruption." },
    ],
    rolloutLabel: "HOW A ROLLOUT RUNS",
    steps: [
      { title: "REVIEW", body: "We look at how your team works today: email, file sharing, devices, and communication." },
      { title: "PLAN", body: "We map the right Microsoft licences, user roles, and security settings for your business." },
      { title: "MIGRATE", body: "Accounts, mailboxes, and documents move across with minimal disruption to daily work." },
      { title: "SUPPORT", body: "Guidance, admin support, and improvements as your team and requirements grow." },
    ],
    caseStudyLabel: "CASE STUDY",
    readCaseStudy: "Read the full case study →",
    ctaHeading: "MODERNISE YOUR WORKPLACE",
    ctaSub: "Tell us how your team works today and we'll map the right Microsoft setup for it.",
  },

  industries: {
    eyebrow: "INDUSTRIES WE SERVE",
    title: ["DESIGNING FOR THE", "WORLD'S CORE SECTORS"],
    sub: "We work with startups, small businesses, growing companies, and established organisations across a wide range of sectors, adapting each solution to how that industry actually operates.",
    projectsDelivered: "Projects Delivered",
    industriesServed: "Industries Served",
    sectorLabel: "SECTOR EXPERTISE",
    sectorCount: "( {n} industries served )",
    sectors: [
      { title: "TECHNOLOGY & SAAS", body: "We partner with hyper-growth tech companies and enterprise SaaS giants to build intuitive product interfaces, marketing websites, and high-performance design systems.", tags: ["Product Design", "Next.js Dev", "Design Systems"] },
      { title: "HEALTHCARE & WELLNESS", body: "Designing digital experiences that bridge the gap between patient care and absolute clarity. Clean, accessible, and certified with global standards.", tags: ["UX Audit", "Accessibility", "Patient Portals"] },
      { title: "FINANCE & FINTECH", body: "Empowering next-generation financial institutions with clear dashboards, robust consumer mobile apps, and visually distinct brand languages.", tags: ["Data Vis", "Mobile App", "Security First"] },
      { title: "E-COMMERCE & RETAIL", body: "Ultra-fast headless architectures optimized for conversions, immersive interactive 3D product previews, and cohesive brand design.", tags: ["Shopify Plus", "Conversion Rate", "Branding"] },
      { title: "REAL ESTATE & ARCHITECTURE", body: "High-fidelity digital storefronts for structural developers and design practices, offering cinematic rendering integration and editorial catalogs.", tags: ["3D Showcases", "Editorial", "Webflow"] },
      { title: "EDUCATION & EDTECH", body: "Crafting engaging spaces for virtual classrooms, professional learning ecosystems, and high-performance knowledge platforms.", tags: ["LMS Design", "Interactivity", "Identity"] },
      { title: "MEDIA & ENTERTAINMENT", body: "High-octane design and immersive interactions for production houses, digital streaming collectives, and creative broadcast teams.", tags: ["Motion Design", "Interactive", "React"] },
      { title: "SUSTAINABILITY & CLEANTECH", body: "Championing carbon-aware software, renewable energy platforms, and environmental networks with sustainable tech systems.", tags: ["Green Hosting", "Energy APIs", "Data Systems"] },
    ],
    whyLabel: "WHY CHOOSE QORLIQ",
    whyHeading: "A specialized approach for ambitious businesses",
    why: [
      { title: "INDUSTRY EXPERTISE", body: "Our teams are highly specialized. We don't just assign designers; we deploy domain experts who understand your sector's regulatory and commercial landscape." },
      { title: "TAILORED SOLUTIONS", body: "No cookie-cutter templates. Every system, wireframe, logo, and line of code is engineered with your unique growth targets and customer behavior in mind." },
      { title: "PROVEN RESULTS", body: "We track performance and conversions. Our designs have helped secure millions in funding and drive double-digit improvements in digital engagement." },
      { title: "LONG-TERM PARTNERSHIP", body: "We build systems to last. Our comprehensive brand guides and pristine design systems ensure your internal teams can expand gracefully." },
    ],
    ctaHeading: "LET'S MAKE SOMETHING AMAZING TOGETHER",
  },

  about: {
    eyebrow: "ABOUT THE COMPANY",
    title: ["WHO WE ARE"],
    purposeLabel: "OUR PURPOSE",
    purposeHeading: "Helping businesses grow through technology",
    storyLabel: "OUR STORY",
    whatWeDoLabel: "WHAT WE DO",
    whoWeAre: [
      "QORLIQ is a digital services brand created to help businesses grow in a fast-changing digital world. Operated by HOORAB GROUP OF COMPANIES LTD, QORLIQ focuses on delivering practical, professional, and result-driven solutions for startups, small businesses, growing companies, and established organisations.",
      "Our work is built around one clear purpose: helping businesses improve their online presence, attract customers, increase sales, and operate more efficiently through technology.",
      "From website design and e-commerce development to lead generation, SEO, paid advertising, automation, AI, and Microsoft solutions, QORLIQ provides digital services that support real business growth.",
    ],
    ourStory:
      "QORLIQ was developed under HOORAB GROUP with the vision of building a trusted digital services brand that combines creativity, technology, and business understanding. The company was established to meet the growing demand for professional digital solutions that are not only visually strong but also commercially effective. Many businesses need more than just a website; they need a complete digital foundation that supports marketing, customer communication, sales, automation, and long-term growth. QORLIQ was created to fill that gap by offering reliable, structured, and affordable digital services with a strong focus on quality, communication, and client satisfaction.",
    whatWeDo:
      "QORLIQ helps businesses design, build, promote, and improve their digital operations. We provide services across web development, e-commerce, application development, SEO, paid advertising, brand identity, lead generation, automation, AI, and Microsoft cloud solutions. Our approach is simple: understand the business, identify the goal, build the right solution, and support the client with professional service from start to finish.",
    statsLabel: "COMPANY STATISTICS",
    statTags: { delivered: "( Delivered )", global: "( Global )", sectors: "( Sectors )", rated: "( Rated )", since: "( Since )" },
    stats: {
      projectsCompleted: "Projects completed",
      countriesServed: "Countries served",
      industriesServed: "Industries served",
      satisfactionRate: "Client satisfaction rate",
      established: "Year established",
    },
  },

  profile: {
    strengthsLabel: "WHY CHOOSE US",
    strengthsHeading: "WHY BUSINESSES CHOOSE QORLIQ",
    strengthsIntro:
      "QORLIQ is built for businesses that need professional digital services with clear communication, practical solutions, and reliable delivery.",
    strengths: [
      { title: "EXPERIENCED BUSINESS APPROACH", body: "QORLIQ operates under HOORAB GROUP OF COMPANIES LTD, giving the brand a strong business foundation and a professional approach to client service." },
      { title: "COMPLETE DIGITAL SERVICES", body: "We provide a wide range of services under one brand, including websites, e-commerce, applications, branding, SEO, paid ads, lead generation, automation, AI, and Microsoft solutions." },
      { title: "RELIABLE SERVICE", body: "We focus on clear timelines, proper communication, and professional delivery so clients can move forward with confidence." },
      { title: "AFFORDABLE AND PRACTICAL SOLUTIONS", body: "Our services are designed to support businesses at different stages, from startups to growing companies, with solutions that match their goals and budget." },
      { title: "FAST AND STRUCTURED DELIVERY", body: "We follow a clear process from consultation to planning, design, development, launch, and support. This helps projects stay organised and efficient." },
      { title: "STRONG CUSTOMER SUPPORT", body: "We believe support is an important part of every service. Our team works closely with clients to understand their needs and provide guidance throughout the project." },
      { title: "QUALITY STANDARDS", body: "Every project is handled with care, from design and content to functionality, performance, and user experience." },
      { title: "CLIENT BENEFITS", body: "Working with QORLIQ helps businesses save time, build a professional image, reach more customers, improve digital performance, and prepare for long-term growth." },
    ],
    badges: [
      "UK REGISTERED COMPANY",
      "GLOBAL SERVICE DELIVERY",
      "MICROSOFT SOLUTIONS EXPERTISE",
      "AI & AUTOMATION CAPABILITIES",
      "DEDICATED SUPPORT",
      "TRANSPARENT PRICING",
      "END-TO-END DIGITAL SERVICES",
    ],
    projectAreasLabel: "OUR PROJECTS",
    projectAreasHeading: "Our project areas",
    projectAreasIntro: "Each project is planned according to the client's business goals, target audience, and growth needs.",
    projectAreas: [
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
    ],
    partnersLabel: "PARTNERSHIPS & CERTIFICATIONS",
    partnersCount: "( {n} partners )",
    vmvLabel: "VISION, MISSION & VALUES",
    visionTitle: "OUR VISION",
    vision:
      "Our vision is to become a trusted digital solutions partner for businesses that want to grow with confidence, professionalism, and modern technology. We aim to support companies by building strong digital foundations that help them compete, expand, and succeed in their markets.",
    missionTitle: "OUR MISSION",
    mission:
      "Our mission is to deliver high-quality digital services that create real value for businesses. We work to provide practical, reliable, and effective solutions that help our clients improve their online presence, reach more customers, generate better leads, increase sales, and manage their digital operations more efficiently.",
    valuesHeading: "Our core values",
    values: ["QUALITY", "CUSTOMER SATISFACTION", "PROFESSIONALISM", "TRUST", "INNOVATION", "LONG-TERM GROWTH"],
    ceoLabel: "CEO MESSAGE",
    ceoHeading: "BUILDING TRUST THROUGH QUALITY & INTEGRITY",
    ceoBody: [
      "At HOORAB GROUP, our journey is driven by a clear vision of building a business that stands for trust, quality, and long-term value. From the beginning, the goal has been to create more than just a company. The goal has been to build a strong business foundation that connects products, opportunities, and markets with professionalism and purpose.",
      "Our CEO believes that real business success is built on commitment, consistency, and strong relationships. With a focus on retail, wholesale, sourcing, distribution, and digital business solutions, HOORAB GROUP was established to meet market needs through reliable supply solutions and customer-focused service.",
      "Through QORLIQ, we are extending that same vision into the digital services sector. Businesses today need trusted partners who understand technology, branding, marketing, and growth. QORLIQ was created to support those needs with professional digital solutions that help companies move forward with confidence. The vision behind the company is simple: to grow through honesty, deliver through quality, and build partnerships that last.",
    ],
    ceoQuote:
      "Our vision for HOORAB GROUP and QORLIQ is built on trust, quality, and long-term business growth. We believe in creating strong partnerships, delivering reliable solutions, and building a company that stands for professionalism and consistency in every market we serve.",
    ceoAttribution: "CEO, HOORAB GROUP OF COMPANIES LTD",
    overviewLabel: "COMPANY OVERVIEW",
    overview: {
      legalName: "Legal company name",
      companyNo: "Company reg. no.",
      vat: "VAT registration",
      country: "Country of registration",
      established: "Year established",
      headquarters: "Headquarters",
    },
    registrationCountry: "United Kingdom",
    photos: {
      team: "The QORLIQ team working together",
      culture: "Life at QORLIQ: a team working session",
    },
  },

  caseStudies: {
    eyebrow: "CASE STUDIES",
    title: ["CLIENT WORK"],
    sub: "A look at how we approach projects: the challenge, what we delivered, the solution, and the results the client gained.",
    selected: "SELECTED PROJECTS",
    ctaHeading: "READY TO START YOUR PROJECT?",
    industry: "Industry",
    focus: "Focus",
    all: "← All case studies",
    challenge: "CLIENT CHALLENGE",
    delivered: "SERVICES DELIVERED",
    solution: "SOLUTION PROVIDED",
    results: "RESULTS ACHIEVED",
    next: "NEXT CASE STUDY",
    detailCtaHeading: "WANT A PROJECT LIKE THIS?",
    detailCtaSub: "Tell us what you're working towards and we'll show you how we'd approach it.",
  },

  contact: {
    eyebrow: "LET'S WORK TOGETHER",
    title: ["LET'S BUILD", "YOUR DIGITAL", "FUTURE"],
    sub: "Whether you need a website, online store, application, branding, digital marketing, automation, AI, or Microsoft solutions, our team is ready to help you move forward with confidence.",
    inquiryLabel: "PROJECT INQUIRY",
    infoLabel: "CONTACT INFORMATION",
    getInTouch: "Get in touch",
    whereWeAre: "Where we are",
    companyLabel: "Company",
    brand: "Brand: {name}",
    operatedBy: "Operated by: {entity}",
    companyNo: "Company Reg. No. {no}",
    vat: "VAT: {vat}",
    callHeading: "Prefer a real-time call?",
    callBody: "Email us and we'll find a time that works.",
    bookCall: "Book a Call",
    callSubject: "Let's book a call",
    faqLabel: "FREQUENTLY ASKED QUESTIONS",
    faq: [
      {
        q: "What services does QORLIQ offer?",
        a: "Website design, e-commerce stores, application development, Microsoft solutions, lead generation, SEO and ranking, paid ads, brand identity, and automation and AI. You can work with us on a single service or a complete digital foundation.",
      },
      {
        q: "How does a project run?",
        a: "We follow a clear process from consultation to planning, design, development, launch, and support. Timelines and scope are agreed up front so the project stays organised and you always know what happens next.",
      },
      {
        q: "Where are you based, and who do you work with?",
        a: "QORLIQ is a digital services brand operated by {entity}, registered in {country} and serving clients internationally. We work with startups, small businesses, growing companies, and established organisations.",
      },
      {
        q: "Do you support Microsoft 365 and Azure?",
        a: "Yes. We handle Microsoft 365 setup, business email, Teams, SharePoint, Exchange Online, Defender, security and compliance settings, licensing support, and cloud migration planning. See our Microsoft Solutions page for detail.",
      },
      {
        q: "How does pricing work?",
        a: "Pricing is transparent and quoted per project after an initial consultation, so it matches your goals and budget. Tell us what you need and we'll come back with a clear proposal.",
      },
    ],
  },

  blog: {
    eyebrow: "THE JOURNAL",
    title: ["INSIGHTS &", "IDEAS / 2026"],
    sub: "Deep dives into user behavior, technical engineering, brand strategies, and creative systems straight from our distributed global team.",
    comingSoon: "COMING SOON",
    comingHeading: "Our first articles are on the way",
    comingBody:
      "We're writing about the work we do — Microsoft CSP, automation, lead generation, and the projects behind them. Subscribe below and we'll send the first one over.",
    seeCaseStudies: "See our case studies instead →",
    featured: "FEATURED POST",
    readMore: "Read More →",
    filterLabel: "Filter articles",
    all: "ALL INSIGHTS",
    /** Keyed by the category as stored. */
    categories: { DESIGN: "DESIGN", DEVELOPMENT: "DEVELOPMENT", BRANDING: "BRANDING", STRATEGY: "STRATEGY" } as Record<string, string>,
    empty: "No articles in this category yet — check back soon.",
    by: "By {author}",
    allArticles: "← All articles",
    similarHeading: "Working on something similar?",
    similarBody: "We'd love to hear about it.",
    startConversation: "Start a conversation →",
    keepReading: "KEEP READING",
    viewAll: "View all →",
    newsletterHeading: "Stay in the loop.",
    newsletterBody:
      "Receive a curated selection of digital strategy insights, design files, and industry trends directly in your inbox. No spam.",
  },

  careers: {
    eyebrow: "CAREERS AT QORLIQ",
    title: ["SHAPE THE", "FUTURE / WITH US"],
    sub: "We are looking for bold, high-performance engineers, designers, and thinkers who are ready to ditch conventional structures and craft actual masterpieces.",
    whyLabel: "WHY QORLIQ",
    culture: [
      { title: "CREATIVE FREEDOM", body: "We trust our creators entirely. No heavy micro-management. Ditch the rigid corporate frameworks and define real aesthetic products." },
      { title: "GROWTH & LEARNING", body: "A massive yearly educational stipend combined with daily knowledge transfers across global system architects and designers." },
      { title: "GLOBAL IMPACT", body: "Build next-generation SaaS architectures and visual identities for leading global brands located across 24 different countries." },
    ],
    perksLabel: "BENEFITS & PERKS",
    perks: [
      { title: "Remote-First", body: "Work from anywhere in the world. As long as the work is outstanding, we support you." },
      { title: "Health & Wellness", body: "Premium healthcare coverage, fitness allowances, and access to wellness apps." },
      { title: "Learning Budget", body: "$3k yearly allowance for courses, books, workshops, or high-fidelity design tickets." },
      { title: "Flexible Hours", body: "A system built on output, not desk hours. We structure working blocks with autonomy." },
      { title: "Team Retreats", body: "Twice a year we gather the global distributed group in inspirational travel spots." },
      { title: "Equipment Budget", body: "Complete workspace allowance including the newest MacBooks and ergonomic desks." },
    ],
    openRoles: "OPEN ROLES",
    positions: "{n} positions available",
    openWelcome: "Open application welcome",
    noPositions: "No open positions right now",
    noPositionsBody:
      "We still want to hear from talented designers, engineers, and strategists. Send us your portfolio and we'll be in touch when something opens up.",
    sendPortfolio: "Send Us Your Portfolio",
    viewRole: "View Role →",
    notSeeHeading: "Don't see your specific role?",
    notSeeBody:
      "We are always on the lookout for world-class developers, product designers, identity experts and strategy leads. Shoot over your portfolio!",
    eyebrowRole: "CAREERS · {dept}",
    allRoles: "← All roles",
    tellUs: "Tell us",
    whatHelps: "What helps",
    whatYoullDo: "What you'll do",
    whatYoullBring: "What you'll bring",
    remoteHeading: "Remote-first, output-focused.",
    remoteBody: "Flexible hours, a $3k learning budget, premium healthcare, equipment allowance, and two team retreats a year.",
    seeBenefits: "See all benefits →",
    apply: "APPLY",
    otherRoles: "OTHER OPEN ROLES",
    openApplication: {
      title: "Open Application",
      dept: "Any team",
      loc: "Remote / Anywhere",
      summary: "Don't see your role? We're always looking for exceptional designers, engineers, and strategists. Tell us what you'd bring.",
      responsibilities: ["Tell us the kind of work you want to do", "Share projects you're proud of", "Let us know where and how you like to work"],
      requirements: ["A portfolio, GitHub, or case studies", "Evidence of craft and care", "Curiosity about what we do"],
    },
  },

  legal: {
    eyebrow: "LEGAL",
    lastUpdated: "Last updated: {date}",
    contactUs: "Contact us",
    tradingAs: "{entity} (trading as {name})",
    companyLine: "Company Reg. No. {no} · VAT {vat}",
    registeredLine: "Registered in {country} · {location}",
    /** Shown on translated legal pages only. */
    translationNote: "",
    privacy: {
      title: ["PRIVACY POLICY"],
      intro: "How {entity}, trading as {name}, collects and handles personal data.",
      sections: [
        {
          heading: "Who we are",
          body: [
            "{entity} (Company Reg. No. {companyNo}, VAT {vat}), registered in {country}, operates the {name} brand and this website. We are the data controller for personal data collected here.",
            "You can reach us about any privacy matter at {email}.",
          ],
        },
        {
          heading: "What we collect",
          body: [
            "We only collect what you give us or what we need to run the site:",
            [
              "Enquiry details you submit: name, email address, company, the services you select, budget and timeline, and your message.",
              "Job application details: name, email, portfolio or GitHub link, LinkedIn profile, and anything you write to us.",
              "Newsletter sign-ups: your email address.",
              "Technical data: IP address and basic request information, used to prevent spam and abuse.",
              "Analytics data about pages visited, if you accept analytics cookies.",
            ],
          ],
        },
        {
          heading: "Why we use it and our lawful basis",
          body: [
            "Under UK GDPR we rely on the following bases:",
            [
              "Legitimate interests — responding to your enquiry, assessing job applications, and protecting the site from spam and abuse.",
              "Consent — sending you marketing emails you signed up for, and setting analytics cookies. You can withdraw consent at any time.",
              "Legal obligation — keeping records we are required to keep, such as for tax purposes.",
            ],
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "We do not sell your data. We share it only with service providers who process it on our behalf, under contract:",
            [
              "Our hosting provider, which serves this website.",
              "Our email delivery provider, which sends form submissions to our inbox.",
              "Our analytics provider, if you have accepted analytics cookies.",
              "Our customer relationship management system, where we record enquiries so we can follow them up.",
            ],
            "Some of these providers may process data outside the UK. Where they do, transfers are covered by appropriate safeguards such as the UK International Data Transfer Agreement or an adequacy decision.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "Enquiries are kept for up to two years after our last contact with you, so we can pick up the conversation. Job applications are kept for up to twelve months. Newsletter sign-ups are kept until you unsubscribe. Records required by law are kept for the period the law requires.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under UK GDPR you have the right to:",
            [
              "Ask what personal data we hold about you and receive a copy.",
              "Have inaccurate data corrected.",
              "Ask us to delete your data, where no legal reason to keep it applies.",
              "Object to or restrict how we use your data.",
              "Withdraw consent at any time, including unsubscribing from emails.",
              "Ask us to transfer your data to another provider.",
            ],
            "To exercise any of these, email {email}. We will respond within one month. If you are not satisfied with our response, you can complain to the Information Commissioner's Office at ico.org.uk.",
          ],
        },
        {
          heading: "Security",
          body: [
            "The site is served over HTTPS. Form submissions are transmitted securely, rate limited, and protected against automated abuse. Access to enquiry data is limited to the people who need it to do their work.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: ["We may update this policy as our services change. The date at the top shows when it was last revised."],
        },
      ] as LegalSection[],
    },
    terms: {
      title: ["TERMS OF USE"],
      intro: "These terms apply when you use this website, operated by {entity}.",
      sections: [
        {
          heading: "About these terms",
          body: [
            "This website is operated by {entity} (Company Reg. No. {companyNo}), trading as {name}. By using the site you accept these terms. If you do not accept them, please do not use the site.",
          ],
        },
        {
          heading: "Using the site",
          body: [
            "You may use this site for lawful purposes only. You must not attempt to gain unauthorised access to it, interfere with its operation, or use automated systems to overload it or scrape it at scale.",
          ],
        },
        {
          heading: "Our content",
          body: [
            "All content on this site — text, design, graphics, logos, and the {name} brand — belongs to us or our licensors and is protected by copyright and trade mark law. You may view and print pages for your own reference. You may not reuse, republish, or adapt our content commercially without written permission.",
            "Partner and platform names shown on this site belong to their respective owners and are used to describe the services we work with.",
          ],
        },
        {
          heading: "Accuracy and availability",
          body: [
            "We take care to keep the information here accurate and current, but we provide it for general information only. It is not advice you should act on without speaking to us about your specific situation. We aim to keep the site available at all times, but we do not guarantee uninterrupted access and may change or withdraw parts of it without notice.",
          ],
        },
        {
          heading: "Quotes and services",
          body: [
            "Nothing on this site is a contractual offer. Project work is governed by a separate written proposal or agreement covering scope, timelines, fees, and ownership of deliverables.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "To the extent permitted by law, we are not liable for any loss arising from your use of this site, including lost profits, lost business, or loss of data. Nothing in these terms limits our liability for death or personal injury caused by negligence, or for fraud.",
          ],
        },
        {
          heading: "Links to other sites",
          body: [
            "Where we link to other websites, we do so for information only. We have no control over their content and accept no responsibility for it.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute.",
          ],
        },
      ] as LegalSection[],
    },
    cookies: {
      title: ["COOKIE POLICY"],
      intro: "Which cookies this site uses, what they do, and how you can control them.",
      sections: [
        {
          heading: "What cookies are",
          body: [
            "Cookies are small files stored in your browser. Similar technologies such as local storage work the same way. We use as few as possible.",
          ],
        },
        {
          heading: "Cookies we use",
          body: [
            "Strictly necessary — these keep the site working and cannot be turned off:",
            [
              "Your cookie choice itself, so we do not ask on every page.",
              "Your language, if you choose one from the language menu, so the site opens in it next time.",
              "A short-lived record that you have seen the opening animation, so it only plays once per visit.",
              "Anti-spam protection on our forms, if enabled.",
            ],
            "Analytics — only set if you accept them:",
            [
              "Which pages are viewed, how visitors arrive, and roughly where they are in the world. This tells us which services people care about. We do not use these to identify you personally.",
              "We use Google Tag Manager in Google's Consent Mode. It loads on every page, but it is told that you have not consented, so Google's measurement tools (such as Google Analytics) set no analytics cookies unless you accept.",
            ],
            "We do not use advertising or tracking cookies on this site.",
          ],
        },
        {
          heading: "Managing your choice",
          body: [
            "You can accept or reject analytics cookies when you first visit, and change your mind at any time using the cookie settings link in the footer. You can also clear or block cookies in your browser settings, though the site may behave differently if you block the necessary ones.",
          ],
        },
        {
          heading: "Questions",
          body: ["If anything here is unclear, email us at {email}."],
        },
      ] as LegalSection[],
    },
  },

  notFound: {
    label: "ERROR 404",
    lines: ["LOST IN", "THE PIXELS."],
    body: "This page doesn't exist — or it moved somewhere better. Let's get you back on track.",
    home: "Back to Home",
    links: { work: "Our work", services: "Services", journal: "Journal", contact: "Contact" },
  },

  form: {
    optional: "(optional)",
    stepOf: "Step {n} of {total}",
    steps: { services: "What do you need?", specifics: "A few specifics", scope: "Scope & budget", you: "About you" },
    servicesLabel: "Services",
    specificsNote: "All optional — answer what you can so our first reply is more useful.",
    isNew: "Is this a new project?",
    stageLabel: "Project stage",
    budget: "Project budget",
    timeline: "Timeline",
    pickService: "Pick at least one service to continue.",
    chooseBudget: "Choose a budget range to continue.",
    name: "Your name",
    namePlaceholder: "Full name",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    company: "Company",
    companyPlaceholder: "e.g. Acme Corp",
    country: "Country",
    selectCountry: "Select your country",
    phone: "Phone",
    whatsapp: "This number is on WhatsApp",
    website: "Current website",
    websitePlaceholder: "yourcompany.com",
    message: "Tell us about the project",
    messagePlaceholder: "Goals, links, anything that helps us understand what you're building…",
    continue: "Continue",
    send: "Send Inquiry",
    sending: "Sending…",
    back: "← Back",
    thanksNamed: "Thanks, {name}. We're on it.",
    thanks: "Thanks. We're on it.",
    reply: "A strategist will reply within one business day with next steps.",
    browseWork: "Browse our work while you wait →",
    emailFallback: "You can also email us at",
    /** Labels for the values the form submits (kept in English), keyed by that value. */
    serviceOptions: {
      "website-design": "Website Design",
      "web-development": "Web Development",
      "ecommerce-store": "E-Commerce Store",
      "application-development": "Application Development",
      crm: "CRM",
      "microsoft-csp": "Microsoft CSP",
      "ux-ui": "UX/UI Design",
      "government-api": "Government API Integration",
      "lead-generation": "Lead Generation",
      "seo-ranking": "SEO & Ranking",
      "paid-ads": "Paid Ads",
      "brand-identity": "Branding",
      "automation-ai": "AI & Automation",
    } as Record<string, string>,
    stages: {
      "New build": "New build",
      "Redesign / rebuild": "Redesign / rebuild",
      "Improve existing": "Improve existing",
      "Ongoing support": "Ongoing support",
    } as Record<string, string>,
    budgets: {
      "$0 – $1k": "$0 – $1k",
      "$1k – $5k": "$1k – $5k",
      "$5k – $15k": "$5k – $15k",
      "$15k – $40k": "$15k – $40k",
      "$40k – $100k": "$40k – $100k",
      "$100k+": "$100k+",
    } as Record<string, string>,
    timelines: {
      "As soon as possible": "As soon as possible",
      "1 – 3 months": "1 – 3 months",
      "3 – 6 months": "3 – 6 months",
      Flexible: "Flexible",
    } as Record<string, string>,
    /** Follow-up questions: service slug → question id → label, placeholder, and option labels. */
    questions: {
      "microsoft-csp": {
        seats: { label: "How many users or seats?", options: {} },
        tenant: { label: "Do you already have a Microsoft 365 tenant?", options: { Yes: "Yes", No: "No", "Not sure": "Not sure" } },
      },
      "ecommerce-store": {
        platform: { label: "Preferred platform", options: { "Custom build": "Custom build", "Not sure": "Not sure" } },
        products: { label: "Roughly how many products?", options: { "Under 50": "Under 50" } },
      },
      "application-development": {
        platforms: { label: "Where should it run?", options: { "Cross-platform": "Cross-platform" } },
      },
      crm: {
        current: { label: "What do you use today?", options: { "Nothing yet": "Nothing yet", Spreadsheets: "Spreadsheets", Other: "Other" } },
      },
      "government-api": {
        api: { label: "Which API or service?", placeholder: "e.g. HMRC MTD, Companies House, GOV.UK Pay", options: {} },
      },
      "seo-ranking": {
        market: { label: "Which country or region are you targeting?", placeholder: "e.g. United Kingdom", options: {} },
      },
      "paid-ads": {
        market: { label: "Which country or region are you targeting?", placeholder: "e.g. United Kingdom", options: {} },
        spend: { label: "Current monthly ad spend", options: { "Not started yet": "Not started yet", "Under $1k": "Under $1k" } },
      },
    } as Record<string, Record<string, { label: string; placeholder?: string; options: Record<string, string> }>>,
    application: {
      fullName: "Full name",
      email: "Email",
      portfolio: "Portfolio / GitHub",
      linkedin: "LinkedIn",
      cv: "CV",
      cvHint: "PDF or Word, up to {mb}MB.",
      why: "Why QORLIQ?",
      submit: "Submit Application",
      received: "Application received",
      receivedBody: "Thanks for applying. Our team reviews every application and will get back to you within two weeks.",
      meetTeam: "Meet the team →",
      cvTooLarge: "Your CV is larger than {mb}MB. Please upload a smaller file or share a link instead.",
    },
    newsletter: {
      emailLabel: "Email address",
      placeholder: "Enter your email address",
      subscribe: "Subscribe",
      done: "You're in. See you in your inbox. ✓",
    },
    /** Messages for the error codes the contact API returns. */
    errors: {
      throttled: "Too many submissions. Please try again in a minute.",
      invalid: "Invalid request.",
      bot: "We couldn't verify that you're human. Please try again.",
      unknownForm: "Unknown form.",
      email: "Please enter a valid email address.",
      name: "Please tell us your name.",
      cvType: "Please upload your CV as a PDF or Word document.",
      cvSize: "Your CV is larger than 10MB. Please upload a smaller file.",
      company: "Please tell us your company name.",
      country: "Please choose your country from the list.",
      phone: "Please check your phone number, including the country code.",
      website: "Please check your website address, e.g. yourcompany.com.",
      message: "Please tell us a little about the project.",
      cvUpload: "We couldn't upload your CV. Please try again, or share a link instead.",
      unavailable: "Our form is temporarily unavailable.",
      send: "We couldn't send your message.",
      generic: "Something went wrong.",
    } as Record<string, string>,
  },

  /** The acknowledgement email a visitor receives after contacting us or applying. */
  email: {
    projectSubject: "We've received your enquiry — QORLIQ",
    projectBody:
      "Hi {first},\n\nThanks for getting in touch with QORLIQ. We've received your enquiry and a member of our team will reply within one business day.\n\nHere's what you sent us:\n\n{summary}\n\nIf anything changes in the meantime, just reply to this email.\n\n— QORLIQ\nsupport@qorliq.com\nA digital services brand operated by HOORAB GROUP OF COMPANIES LTD",
    applicationSubject: "We've received your application — QORLIQ",
    applicationBody:
      "Hi {first},\n\nThanks for applying to QORLIQ. We've received your application and review every one — we'll be in touch within two weeks.\n\n— QORLIQ\nsupport@qorliq.com",
  },
};

export type LegalSection = { heading: string; body: (string | string[])[] };
export type Messages = typeof en;
export default en;

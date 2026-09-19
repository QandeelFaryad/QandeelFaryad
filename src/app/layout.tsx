import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import { CustomCursor, SmoothScroll } from "@/components/experience";
import { BackToTop } from "@/components/motion";
import Consent from "@/components/Consent";
import RouteLoader from "@/components/RouteLoader";
import BrandLoader from "@/components/BrandLoader";
import SiteOnly from "@/components/SiteOnly";
import { SITE } from "@/lib/site";
import { googleTagScript } from "@/lib/analytics";

// Self-hosted at build time, so the page makes no requests to Google and the fonts
// arrive with the rest of the app. Both are variable fonts, so no weight list is
// needed. globals.css maps --font-sans / --font-display onto these variables.
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

// Runs before first paint: mark this as a hard load (see .first-load in globals.css),
// and skip the intro for repeat visits and reduced motion.
const introScript = `(function(){var d=document.documentElement;d.classList.add("first-load");try{if(sessionStorage.getItem("qorliq-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-seen")}else{sessionStorage.setItem("qorliq-intro","1")}}catch(e){d.classList.add("intro-seen")}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${syne.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Google Tag Manager + Analytics, Consent Mode v2 (see lib/analytics.ts) */}
        <script dangerouslySetInnerHTML={{ __html: googleTagScript }} />
      </head>
      <body>
        <SiteOnly>
          {/* First-visit brand intro: the signature loader (pure CSS; hidden via .intro-seen) */}
          <div className="intro" aria-hidden="true">
            <BrandLoader />
          </div>

          {/* Before the page so its effect can hold the page's reveals */}
          <RouteLoader />
          <Header />
        </SiteOnly>
        {children}
        <SiteOnly>
          <Consent />
          <BackToTop />
          <CustomCursor />
          <SmoothScroll />
        </SiteOnly>
      </body>
    </html>
  );
}

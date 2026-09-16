import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import { CustomCursor, SmoothScroll } from "@/components/experience";
import { BackToTop } from "@/components/motion";
import Consent from "@/components/Consent";
import RouteLoader from "@/components/RouteLoader";
import SiteOnly from "@/components/SiteOnly";
import { SITE } from "@/lib/site";

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

// Runs before first paint: skip the intro for repeat visits and reduced motion.
const introScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("qorliq-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-seen")}else{sessionStorage.setItem("qorliq-intro","1")}}catch(e){d.classList.add("intro-seen")}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteOnly>
          {/* First-visit brand intro (pure CSS; hidden via .intro-seen) */}
          <div className="intro" aria-hidden="true">
            <div className="intro-stage">
              <div className="intro-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brand/qorliq-logo-white.svg" alt="" className="intro-logo-img" />
              </div>
              <div className="intro-bar"><span /></div>
            </div>
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

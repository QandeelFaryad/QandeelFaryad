import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "lenis/dist/lenis.css";
import "../globals.css";
import Header from "@/components/Header";
import { CustomCursor, SmoothScroll } from "@/components/experience";
import { BackToTop } from "@/components/motion";
import Consent from "@/components/Consent";
import RouteLoader from "@/components/RouteLoader";
import BrandLoader from "@/components/BrandLoader";
import { SITE } from "@/lib/site";
import { googleTagScript } from "@/lib/analytics";
import { fontVariables } from "@/lib/fonts";
import { LOCALES, OG_LOCALES, dir, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getMessages(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.siteTitle, template: `%s — ${SITE.name}` },
    description: t.meta.description,
    openGraph: {
      siteName: SITE.name,
      type: "website",
      locale: OG_LOCALES[lang],
      title: t.meta.siteTitle,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image" },
  };
}

// Runs before first paint: mark this as a hard load (see .first-load in globals.css),
// and skip the intro for repeat visits and reduced motion.
const introScript = `(function(){var d=document.documentElement;d.classList.add("first-load");try{if(sessionStorage.getItem("qorliq-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-seen")}else{sessionStorage.setItem("qorliq-intro","1")}}catch(e){d.classList.add("intro-seen")}})()`;

/** The public site's root layout, once per language (app/admin has its own). */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getMessages(lang);
  const clientMessages = {
    common: t.common,
    nav: t.nav,
    form: t.form,
    consent: t.consent,
    loader: t.loader,
    blog: t.blog,
    process: t.process,
  };

  return (
    <html lang={lang} dir={dir(lang)} className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Google Tag Manager + Analytics, Consent Mode v2 (see lib/analytics.ts) */}
        <script dangerouslySetInnerHTML={{ __html: googleTagScript }} />
      </head>
      <body>
        <I18nProvider locale={lang} messages={clientMessages}>
          {/* First-visit brand intro: the signature loader (pure CSS; hidden via .intro-seen) */}
          <div className="intro" aria-hidden="true">
            <BrandLoader caption={t.loader.caption} subtitle={t.loader.subtitle} />
          </div>

          {/* Before the page so its effect can hold the page's reveals */}
          <RouteLoader />
          <Header />
          {children}
          <Consent />
          <BackToTop />
          <CustomCursor />
          <SmoothScroll />
        </I18nProvider>
      </body>
    </html>
  );
}

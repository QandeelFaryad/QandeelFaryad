/**
 * Google Tag Manager and Google Analytics, in Consent Mode v2.
 *
 * Both tags are written straight into <head> by the root layout, so they are in the
 * page's HTML (where Google's installation checkers look) and run before anything
 * else. Every storage type starts denied; the cookie banner (components/Consent.tsx)
 * grants analytics_storage when the visitor accepts. A returning visitor's stored
 * choice goes into the defaults. The banner never asks about advertising, so ad_*
 * stay denied.
 *
 * Tags inside the GTM container must respect these consent signals (GA4 tags do by
 * default). Don't also add a GA4 tag for GA_ID in GTM, or every page view is counted
 * twice. There is no <noscript> iframe: without JavaScript the banner can't ask, and
 * the iframe ignores consent. The admin panel is skipped.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-TB8D8JWQ";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WCQNF5TM5F";
/** localStorage key holding "accepted" or "rejected". */
export const CONSENT_KEY = "qorliq-consent";

export const googleTagScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
if(!/^\\/admin(\\/|$)/.test(location.pathname)){
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='accepted'?'granted':'denied',wait_for_update:500});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(g);
gtag('js',new Date());gtag('config','${GA_ID}');
}`;

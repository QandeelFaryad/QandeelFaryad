import LegalPage from "@/components/LegalPage";
import { SITE, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Cookie Policy",
  `Which cookies the ${SITE.name} website uses, and how to control them.`,
);

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title={["COOKIE POLICY"]}
      intro="Which cookies this site uses, what they do, and how you can control them."
      updated="16 September 2026"
      sections={[
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
          body: [`If anything here is unclear, email us at ${SITE.email}.`],
        },
      ]}
    />
  );
}

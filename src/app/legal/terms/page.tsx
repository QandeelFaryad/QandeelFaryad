import LegalPage from "@/components/LegalPage";
import { SITE, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Terms of Use",
  `The terms that apply when you use the ${SITE.name} website.`,
);

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title={["TERMS OF USE"]}
      intro={`These terms apply when you use this website, operated by ${SITE.legal.entity}.`}
      updated="16 September 2026"
      sections={[
        {
          heading: "About these terms",
          body: [
            `This website is operated by ${SITE.legal.entity} (Company Reg. No. ${SITE.legal.companyNo}), trading as ${SITE.name}. By using the site you accept these terms. If you do not accept them, please do not use the site.`,
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
            `All content on this site — text, design, graphics, logos, and the ${SITE.name} brand — belongs to us or our licensors and is protected by copyright and trade mark law. You may view and print pages for your own reference. You may not reuse, republish, or adapt our content commercially without written permission.`,
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
            `These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute.`,
          ],
        },
      ]}
    />
  );
}

import LegalPage from "@/components/LegalPage";
import { SITE, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy Policy",
  `How ${SITE.legal.entity} collects, uses, and protects personal data through the ${SITE.name} website.`,
);

const UPDATED = "16 September 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title={["PRIVACY POLICY"]}
      intro={`How ${SITE.legal.entity}, trading as ${SITE.name}, collects and handles personal data.`}
      updated={UPDATED}
      sections={[
        {
          heading: "Who we are",
          body: [
            `${SITE.legal.entity} (Company Reg. No. ${SITE.legal.companyNo}, VAT ${SITE.legal.vat}), registered in the ${SITE.legal.country}, operates the ${SITE.name} brand and this website. We are the data controller for personal data collected here.`,
            `You can reach us about any privacy matter at ${SITE.email}.`,
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
            `To exercise any of these, email ${SITE.email}. We will respond within one month. If you are not satisfied with our response, you can complain to the Information Commissioner's Office at ico.org.uk.`,
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
          body: [
            "We may update this policy as our services change. The date at the top shows when it was last revised.",
          ],
        },
      ]}
    />
  );
}

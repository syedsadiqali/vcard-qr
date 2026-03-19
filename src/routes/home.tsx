import {
  buildCanonicalLinks,
  buildMeta,
  stringifyStructuredData,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { HomePage } from "@/pages/HomePage";

export const links = () => buildCanonicalLinks("/");

export const meta = () =>
  buildMeta({
    title: "Create and Download vCard QR Codes",
    description:
      "Create scannable vCard QR codes that save contacts directly to phones. No landing page required.",
    path: "/",
    keywords: [
      "vCard QR code generator",
      "contact QR",
      "save contact from QR",
      "download QR PNG",
    ],
  });

export default function HomeRoute() {
  const structuredData = stringifyStructuredData({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "vCard QR Generator",
        url: absoluteUrl("/"),
        description:
          "Create scannable vCard QR codes that save contacts directly to phones.",
      },
      {
        "@type": "SoftwareApplication",
        name: "vCard QR Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does scanning open a website first?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The QR contains vCard data directly, so phones can save the contact without opening a landing page.",
            },
          },
          {
            "@type": "Question",
            name: "What is the minimum data required?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "First name and at least one phone number are required. Email, website, and company are optional.",
            },
          },
        ],
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json">{structuredData}</script>
      <HomePage />
    </>
  );
}

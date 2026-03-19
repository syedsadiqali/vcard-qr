import { LandingPage } from "@/components/LandingPage";
import { landingPages } from "@/lib/landing-pages";
import { buildCanonicalLinks, buildMeta } from "@/lib/seo";

const page = landingPages.howToCreateVcardQrCode;

export const links = () => buildCanonicalLinks(page.path);

export const meta = () =>
  buildMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [
      page.keyword,
      "vCard QR tutorial",
      "how to make contact QR",
      "vCard code guide",
    ],
    ogImage: page.ogImage,
  });

export default function HowToCreateVcardQrCodeRoute() {
  return <LandingPage pageKey="howToCreateVcardQrCode" />;
}

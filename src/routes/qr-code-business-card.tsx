import { LandingPage } from "@/components/LandingPage";
import { landingPages } from "@/lib/landing-pages";
import { buildCanonicalLinks, buildMeta } from "@/lib/seo";

const page = landingPages.qrCodeBusinessCard;

export const links = () => buildCanonicalLinks(page.path);

export const meta = () =>
  buildMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [
      page.keyword,
      "digital business card QR",
      "networking QR",
      "business contact QR",
    ],
    ogImage: page.ogImage,
  });

export default function QrCodeBusinessCardRoute() {
  return <LandingPage pageKey="qrCodeBusinessCard" />;
}

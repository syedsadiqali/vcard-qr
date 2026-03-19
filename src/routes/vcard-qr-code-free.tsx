import { LandingPage } from "@/components/LandingPage";
import { landingPages } from "@/lib/landing-pages";
import { buildCanonicalLinks, buildMeta } from "@/lib/seo";

const page = landingPages.vcardQrCodeFree;

export const links = () => buildCanonicalLinks(page.path);

export const meta = () =>
  buildMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [
      page.keyword,
      "free contact QR",
      "free QR generator",
      "vCard QR download",
    ],
    ogImage: page.ogImage,
  });

export default function VcardQrCodeFreeRoute() {
  return <LandingPage pageKey="vcardQrCodeFree" />;
}

import { LandingPage } from "@/components/LandingPage";
import { landingPages } from "@/lib/landing-pages";
import { buildCanonicalLinks, buildMeta } from "@/lib/seo";

const page = landingPages.qrCodeForContact;

export const links = () => buildCanonicalLinks(page.path);

export const meta = () =>
  buildMeta({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [page.keyword, "contact qr code", "save contact qr", "vCard QR"],
    ogImage: page.ogImage,
  });

export default function QrCodeForContactRoute() {
  return <LandingPage pageKey="qrCodeForContact" />;
}

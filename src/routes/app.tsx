import { buildCanonicalLinks, buildMeta } from "@/lib/seo";
import { GeneratorPage } from "@/pages/GeneratorPage";

export const links = () => buildCanonicalLinks("/vcard-qr-generator");

export const meta = () =>
  buildMeta({
    title: "vCard QR Generator",
    description:
      "Enter contact details and generate a live vCard QR code with instant preview and PNG download.",
    path: "/vcard-qr-generator",
    keywords: [
      "vcard qr generator",
      "live QR preview",
      "vCard builder",
      "contact QR download",
      "QR PNG",
    ],
  });

export default function AppRoute() {
  return <GeneratorPage />;
}

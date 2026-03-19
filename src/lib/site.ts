export const siteConfig = {
  name: "vCard QR Generator",
  defaultTitle: "Create and Download vCard QR Codes",
  defaultDescription:
    "Create scannable vCard QR codes that save contacts directly to phones. No landing page required.",
  siteUrl: (import.meta.env.VITE_SITE_URL ?? "https://example.com").replace(
    /\/$/,
    "",
  ),
  defaultOgImage: "/og/vcard-qr-generator-default.svg",
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.siteUrl}/`).toString();
}

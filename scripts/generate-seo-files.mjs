import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = (process.env.VITE_SITE_URL ?? "https://example.com").replace(
  /\/$/,
  "",
);

const pages = [
  "/",
  "/vcard-qr-generator",
  "/qr-code-for-contact",
  "/vcard-qr-code-free",
  "/qr-code-business-card",
  "/how-to-create-vcard-qr-code",
];

const publicDir = path.resolve("public");

await mkdir(publicDir, { recursive: true });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) =>
      `  <url>\n    <loc>${new URL(page, `${siteUrl}/`).toString()}</loc>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", `${siteUrl}/`).toString()}
`;

await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");

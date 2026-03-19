import { absoluteUrl, siteConfig } from "@/lib/site";
import type { LinksFunction, MetaDescriptor } from "react-router";

type SeoPage = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogImage?: string;
};

export function buildMeta(page: SeoPage): MetaDescriptor[] {
  const ogImage = absoluteUrl(page.ogImage ?? siteConfig.defaultOgImage);
  const fullTitle = `${page.title} | ${siteConfig.name}`;
  const canonicalUrl = absoluteUrl(page.path);

  return [
    { title: fullTitle },
    { name: "description", content: page.description },
    { name: "keywords", content: page.keywords.join(", ") },
    { name: "robots", content: "index,follow,max-image-preview:large" },
    { name: "author", content: siteConfig.name },
    { name: "theme-color", content: "#2563eb" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: page.description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: page.title },
    { property: "og:image:type", content: "image/svg+xml" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: ogImage },
  ];
}

export const buildCanonicalLinks = (
  path: string,
): ReturnType<LinksFunction> => [{ rel: "canonical", href: absoluteUrl(path) }];

export function stringifyStructuredData(data: Record<string, unknown>) {
  return JSON.stringify(data);
}

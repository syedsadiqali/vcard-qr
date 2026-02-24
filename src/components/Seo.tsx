import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  structuredData?: Record<string, unknown>;
};

function upsertMeta(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export function Seo({
  title,
  description,
  path,
  keywords,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const siteTitle = "Neon vCard QR Generator";
    document.title = `${title} | ${siteTitle}`;

    const canonicalUrl = new URL(path, window.location.origin).toString();

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      "index,follow,max-image-preview:large",
    );
    upsertMeta(
      'meta[name="keywords"]',
      "name",
      "keywords",
      keywords ?? "vCard QR, contact QR code, QR generator",
    );

    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      `${title} | ${siteTitle}`,
    );
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description,
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);

    upsertMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    upsertMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      `${title} | ${siteTitle}`,
    );
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description,
    );

    const structuredDataId = "seo-structured-data";
    const existingStructuredData = document.getElementById(structuredDataId);

    if (structuredData) {
      const scriptEl =
        existingStructuredData ?? document.createElement("script");
      scriptEl.setAttribute("id", structuredDataId);
      scriptEl.setAttribute("type", "application/ld+json");
      scriptEl.textContent = JSON.stringify(structuredData);
      if (!existingStructuredData) {
        document.head.appendChild(scriptEl);
      }
    } else if (existingStructuredData) {
      existingStructuredData.remove();
    }
  }, [description, keywords, path, structuredData, title]);

  return null;
}

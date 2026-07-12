import { useEffect } from "react";
import { profile } from "../content/profile";

interface PageMeta {
  title: string;
  description?: string;
  /** route path beginning with "/", used for canonical + og:url */
  path?: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Per-route document metadata. A tiny hand-rolled head manager — the
 * site is a static SPA, so this only needs to cover titles, descriptions,
 * canonical URLs, social cards and JSON-LD.
 */
export function usePageMeta({ title, description, path = "/", image, jsonLd }: PageMeta) {
  useEffect(() => {
    document.title = title;
    const desc = description ?? profile.metaDescription;
    const url = `${profile.siteUrl}${path === "/" ? "/" : path}`;
    const img = image ?? `${profile.siteUrl}/social/og-image.png`;

    upsertMeta("name", "description", desc);
    upsertCanonical(url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);

    const scriptId = "page-jsonld";
    document.getElementById(scriptId)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLd]);
}

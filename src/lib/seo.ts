// Site-wide SEO constants and helpers.
//
// This module is imported by `vite.config.ts` (to build the sitemap host and
// prerender pages) as well as by route components, so it must use **relative
// imports only** — the `#src`/`#ui` subpath aliases are not resolved by Vite's
// config loader.

import type { JSX } from "solid-js"

// TanStack's `<HeadContent>` renders `title` and `property` (Open Graph) meta
// entries, but Solid's `MetaHTMLAttributes` JSX type doesn't model them, so the
// builders below cast through this alias once instead of at every call site.
type Meta = JSX.MetaHTMLAttributes<HTMLMetaElement>

export const siteUrl = "https://adaptive-solid-ui.pages.dev"
export const siteName = "adaptive-solid-ui"
export const siteDescription =
  "A library of reusable, accessible UI components for Solid.js — built with TypeScript and Tailwind CSS. Browse live demos of buttons, inputs, tables, dialogs and more."

// Absolute URL of the social-share image. A raster JPG (not SVG/WebP) for
// maximum compatibility — some OG crawlers don't render SVG or WebP previews.
export const ogImage = `${siteUrl}/og-image.jpg`
export const ogImageWidth = 1200
export const ogImageHeight = 630

export type PageMetaInput = {
  /** Page title (already includes any suffix). */
  title: string
  description?: string
  /** Absolute or root-relative canonical path, e.g. `/input/DemoInputS`. */
  path?: string
}

/** Build a TanStack `head().meta` array with title + OG + Twitter tags. */
export function pageMeta(input: PageMetaInput): Meta[] {
  const description = input.description ?? siteDescription
  const url = input.path ? `${siteUrl}${input.path}` : siteUrl
  const metas = [
    { title: input.title },
    { name: "description", content: description },
    // Open Graph
    { property: "og:title", content: input.title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteName },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: String(ogImageWidth) },
    { property: "og:image:height", content: String(ogImageHeight) },
    { property: "og:image:alt", content: `${siteName} — accessible UI components for Solid.js` },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ]
  return metas as unknown as Meta[]
}

/** Canonical link object for a given root-relative path. */
export function canonicalLink(path = "/") {
  return { rel: "canonical", href: `${siteUrl}${path === "/" ? "" : path}` }
}

/** WebSite structured data for the homepage. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  }
}

/** SoftwareSourceCode structured data describing the component library. */
export function softwareSourceCodeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    codeRepository: "https://github.com/david1gp/solid-ui",
    programmingLanguage: "TypeScript",
    runtimePlatform: "Solid.js",
    license: "https://opensource.org/licenses/MIT",
  }
}

// Derives the list of prerender / sitemap pages from the demo source tree.
//
// The demo routes are served by a single splat route (`src/routes/$.tsx`) that
// resolves `/<category>` and `/<category>/<DemoName>` at runtime. Prerendering
// needs every concrete path up-front, so we scan `src/demos/**` — the same
// source of truth that `generateDemoList` uses — instead of importing the
// (aliased, lazy) demo component graph into Vite's config loader.
//
// Imported by `vite.config.ts`, so: relative imports + node builtins only.

import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const demosDir = join(here, "..", "demos")

// Catalog keys that differ from their source filenames (see demoList.ts).
const demoRouteNames: Record<string, string> = {
  "modules/DemoBottomMobileNavbar": "Bottom-Mobile-Navbar",
  "modules/DemoNavbarHeaderModern": "NavbarHeader-Modern",
}

function findDemoNames(dir: string): string[] {
  const names: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      names.push(...findDemoNames(join(dir, entry.name)))
    } else if (entry.name.startsWith("Demo") && /\.tsx?$/.test(entry.name)) {
      names.push(entry.name.replace(/\.tsx?$/, ""))
    }
  }
  return names
}

export type PrerenderPage = {
  path: string
  prerender: { enabled: true }
  sitemap: { changefreq: "weekly" | "monthly"; priority: number } | { exclude: true }
}

function page(path: string, priority: number, changefreq: "weekly" | "monthly"): PrerenderPage {
  return {
    path,
    prerender: { enabled: true },
    sitemap: { changefreq, priority },
  }
}

/** Every static path to prerender: `/`, each category, and each demo. */
export function getPrerenderPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = [page("/", 1, "weekly")]

  const categories = readdirSync(demosDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

  for (const category of categories) {
    pages.push(page(`/${category}`, 0.8, "weekly"))
    for (const name of findDemoNames(join(demosDir, category)).sort()) {
      const routeName = demoRouteNames[`${category}/${name}`] ?? name
      pages.push(page(`/${category}/${routeName}`, 0.6, "monthly"))
    }
  }

  // Emits out/client/404.html. Cloudflare Pages then answers unknown paths with
  // a real 404 instead of its SPA fallback (index.html with 200) — that fallback
  // was served for missing /assets/*.js chunks and, via the immutable
  // /assets/* cache header, got cached as "JS" for a year, breaking every demo.
  pages.push({ path: "/404", prerender: { enabled: true }, sitemap: { exclude: true } })

  return pages
}

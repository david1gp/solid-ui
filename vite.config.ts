import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { visualizer } from "rollup-plugin-visualizer"
import type { Plugin } from "vite"
import { defineConfig } from "vite"
import solid from "@solidjs/vite-plugin"
import { getPrerenderPages } from "./src/lib/prerenderPages.ts"
import { siteUrl } from "./src/lib/seo.ts"

const prerenderPages = getPrerenderPages()

function tailwindStandaloneCssStubPlugin(): Plugin {
  const standaloneCssPattern =
    /(?:^|[/\\])node_modules[/\\]tailwindcss[/\\](?:index|theme|preflight|utilities)\.css(?:\?.*)?$/

  return {
    name: "tailwind-standalone-css-stub",
    apply: "serve",
    enforce: "pre",
    load(id) {
      if (!standaloneCssPattern.test(id)) return
      return ""
    },
  }
}

export default defineConfig({
  server: {
    port: 3031,
    strictPort: true,
    watch: {
      ignored: ["**/.github/**", "**/data/**", "**/dist/**", "**/ops/**", "**/out/**", "**/docs/**", "**/test/**"],
    },
    allowedHosts: ["solid-ui.david-siewert.com"],
  },
  // Scan lazy demos up front so the first visit to one does not invalidate the
  // browser's optimized dependencies in the middle of hydration.
  optimizeDeps: {
    entries: ["src/router.tsx", "src/routes/*.tsx", "src/demos/**/*.tsx"],
  },
  plugins: [
    tanstackStart({
      srcDirectory: "src",
      router: {
        quoteStyle: "double",
        semicolons: false,
        routesDirectory: "routes",
      },
      // Phase 2: prerender every demo path to static HTML (SSG) and emit a
      // sitemap. Each concrete path is supplied via `pages` (derived from the
      // demo source tree) since the routes are served by a single splat route.
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: false,
      },
      pages: prerenderPages,
      sitemap: {
        host: siteUrl,
      },
    }),
    // @ts-ignore - solid plugin types
    solid({ ssr: true }),
    tailwindStandaloneCssStubPlugin(),
    tailwindcss(),
    visualizer({ filename: "dist/bundle-size.html", gzipSize: true }),
  ],
  envPrefix: "PUBLIC_",
  // `@adaptive-ds/utils` ships ESM with extension-less relative imports, which
  // Node's ESM loader rejects when the package is externalized in the prerender
  // server bundle. Bundling it through Vite (which resolves those imports) fixes
  // the prerender crash.
  ssr: {
    noExternal: ["@adaptive-ds/utils"],
  },
  build: {
    chunkSizeWarningLimit: 1050,
    outDir: "out",
    // Not "assets": browsers cached Cloudflare's old SPA-fallback HTML under
    // /assets/*.js as immutable for a year. Unchanged chunks keep their hash, so
    // a new directory is the only way to give every chunk a never-cached URL.
    assetsDir: "bundle",
    emptyOutDir: true,
  },
})

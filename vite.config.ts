import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import { getPrerenderPages } from "./src/lib/prerenderPages"
import { siteUrl } from "./src/lib/seo"

const prerenderPages = getPrerenderPages()

export default defineConfig({
  server: {
    port: 3031,
    strictPort: true,
    watch: {
      ignored: ["**/.github/**", "**/data/**", "**/dist/**", "**/ops/**", "**/out/**", "**/docs/**", "**/test/**"],
    },
    allowedHosts: ["solid-ui.com"],
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
    assetsDir: "assets",
    emptyOutDir: true,
  },
})

import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router"
import { Suspense } from "solid-js"
import { HydrationScript } from "solid-js/web"
import { DemosNotFound } from "#src/app/demos/DemoViews.jsx"
import { pageMeta, siteName, softwareSourceCodeJsonLd, websiteJsonLd } from "#src/lib/seo.js"
import "../tailwind.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#0f172a" },
      ...pageMeta({ title: siteName, path: "/" }),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareSourceCodeJsonLd()),
      },
    ],
  }),
  component: () => <Outlet />,
  shellComponent: RootDocument,
  notFoundComponent: DemosNotFound,
})

// Prerender/prefetch same-origin documents the user is likely to visit next.
const speculationRules = JSON.stringify({
  prerender: [{ where: { href_matches: "/*" }, eagerness: "moderate" }],
})

// Set the theme class before first paint to avoid a flash of the wrong theme.
const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||((t==='os'||!t)&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();`

// After a redeploy, an open tab still references old hashed chunks. Cloudflare Pages answers those
// with index.html (200, text/html), so lazy demo imports fail and the demo stays blank.
// Vite emits `vite:preloadError` then; reload once (guarded per minute) to pick up the new build.
const chunkReloadScript = `window.addEventListener('vite:preloadError',function(e){try{var k='chunk-reload',l=+sessionStorage.getItem(k)||0;if(Date.now()-l<60000)return;sessionStorage.setItem(k,String(Date.now()));e.preventDefault();location.reload()}catch(_){}});`

function RootDocument(props: { children: any }) {
  return (
    <html lang="en">
      <head>
        <script innerHTML={themeBootScript} />
        <script innerHTML={chunkReloadScript} />
        <script type="speculationrules" innerHTML={speculationRules} />
        <HydrationScript />
        <HeadContent />
      </head>
      <body class="min-h-dvh w-full font-sans antialiased text-foreground bg-background">
        <div class="flex flex-col min-h-dvh w-full">
          <Suspense>{props.children}</Suspense>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

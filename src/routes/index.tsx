import { DemosOverview } from "#src/app/demos/DemoViews.jsx"
import { canonicalLink, pageMeta, siteDescription, siteName } from "#src/lib/seo.js"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({
      title: `${siteName} — Solid.js component demos`,
      description: siteDescription,
      path: "/",
    }),
    links: [canonicalLink("/")],
  }),
  component: DemosOverview,
})

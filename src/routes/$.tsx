import { DemoComponent, DemosCategory, DemosNotFound, demoExists } from "#src/app/demos/DemoViews.jsx"
import { canonicalLink, pageMeta, siteName } from "#src/lib/seo.js"
import { createFileRoute } from "@tanstack/solid-router"
import { Match, Switch } from "solid-js"

export const Route = createFileRoute("/$")({
  head: ({ params }) => {
    const segments = (params._splat ?? "").split("/").filter(Boolean)
    const [category, compName] = segments
    const path = `/${segments.join("/")}`
    const title = compName
      ? `${compName} — ${category} | ${siteName}`
      : category
        ? `${category} components | ${siteName}`
        : siteName
    const description = compName
      ? `Live ${compName} demo from the ${category} category of ${siteName}, a Solid.js + Tailwind CSS component library.`
      : `${category} components in ${siteName} — a Solid.js + Tailwind CSS UI library. Browse the live demos.`
    return {
      meta: pageMeta({ title, description, path }),
      links: [canonicalLink(path)],
    }
  },
  component: SplatPage,
})

function SplatPage() {
  const params = Route.useParams()
  const segments = () => (params()._splat ?? "").split("/").filter(Boolean)
  const category = () => segments()[0] ?? ""
  const compName = () => segments()[1]

  return (
    <Switch fallback={<DemosNotFound />}>
      <Match when={segments().length === 2 && demoExists(category(), compName())}>
        <DemoComponent category={category()} compName={compName() as string} />
      </Match>
      <Match when={segments().length === 1 && demoExists(category())}>
        <DemosCategory category={category()} />
      </Match>
    </Switch>
  )
}

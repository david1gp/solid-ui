import { mdiBrain } from "@adaptive-ds/mdi/mdiBrain.js"
import { mdiCodeTags } from "@adaptive-ds/mdi/mdiCodeTags.js"
import { mdiPencilRuler } from "@adaptive-ds/mdi/mdiPencilRuler.js"
import { mdiRocketLaunch } from "@adaptive-ds/mdi/mdiRocketLaunch.js"
import { mdiTestTube } from "@adaptive-ds/mdi/mdiTestTube.js"
import type { JSXElement } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { Timeline } from "#ui/static/timeline/Timeline.jsx"

export function DemoTimeline() {
  const items: {
    title: JSXElement
    description?: JSXElement
    bullet?: JSXElement
  }[] = [
    {
      title: "Planning",
      description: "Define project goals and scope",
      bullet: <Icon path={mdiBrain} class="h-4 w-4" />,
    },
    {
      title: "Design",
      description: "Create wireframes and mockups",
      bullet: <Icon path={mdiPencilRuler} class="h-4 w-4" />,
    },
    {
      title: "Development",
      description: "Implement features and functionality",
      bullet: <Icon path={mdiCodeTags} class="h-4 w-4" />,
    },
    {
      title: "Testing",
      description: "Ensure quality and fix issues",
      bullet: <Icon path={mdiTestTube} class="h-4 w-4" />,
    },
    {
      title: "Deployment",
      description: "Launch the product",
      bullet: <Icon path={mdiRocketLaunch} class="h-4 w-4" />,
    },
  ]

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold">Timeline Demo</h1>
        <p class="text-muted-foreground">A vertical timeline component with active states.</p>
      </div>
      <Timeline items={items} activeItem={2} bulletSize={20} lineSize={3} />
    </div>
  )
}

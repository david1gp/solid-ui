import { mdiCheckCircle } from "@mdi/js"
import { LongContent } from "#src/demos/interactive/LongContent.jsx"
import { DetailsDialog } from "#ui/interactive/dialog/DetailsDialog.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"

export function DemoDetailsDialog() {
  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">DetailsDialog Demo</h1>
      <p class="mb-6 max-w-2xl text-muted-foreground">
        The body is server-rendered inside a native <code>&lt;details&gt;</code>, so crawlers index it and users without
        JS expand it inline. Once JS mounts, the disclosure is swapped for a Corvu modal opened by the same trigger.
        (This demo harness renders demos client-only, so you always see the JS/modal path here — the no-JS inline
        fallback is what ships in the static HTML.)
      </p>
      <div class="grid gap-4 max-w-2xl">
        <SimpleDemo />
        <LongContentDemo />
      </div>
    </div>
  )
}

function SimpleDemo() {
  return (
    <div>
      <h2 class="text-xl font-semibold mb-3">Simple</h2>
      <DetailsDialog
        title="What's included"
        content={() => (
          <div class="space-y-3">
            <p>A short summary that expands into a few supporting details.</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <Icon path={mdiCheckCircle} class="size-5 mt-0.5 text-green-600 shrink-0" />
                <span>Server-rendered so the content is indexable.</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon path={mdiCheckCircle} class="size-5 mt-0.5 text-green-600 shrink-0" />
                <span>Opens as a modal once JavaScript loads.</span>
              </li>
            </ul>
          </div>
        )}
      />
    </div>
  )
}

function LongContentDemo() {
  return (
    <div>
      <h2 class="text-xl font-semibold mb-3">Long content (scrolls in the modal)</h2>
      <DetailsDialog title="Terms and Conditions" content={() => <LongContent />} />
    </div>
  )
}

import { mdiCheckCircle, mdiFlask } from "@mdi/js"
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
        <RichSummaryDemo />
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
        title="Direct bioavailability"
        content={() => (
          <div class="space-y-3">
            <p>The infusion bypasses the gut and makes micronutrients available immediately.</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <Icon path={mdiCheckCircle} class="size-5 mt-0.5 text-green-600 shrink-0" />
                <span>Useful when gut absorption is impaired.</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon path={mdiCheckCircle} class="size-5 mt-0.5 text-green-600 shrink-0" />
                <span>Helpful when the body needs fast support.</span>
              </li>
            </ul>
          </div>
        )}
      />
    </div>
  )
}

function RichSummaryDemo() {
  return (
    <div>
      <h2 class="text-xl font-semibold mb-3">Custom summary face</h2>
      <DetailsDialog
        title="NAD+ Infusion"
        summaryEl={() => (
          <div class="flex items-center gap-3">
            <Icon path={mdiFlask} class="size-6 text-blue-600" />
            <span>
              <span class="block font-semibold">NAD+ Infusion</span>
              <span class="block text-sm text-muted-foreground">Cellular energy &amp; longevity support</span>
            </span>
          </div>
        )}
        content={() => (
          <dl class="grid gap-2">
            <div>
              <dt class="font-semibold inline">Protocol: </dt>
              <dd class="inline">250–500 mg over 2–3 hours.</dd>
            </div>
            <div>
              <dt class="font-semibold inline">Ideal for: </dt>
              <dd class="inline">Fatigue, regeneration, anti-aging programs.</dd>
            </div>
            <div>
              <dt class="font-semibold inline">Duration: </dt>
              <dd class="inline">2–3 hours per session.</dd>
            </div>
          </dl>
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

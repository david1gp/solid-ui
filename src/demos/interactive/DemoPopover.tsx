import { mdiDotsVertical } from "@adaptive-ds/mdi/mdiDotsVertical.js"
import { LongContent } from "#src/demos/interactive/LongContent.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { CorvuPopover } from "#ui/interactive/popover/CorvuPopover.jsx"
import { CorvuPopoverIcon } from "#ui/interactive/popover/CorvuPopoverIcon.jsx"

export function DemoPopover() {
  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Popover Demo</h1>
      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-bold mb-4">Basic Popover</h2>
          <BasicPopover />
        </section>
        <section>
          <h2 class="text-2xl font-bold mb-4">Icon Popover</h2>
          <CorvuPopoverIcon icon={mdiDotsVertical} variant={buttonVariant.outline} title="Open popover">
            <Content />
          </CorvuPopoverIcon>
        </section>
        <section>
          <h2 class="text-2xl font-bold mb-4">Long Content</h2>
          <CorvuPopover
            icon={mdiDotsVertical}
            variant={buttonVariant.outline}
            buttonChildren="Open"
            innerClass="max-w-[calc(100vw-2rem)]"
          >
            <div class="max-h-[min(24rem,calc(100vh-4rem))] overflow-y-auto">
              <LongContent />
            </div>
          </CorvuPopover>
        </section>
        <section>
          <h2 class="text-2xl font-bold mb-4">Alignment</h2>
          <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col items-start gap-2">
              <span class="text-sm text-muted-foreground">Start</span>
              <BasicPopover />
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="text-sm text-muted-foreground">Center</span>
              <BasicPopover />
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="text-sm text-muted-foreground">End</span>
              <BasicPopover />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function BasicPopover() {
  return (
    <CorvuPopover icon={mdiDotsVertical} variant={buttonVariant.outline} buttonChildren="Open">
      <Content />
    </CorvuPopover>
  )
}

function Content() {
  return (
    <div class="p-4 min-w-48">
      <p class="text-sm">This is a simple popover content.</p>
      <p class="text-sm mt-2">It appears when you click the button.</p>
    </div>
  )
}

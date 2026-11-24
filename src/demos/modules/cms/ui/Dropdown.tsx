import type { JSX } from "@solidjs/web"
import { CorvuPopover } from "#ui/interactive/popover/CorvuPopover.jsx"

/** Anchored menu container. Consumers provide buttons or links as children. */
export function Dropdown(p: {
  trigger: JSX.Element
  children: JSX.Element
  label?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <CorvuPopover
      buttonChildren={p.trigger}
      aria-label={p.label}
      open={p.open}
      onOpenChange={p.onOpenChange}
      innerClass="min-w-48 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div class="flex flex-col gap-1 text-sm">{p.children}</div>
    </CorvuPopover>
  )
}

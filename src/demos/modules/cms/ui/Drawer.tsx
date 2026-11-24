import type { JSX } from "@solidjs/web"
import { CorvuDialog } from "#ui/interactive/dialog/CorvuDialog.jsx"

/** Controlled right-hand drawer. Open it with an external button. */
export function Drawer(p: {
  title: string
  description?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: JSX.Element
}) {
  return (
    <CorvuDialog
      title={p.title}
      description={p.description}
      open={p.open}
      onOpenChange={p.onOpenChange}
      class="hidden"
      innerClass="inset-y-0 right-0 left-auto top-0 h-dvh max-h-none w-full max-w-md translate-x-0 translate-y-0 rounded-none border-y-0 border-r-0"
    >
      {p.children}
    </CorvuDialog>
  )
}

import { CorvuDialog } from "#ui/interactive/dialog/CorvuDialog.jsx"

/** Controlled confirmation dialog. The caller owns the action and open state. */
export function ConfirmDialog(p: {
  title: string
  description?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  confirmLabel: string
  cancelLabel: string
  destructive?: boolean
}) {
  return (
    <CorvuDialog
      title={p.title}
      description={p.description}
      open={p.open}
      onOpenChange={p.onOpenChange}
      class="hidden"
      innerClass="w-[calc(100%-2rem)] max-w-md rounded-2xl"
    >
      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          class="rounded-xl border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
          onClick={() => p.onOpenChange(false)}
        >
          {p.cancelLabel}
        </button>
        <button
          type="button"
          class={
            p.destructive
              ? "rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              : "rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
          }
          onClick={() => {
            p.onConfirm()
            p.onOpenChange(false)
          }}
        >
          {p.confirmLabel}
        </button>
      </div>
    </CorvuDialog>
  )
}

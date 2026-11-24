import { CorvuDialog } from "#ui/interactive/dialog/CorvuDialog.jsx"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { CmsMediaLibrary } from "./CmsMediaLibrary.js"
import type { CmsMediaItem } from "./cmsMediaStore.js"
import { cmsMediaText } from "./cmsMediaText.js"

/** Controlled picker. onSelect receives the current item, then the dialog closes. */
export function CmsMediaPickerDialog(p: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (item: CmsMediaItem) => void
}) {
  return (
    <CorvuDialog
      title={cmsMediaText[cmsLocale.get()].picker}
      open={p.open}
      onOpenChange={p.onOpenChange}
      class="hidden"
      innerClass="w-[calc(100%-2rem)] max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="mt-4">
        <CmsMediaLibrary
          onSelect={(item) => {
            p.onSelect(item)
            p.onOpenChange(false)
          }}
        />
      </div>
    </CorvuDialog>
  )
}

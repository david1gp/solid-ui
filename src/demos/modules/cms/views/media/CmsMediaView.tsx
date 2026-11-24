import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsButtonClass } from "../../ui/cmsButtonClass.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { CmsMediaLibrary } from "./CmsMediaLibrary.js"
import { CmsMediaPickerDialog } from "./CmsMediaPickerDialog.js"
import { cmsMediaText } from "./cmsMediaText.js"
import { cmsMediaViewStateCreate } from "./cmsMediaViewStateCreate.js"

export function CmsMediaView(_props: { id?: string }) {
  const state = cmsMediaViewStateCreate()
  return (
    <div>
      <PageHeader
        title={cmsMediaText[cmsLocale.get()].title}
        description={cmsMediaText[cmsLocale.get()].description}
        actions={
          <button type="button" class={cmsButtonClass} onClick={state.openPicker}>
            {cmsMediaText[cmsLocale.get()].picker}
          </button>
        }
      />
      {state.selected() && <p class="mb-4 text-sm">{state.selected()?.name}</p>}
      <CmsMediaPickerDialog open={state.open()} onOpenChange={state.setOpen} onSelect={state.select} />
      <CmsMediaLibrary />
    </div>
  )
}

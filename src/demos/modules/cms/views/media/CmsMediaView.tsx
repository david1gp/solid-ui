import { cmsLocale } from "../../i18n/cmsLocale.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { CmsMediaLibrary } from "./CmsMediaLibrary.js"
import { cmsMediaText } from "./cmsMediaText.js"

export function CmsMediaView(_props: { id?: string }) {
  return (
    <div>
      <PageHeader title={cmsMediaText[cmsLocale.get()].title} description={cmsMediaText[cmsLocale.get()].description} />
      <CmsMediaLibrary />
    </div>
  )
}

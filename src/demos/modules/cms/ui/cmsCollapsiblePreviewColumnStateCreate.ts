import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { createUniqueId } from "solid-js"

export function cmsCollapsiblePreviewColumnStateCreate() {
  const collapsed = createSignalObject(false)
  const contentId = createUniqueId()
  return {
    collapsed: () => collapsed.get(),
    toggle: () => collapsed.set(!collapsed.get()),
    contentId,
  }
}

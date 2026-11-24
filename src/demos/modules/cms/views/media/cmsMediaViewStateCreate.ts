import { createSignal } from "solid-js"
import type { CmsMediaItem } from "./cmsMediaStore.js"

export function cmsMediaViewStateCreate() {
  const [open, setOpen] = createSignal(false)
  const [selected, setSelected] = createSignal<CmsMediaItem>()
  return { open, selected, openPicker: () => setOpen(true), setOpen, select: setSelected }
}

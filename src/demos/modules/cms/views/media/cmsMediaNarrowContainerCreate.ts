import { onCleanup } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

// Below this width, folders and details leave less than about 550px for the grid.
const narrowWidth = 1100

export function cmsMediaNarrowContainerCreate() {
  const narrow = createSignalObject(false)
  let observer: ResizeObserver | undefined
  onCleanup(() => observer?.disconnect())
  const observe = (element: HTMLElement) => {
    if (typeof ResizeObserver === "undefined") return
    narrow.set(element.getBoundingClientRect().width < narrowWidth)
    observer?.disconnect()
    observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) narrow.set(entry.contentRect.width < narrowWidth)
    })
    observer.observe(element)
  }
  return { narrow: narrow.get, observe }
}

import { onSettled } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function cmsMediaSmallViewportCreate() {
  const small = createSignalObject(false)
  onSettled(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return
    const query = window.matchMedia("not all and (min-width: 1024px)")
    const update = () => small.set(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  })
  return small.get
}

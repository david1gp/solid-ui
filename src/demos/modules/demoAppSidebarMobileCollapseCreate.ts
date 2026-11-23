import { createEffect, onSettled, untrack } from "solid-js"
import { createSignalObject, type SignalObject } from "#ui/utils/createSignalObject.js"

/** Keep the mobile settings panel usable without overriding a manually collapsed sidebar. */
export function demoAppSidebarMobileCollapseCreate(settingsOpen: SignalObject<boolean>): SignalObject<boolean> {
  const collapsed = createSignalObject(false)
  const mobile = createSignalObject(false)
  let automaticallyCollapsed = false

  onSettled(() => {
    if (typeof window.matchMedia !== "function") return
    const query = window.matchMedia("(max-width: 546px)")
    const update = () => mobile.set(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  })

  createEffect(
    () => settingsOpen.get() && mobile.get(),
    (shouldCollapse) => {
      if (shouldCollapse) {
        if (!untrack(collapsed.get)) {
          automaticallyCollapsed = true
          collapsed.set(true)
        }
        return
      }
      if (automaticallyCollapsed) {
        automaticallyCollapsed = false
        collapsed.set(false)
      }
    },
  )

  return {
    get: collapsed.get,
    set: (value) => {
      automaticallyCollapsed = false
      collapsed.set(value)
    },
  }
}

import { createEffect, onSettled, untrack } from "solid-js"
import { createSignalObject, type SignalObject } from "#ui/utils/createSignalObject.js"

/** Keep the mobile settings panel usable without overriding a manually collapsed sidebar. */
export function demoCmsMobileCollapseCreate(settingsOpen: SignalObject<boolean>) {
  const collapsed = createSignalObject(false)
  const mobile = createSignalObject(false)
  let automaticallyCollapsed = false
  let desktopCollapsed = false
  let initialized = false

  onSettled(() => {
    if (typeof window.matchMedia !== "function") return
    const query = window.matchMedia("(max-width: 768px)")
    const update = () => {
      if (initialized && query.matches === untrack(mobile.get)) return
      if (query.matches) {
        desktopCollapsed = untrack(collapsed.get)
        automaticallyCollapsed = false
        settingsOpen.set(false)
        mobile.set(true)
        collapsed.set(true)
      } else {
        automaticallyCollapsed = false
        settingsOpen.set(false)
        mobile.set(false)
        if (initialized) collapsed.set(desktopCollapsed)
      }
      initialized = true
    }
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
    collapsed: {
      get: collapsed.get,
      set: (value: boolean) => {
        automaticallyCollapsed = false
        if (!value && mobile.get() && settingsOpen.get()) settingsOpen.set(false)
        collapsed.set(value)
      },
    },
  }
}

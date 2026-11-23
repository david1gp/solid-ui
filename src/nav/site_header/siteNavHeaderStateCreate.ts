import { createUniqueId, onSettled } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function siteNavHeaderStateCreate() {
  const mobileOpen = createSignalObject(false)
  const mobileTrigger = createSignalObject<HTMLButtonElement | undefined>(undefined)
  const panelId = `site-nav-header-panel-${createUniqueId()}`

  function closeMobile() {
    mobileOpen.set(false)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape" || !mobileOpen.get()) return
    closeMobile()
    mobileTrigger.get()?.focus()
  }

  onSettled(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  })

  return {
    mobileOpen: mobileOpen.get,
    setMobileTrigger: (element: HTMLButtonElement) => mobileTrigger.set(element),
    toggleMobile: () => mobileOpen.set(!mobileOpen.get()),
    closeMobile,
    panelId,
  }
}

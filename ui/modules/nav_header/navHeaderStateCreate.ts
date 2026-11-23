import { children, createMemo, createUniqueId, type Element as JSXElement, onSettled } from "solid-js"
import { createFlyoutState } from "#ui/modules/app_sidebar/createFlyoutState.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function navHeaderStateCreate(userMenu: () => JSXElement) {
  const mobileOpen = createSignalObject(false)
  const accountTrigger = createSignalObject<HTMLElement | undefined>(undefined)
  const mobileTrigger = createSignalObject<HTMLButtonElement | undefined>(undefined)
  const resolvedUserMenu = children(userMenu)
  const menu = createMemo(() => {
    resolvedUserMenu()
    return createFlyoutState()
  })
  const panelId = `nav-header-panel-${createUniqueId()}`

  function closeMobile() {
    mobileOpen.set(false)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== "Escape" || !mobileOpen.get() || menu().open()) return
    closeMobile()
    mobileTrigger.get()?.focus()
  }

  onSettled(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  })

  return { mobileOpen, accountTrigger, mobileTrigger, menu, resolvedUserMenu, panelId, closeMobile }
}

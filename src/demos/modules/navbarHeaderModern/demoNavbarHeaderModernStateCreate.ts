import { onCleanup, onSettled } from "solid-js"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function demoNavbarHeaderModernStateCreate() {
  onSettled(themeInit)
  const active = createSignalObject("Willkommen")
  const loggedIn = createSignalObject(true)
  const items = () =>
    ["Produkte", "Preise", "Blog", "Kontakt"].map((label) => ({
      label,
      href: `#${label.toLowerCase()}`,
      isActive: active.get() === label,
      onClick: () => active.set(label),
    }))
  let logoElement: HTMLDivElement | undefined
  const onLogoClick = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    active.set("Willkommen")
    history.replaceState(history.state, "", location.pathname + location.search)
  }
  function attachLogo(element: HTMLDivElement) {
    logoElement = element
    element.addEventListener("click", onLogoClick, true)
  }
  onCleanup(() => logoElement?.removeEventListener("click", onLogoClick, true))
  return {
    loggedIn: loggedIn.get,
    items,
    attachLogo,
    login: () => loggedIn.set(true),
    logout: () => loggedIn.set(false),
  }
}

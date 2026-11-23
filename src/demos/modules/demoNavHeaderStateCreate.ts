import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiPaletteOutline } from "@adaptive-ds/mdi/mdiPaletteOutline.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { onCleanup, onSettled } from "solid-js"
import { themeInit, themeSet, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeVariant } from "#ui/interactive/theme/themeVariant.js"
import type { AppSidebarUserMenuSection } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function demoNavHeaderStateCreate() {
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
  const sections: AppSidebarUserMenuSection[] = [
    {
      label: "Darstellung",
      icon: mdiPaletteOutline,
      options: (
        [
          { icon: mdiWhiteBalanceSunny, label: "Hell", preview: "light", theme: themeVariant.light },
          { icon: mdiWeatherNight, label: "Dunkel", preview: "dark", theme: themeVariant.dark },
          { icon: mdiBrightnessAuto, label: "System", preview: "system", theme: themeVariant.os },
        ] as const
      ).map(({ theme, ...option }) => ({
        ...option,
        get selected() {
          return themeSignal.get() === theme
        },
        onClick: () => themeSet(theme, true),
      })),
    },
  ]
  return {
    active: active.get,
    loggedIn: loggedIn.get,
    items,
    sections,
    attachLogo,
    login: () => loggedIn.set(true),
    logout: () => loggedIn.set(false),
    toggleLogin: () => loggedIn.set(!loggedIn.get()),
  }
}

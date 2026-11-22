import { onSettled } from "solid-js"
import { themeInit, themeSet, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeVariant } from "#ui/interactive/theme/themeVariant.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function floatingThemeStateCreate() {
  const osDark = createSignalObject(false)
  onSettled(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => osDark.set(media.matches)
    update()
    media.addEventListener("change", update)
    themeInit()
    return () => media.removeEventListener("change", update)
  })
  const isDark = () =>
    themeSignal.get() === themeVariant.dark || (themeSignal.get() === themeVariant.os && osDark.get())
  const target = () => (isDark() ? themeVariant.light : themeVariant.dark)
  return {
    isDark,
    label: () => (isDark() ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"),
    toggle: () => themeSet(target(), true),
  }
}

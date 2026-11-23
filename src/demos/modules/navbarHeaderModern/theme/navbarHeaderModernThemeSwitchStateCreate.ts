import { onSettled } from "solid-js"
import { themeInit, themeSet, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeVariant } from "#ui/interactive/theme/themeVariant.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

/** Resolved light/dark state (System follows the OS) and a toggle that stores an explicit theme. */
export function navbarHeaderModernThemeSwitchStateCreate() {
  const osDark = createSignalObject(false)
  // SSR can't know the stored theme; render the thumb only once it is resolved to avoid a jump.
  const ready = createSignalObject(false)
  onSettled(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => osDark.set(media.matches)
    update()
    media.addEventListener("change", update)
    themeInit()
    ready.set(true)
    return () => media.removeEventListener("change", update)
  })
  const isDark = () =>
    themeSignal.get() === themeVariant.dark || (themeSignal.get() === themeVariant.os && osDark.get())
  return {
    ready: ready.get,
    isDark,
    toggle: () => themeSet(isDark() ? themeVariant.light : themeVariant.dark, true),
  }
}

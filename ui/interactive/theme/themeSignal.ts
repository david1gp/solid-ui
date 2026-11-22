import { isServer } from "@solidjs/web"
import * as v from "valibot"
import {
  getThemeFromStorageOrBrowserPref,
  nextTheme2,
  setThemeToBrowser,
  type ThemeVariant,
  themeLocalStorageKey,
  themeSchema,
  themeVariant,
} from "#ui/interactive/theme/themeVariant.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export const themeSignal = createSignalObject<ThemeVariant>(themeVariant.os)

let themeListenersRegistered = false

export function themeInit() {
  if (isServer) return // Skip during SSR
  const theme = getThemeFromStorageOrBrowserPref()
  themeSet(theme, false)
  if (themeListenersRegistered) return
  themeListenersRegistered = true
  themeRegisterStorageListener()
  themeRegisterOsListener()
}

/** Re-apply the OS preference when it changes while the "os" (System) theme is active. */
function themeRegisterOsListener() {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  media.addEventListener("change", () => {
    if (themeSignal.get() === themeVariant.os) setThemeToBrowser(themeVariant.os)
  })
}

export function themeSet(theme: ThemeVariant, saveToStorage: boolean) {
  themeSignal.set(theme)
  setThemeToBrowser(theme)
  if (!saveToStorage) return
  localStorage.setItem(themeLocalStorageKey, theme)
}

function themeRegisterStorageListener() {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== themeLocalStorageKey) return
    const themeString = e.newValue
    const result = v.safeParse(themeSchema, themeString)
    if (!result.success) {
      console.log("failed to parse storage event")
      return
    }
    themeSet(result.output, false)
  }
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener("storage", onStorage)
  }
}

export function themeRotate() {
  const currentTheme = themeSignal.get()
  const newTheme = nextTheme2(currentTheme)
  themeSet(newTheme, true)
}

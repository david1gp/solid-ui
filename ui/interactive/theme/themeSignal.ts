import {
  getThemeFromStorageOrBrowserPref,
  nextTheme2,
  setThemeToBrowser,
  themeLocalStorageKey,
  themeSchema,
  type ThemeVariant,
  themeVariant,
} from "#ui/interactive/theme/themeVariant.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { isServer } from "solid-js/web"
import * as v from "valibot"

export const themeSignal = createSignalObject<ThemeVariant>(themeVariant.light)

export function themeInit() {
  if (isServer) return // Skip during SSR
  const theme = getThemeFromStorageOrBrowserPref()
  themeSet(theme, false)
  themeRegisterStorageListener()
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

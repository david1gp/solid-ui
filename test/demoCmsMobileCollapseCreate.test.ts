import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { demoCmsMobileCollapseCreate } from "../src/demos/modules/demoCmsMobileCollapseCreate.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

test("mobile settings restores only a sidebar collapsed automatically", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  const media = { matches: true, addEventListener: () => {}, removeEventListener: () => {} }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { collapsed, settings, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { settings, ...demoCmsMobileCollapseCreate(settings), dispose }
  })
  try {
    flush()
    settings.set(true)
    flush()
    expect(collapsed.get()).toBe(true)
    settings.set(false)
    flush()
    expect(collapsed.get()).toBe(false)
    collapsed.set(true)
    settings.set(true)
    flush()
    settings.set(false)
    flush()
    expect(collapsed.get()).toBe(true)
    collapsed.set(false)
    settings.set(true)
    flush()
    collapsed.set(false)
    flush()
    expect(collapsed.get()).toBe(false)
    expect(settings.get()).toBe(false)
    collapsed.set(true)
    settings.set(false)
    flush()
    expect(collapsed.get()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
  }
})

test("expanding the sidebar on desktop leaves settings open", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  const media = { matches: false, addEventListener: () => {}, removeEventListener: () => {} }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { collapsed, settings, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { settings, ...demoCmsMobileCollapseCreate(settings), dispose }
  })
  try {
    flush()
    collapsed.set(true)
    settings.set(true)
    flush()
    collapsed.set(false)
    flush()
    expect(collapsed.get()).toBe(false)
    expect(settings.get()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
  }
})

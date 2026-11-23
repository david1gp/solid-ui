import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { demoAppSidebarMobileCollapseCreate } from "../src/demos/modules/demoAppSidebarMobileCollapseCreate.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

test("mobile settings restores only a sidebar collapsed automatically", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  const media = { matches: true, addEventListener: () => {}, removeEventListener: () => {} }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { automaticMotion, collapsed, settings, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { settings, ...demoAppSidebarMobileCollapseCreate(settings), dispose }
  })
  try {
    flush()
    settings.set(true)
    flush()
    expect(collapsed.get()).toBe(true)
    expect(automaticMotion()).toBe(true)
    settings.set(false)
    flush()
    expect(collapsed.get()).toBe(false)
    expect(automaticMotion()).toBe(true)
    collapsed.set(true)
    settings.set(true)
    flush()
    settings.set(false)
    flush()
    expect(collapsed.get()).toBe(true)
    expect(automaticMotion()).toBe(false)
    collapsed.set(false)
    settings.set(true)
    flush()
    collapsed.set(false)
    flush()
    expect(collapsed.get()).toBe(false)
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

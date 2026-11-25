import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { cmsMediaSmallViewportCreate } from "../src/demos/modules/cms/views/media/cmsMediaSmallViewportCreate.js"

test("tracks breakpoint changes and removes its listener on disposal", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  let change = () => {}
  let removed = false
  const media = {
    matches: true,
    addEventListener: (_event: string, listener: () => void) => {
      change = listener
    },
    removeEventListener: (_event: string, listener: () => void) => {
      removed = listener === change
    },
  }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { small, dispose } = createRoot((dispose) => ({ small: cmsMediaSmallViewportCreate(), dispose }))
  try {
    flush()
    expect(small()).toBe(true)
    media.matches = false
    change()
    flush()
    expect(small()).toBe(false)
    media.matches = true
    change()
    flush()
    expect(small()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
  }
  expect(removed).toBe(true)
})

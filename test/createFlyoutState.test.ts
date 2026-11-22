import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { createFlyoutState } from "#ui/modules/app_sidebar/createFlyoutState.js"

test("a same-tick close wins and the sidebar flyout can reopen", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { matchMedia: () => ({ matches: true }) },
  })
  const { flyout, dispose } = createRoot((dispose) => ({ flyout: createFlyoutState(), dispose }))
  try {
    flyout.setOpen(true)
    flyout.setOpen(false)
    flush()
    expect(flyout.open()).toBe(false)
    flyout.setOpen(true)
    flush()
    expect(flyout.open()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
  }
})

import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { demoCmsMobileCollapseCreate } from "../src/demos/modules/cms/demoCmsMobileCollapseCreate.js"

test("mobile starts collapsed and settings restores only a sidebar collapsed automatically", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  const media = { matches: true, addEventListener: () => {}, removeEventListener: () => {} }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { collapsed, settings, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { settings, ...demoCmsMobileCollapseCreate(settings), dispose }
  })
  try {
    flush()
    expect(collapsed.get()).toBe(true)
    collapsed.set(false)
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

test("initial mobile collapse paints before sidebar motion is enabled", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  const originalFrame = Object.getOwnPropertyDescriptor(globalThis, "requestAnimationFrame")
  let nextFrame: FrameRequestCallback = () => {}
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { matchMedia: () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }) },
  })
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    configurable: true,
    value: (callback: FrameRequestCallback) => {
      nextFrame = callback
      return 1
    },
  })
  const { collapsed, motionReady, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { ...demoCmsMobileCollapseCreate(settings), dispose }
  })
  try {
    flush()
    expect(collapsed.get()).toBe(true)
    expect(motionReady()).toBe(false)
    nextFrame(0)
    expect(motionReady()).toBe(false)
    nextFrame(0)
    flush()
    expect(motionReady()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
    if (originalFrame) Object.defineProperty(globalThis, "requestAnimationFrame", originalFrame)
    else Reflect.deleteProperty(globalThis, "requestAnimationFrame")
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

test("breakpoint crossings collapse mobile and restore the desktop preference without leaving settings open", () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
  let change = () => {}
  const media = {
    matches: false,
    addEventListener: (_event: string, listener: () => void) => {
      change = listener
    },
    removeEventListener: () => {},
  }
  Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => media } })
  const { collapsed, settings, dispose } = createRoot((dispose) => {
    const settings = createSignalObject(false)
    return { settings, ...demoCmsMobileCollapseCreate(settings), dispose }
  })
  const resize = (mobile: boolean) => {
    media.matches = mobile
    change()
    flush()
  }
  try {
    flush()
    settings.set(true)
    resize(true)
    expect(collapsed.get()).toBe(true)
    expect(settings.get()).toBe(false)
    collapsed.set(false)
    resize(false)
    expect(collapsed.get()).toBe(false)
    collapsed.set(true)
    flush()
    resize(true)
    collapsed.set(false)
    resize(false)
    expect(collapsed.get()).toBe(true)
  } finally {
    dispose()
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow)
    else Reflect.deleteProperty(globalThis, "window")
  }
})

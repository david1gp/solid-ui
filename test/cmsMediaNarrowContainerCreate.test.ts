import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { cmsMediaNarrowContainerCreate } from "../src/demos/modules/cms/views/media/cmsMediaNarrowContainerCreate.js"

test("tracks container width across the threshold and disconnects on disposal", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "ResizeObserver")
  let update: (entries: ResizeObserverEntry[]) => void = () => {}
  let disconnected = false
  let observed: Element | undefined
  class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      update = (entries) => callback(entries, this as unknown as ResizeObserver)
    }
    observe(element: Element) {
      observed = element
    }
    disconnect() {
      disconnected = true
    }
  }
  Object.defineProperty(globalThis, "ResizeObserver", { configurable: true, value: MockResizeObserver })
  const { container, dispose } = createRoot((dispose) => ({ container: cmsMediaNarrowContainerCreate(), dispose }))
  const element = { getBoundingClientRect: () => ({ width: 1099 }) } as HTMLElement
  try {
    container.observe(element)
    flush()
    expect(observed).toBe(element)
    expect(container.narrow()).toBe(true)
    update([{ contentRect: { width: 1100 } } as ResizeObserverEntry])
    flush()
    expect(container.narrow()).toBe(false)
    update([{ contentRect: { width: 800 } } as ResizeObserverEntry])
    flush()
    expect(container.narrow()).toBe(true)
  } finally {
    dispose()
    if (original) Object.defineProperty(globalThis, "ResizeObserver", original)
    else Reflect.deleteProperty(globalThis, "ResizeObserver")
  }
  expect(disconnected).toBe(true)
})

test("is safe without ResizeObserver", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "ResizeObserver")
  Reflect.deleteProperty(globalThis, "ResizeObserver")
  const { container, dispose } = createRoot((dispose) => ({ container: cmsMediaNarrowContainerCreate(), dispose }))
  try {
    container.observe({} as HTMLElement)
    expect(container.narrow()).toBe(false)
  } finally {
    dispose()
    if (original) Object.defineProperty(globalThis, "ResizeObserver", original)
  }
})

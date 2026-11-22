import { afterEach, beforeEach, expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { createLocalStore } from "#ui/utils/createLocalStore.js"

const key = "solid-ui-test"
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage")
const values = new Map<string, string>()

beforeEach(() => {
  values.clear()
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (id: string) => values.get(id) ?? null,
      setItem: (id: string, value: string) => values.set(id, value),
    },
  })
})

afterEach(() => {
  if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage)
  else Reflect.deleteProperty(globalThis, "localStorage")
})

test("seeds from persisted state without a write in the component and persists nested draft updates", () => {
  values.set(key, JSON.stringify({ profile: { name: "Saved" } }))
  const { state, setState, dispose } = createRoot((dispose) => {
    const [state, setState] = createLocalStore({ profile: { name: "Default" }, enabled: true }, key)
    return { state, setState, dispose }
  })
  try {
    expect(state.profile.name).toBe("Saved")
    expect(state.enabled).toBe(true)
    setState((draft) => {
      draft.profile.name = "Edited"
    })
    flush()
    expect(JSON.parse(values.get(key)!)).toEqual({ profile: { name: "Edited" }, enabled: true })
  } finally {
    dispose()
  }
})

test("an invalid stored document falls back to the default", () => {
  values.set(key, "not JSON")
  const { state, dispose } = createRoot((dispose) => ({ state: createLocalStore({ enabled: true }, key)[0], dispose }))
  try {
    expect(state.enabled).toBe(true)
  } finally {
    dispose()
  }
})

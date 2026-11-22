import { createEffect, createStore, type Store, type StoreSetter } from "solid-js"

export function createLocalStore<T extends object>(initState: T, storageKey: string): [Store<T>, StoreSetter<T>] {
  const stored = localStorage[storageKey] ? (JSON.parse(localStorage[storageKey]) as Partial<T>) : undefined
  const initial = stored ? { ...initState, ...stored } : initState
  const [state, setState] = createStore<T>(initial as T extends Function ? never : T)
  createEffect(
    () => JSON.stringify(state),
    (value) => {
      localStorage[storageKey] = value
    },
  )
  return [state, setState]
}

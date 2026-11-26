import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"

export function kalenderQuickCreateStateCreate(state: ReturnType<typeof kalenderStateCreate>) {
  const anchor = createSignalObject<HTMLElement | undefined>(undefined)
  return { anchor: anchor.get, anchorSet: (element: HTMLElement) => anchor.set(element), form: state.form }
}

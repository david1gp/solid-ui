import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function cmsEventFieldReorderStateCreate(
  items: () => { id: string }[],
  move: (from: number, to: number) => void,
) {
  const dragged = createSignalObject<string | undefined>(undefined)
  const target = createSignalObject<string | undefined>(undefined)
  const clear = () => {
    dragged.set(undefined)
    target.set(undefined)
  }
  const moveIds = (fromId: string, toId: string) => {
    const from = items().findIndex((item) => item.id === fromId)
    const to = items().findIndex((item) => item.id === toId)
    if (from >= 0 && to >= 0 && from !== to) move(from, to)
  }
  return {
    dragged: () => dragged.get(),
    target: () => target.get(),
    start: (event: DragEvent, id: string) => {
      dragged.set(id)
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/plain", id)
      }
    },
    over: (event: DragEvent, id: string) => {
      if (!dragged.get()) return
      event.preventDefault()
      target.set(id)
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move"
    },
    drop: (event: DragEvent, id: string) => {
      if (!dragged.get()) return
      event.preventDefault()
      moveIds(dragged.get()!, id)
      clear()
    },
    end: clear,
    key: (event: KeyboardEvent, id: string) => {
      if (!event.altKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return
      event.preventDefault()
      const index = items().findIndex((item) => item.id === id)
      const next = items()[index + (event.key === "ArrowUp" ? -1 : 1)]
      if (!next || index < 0) return
      const handle = event.currentTarget as HTMLElement
      moveIds(id, next.id)
      queueMicrotask(() => handle.focus())
    },
  }
}

import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { onCleanup } from "solid-js"
import { cmsProductOrder } from "./cmsProductOrder.js"
import { cmsProductsMove } from "./cmsProductsMove.js"

export function cmsProductReorderStateCreate(tiles: boolean) {
  const dragged = createSignalObject<string | undefined>(undefined)
  const announcement = createSignalObject("")
  let original: string[] | undefined
  const cancel = () => {
    if (original) cmsProductOrder.set(original)
    original = undefined
    dragged.set(undefined)
  }
  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && original) cancel()
  }
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", escape)
    onCleanup(() => {
      document.removeEventListener("keydown", escape)
      cancel()
    })
  }
  return {
    dragged: () => dragged.get(),
    announcement: () => announcement.get(),
    start: (event: DragEvent, id: string) => {
      original = [...cmsProductOrder.get()]
      dragged.set(id)
      event.dataTransfer?.setData("text/plain", id)
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move"
    },
    containerOver: (event: DragEvent) => {
      if (!dragged.get()) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move"
    },
    over: (event: DragEvent, id: string) => {
      const active = dragged.get()
      if (!active) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move"
      const order = cmsProductOrder.get()
      const from = order.indexOf(active)
      const to = order.indexOf(id)
      if (from !== to && from >= 0 && to >= 0) cmsProductOrder.set(cmsProductsMove(order, from, to))
    },
    drop: (event: DragEvent) => {
      if (!dragged.get()) return
      event.preventDefault()
      original = undefined
      dragged.set(undefined)
    },
    end: cancel,
    key: (event: KeyboardEvent, id: string, name: string) => {
      const direction =
        event.key === "ArrowDown" || (tiles && event.key === "ArrowRight")
          ? 1
          : event.key === "ArrowUp" || (tiles && event.key === "ArrowLeft")
            ? -1
            : 0
      if (!direction) return
      event.preventDefault()
      const order = cmsProductOrder.get()
      const from = order.indexOf(id)
      const to = from + direction
      if (from < 0 || to < 0 || to >= order.length) return
      cmsProductOrder.set(cmsProductsMove(order, from, to))
      announcement.set(`${name} auf Position ${to + 1} verschoben`)
      ;(event.currentTarget as HTMLButtonElement).focus()
    },
  }
}

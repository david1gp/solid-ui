import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { onCleanup } from "solid-js"
import { cmsProductOrder } from "./cmsProductOrder.js"
import { cmsProductsMove } from "./cmsProductsMove.js"

export function cmsProductReorderStateCreate(tiles: boolean) {
  const dragged = createSignalObject<string | undefined>(undefined)
  const announcement = createSignalObject("")
  const preview = createSignalObject<string[] | undefined>(undefined)
  const cancel = () => {
    preview.set(undefined)
    dragged.set(undefined)
  }
  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && preview.get()) cancel()
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
    position: (id: string, fallback: number) => {
      const index = preview.get()?.indexOf(id) ?? -1
      return index < 0 ? fallback : index + 1
    },
    start: (event: DragEvent, id: string) => {
      preview.set(cmsProductOrder.get())
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
      const order = preview.get()
      if (!order) return
      const from = order.indexOf(active)
      const to = order.indexOf(id)
      if (from !== to && from >= 0 && to >= 0) preview.set(cmsProductsMove(order, from, to))
    },
    drop: (event: DragEvent) => {
      if (!dragged.get()) return
      event.preventDefault()
      const order = preview.get()
      if (order) cmsProductOrder.set(order)
      cancel()
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

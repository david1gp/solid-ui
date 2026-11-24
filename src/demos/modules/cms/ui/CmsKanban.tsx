import { For, type Element as JSXElement } from "solid-js"
import { cmsMutedPanelClass } from "./cmsMutedPanelClass.js"

type Column = { id: string; label: string }
type Props<T> = {
  columns: readonly Column[]
  items: readonly T[]
  itemId: (item: T) => string
  itemColumn: (item: T) => string
  renderItem: (item: T) => JSXElement
  onMove: (itemId: string, columnId: string, beforeItemId?: string) => void
  labels?: Partial<{ drag: string }>
}

/** Controlled board. onMove places an item before the supplied item, or at the end. */
export function CmsKanban<T>(props: Props<T>) {
  let draggedId: string | undefined
  const drop = (event: DragEvent, columnId: string, beforeItemId?: string) => {
    event.preventDefault()
    event.stopPropagation()
    if (draggedId && draggedId !== beforeItemId) props.onMove(draggedId, columnId, beforeItemId)
    draggedId = undefined
  }
  return (
    <div class="flex gap-4 overflow-x-auto pb-2">
      <For each={props.columns}>
        {(column) => (
          // biome-ignore lint/a11y/noStaticElementInteractions: Column is a drag-and-drop target.
          <section
            class={`${cmsMutedPanelClass} w-72 shrink-0`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => drop(event, column.id)}
          >
            <h3 class="mb-3 text-sm font-semibold">
              {column.label}{" "}
              <span class="font-normal text-neutral-500">
                ({props.items.filter((item) => props.itemColumn(item) === column.id).length})
              </span>
            </h3>
            <div class="flex min-h-16 flex-col gap-2">
              <For each={props.items.filter((item) => props.itemColumn(item) === column.id)}>
                {(item) => (
                  // biome-ignore lint/a11y/noStaticElementInteractions: Existing draggable card behavior.
                  // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Existing drag label.
                  <div
                    draggable="true"
                    aria-label={props.labels?.drag ?? "Zum Sortieren ziehen"}
                    class="cursor-grab rounded-xl border border-gray-200 bg-white p-4 text-sm active:cursor-grabbing dark:border-neutral-800 dark:bg-neutral-900/60"
                    onDragStart={(event) => {
                      draggedId = props.itemId(item)
                      event.dataTransfer?.setData("text/plain", draggedId)
                      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move"
                    }}
                    onDragEnd={() => {
                      draggedId = undefined
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                    onDrop={(event) => drop(event, column.id, props.itemId(item))}
                  >
                    {props.renderItem(item)}
                  </div>
                )}
              </For>
            </div>
          </section>
        )}
      </For>
    </div>
  )
}

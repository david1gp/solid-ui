import { createSignal, For, type Element as JSXElement, Show } from "solid-js"

type Props<T> = {
  items: readonly T[]
  itemId: (item: T) => string
  itemChildren: (item: T) => readonly T[] | undefined
  renderItem: (item: T) => JSXElement
  /** Reorder relative to a target node. The caller owns and updates the tree. */
  onMove: (itemId: string, targetId: string, position: "before" | "after") => void
  labels?: Partial<{ expand: string; collapse: string }>
}

export function CmsTree<T>(props: Props<T>) {
  const [collapsed, setCollapsed] = createSignal<Set<string>>(new Set())
  let draggedId: string | undefined
  const toggle = (id: string) =>
    setCollapsed((old) => {
      const next = new Set(old)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const nodes = (items: readonly T[]): JSXElement => (
    <ul class="space-y-1">
      <For each={items}>
        {(item) => {
          const id = () => props.itemId(item)
          const children = () => props.itemChildren(item) ?? []
          return (
            <li>
              <div
                draggable="true"
                class="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) => {
                  event.stopPropagation()
                  draggedId = id()
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
                onDrop={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  if (draggedId && draggedId !== id()) {
                    const rect = event.currentTarget.getBoundingClientRect()
                    props.onMove(draggedId, id(), event.clientY < rect.top + rect.height / 2 ? "before" : "after")
                  }
                  draggedId = undefined
                }}
              >
                <span class="cursor-grab text-neutral-400" aria-hidden="true">
                  ⋮⋮
                </span>
                <Show when={children().length > 0} fallback={<span class="w-5" />}>
                  <button
                    type="button"
                    class="w-5 text-neutral-500"
                    aria-expanded={collapsed().has(id()) ? "false" : "true"}
                    aria-label={
                      collapsed().has(id())
                        ? (props.labels?.expand ?? "Aufklappen")
                        : (props.labels?.collapse ?? "Zuklappen")
                    }
                    onClick={() => toggle(id())}
                  >
                    {collapsed().has(id()) ? "▸" : "▾"}
                  </button>
                </Show>
                <div class="min-w-0 flex-1">{props.renderItem(item)}</div>
              </div>
              <Show when={children().length > 0 && !collapsed().has(id())}>
                <div class="ml-5 mt-1 border-l border-neutral-200 pl-3 dark:border-neutral-700">
                  {nodes(children())}
                </div>
              </Show>
            </li>
          )
        }}
      </For>
    </ul>
  )
  return <div>{nodes(props.items)}</div>
}

import { For, type Element as JSXElement, Show } from "solid-js"
import { cmsButtonClass } from "./cmsButtonClass.js"
import { cmsDataTableStateCreate } from "./cmsDataTableStateCreate.js"
import { cmsInputClass } from "./cmsInputClass.js"

export type CmsDataTableColumn<T> = {
  id: string
  label: string
  value: (row: T) => string | number | boolean | null | undefined
  render?: (row: T) => JSXElement
  sortable?: boolean
  searchable?: boolean
  filterable?: boolean
  hideable?: boolean
}

export type CmsDataTableLabels = {
  search: string
  filter: string
  all: string
  columns: string
  selected: string
  previous: string
  next: string
  page: string
  noResults: string
  selectAll: string
  selectRow: string
  pageSize: string
}

export type CmsDataTableProps<T> = {
  rows: readonly T[]
  columns: readonly CmsDataTableColumn<T>[]
  rowId: (row: T) => string
  bulkActions?: readonly { label: string; run: (rows: T[]) => void }[]
  labels?: Partial<CmsDataTableLabels>
  pageSize?: number
}

export function CmsDataTable<T>(props: CmsDataTableProps<T>) {
  const state = cmsDataTableStateCreate(() => props)
  return (
    <div class="min-w-0 max-w-full space-y-4 text-sm">
      <div class="flex flex-wrap items-center gap-2">
        <input
          class={cmsInputClass}
          type="search"
          aria-label={state.labels().search}
          placeholder={state.labels().search}
          value={state.query()}
          onInput={(event) => state.querySet(event.currentTarget.value)}
        />
        <For each={props.columns.filter((column) => column.filterable)}>
          {(column) => (
            <select
              class={cmsInputClass}
              aria-label={`${state.labels().filter}: ${column.label}`}
              value={state.filters()[column.id] ?? ""}
              onChange={(event) => state.filterSet(column.id, event.currentTarget.value)}
            >
              <option value="">
                {column.label}: {state.labels().all}
              </option>
              <For each={state.filterOptions(column)}>{(option) => <option value={option}>{option}</option>}</For>
            </select>
          )}
        </For>
        <details class="relative">
          <summary class={`${cmsButtonClass} cursor-pointer`}>{state.labels().columns}</summary>
          <div class="absolute z-10 mt-1 min-w-40 space-y-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            <For each={props.columns.filter((column) => column.hideable !== false)}>
              {(column) => (
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.visibleIds().includes(column.id)}
                    onChange={() => state.columnToggle(column.id)}
                  />
                  {column.label}
                </label>
              )}
            </For>
          </div>
        </details>
      </div>
      <Show when={state.selectedRows().length > 0}>
        <div class="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-700">
          <span>
            {state.selectedRows().length} {state.labels().selected}
          </span>
          <For each={props.bulkActions}>
            {(action) => (
              <button type="button" class={cmsButtonClass} onClick={() => state.bulkRun(action.run)}>
                {action.label}
              </button>
            )}
          </For>
        </div>
      </Show>
      <div class="w-full max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
        <table class="w-full min-w-max text-left">
          <thead>
            <tr class="border-b border-gray-200 dark:border-neutral-800">
              <th class="p-3">
                <input
                  type="checkbox"
                  aria-label={state.labels().selectAll}
                  checked={
                    state.pageRows().length > 0 &&
                    state.pageRows().every((row) => state.selectedIds().includes(props.rowId(row)))
                  }
                  onChange={(event) => state.pageSelect(event.currentTarget.checked)}
                />
              </th>
              <For each={state.visibleColumns()}>
                {(column) => (
                  <th
                    class="p-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400"
                    aria-sort={
                      column.sortable !== false && state.sort().id === column.id
                        ? state.sort().direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <Show when={column.sortable !== false} fallback={column.label}>
                      <button
                        type="button"
                        class="inline-flex items-center gap-1"
                        onClick={() => state.sortToggle(column.id)}
                      >
                        {column.label}
                        <span
                          aria-hidden="true"
                          class={`inline-block w-3 text-center ${state.sort().id === column.id ? "" : "text-gray-300 dark:text-neutral-600"}`}
                        >
                          {state.sort().id === column.id ? (state.sort().direction === "asc" ? "↑" : "↓") : "↕"}
                        </span>
                      </button>
                    </Show>
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={state.pageRows()}>
              {(row) => (
                <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60">
                  <td class="p-3">
                    <input
                      type="checkbox"
                      aria-label={state.labels().selectRow}
                      checked={state.selectedIds().includes(props.rowId(row))}
                      onChange={() => state.rowToggle(props.rowId(row))}
                    />
                  </td>
                  <For each={state.visibleColumns()}>
                    {(column) => (
                      <td class="p-3">{column.render ? column.render(row) : String(column.value(row) ?? "")}</td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <Show when={state.pageRows().length === 0}>
          <p class="p-4 text-gray-500">{state.labels().noResults}</p>
        </Show>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <label class="flex items-center gap-2">
          {state.labels().pageSize}
          <select
            class={cmsInputClass}
            value={state.pageSize()}
            onChange={(event) => state.pageSizeSet(Number(event.currentTarget.value))}
          >
            <For each={state.pageSizes()}>{(size) => <option value={size}>{size}</option>}</For>
          </select>
        </label>
        <div class="flex items-center gap-2">
          <button type="button" class={cmsButtonClass} disabled={state.page() <= 1} onClick={state.previous}>
            {state.labels().previous}
          </button>
          <span>
            {state.labels().page} {state.page()} / {state.pageCount()}
          </span>
          <button
            type="button"
            class={cmsButtonClass}
            disabled={state.page() >= state.pageCount()}
            onClick={state.next}
          >
            {state.labels().next}
          </button>
        </div>
      </div>
    </div>
  )
}

import { createMemo, untrack } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { CmsDataTableColumn, CmsDataTableLabels, CmsDataTableProps } from "./CmsDataTable.jsx"

const defaults: CmsDataTableLabels = {
  search: "Suchen",
  filter: "Filter",
  all: "Alle",
  columns: "Spalten",
  selected: "ausgewählt",
  previous: "Zurück",
  next: "Weiter",
  page: "Seite",
  noResults: "Keine Einträge gefunden",
  selectAll: "Alle auf dieser Seite auswählen",
  selectRow: "Zeile auswählen",
  pageSize: "Zeilen pro Seite",
}

export function cmsDataTableStateCreate<T>(props: () => CmsDataTableProps<T>) {
  const query = createSignalObject("")
  const filters = createSignalObject<Record<string, string>>({})
  const visibleIds = createSignalObject(untrack(() => props().columns.map((column) => column.id)))
  const sort = createSignalObject<{ id: string; direction: "asc" | "desc" }>({ id: "", direction: "asc" })
  const selectedIds = createSignalObject<string[]>([])
  const pageNumber = createSignalObject(1)
  const pageSize = createSignalObject(untrack(() => Math.max(1, Math.floor(props().pageSize || 10))))
  const labels = () => ({ ...defaults, ...props().labels })
  const visibleColumns = createMemo(() =>
    props().columns.filter((column) => column.hideable === false || visibleIds.get().includes(column.id)),
  )
  const filteredRows = createMemo(() => {
    const needle = query.get().trim().toLocaleLowerCase()
    const rows = props().rows.filter((row) => {
      if (
        needle &&
        !props().columns.some(
          (column) =>
            column.searchable !== false &&
            String(column.value(row) ?? "")
              .toLocaleLowerCase()
              .includes(needle),
        )
      )
        return false
      return Object.entries(filters.get()).every(
        ([id, value]) =>
          !value ||
          String(
            props()
              .columns.find((column) => column.id === id)
              ?.value(row) ?? "",
          ) === value,
      )
    })
    const column = props().columns.find((item) => item.id === sort.get().id)
    if (!column) return rows
    return [...rows].sort((a, b) => {
      const left = column.value(a)
      const right = column.value(b)
      const comparison =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left ?? "").localeCompare(String(right ?? ""), undefined, { numeric: true, sensitivity: "base" })
      return sort.get().direction === "asc" ? comparison : -comparison
    })
  })
  const pageCount = () => Math.max(1, Math.ceil(filteredRows().length / pageSize.get()))
  const page = () => Math.min(pageNumber.get(), pageCount())
  const pageRows = () => filteredRows().slice((page() - 1) * pageSize.get(), page() * pageSize.get())
  const selectedRows = () => props().rows.filter((row) => selectedIds.get().includes(props().rowId(row)))
  const pageSizes = () => [...new Set([10, 25, 50, 100, pageSize.get()])].sort((a, b) => a - b)
  return {
    labels,
    query: query.get,
    filters: filters.get,
    visibleIds: visibleIds.get,
    sort: sort.get,
    selectedIds: selectedIds.get,
    pageSize: pageSize.get,
    visibleColumns,
    pageCount,
    page,
    pageRows,
    selectedRows,
    pageSizes,
    querySet: (value: string) => {
      query.set(value)
      pageNumber.set(1)
    },
    filterSet: (id: string, value: string) => {
      filters.set({ ...filters.get(), [id]: value })
      pageNumber.set(1)
    },
    filterOptions: (column: CmsDataTableColumn<T>) =>
      [
        ...new Set(
          props()
            .rows.map((row) => String(column.value(row) ?? ""))
            .filter(Boolean),
        ),
      ].sort((a, b) => a.localeCompare(b)),
    columnToggle: (id: string) =>
      visibleIds.set(
        visibleIds.get().includes(id) ? visibleIds.get().filter((item) => item !== id) : [...visibleIds.get(), id],
      ),
    sortToggle: (id: string) => {
      sort.set({ id, direction: sort.get().id === id && sort.get().direction === "asc" ? "desc" : "asc" })
      pageNumber.set(1)
    },
    rowToggle: (id: string) =>
      selectedIds.set(
        selectedIds.get().includes(id) ? selectedIds.get().filter((item) => item !== id) : [...selectedIds.get(), id],
      ),
    pageSelect: (checked: boolean) => {
      const ids = pageRows().map(props().rowId)
      selectedIds.set(
        checked ? [...new Set([...selectedIds.get(), ...ids])] : selectedIds.get().filter((id) => !ids.includes(id)),
      )
    },
    bulkRun: (run: (rows: T[]) => void) => {
      run(selectedRows())
      selectedIds.set([])
    },
    pageSizeSet: (size: number) => {
      pageSize.set(size)
      pageNumber.set(1)
    },
    previous: () => pageNumber.set(Math.max(1, page() - 1)),
    next: () => pageNumber.set(Math.min(pageCount(), page() + 1)),
  }
}

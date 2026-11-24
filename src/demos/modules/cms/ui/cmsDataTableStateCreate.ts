import { createMemo, onSettled, untrack } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { CmsDataTableColumn, CmsDataTableLabels, CmsDataTableProps } from "./CmsDataTable.jsx"

type View = {
  name: string
  query: string
  filters: Record<string, string>
  visible: string[]
  sort: { id: string; direction: "asc" | "desc" }
  pageSize: number
}
const defaults: CmsDataTableLabels = {
  search: "Suchen",
  filter: "Filter",
  all: "Alle",
  columns: "Spalten",
  export: "CSV exportieren",
  selected: "ausgewählt",
  previous: "Zurück",
  next: "Weiter",
  page: "Seite",
  noResults: "Keine Einträge gefunden",
  selectAll: "Alle auf dieser Seite auswählen",
  selectRow: "Zeile auswählen",
  views: "Ansichten",
  saveView: "Ansicht speichern",
  viewName: "Name der Ansicht",
  deleteView: "Ansicht löschen",
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
  const views = createSignalObject<View[]>([])
  const activeView = createSignalObject("")
  const viewName = createSignalObject("")
  const labels = () => ({ ...defaults, ...props().labels })
  const visibleColumns = createMemo(() => props().columns.filter((column) => visibleIds.get().includes(column.id)))
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
  const persist = (items: View[]) => {
    if (!props().storageKey || typeof window === "undefined") return
    try {
      window.localStorage.setItem(props().storageKey!, JSON.stringify(items))
    } catch {
      /* Storage can be unavailable. */
    }
  }
  onSettled(() => {
    if (!props().storageKey) return
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(props().storageKey!) ?? "[]")
      if (!Array.isArray(parsed)) return
      const valid = parsed.filter(
        (item): item is View =>
          item &&
          typeof item === "object" &&
          typeof item.name === "string" &&
          typeof item.query === "string" &&
          item.filters &&
          typeof item.filters === "object" &&
          !Array.isArray(item.filters) &&
          Object.values(item.filters).every((value) => typeof value === "string") &&
          Array.isArray(item.visible) &&
          item.visible.every((value: unknown) => typeof value === "string") &&
          item.sort &&
          typeof item.sort.id === "string" &&
          (item.sort.direction === "asc" || item.sort.direction === "desc") &&
          Number.isInteger(item.pageSize) &&
          item.pageSize > 0,
      )
      views.set(valid)
    } catch {
      /* Invalid saved data is ignored. */
    }
  })
  return {
    labels,
    query: query.get,
    filters: filters.get,
    visibleIds: visibleIds.get,
    sort: sort.get,
    selectedIds: selectedIds.get,
    pageSize: pageSize.get,
    views: views.get,
    activeView: activeView.get,
    viewName: viewName.get,
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
    viewNameSet: (name: string) => viewName.set(name),
    viewSave: () => {
      const name = viewName.get().trim()
      if (!name) return
      const items = [
        ...views.get().filter((view) => view.name !== name),
        {
          name,
          query: query.get(),
          filters: filters.get(),
          visible: visibleIds.get(),
          sort: sort.get(),
          pageSize: pageSize.get(),
        },
      ]
      views.set(items)
      activeView.set(name)
      persist(items)
    },
    viewApply: (name: string) => {
      activeView.set(name)
      const view = views.get().find((item) => item.name === name)
      if (!view) return
      const ids = props().columns.map((column) => column.id)
      query.set(view.query)
      filters.set(Object.fromEntries(Object.entries(view.filters).filter(([id]) => ids.includes(id))))
      visibleIds.set(view.visible.filter((id) => ids.includes(id)))
      sort.set(view.sort)
      pageSize.set(view.pageSize)
      pageNumber.set(1)
      viewName.set(name)
    },
    viewDelete: () => {
      const items = views.get().filter((view) => view.name !== activeView.get())
      views.set(items)
      persist(items)
      activeView.set("")
      viewName.set("")
    },
    csvExport: () => {
      if (typeof document === "undefined") return
      const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`
      const columns = visibleColumns()
      const csv = [
        columns.map((column) => escape(column.label)).join(","),
        ...filteredRows().map((row) => columns.map((column) => escape(column.value(row))).join(",")),
      ].join("\r\n")
      const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }))
      const link = document.createElement("a")
      link.href = url
      link.download = props().csvFilename ?? "export.csv"
      link.click()
      setTimeout(() => URL.revokeObjectURL(url), 0)
    },
  }
}

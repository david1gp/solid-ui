import { createSignalObject } from "#ui/utils/createSignalObject.js"

function csvParse(input: string) {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let quoted = false
  const text = input.replace(/^\uFEFF/, "")
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '"' && quoted && text[i + 1] === '"') {
      cell += '"'
      i++
    } else if (char === '"') quoted = !quoted
    else if (char === "," && !quoted) {
      row.push(cell)
      cell = ""
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ""
    } else cell += char
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }
  return quoted ? [] : rows.filter((item) => item.some((value) => value.trim()))
}

export function cmsImportExportStateCreate() {
  const fileName = createSignalObject("")
  const rows = createSignalObject<string[][]>([])
  const mappings = createSignalObject<string[]>([])
  const error = createSignalObject(false)
  const imported = createSignalObject(false)
  const dragging = createSignalObject(false)
  let selection = 0
  async function fileLoad(file?: File) {
    if (!file) return
    const current = ++selection
    fileName.set(file.name)
    rows.set([])
    imported.set(false)
    error.set(false)
    if (!file.name.toLowerCase().endsWith(".csv")) {
      error.set(true)
      return
    }
    try {
      const parsed = csvParse(await file.text())
      if (current !== selection) return
      if (!parsed.length || !parsed[0]?.length) {
        error.set(true)
        return
      }
      rows.set(parsed)
      mappings.set(
        parsed[0].map((header) => {
          const value = header.toLowerCase().trim()
          if (["title", "titel", "name"].includes(value)) return "title"
          if (["status"].includes(value)) return "status"
          if (["date", "datum"].includes(value)) return "date"
          return "ignore"
        }),
      )
    } catch {
      if (current === selection) error.set(true)
    }
  }
  function mappingChange(index: number, value: string) {
    mappings.set(mappings.get().map((item, i) => (i === index ? value : item)))
  }
  function exportDownload() {
    const csv = '\ufeffTitle,Status,Date\r\n"Welcome",published,2026-11-24\r\n"About us",draft,2026-11-23\r\n'
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "democms-export.csv"
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return {
    fileName,
    rows,
    mappings,
    error,
    imported,
    dragging,
    fileLoad,
    mappingChange,
    exportDownload,
    importRun: () => imported.set(true),
    dragSet: (value: boolean) => dragging.set(value),
  }
}

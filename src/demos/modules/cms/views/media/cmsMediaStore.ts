import { createSignal } from "solid-js"

export type CmsMediaItem = {
  id: string
  name: string
  url: string
  folder: string
  alt: string
  focusX: number
  focusY: number
  cropX: number
  cropY: number
  cropWidth: number
  cropHeight: number
}

const [items, setItems] = createSignal<CmsMediaItem[]>([])
const [folders, setFolders] = createSignal<string[]>([])

/** Shared, in-memory demo library. Uploaded object URLs live until the item is removed or the page closes. */
export const cmsMediaStore = {
  items,
  folders,
  folderAdd(name: string) {
    const trimmed = name.trim()
    if (trimmed && !folders().includes(trimmed)) setFolders((current) => [...current, trimmed])
  },
  upload(files: FileList | File[], folder: string) {
    const additions = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file),
        folder,
        alt: "",
        focusX: 50,
        focusY: 50,
        cropX: 10,
        cropY: 10,
        cropWidth: 80,
        cropHeight: 80,
      }))
    setItems((current) => [...additions, ...current])
  },
  update(id: string, patch: Partial<Omit<CmsMediaItem, "id" | "url">>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  },
  remove(id: string) {
    const item = items().find((entry) => entry.id === id)
    if (item) URL.revokeObjectURL(item.url)
    setItems((current) => current.filter((entry) => entry.id !== id))
  },
}

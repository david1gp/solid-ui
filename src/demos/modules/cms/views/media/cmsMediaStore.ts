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

const [items, setItems] = createSignal<CmsMediaItem[]>([
  {
    id: "demo-og-image",
    name: "Beispielbild.jpg",
    url: "/og-image.jpg",
    folder: "",
    alt: "Vorschaubild der Solid-UI-Demo",
    focusX: 50,
    focusY: 50,
    cropX: 10,
    cropY: 10,
    cropWidth: 80,
    cropHeight: 80,
  },
  {
    id: "demo-logo",
    name: "Beispiel-Logo.svg",
    url: "/logo.svg",
    folder: "",
    alt: "Solid-UI-Logo",
    focusX: 50,
    focusY: 50,
    cropX: 10,
    cropY: 10,
    cropWidth: 80,
    cropHeight: 80,
  },
])
const [folders, setFolders] = createSignal<string[]>([])

/** Shared, in-memory demo library. Uploaded object URLs live until the item is removed or the page closes. */
export const cmsMediaStore = {
  items,
  folders,
  folderAdd(name: string) {
    const trimmed = name.trim()
    if (trimmed && trimmed !== "*" && !folders().includes(trimmed)) setFolders((current) => [...current, trimmed])
  },
  folderRemove(name: string, options?: { deleteItems?: boolean }) {
    if (!folders().includes(name)) return
    if (options?.deleteItems) {
      for (const item of items().filter((entry) => entry.folder === name)) cmsMediaStore.remove(item.id)
    } else {
      setItems((current) => current.map((item) => (item.folder === name ? { ...item, folder: "" } : item)))
    }
    setFolders((current) => current.filter((folder) => folder !== name))
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
    if (item?.url.startsWith("blob:")) URL.revokeObjectURL(item.url)
    setItems((current) => current.filter((entry) => entry.id !== id))
  },
}

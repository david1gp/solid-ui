import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsMediaStore } from "./cmsMediaStore.js"
import { cmsMediaNarrowContainerCreate } from "./cmsMediaNarrowContainerCreate.js"
import { cmsMediaText } from "./cmsMediaText.js"

export function cmsMediaLibraryStateCreate() {
  const container = cmsMediaNarrowContainerCreate()
  const [folder, setFolder] = createSignal("*")
  const [search, setSearch] = createSignal("")
  const [selectedId, setSelectedId] = createSignal<string>()
  const [folderName, setFolderName] = createSignal("")
  const [folderToRemove, setFolderToRemove] = createSignal<string>()
  const selected = createMemo(() => cmsMediaStore.items().find((item) => item.id === selectedId()))
  const [displayed, setDisplayed] = createSignal<ReturnType<typeof selected>>()
  const [detailsOpen, setDetailsOpen] = createSignal(false)
  let frame: number | undefined
  let closeTimer: ReturnType<typeof setTimeout> | undefined
  let open = false
  createEffect(selected, (item) => {
    if (item) {
      clearTimeout(closeTimer)
      setDisplayed(item)
      if (!open && frame === undefined) {
        frame = requestAnimationFrame(() => {
          frame = undefined
          open = true
          setDetailsOpen(true)
        })
      }
      return
    }
    if (frame !== undefined) cancelAnimationFrame(frame)
    frame = undefined
    open = false
    setDetailsOpen(false)
    clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      if (!selected()) setDisplayed(undefined)
    }, 400)
  })
  onCleanup(() => {
    if (frame !== undefined) cancelAnimationFrame(frame)
    clearTimeout(closeTimer)
  })
  const filtered = createMemo(() =>
    cmsMediaStore
      .items()
      .filter(
        (item) =>
          (folder() === "*" || item.folder === folder()) &&
          item.name.toLocaleLowerCase().includes(search().trim().toLocaleLowerCase()),
      ),
  )
  return {
    text: () => cmsMediaText[cmsLocale.get()],
    folder,
    search,
    selected,
    displayed,
    detailsOpen,
    finishClose() {
      if (!selected()) {
        clearTimeout(closeTimer)
        setDisplayed(undefined)
      }
    },
    observeContainer: container.observe,
    narrow: container.narrow,
    gridCollapsed: () => container.narrow() && !!selected(),
    filtered,
    folderName,
    folderToRemove,
    folderRemoveCount: () => cmsMediaStore.items().filter((item) => item.folder === folderToRemove()).length,
    requestFolderRemove: setFolderToRemove,
    closeFolderRemove: () => setFolderToRemove(undefined),
    confirmFolderRemove(deleteItems = false) {
      const name = folderToRemove()
      if (!name) return
      cmsMediaStore.folderRemove(name, { deleteItems })
      if (folder() === name) setFolder("*")
    },
    changeFolder: setFolder,
    changeSearch: setSearch,
    select: setSelectedId,
    changeFolderName: setFolderName,
    addFolder() {
      cmsMediaStore.folderAdd(folderName())
      setFolderName("")
    },
    upload(files: FileList | File[]) {
      cmsMediaStore.upload(files, folder() === "*" ? "" : folder())
    },
    remove() {
      const item = selected()
      if (item) cmsMediaStore.remove(item.id)
      setSelectedId(undefined)
    },
  }
}

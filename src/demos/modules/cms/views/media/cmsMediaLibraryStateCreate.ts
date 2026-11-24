import { createMemo, createSignal } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsMediaStore } from "./cmsMediaStore.js"
import { cmsMediaText } from "./cmsMediaText.js"

export function cmsMediaLibraryStateCreate() {
  const [folder, setFolder] = createSignal("*")
  const [search, setSearch] = createSignal("")
  const [selectedId, setSelectedId] = createSignal<string>()
  const [folderName, setFolderName] = createSignal("")
  const [folderToRemove, setFolderToRemove] = createSignal<string>()
  const selected = createMemo(() => cmsMediaStore.items().find((item) => item.id === selectedId()))
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
    filtered,
    folderName,
    folderToRemove,
    folderRemoveCount: () => cmsMediaStore.items().filter((item) => item.folder === folderToRemove()).length,
    requestFolderRemove: setFolderToRemove,
    closeFolderRemove: () => setFolderToRemove(undefined),
    confirmFolderRemove() {
      const name = folderToRemove()
      if (!name) return
      cmsMediaStore.folderRemove(name)
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

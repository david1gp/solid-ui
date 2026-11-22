import { createSignal, onSettled } from "solid-js"

export function demoTablePagination2StateCreate() {
  const entriesPerPage = 10
  const entries = 42
  const pageCount = Math.ceil(entries / entriesPerPage)
  const [currentPage, setCurrentPage] = createSignal(1)
  const incrementPage = () => setCurrentPage((page) => Math.min(page + 1, pageCount))
  const decrementPage = () => setCurrentPage((page) => Math.max(page - 1, 1))

  onSettled(() => {
    const hotkeyPress = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return
      if (event.key === "ArrowLeft") decrementPage()
      else if (event.key === "ArrowRight") incrementPage()
      else return
      event.preventDefault()
    }
    document.addEventListener("keydown", hotkeyPress)
    return () => document.removeEventListener("keydown", hotkeyPress)
  })

  return {
    pageCount,
    page: currentPage,
    incrementPage,
    decrementPage,
  }
}

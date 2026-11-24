import type { CmsViewKey } from "./CmsViewKey.js"
import { cmsNavigation } from "./cmsNavigation.js"

export function cmsNavigate(view: CmsViewKey, id?: string) {
  cmsNavigation.set({ view, id })
  if (typeof window === "undefined") return
  const url = new URL(window.location.href)
  url.searchParams.set("view", view)
  if (id) url.searchParams.set("id", id)
  else url.searchParams.delete("id")
  window.history.pushState(window.history.state, "", url)
}

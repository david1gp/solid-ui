import type { CmsViewKey } from "./CmsViewKey.js"
import { cmsNavigation } from "./cmsNavigation.js"
import { cmsViewRegistry } from "./cmsViewRegistry.js"

/** Call on mount; the returned function removes the popstate listener. */
export function cmsNavigationSync() {
  if (typeof window === "undefined") return () => {}
  const readUrl = () => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get("view")
    const view: CmsViewKey = key && Object.hasOwn(cmsViewRegistry, key) ? (key as CmsViewKey) : "dashboard"
    cmsNavigation.set({ view, id: params.get("id") || undefined })
  }
  readUrl()
  window.addEventListener("popstate", readUrl)
  return () => window.removeEventListener("popstate", readUrl)
}

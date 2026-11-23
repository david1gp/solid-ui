import { createMemo, onCleanup } from "solid-js"
import * as v from "valibot"
import { demoSearch } from "#src/app/demos/demoSearch.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function demosOverviewStateCreate(list: Record<string, Record<string, unknown>>, names: Record<string, string>) {
  const initial = typeof window === "undefined" ? "" : (new URL(window.location.href).searchParams.get("q") ?? "")
  const parsed = v.safeParse(v.string(), initial)
  const query = createSignalObject(parsed.success ? parsed.output : "")
  const selectedTab = createSignalObject("overview")
  let timer: ReturnType<typeof setTimeout> | undefined
  let idle: number | undefined
  const setQuery = (value: string) => {
    query.set(value)
    clearTimeout(timer)
    if (idle !== undefined && typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idle)
    timer = setTimeout(() => {
      const persist = () => {
        const url = new URL(window.location.href)
        if (value) url.searchParams.set("q", value)
        else url.searchParams.delete("q")
        window.history.replaceState(window.history.state, "", url)
      }
      if (typeof requestIdleCallback === "undefined") persist()
      else idle = requestIdleCallback(persist)
    }, 200)
  }
  onCleanup(() => {
    clearTimeout(timer)
    if (idle !== undefined && typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idle)
  })
  return { query, selectedTab, setQuery, results: createMemo(() => demoSearch(list, names, query.get())) }
}

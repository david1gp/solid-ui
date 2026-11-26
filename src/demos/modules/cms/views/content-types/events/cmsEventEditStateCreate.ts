import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { onCleanup } from "solid-js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsProductsMove } from "../products/cmsProductsMove.js"
import { cmsEventOrder } from "./cmsEventOrder.js"
import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"
import { cmsEventDateGermanFormat } from "./cmsEventDateGermanFormat.js"
import { cmsEventDateGermanParse } from "./cmsEventDateGermanParse.js"
import { cmsEventPriceMinimumFormat } from "./cmsEventPriceMinimumFormat.js"
import { cmsEventScheduleNext } from "./cmsEventScheduleNext.js"
import { cmsEventScheduleSorted } from "./cmsEventScheduleSorted.js"
import type { cmsEvents } from "./cmsEvents.js"
import { cmsEventTimeGermanParse } from "./cmsEventTimeGermanParse.js"

const rowCreate = (id: number, entry: CmsEventScheduleEntry) => ({
  id,
  /** Last valid values, used for preview and calendar. */
  date: createSignalObject(entry.date),
  time: createSignalObject(entry.time),
  /** What the user typed (German format). */
  dateText: createSignalObject(cmsEventDateGermanFormat(entry.date)),
  timeText: createSignalObject(entry.time),
  capacity: createSignalObject(entry.capacity?.toString() ?? ""),
  priceRegular: createSignalObject(entry.priceRegular?.toString() ?? ""),
  priceReduced: createSignalObject(entry.priceReduced?.toString() ?? ""),
})
type Row = ReturnType<typeof rowCreate>

export function cmsEventEditStateCreate(event: ReturnType<typeof cmsEvents.get>[number]) {
  const position = createSignalObject(cmsEventOrder.get().indexOf(event.id) + 1 || event.position)
  const title = createSignalObject(event.title)
  const location = createSignalObject(event.location)
  const tabValue = () =>
    typeof window !== "undefined" && new URL(window.location.href).searchParams.get("eventTab") === "Tickets"
      ? "Tickets"
      : "Details"
  const tabState = createSignalObject(tabValue())
  const tab = {
    get: tabState.get,
    set: (value: string) => {
      tabState.set(value)
      if (typeof window === "undefined") return
      const url = new URL(window.location.href)
      if (value === "Tickets") url.searchParams.set("eventTab", value)
      else url.searchParams.delete("eventTab")
      window.history.replaceState(window.history.state, "", url)
    },
  }
  if (typeof window !== "undefined") {
    const syncTab = () => tabState.set(tabValue())
    window.addEventListener("popstate", syncTab)
    onCleanup(() => window.removeEventListener("popstate", syncTab))
  }
  const featured = createSignalObject(event.featured)
  const description = createSignalObject(event.description)
  const notice = createSignalObject("")
  const imageNotice = createSignalObject("")
  let nextId = 0
  const schedule = createSignalObject<Row[]>(
    cmsEventScheduleSorted(event.schedule).map((entry) => rowCreate(nextId++, entry)),
  )
  const row = (id: number) => schedule.get().find((item) => item.id === id)
  const rowValid = (item: Row) =>
    cmsEventDateGermanParse(item.dateText.get()) !== undefined &&
    cmsEventTimeGermanParse(item.timeText.get()) !== undefined
  return {
    tab,
    position: () => position.get(),
    positionSet: (value: number) => {
      const ids = cmsEventOrder.get()
      const from = ids.indexOf(event.id)
      if (from < 0 || !Number.isInteger(value) || value < 1 || value > ids.length) return
      cmsEventOrder.set(cmsProductsMove(ids, from, value - 1))
      position.set(value)
    },
    positionCount: () => cmsEventOrder.get().length,
    title: () => title.get(),
    titleSet: (value: string) => title.set(value),
    schedule: () => schedule.get(),
    priceMinimum: () =>
      cmsEventPriceMinimumFormat(
        schedule.get().map((item) => ({
          priceRegular: item.priceRegular.get().trim() === "" ? undefined : Number(item.priceRegular.get()),
          priceReduced: item.priceReduced.get().trim() === "" ? undefined : Number(item.priceReduced.get()),
        })),
      ),
    /** Valid appointments in chronological order, for the preview. */
    scheduleSorted: () =>
      cmsEventScheduleSorted(schedule.get().map((item) => ({ date: item.date.get(), time: item.time.get() }))),
    scheduleAdd: () => {
      notice.set("")
      const sorted = cmsEventScheduleSorted(
        schedule.get().map((item) => ({ date: item.date.get(), time: item.time.get() })),
      )
      schedule.set([...schedule.get(), rowCreate(nextId++, cmsEventScheduleNext(sorted.at(-1)))])
    },
    scheduleRemove: (id: number) => {
      notice.set("")
      if (schedule.get().length > 1) schedule.set(schedule.get().filter((item) => item.id !== id))
    },
    dateTextSet: (id: number, value: string) => {
      const item = row(id)
      if (!item) return
      notice.set("")
      item.dateText.set(value)
      const parsed = cmsEventDateGermanParse(value)
      if (parsed) item.date.set(parsed)
    },
    datePick: (id: number, iso: string) => {
      const item = row(id)
      if (!item) return
      notice.set("")
      item.date.set(iso)
      item.dateText.set(cmsEventDateGermanFormat(iso))
    },
    timeTextSet: (id: number, value: string) => {
      const item = row(id)
      if (!item) return
      notice.set("")
      item.timeText.set(value)
      const parsed = cmsEventTimeGermanParse(value)
      if (parsed) item.time.set(parsed)
    },
    dateValid: (item: Row) => cmsEventDateGermanParse(item.dateText.get()) !== undefined,
    timeValid: (item: Row) => cmsEventTimeGermanParse(item.timeText.get()) !== undefined,
    location: () => location.get(),
    locationSet: (value: string) => location.set(value),
    scheduleFieldSet: (id: number, field: "capacity" | "priceRegular" | "priceReduced", value: string) => {
      row(id)?.[field].set(value)
    },
    featured: () => featured.get(),
    featuredSet: (value: boolean) => featured.set(value),
    description: () => description.get(),
    descriptionSet: (value: string) => description.set(value),
    notice: () => notice.get(),
    imageNotice: () => imageNotice.get(),
    imageUnavailable: () => imageNotice.set("Demo – nicht verfügbar"),
    save: () =>
      notice.set(
        schedule.get().every(rowValid)
          ? "Demo – Änderungen werden nicht gespeichert"
          : "Bitte bei allen Terminen Datum (TT.MM.JJJJ) und Uhrzeit (HH:MM) korrekt angeben",
      ),
    back: () => cmsNavigate("content-types", "event"),
  }
}

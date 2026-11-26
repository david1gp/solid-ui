import { onCleanup } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsProductsMove } from "../products/cmsProductsMove.js"
import type { CmsEventAgendaEntry } from "./CmsEventAgendaEntry.js"
import type { CmsEventFaqEntry } from "./CmsEventFaqEntry.js"
import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"
import { cmsEventCategoryAdd } from "./cmsEventCategoryAdd.js"
import { cmsEventCategorySuggestions } from "./cmsEventCategorySuggestions.js"
import { cmsEventDateGermanFormat } from "./cmsEventDateGermanFormat.js"
import { cmsEventDateGermanParse } from "./cmsEventDateGermanParse.js"
import { cmsEventListMove } from "./cmsEventListMove.js"
import { cmsEventOrder } from "./cmsEventOrder.js"
import { cmsEventPriceMinimumFormat } from "./cmsEventPriceMinimumFormat.js"
import { cmsEventMaxPerOrderValid } from "./cmsEventMaxPerOrderValid.js"
import { cmsEventScheduleNext } from "./cmsEventScheduleNext.js"
import { cmsEventScheduleSorted } from "./cmsEventScheduleSorted.js"
import { cmsEvents } from "./cmsEvents.js"
import { cmsEventTimeGermanParse } from "./cmsEventTimeGermanParse.js"

const rowCreate = (id: number, entry: CmsEventScheduleEntry) => ({
  id,
  /** Last valid values, used for preview and calendar. */
  date: createSignalObject(entry.date),
  time: createSignalObject(entry.time),
  /** What the user typed (German format). */
  dateText: createSignalObject(cmsEventDateGermanFormat(entry.date)),
  timeText: createSignalObject(entry.time),
  title: createSignalObject(entry.title ?? ""),
  description: createSignalObject(entry.description ?? ""),
  maxPerOrder: createSignalObject(entry.maxPerOrder?.toString() ?? ""),
  unlockCodeRequired: createSignalObject(entry.unlockCodeRequired),
  capacity: createSignalObject(entry.capacity?.toString() ?? ""),
  priceRegular: createSignalObject(entry.priceRegular?.toString() ?? ""),
  priceReduced: createSignalObject(entry.priceReduced?.toString() ?? ""),
})
type Row = ReturnType<typeof rowCreate>

export function cmsEventEditStateCreate(event: ReturnType<typeof cmsEvents.get>[number]) {
  const position = createSignalObject(cmsEventOrder.get().indexOf(event.id) + 1 || event.position)
  const title = createSignalObject(event.title)
  const location = createSignalObject(event.location)
  const organizer = createSignalObject(event.organizer)
  const categories = createSignalObject([...event.categories])
  const highlights = createSignalObject([...event.highlights])
  const servicesIncluded = createSignalObject([...event.servicesIncluded])
  const servicesExcluded = createSignalObject([...event.servicesExcluded])
  const faq = createSignalObject(event.faq.map((entry) => ({ ...entry })))
  const agenda = createSignalObject(event.agenda.map((entry) => ({ ...entry })))
  let contentId = 0
  const idCreate = () => {
    let id: string
    do id = `new-${event.id}-${contentId++}`
    while (faq.get().some((item) => item.id === id) || agenda.get().some((item) => item.id === id))
    return id
  }
  const textLists = { highlights, servicesIncluded, servicesExcluded }
  const tabValue = () => {
    const value = typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("eventTab") : null
    return value && ["Inhalt", "Ablauf", "FAQ", "Tickets"].includes(value) ? value : "Details"
  }
  const tabState = createSignalObject(tabValue())
  const tab = {
    get: tabState.get,
    set: (value: string) => {
      tabState.set(value)
      if (typeof window === "undefined") return
      const url = new URL(window.location.href)
      if (value !== "Details") url.searchParams.set("eventTab", value)
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
  const agendaValidationAttempted = createSignalObject(false)
  const imageNotice = createSignalObject("")
  let nextId = 0
  const schedule = createSignalObject<Row[]>(
    cmsEventScheduleSorted(event.schedule).map((entry) => rowCreate(nextId++, entry)),
  )
  const row = (id: number) => schedule.get().find((item) => item.id === id)
  const rowValid = (item: Row) =>
    cmsEventDateGermanParse(item.dateText.get()) !== undefined &&
    cmsEventTimeGermanParse(item.timeText.get()) !== undefined &&
    cmsEventMaxPerOrderValid(item.maxPerOrder.get(), item.capacity.get())
  const agendaIncluded = (item: CmsEventAgendaEntry) =>
    Boolean(
      item.title.trim() ||
        item.description?.trim() ||
        (item.kind === "time" && item.time?.trim()) ||
        (item.kind === "day" && item.day !== undefined && item.day !== 1),
    )
  const agendaInvalid = (item: CmsEventAgendaEntry) =>
    agendaIncluded(item) &&
    (item.kind === "time"
      ? cmsEventTimeGermanParse(item.time ?? "") === undefined
      : !Number.isInteger(item.day) || (item.day ?? 0) < 1)
  return {
    tab,
    organizer: () => organizer.get(),
    organizerSet: (value: string) => organizer.set(value),
    categories: () => categories.get(),
    categoryAdd: (value: string) => categories.set(cmsEventCategoryAdd(categories.get(), value)),
    categoryRemove: (value: string) => categories.set(categories.get().filter((item) => item !== value)),
    categorySuggestions: () => cmsEventCategorySuggestions(cmsEvents.get(), categories.get()),
    highlights: () => highlights.get(),
    servicesIncluded: () => servicesIncluded.get(),
    servicesExcluded: () => servicesExcluded.get(),
    textListAdd: (list: keyof typeof textLists) => textLists[list].set([...textLists[list].get(), ""]),
    textListUpdate: (list: keyof typeof textLists, index: number, value: string) =>
      textLists[list].set(textLists[list].get().map((item, i) => (i === index ? value : item))),
    textListRemove: (list: keyof typeof textLists, index: number) =>
      textLists[list].set(textLists[list].get().filter((_, i) => i !== index)),
    faq: () => faq.get(),
    faqAdd: () => faq.set([...faq.get(), { id: idCreate(), question: "", answer: "" }]),
    faqRemove: (id: string) => faq.set(faq.get().filter((item) => item.id !== id)),
    faqUpdate: (id: string, changes: Partial<Omit<CmsEventFaqEntry, "id">>) =>
      faq.set(faq.get().map((item) => (item.id === id ? { ...item, ...changes } : item))),
    faqMove: (from: number, to: number) => faq.set(cmsEventListMove(faq.get(), from, to)),
    agenda: () => agenda.get(),
    agendaInvalid: (id: string) => {
      const item = agenda.get().find((entry) => entry.id === id)
      return agendaValidationAttempted.get() && !!item && agendaInvalid(item)
    },
    agendaValidationAttempted: () => agendaValidationAttempted.get(),
    faqValidationAttempted: () => agendaValidationAttempted.get(),
    tabHasErrors: (tab: string) =>
      agendaValidationAttempted.get() &&
      (tab === "Tickets"
        ? !schedule.get().every(rowValid)
        : tab === "FAQ"
          ? faq.get().some((item) => Boolean(item.question.trim()) !== Boolean(item.answer.trim()))
          : tab === "Ablauf"
            ? agenda.get().some(agendaInvalid)
            : false),
    agendaAdd: () => agenda.set([...agenda.get(), { id: idCreate(), kind: "day", day: 1, title: "" }]),
    agendaRemove: (id: string) => agenda.set(agenda.get().filter((item) => item.id !== id)),
    agendaUpdate: (id: string, changes: Partial<Omit<CmsEventAgendaEntry, "id">>) =>
      agenda.set(agenda.get().map((item) => (item.id === id ? { ...item, ...changes } : item))),
    agendaMove: (from: number, to: number) => agenda.set(cmsEventListMove(agenda.get(), from, to)),
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
    scheduleFieldSet: (
      id: number,
      field: "capacity" | "priceRegular" | "priceReduced" | "title" | "description" | "maxPerOrder",
      value: string,
    ) => {
      row(id)?.[field].set(value)
    },
    scheduleUnlockCodeSet: (id: number, value: boolean) => row(id)?.unlockCodeRequired.set(value),
    maxPerOrderInvalid: (item: Row) =>
      agendaValidationAttempted.get() && !cmsEventMaxPerOrderValid(item.maxPerOrder.get(), item.capacity.get()),
    featured: () => featured.get(),
    featuredSet: (value: boolean) => featured.set(value),
    description: () => description.get(),
    descriptionSet: (value: string) => description.set(value),
    notice: () => notice.get(),
    imageNotice: () => imageNotice.get(),
    imageUnavailable: () => imageNotice.set("Demo – nicht verfügbar"),
    save: () => {
      agendaValidationAttempted.set(true)
      const faqEntries = faq.get().filter((item) => item.question.trim() || item.answer.trim())
      const agendaEntries = agenda.get().filter(agendaIncluded)
      const errors: string[] = []
      if (
        schedule
          .get()
          .some(
            (item) =>
              cmsEventDateGermanParse(item.dateText.get()) === undefined ||
              cmsEventTimeGermanParse(item.timeText.get()) === undefined,
          )
      )
        errors.push("Termine: Bitte Datum (TT.MM.JJJJ) und Uhrzeit (HH:MM) korrekt angeben")
      if (schedule.get().some((item) => !cmsEventMaxPerOrderValid(item.maxPerOrder.get(), item.capacity.get())))
        errors.push("Termine: Bitte eine gültige maximale Ticketzahl pro Bestellung angeben")
      if (agendaEntries.some(agendaInvalid))
        errors.push("Ablauf: Bitte eine gültige Uhrzeit (HH:MM) oder positive Tageszahl angeben")
      if (faqEntries.some((item) => !item.question.trim() || !item.answer.trim()))
        errors.push("FAQ: Bitte Frage und Antwort für alle Einträge angeben")
      if (errors.length) {
        notice.set(errors.join(" · "))
        return
      }
      for (const list of Object.values(textLists))
        list.set(
          list
            .get()
            .map((item) => item.trim())
            .filter(Boolean),
        )
      faq.set(faqEntries)
      agenda.set(agendaEntries)
      notice.set("Demo – Änderungen werden nicht gespeichert")
    },
    back: () => cmsNavigate("content-types", "event"),
  }
}

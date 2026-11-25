import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsEventDateGermanFormat } from "./cmsEventDateGermanFormat.js"
import { cmsEventDateGermanParse } from "./cmsEventDateGermanParse.js"
import type { cmsEvents } from "./cmsEvents.js"
import { cmsEventTimeGermanParse } from "./cmsEventTimeGermanParse.js"

export function cmsEventEditStateCreate(event: ReturnType<typeof cmsEvents.get>[number]) {
  const title = createSignalObject(event.title)
  const date = createSignalObject(event.date)
  const dateText = createSignalObject(cmsEventDateGermanFormat(event.date))
  const time = createSignalObject(event.time)
  const timeText = createSignalObject(event.time)
  const location = createSignalObject(event.location)
  const capacity = createSignalObject(String(event.capacity))
  const featured = createSignalObject(event.featured)
  const description = createSignalObject(event.description)
  const notice = createSignalObject("")
  return {
    title: () => title.get(),
    titleSet: (value: string) => title.set(value),
    date: () => date.get(),
    dateText: () => dateText.get(),
    dateTextSet: (value: string) => {
      notice.set("")
      dateText.set(value)
      const parsed = cmsEventDateGermanParse(value)
      if (parsed) date.set(parsed)
    },
    datePick: (iso: string) => {
      notice.set("")
      date.set(iso)
      dateText.set(cmsEventDateGermanFormat(iso))
    },
    dateValid: () => cmsEventDateGermanParse(dateText.get()) !== undefined,
    time: () => time.get(),
    timeText: () => timeText.get(),
    timeTextSet: (value: string) => {
      notice.set("")
      timeText.set(value)
      const parsed = cmsEventTimeGermanParse(value)
      if (parsed) time.set(parsed)
    },
    timeValid: () => cmsEventTimeGermanParse(timeText.get()) !== undefined,
    location: () => location.get(),
    locationSet: (value: string) => location.set(value),
    capacity: () => capacity.get(),
    capacitySet: (value: string) => capacity.set(value),
    featured: () => featured.get(),
    featuredSet: (value: boolean) => featured.set(value),
    description: () => description.get(),
    descriptionSet: (value: string) => description.set(value),
    notice: () => notice.get(),
    save: () =>
      notice.set(
        cmsEventDateGermanParse(dateText.get()) && cmsEventTimeGermanParse(timeText.get())
          ? "Demo – Änderungen werden nicht gespeichert"
          : "Bitte Datum (TT.MM.JJJJ) und Uhrzeit (HH:MM) korrekt angeben",
      ),
    back: () => cmsNavigate("content-types", "event"),
  }
}

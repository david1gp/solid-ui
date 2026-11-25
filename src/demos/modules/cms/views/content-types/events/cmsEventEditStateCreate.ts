import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import type { cmsEvents } from "./cmsEvents.js"

export function cmsEventEditStateCreate(event: ReturnType<typeof cmsEvents.get>[number]) {
  const title = createSignalObject(event.title)
  const date = createSignalObject(event.date)
  const time = createSignalObject(event.time)
  const location = createSignalObject(event.location)
  const capacity = createSignalObject(String(event.capacity))
  const featured = createSignalObject(event.featured)
  const description = createSignalObject(event.description)
  const notice = createSignalObject("")
  return {
    title: () => title.get(),
    titleSet: (value: string) => title.set(value),
    date: () => date.get(),
    dateSet: (value: string) => date.set(value),
    time: () => time.get(),
    timeSet: (value: string) => time.set(value),
    location: () => location.get(),
    locationSet: (value: string) => location.set(value),
    capacity: () => capacity.get(),
    capacitySet: (value: string) => capacity.set(value),
    featured: () => featured.get(),
    featuredSet: (value: boolean) => featured.set(value),
    description: () => description.get(),
    descriptionSet: (value: string) => description.set(value),
    notice: () => notice.get(),
    save: () => notice.set("Demo – Änderungen werden nicht gespeichert"),
    back: () => cmsNavigate("content-types", "event"),
  }
}

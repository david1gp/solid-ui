import { cmsEvents } from "./cmsEvents.js"
import { cmsEventsSorted } from "./cmsEventsSorted.js"

export const cmsEventOrder = {
  get: () => cmsEventsSorted().map((event) => event.id),
  set: (ids: string[]) => {
    const positions = new Map(ids.map((id, index) => [id, index + 1]))
    cmsEvents.set(cmsEvents.get().map((event) => ({ ...event, position: positions.get(event.id) ?? event.position })))
  },
}

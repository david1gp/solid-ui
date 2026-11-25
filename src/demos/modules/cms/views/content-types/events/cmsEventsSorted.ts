import { cmsEvents } from "./cmsEvents.js"

export const cmsEventsSorted = () => [...cmsEvents.get()].sort((a, b) => a.position - b.position)

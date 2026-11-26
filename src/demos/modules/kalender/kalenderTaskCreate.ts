import { kalenderColorResolve } from "./kalenderColorResolve.js"
import type { KalenderTask } from "./KalenderTask.js"

export function kalenderTaskCreate(input: {
  id: string
  title: string
  allDay: boolean
  start: string
  end: string
  people?: string[]
  colorKey?: string
}): KalenderTask {
  const colorKey = input.colorKey ?? "Automatisch"
  const color = kalenderColorResolve(input.title, colorKey)
  return {
    ...color,
    colorManual: colorKey !== "Automatisch",
    id: input.id,
    title: input.title,
    allDay: input.allDay,
    start: input.start,
    end: input.end,
    meta: input.allDay ? "Ganztägig" : `${input.start}–${input.end}`,
    people: input.people ?? [],
  }
}

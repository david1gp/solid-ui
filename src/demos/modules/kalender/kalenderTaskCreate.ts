import { kalenderColors } from "./kalenderColors.js"
import type { KalenderTask } from "./KalenderTask.js"

export function kalenderTaskCreate(input: {
  id: string
  title: string
  allDay: boolean
  start: string
  end: string
  people?: string[]
  color?: (typeof kalenderColors)[number]
}): KalenderTask {
  const color =
    input.color ??
    kalenderColors[[...input.title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % kalenderColors.length]!
  return {
    ...color,
    id: input.id,
    title: input.title,
    allDay: input.allDay,
    start: input.start,
    end: input.end,
    meta: input.allDay ? "Ganztägig" : `${input.start}–${input.end}`,
    people: input.people ?? [],
  }
}

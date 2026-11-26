import { kalenderColors } from "./kalenderColors.js"
import type { KalenderTask } from "./KalenderTask.js"

export function kalenderTaskCreate(input: {
  title: string
  time: string
  duration: number
  people?: string[]
  color?: (typeof kalenderColors)[number]
}): KalenderTask {
  const color =
    input.color ??
    kalenderColors[[...input.title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % kalenderColors.length]!
  return {
    ...color,
    title: input.title,
    time: input.time,
    duration: input.duration,
    meta: `${input.time} · ${input.duration} Min`,
    people: input.people ?? [],
  }
}

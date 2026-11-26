import { kalenderColors } from "./kalenderColors.js"
import { kalenderDurations } from "./kalenderDurations.js"
import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTaskCreate } from "./kalenderTaskCreate.js"
import { kalenderTitles } from "./kalenderTitles.js"

export function kalenderEventsCreate(year: number, month: number): KalenderTask[][] {
  let seed = (year * 100 + month + 1) >>> 0
  const random = (max: number) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return Math.floor((seed / 4294967296) * max)
  }
  const total = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: total }, (_, index) => {
    const weekday = new Date(year, month, index + 1).getDay()
    const count = random(weekday === 0 || weekday === 6 ? 3 : 6)
    return Array.from({ length: count }, () => {
      const title = kalenderTitles[random(kalenderTitles.length)]!
      const color = kalenderColors[random(kalenderColors.length)]!
      const hour = 8 + random(10)
      const minute = random(4) * 15
      const duration = kalenderDurations[random(kalenderDurations.length)]!
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      return kalenderTaskCreate({ title, time, duration, color })
    }).sort((a, b) => a.time.localeCompare(b.time))
  })
}

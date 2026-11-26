import { kalenderDateKey } from "./kalenderDateKey.js"
import { kalenderDurations } from "./kalenderDurations.js"
import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTaskCreate } from "./kalenderTaskCreate.js"
import { kalenderTasksSort } from "./kalenderTasksSort.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"
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
    const key = kalenderDateKey(year, month, index + 1)
    return kalenderTasksSort(
      Array.from({ length: count }, (_, taskIndex) => {
        const baseTitle = kalenderTitles[random(kalenderTitles.length)]!
        const names = ["Müller", "Schmidt", "Weber", "Fischer"]
        const title =
          baseTitle === "Kundenanruf" || baseTitle === "Kundentermin"
            ? `${baseTitle} (${names[random(names.length)]})`
            : baseTitle
        const start = (8 + random(10)) * 60 + random(4) * 15
        const duration = kalenderDurations[random(kalenderDurations.length)]!
        return kalenderTaskCreate({
          id: `${key}-g${taskIndex}`,
          title,
          allDay: false,
          start: kalenderTimeFromMinutes(start),
          end: kalenderTimeFromMinutes(start + duration),
        })
      }),
    )
  })
}

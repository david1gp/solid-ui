import type { KalenderTask } from "./KalenderTask.js"

/** All-day appointments first, then by start and end time. */
export function kalenderTasksSort(tasks: KalenderTask[]) {
  return [...tasks].sort(
    (a, b) => Number(b.allDay) - Number(a.allDay) || a.start.localeCompare(b.start) || a.end.localeCompare(b.end),
  )
}

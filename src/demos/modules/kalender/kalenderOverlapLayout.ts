import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTimeMinutes } from "./kalenderTimeMinutes.js"

/** Assign columns within each connected cluster of overlapping timed appointments. */
export function kalenderOverlapLayout(tasks: KalenderTask[]) {
  const sorted = tasks
    .filter((task) => !task.allDay)
    .map((task) => ({ task, start: kalenderTimeMinutes(task.start), end: kalenderTimeMinutes(task.end) }))
    .filter((item) => Number.isFinite(item.start) && item.end > item.start)
    .sort((a, b) => a.start - b.start || a.end - b.end)
  const result: { task: KalenderTask; start: number; end: number; column: number; columns: number }[] = []
  let cluster: typeof result = []
  let ends: number[] = []
  const flush = () => {
    for (const item of cluster) item.columns = ends.length
    result.push(...cluster)
    cluster = []
    ends = []
  }
  for (const item of sorted) {
    if (ends.length && ends.every((end) => end <= item.start)) flush()
    let column = ends.findIndex((end) => end <= item.start)
    if (column < 0) column = ends.length
    ends[column] = item.end
    cluster.push({ ...item, column, columns: 1 })
  }
  flush()
  return result
}

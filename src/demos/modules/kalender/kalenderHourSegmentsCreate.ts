import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTimeMinutes } from "./kalenderTimeMinutes.js"

/** Build hour-sized rows, folding consecutive empty hours across all visible days. */
export function kalenderHourSegmentsCreate(tasks: KalenderTask[]) {
  const timed = tasks
    .filter((task) => !task.allDay)
    .map((task) => ({
      start: kalenderTimeMinutes(task.start),
      end: kalenderTimeMinutes(task.end),
    }))
    .filter(
      ({ start, end }) => Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end <= 1440 && end > start,
    )
  const firstHour = timed.length ? Math.floor(Math.min(...timed.map((item) => item.start)) / 60) * 60 : 480
  const lastHour = timed.length ? Math.ceil(Math.max(...timed.map((item) => item.end)) / 60) * 60 : 720
  let start = timed.length ? Math.max(0, firstHour - 60) : 480
  const end = timed.length ? Math.min(1440, Math.max(lastHour + 60, start + 240)) : 720
  start = Math.max(0, Math.min(start, end - 240))
  const segments: { startMinute: number; endMinute: number; collapsed: boolean; top: number; height: number }[] = []
  let top = 0
  for (let minute = start; minute < end; ) {
    const empty = !timed.some((item) => item.start < minute + 60 && item.end > minute)
    let emptyEnd = minute + 60
    if (empty && timed.length) {
      while (emptyEnd < end && !timed.some((item) => item.start < emptyEnd + 60 && item.end > emptyEnd)) emptyEnd += 60
    }
    const collapsed = empty && minute >= firstHour && emptyEnd <= lastHour && emptyEnd - minute >= 120
    const endMinute = collapsed ? emptyEnd : minute + 60
    const height = collapsed ? 20 : 48
    segments.push({ startMinute: minute, endMinute, collapsed, top, height })
    top += height
    minute = endMinute
  }
  return segments
}

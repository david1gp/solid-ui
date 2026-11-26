import type { kalenderHourSegmentsCreate } from "./kalenderHourSegmentsCreate.js"

export function kalenderHourMinuteToY(segments: ReturnType<typeof kalenderHourSegmentsCreate>, minute: number) {
  const segment = segments.find((item) => minute >= item.startMinute && minute < item.endMinute)
  if (segment)
    return segment.top + ((minute - segment.startMinute) / (segment.endMinute - segment.startMinute)) * segment.height
  const last = segments.at(-1)
  if (last && minute === last.endMinute) return last.top + last.height
  return undefined
}

import type { kalenderHourSegmentsCreate } from "./kalenderHourSegmentsCreate.js"

export function kalenderHourYToMinute(segments: ReturnType<typeof kalenderHourSegmentsCreate>, y: number) {
  const segment = segments.find((item) => y >= item.top && y < item.top + item.height)
  if (!segment || segment.collapsed) return undefined
  return segment.startMinute + ((y - segment.top) / segment.height) * (segment.endMinute - segment.startMinute)
}

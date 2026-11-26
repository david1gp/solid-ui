import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"

/** Appointments in chronological order (ISO date and HH:MM sort lexicographically). */
export function cmsEventScheduleSorted<T extends Pick<CmsEventScheduleEntry, "date" | "time">>(schedule: readonly T[]) {
  return [...schedule].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
}

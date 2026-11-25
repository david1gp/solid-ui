import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"

/** Appointments in chronological order (ISO date and HH:MM sort lexicographically). */
export function cmsEventScheduleSorted(schedule: readonly CmsEventScheduleEntry[]) {
  return [...schedule].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
}

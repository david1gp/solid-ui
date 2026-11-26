import { cmsDateIso } from "../../../ui/cmsDateIso.js"
import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"

/** Suggestion for a newly added appointment: the day after `last`, same time. */
export function cmsEventScheduleNext(
  last: Pick<CmsEventScheduleEntry, "date" | "time"> | undefined,
): CmsEventScheduleEntry {
  if (!last) return { date: cmsDateIso(new Date()), time: "10:00", unlockCodeRequired: false }
  const date = new Date(`${last.date}T12:00:00`)
  date.setDate(date.getDate() + 1)
  return { date: cmsDateIso(date), time: last.time, unlockCodeRequired: false }
}

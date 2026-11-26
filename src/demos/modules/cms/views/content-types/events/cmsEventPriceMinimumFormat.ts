import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"

export function cmsEventPriceMinimumFormat(schedule: readonly Pick<CmsEventScheduleEntry, "priceRegular" | "priceReduced">[]) {
  const prices = schedule.flatMap((entry) => [entry.priceRegular, entry.priceReduced])
    .filter((price): price is number => price !== undefined && Number.isFinite(price) && price >= 0)
  if (prices.length === 0) return undefined
  const minimum = Math.min(...prices)
  return `ab ${new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: Number.isInteger(minimum) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(minimum)} €`
}

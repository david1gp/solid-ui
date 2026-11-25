/** 42 days (6 weeks, Monday first) covering the month of `month`. */
export function cmsDatePickerDays(month: Date) {
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - ((month.getDay() + 6) % 7))
  return Array.from(
    { length: 42 },
    (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index),
  )
}

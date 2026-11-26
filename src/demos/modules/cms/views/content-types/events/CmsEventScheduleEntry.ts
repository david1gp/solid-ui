/** One appointment of an event: ISO date (YYYY-MM-DD) and 24-hour time (HH:MM). */
export type CmsEventScheduleEntry = {
  date: string
  time: string
  capacity?: number
  priceRegular?: number
  priceReduced?: number
}

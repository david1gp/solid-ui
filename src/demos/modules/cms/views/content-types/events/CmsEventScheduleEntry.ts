/** One appointment of an event: ISO date (YYYY-MM-DD) and 24-hour time (HH:MM). */
export type CmsEventScheduleEntry = {
  date: string
  time: string
  title?: string
  maxPerOrder?: number
  description?: string
  unlockCodeRequired: boolean
  capacity?: number
  priceRegular?: number
  priceReduced?: number
}

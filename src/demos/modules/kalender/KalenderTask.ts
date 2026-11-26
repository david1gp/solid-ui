export type KalenderTask = {
  /** Stable id; starts with the local date key (`YYYY-MM-DD-…`). */
  id: string
  color: string
  name: string
  title: string
  allDay: boolean
  /** `HH:MM`, ignored for all-day appointments. */
  start: string
  /** `HH:MM`, after `start`. */
  end: string
  /** "Ganztägig" or "09:00–10:30". */
  meta: string
  /** Team member names or e-mail addresses of external people. */
  people: string[]
}

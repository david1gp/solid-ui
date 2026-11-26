/** Minutes since midnight → `HH:MM`, clamped to the same day (00:00–23:59). */
export function kalenderTimeFromMinutes(minutes: number) {
  const clamped = Math.min(Math.max(Math.round(minutes), 0), 23 * 60 + 59)
  return `${String(Math.floor(clamped / 60)).padStart(2, "0")}:${String(clamped % 60).padStart(2, "0")}`
}

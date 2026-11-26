export function kalenderDateShift(date: Date, view: string, delta: number) {
  if (view === "Monat") {
    const last = new Date(date.getFullYear(), date.getMonth() + delta + 1, 0).getDate()
    return new Date(date.getFullYear(), date.getMonth() + delta, Math.min(date.getDate(), last))
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta * (view === "Woche" ? 7 : 1))
}

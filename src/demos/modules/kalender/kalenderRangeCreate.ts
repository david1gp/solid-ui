export function kalenderRangeCreate(cursor: Date, view: string) {
  const date = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate())
  if (view === "Monat") {
    const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7
    const total = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return Array.from({ length: Math.ceil((offset + total) / 7) * 7 }, (_, index) => {
      const day = index - offset + 1
      return day > 0 && day <= total ? new Date(date.getFullYear(), date.getMonth(), day) : undefined
    })
  }
  if (view === "Woche") {
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7))
    return Array.from(
      { length: 7 },
      (_, index) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + index),
    )
  }
  return [date]
}

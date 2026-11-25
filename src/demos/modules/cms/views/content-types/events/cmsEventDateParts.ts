export function cmsEventDateParts(date: string) {
  const value = new Date(`${date}T12:00:00`)
  return {
    day: value.toLocaleDateString("de-DE", { day: "2-digit" }),
    month: value.toLocaleDateString("de-DE", { month: "short" }).replace(".", ""),
    long: value.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "long", year: "numeric" }),
  }
}

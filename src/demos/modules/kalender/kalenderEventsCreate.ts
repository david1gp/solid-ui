const titles = [
  "Teammeeting",
  "Kundentermin",
  "Sprint-Planung",
  "Zahnarzt",
  "Mittagessen mit Lisa",
  "Projekt-Review",
  "Workshop",
  "Telefonat",
  "Präsentation",
  "1:1-Gespräch",
  "Code-Review",
  "Geburtstag",
]
const colors = [
  { color: "#d575d4", name: "Lila" },
  { color: "#ed967b", name: "Koralle" },
  { color: "#b4d5bd", name: "Grün" },
  { color: "#c1afda", name: "Lavendel" },
  { color: "#ed9dbc", name: "Rosa" },
  { color: "#5bcfe0", name: "Cyan" },
]

export function kalenderEventsCreate(year: number, month: number) {
  let seed = (year * 100 + month + 1) >>> 0
  const random = (max: number) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return Math.floor((seed / 4294967296) * max)
  }
  const total = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: total }, (_, index) => {
    const weekday = new Date(year, month, index + 1).getDay()
    const count = random(weekday === 0 || weekday === 6 ? 3 : 6)
    return Array.from({ length: count }, () => {
      const title = titles[random(titles.length)]!
      const color = colors[random(colors.length)]!
      const hour = 8 + random(10)
      const minute = random(4) * 15
      const duration = [15, 30, 45, 60, 90][random(5)]
      return {
        ...color,
        title,
        meta: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} · ${duration} Min`,
      }
    }).sort((a, b) => a.meta.localeCompare(b.meta))
  })
}

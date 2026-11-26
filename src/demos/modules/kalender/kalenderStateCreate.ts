import { onSettled } from "solid-js"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const tasks = [
  { day: 2, title: "BareMinerals", color: "#d575d4", name: "Lila", count: 0 },
  { day: 3, title: "CosmoProf", color: "#ed967b", name: "Koralle", count: 5 },
  { day: 7, title: "Bobbi Brown", color: "#b4d5bd", name: "Grün", count: 1 },
  { day: 8, title: "Napoleon Perdis", color: "#c1afda", name: "Lavendel", count: 0 },
  { day: 14, title: "Yves Saint Laurent", color: "#ed967b", name: "Koralle", count: 0 },
  { day: 20, title: "Napoleon Perdis", color: "#ed9dbc", name: "Rosa", count: 2 },
  { day: 22, title: "Palm Angels", color: "#ed9dbc", name: "Rosa", count: 1 },
  { day: 23, title: "Estee Lauder", color: "#ed967b", name: "Koralle", count: 2 },
  { day: 24, title: "Yves Saint Laurent", color: "#b4d5bd", name: "Grün", count: 1 },
  { day: 28, title: "Estee Lauder", color: "#5bcfe0", name: "Cyan", count: 2 },
  { day: 31, title: "Estee Lauder", color: "#5bcfe0", name: "Cyan", count: 1 },
].map((task, i) => ({
  ...task,
  borderColor: task.day === 3 || task.day === 23 ? "#ef6464" : task.day === 31 ? "#e8c85b" : "#55d6a4",
  meta: `${["Card06-250", "Card02-450", "Card02-03", "Card02-90", "Card02-35"][i % 5]} | Dauer ${[45, 30, 30, 40, 45][i % 5]} Min`,
}))

export function kalenderStateCreate() {
  onSettled(themeInit)
  const month = createSignalObject(new Date(2020, 3, 1))
  const view = createSignalObject("Monat")
  const openDay = createSignalObject<number | undefined>(undefined)
  const days = () => {
    const date = month.get()
    const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7
    const total = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const length = Math.ceil((offset + total) / 7) * 7
    return Array.from({ length }, (_, index) => {
      const day = index - offset + 1
      return {
        index,
        day: day > 0 && day <= total ? day : undefined,
        task:
          day > 0 && day <= total && date.getFullYear() === 2020 && date.getMonth() === 3
            ? tasks.find((task) => task.day === day)
            : undefined,
      }
    })
  }
  return {
    days,
    openDay: openDay.get,
    monthLabel: () => month.get().toLocaleDateString("de-DE", { month: "long", year: "numeric" }),
    view: view.get,
    selectView: (value: string) => view.set(value),
    changeMonth: (delta: number) => {
      const date = month.get()
      month.set(new Date(date.getFullYear(), date.getMonth() + delta, 1))
      openDay.set(undefined)
    },
    setOpenDay: (day: number | undefined) => openDay.set(day),
    dateLabel: (day: number) =>
      new Date(month.get().getFullYear(), month.get().getMonth(), day).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
  }
}

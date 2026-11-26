import { createMemo, onSettled } from "solid-js"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderEventsCreate } from "./kalenderEventsCreate.js"

function weekNumber(date: Date) {
  const day = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7))
  const start = new Date(Date.UTC(day.getUTCFullYear(), 0, 1))
  return Math.ceil(((day.getTime() - start.getTime()) / 86400000 + 1) / 7)
}

export function kalenderStateCreate() {
  onSettled(themeInit)
  // Render the same placeholder on the server and during hydration; read local time after mount.
  const today = createSignalObject<Date | undefined>(undefined)
  const month = createSignalObject<Date | undefined>(undefined)
  onSettled(() => {
    const now = new Date()
    today.set(now)
    month.set(new Date(now.getFullYear(), now.getMonth(), 1))
  })
  const view = createSignalObject("Monat")
  const openDay = createSignalObject<number | undefined>(undefined)
  const events = createMemo(() => {
    const date = month.get()
    return date ? kalenderEventsCreate(date.getFullYear(), date.getMonth()) : []
  })
  const currentMonth = () => {
    const date = month.get()
    const now = today.get()
    return !!date && !!now && date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
  }
  const days = () => {
    const date = month.get()
    if (!date) return []
    const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7
    const total = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const length = Math.ceil((offset + total) / 7) * 7
    return Array.from({ length }, (_, index) => {
      const day = index - offset + 1
      const valid = day > 0 && day <= total
      return {
        index,
        day: valid ? day : undefined,
        week: weekNumber(new Date(date.getFullYear(), date.getMonth(), day)),
        isToday: valid && currentMonth() && today.get()?.getDate() === day,
        tasks: valid ? (events()[day - 1] ?? []) : [],
      }
    })
  }
  return {
    days,
    openDay: openDay.get,
    monthLabel: () => month.get()?.toLocaleDateString("de-DE", { month: "long", year: "numeric" }) ?? "",
    todayWeekday: () => (currentMonth() ? (today.get()!.getDay() + 6) % 7 : -1),
    todayLabel: () => {
      const now = today.get()
      if (!now) return ""
      const count = kalenderEventsCreate(now.getFullYear(), now.getMonth())[now.getDate() - 1]?.length ?? 0
      return count === 0
        ? "Keine Aufgaben für heute geplant"
        : `${count} ${count === 1 ? "Aufgabe" : "Aufgaben"} für heute geplant`
    },
    view: view.get,
    selectView: (value: string) => {
      if (value === "Heute") {
        const now = new Date()
        today.set(now)
        month.set(new Date(now.getFullYear(), now.getMonth(), 1))
        openDay.set(undefined)
        return
      }
      view.set(value)
    },
    changeMonth: (delta: number) => {
      const date = month.get()
      if (!date) return
      month.set(new Date(date.getFullYear(), date.getMonth() + delta, 1))
      openDay.set(undefined)
    },
    setOpenDay: (day: number | undefined) => openDay.set(day),
    dateLabel: (day: number) => {
      const date = month.get()
      return date
        ? new Date(date.getFullYear(), date.getMonth(), day).toLocaleDateString("de-DE", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : ""
    },
  }
}

import { createMemo, onSettled } from "solid-js"
import * as v from "valibot"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderCreateFormStateCreate } from "./kalenderCreateFormStateCreate.js"
import { kalenderDateKey } from "./kalenderDateKey.js"
import { kalenderDateKeySchema } from "./kalenderDateKeySchema.js"
import { kalenderEventsCreate } from "./kalenderEventsCreate.js"
import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTaskCreate } from "./kalenderTaskCreate.js"

const createParam = "termin"

function createParamWrite(key: string | undefined) {
  const url = new URL(window.location.href)
  if (key) url.searchParams.set(createParam, key)
  else url.searchParams.delete(createParam)
  window.history.replaceState(window.history.state, "", url)
}

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
  const view = createSignalObject("Monat")
  const openDay = createSignalObject<number | undefined>(undefined)
  // Appointments added in this session, keyed by local date (`YYYY-MM-DD`).
  const added = createSignalObject<Record<string, KalenderTask[]>>({})
  // Day of the displayed month whose "Neuer Termin" dialog is open.
  const createDay = createSignalObject<number | undefined>(undefined)
  const form = kalenderCreateFormStateCreate()
  onSettled(() => {
    const now = new Date()
    today.set(now)
    month.set(new Date(now.getFullYear(), now.getMonth(), 1))
    // Restore an open "Neuer Termin" dialog from the URL, e.g. `?termin=2026-11-26`.
    const param = v.safeParse(kalenderDateKeySchema, new URL(window.location.href).searchParams.get(createParam))
    if (!param.success) return
    const [year, monthIndex, day] = param.output.split("-").map(Number) as [number, number, number]
    if (new Date(year, monthIndex - 1, day).getMonth() !== monthIndex - 1) return createParamWrite(undefined)
    month.set(new Date(year, monthIndex - 1, 1))
    createDay.set(day)
  })
  const dayKey = (day: number) => {
    const date = month.get()
    return date ? kalenderDateKey(date.getFullYear(), date.getMonth(), day) : ""
  }
  const tasksFor = (generated: KalenderTask[], key: string) => {
    const extra = added.get()[key]
    return extra ? [...generated, ...extra].sort((a, b) => a.time.localeCompare(b.time)) : generated
  }
  const createOpen = (day: number) => {
    form.reset()
    openDay.set(undefined)
    createDay.set(day)
    createParamWrite(dayKey(day))
  }
  const createClose = () => {
    createDay.set(undefined)
    createParamWrite(undefined)
  }
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
        tasks: valid ? tasksFor(events()[day - 1] ?? [], dayKey(day)) : [],
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
      const generated = kalenderEventsCreate(now.getFullYear(), now.getMonth())[now.getDate() - 1] ?? []
      const count = tasksFor(generated, kalenderDateKey(now.getFullYear(), now.getMonth(), now.getDate())).length
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
        createClose()
        return
      }
      view.set(value)
    },
    changeMonth: (delta: number) => {
      const date = month.get()
      if (!date) return
      month.set(new Date(date.getFullYear(), date.getMonth() + delta, 1))
      openDay.set(undefined)
      createClose()
    },
    setOpenDay: (day: number | undefined) => openDay.set(day),
    form,
    createDay: createDay.get,
    createOpen,
    createOpenChange: (open: boolean) => {
      if (!open) createClose()
    },
    /** Opens the dialog for clicks on a day cell's free area, not on its buttons or markers. */
    cellClick: (event: MouseEvent, day: number | undefined) => {
      if (day === undefined) return
      const target = event.target as Element
      if (target.closest("button, a, input, select, [tabindex]")) return
      createOpen(day)
    },
    createSubmit: (event: SubmitEvent) => {
      event.preventDefault()
      const day = createDay.get()
      if (day === undefined) return
      const input = form.validate()
      if (!input) return
      const key = dayKey(day)
      const current = added.get()
      added.set({ ...current, [key]: [...(current[key] ?? []), kalenderTaskCreate(input)] })
      createClose()
    },
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

import { createMemo, onCleanup, onSettled } from "solid-js"
import * as v from "valibot"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderDateKey } from "./kalenderDateKey.js"
import { kalenderDateShift } from "./kalenderDateShift.js"
import { kalenderRangeCreate } from "./kalenderRangeCreate.js"
import { kalenderDateKeySchema } from "./kalenderDateKeySchema.js"
import { kalenderEventsCreate } from "./kalenderEventsCreate.js"
import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTaskCreate } from "./kalenderTaskCreate.js"
import { kalenderTaskFormStateCreate } from "./kalenderTaskFormStateCreate.js"
import { kalenderTasksSort } from "./kalenderTasksSort.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"

// Search params for the open dialog: `?termin=2026-11-26` (new) or `?terminBearbeiten=2026-11-26-g2` (edit).
const createParam = "termin"
const editParam = "terminBearbeiten"
const toastDurationMs = 6000

type Dialog = { mode: "create"; day: number } | { mode: "edit"; day: number; id: string }
type Overrides = Record<string, KalenderTask[]>

function dialogParamWrite(dialog: { mode: "create" | "edit"; value: string } | undefined) {
  const url = new URL(window.location.href)
  url.searchParams.delete(createParam)
  url.searchParams.delete(editParam)
  if (dialog) url.searchParams.set(dialog.mode === "create" ? createParam : editParam, dialog.value)
  window.history.replaceState(window.history.state, "", url)
}

/** `YYYY-MM-DD` → [year, monthIndex, day] for an existing date, else undefined. */
function dateKeyParse(value: string | null) {
  const parsed = v.safeParse(kalenderDateKeySchema, value?.slice(0, 10))
  if (!parsed.success) return undefined
  const [year, month, day] = parsed.output.split("-").map(Number) as [number, number, number]
  return new Date(year, month - 1, day).getMonth() === month - 1 ? ([year, month - 1, day] as const) : undefined
}

/** Next half hour after `now`, between 08:00 and 22:00. */
function startAfter(now: Date) {
  const next = Math.ceil((now.getHours() * 60 + now.getMinutes() + 1) / 30) * 30
  return kalenderTimeFromMinutes(Math.min(Math.max(next, 8 * 60), 22 * 60))
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
  const cursor = createSignalObject<Date | undefined>(undefined)
  const view = createSignalObject("Monat")
  const openDay = createSignalObject<number | undefined>(undefined)
  const quickDay = createSignalObject<number | undefined>(undefined)
  // Days changed in this session (created, edited, deleted), keyed by local date; replace generated appointments.
  const overrides = createSignalObject<Overrides>({})
  const dialog = createSignalObject<Dialog | undefined>(undefined)
  const toast = createSignalObject<{ message: string; undo: Overrides } | undefined>(undefined)
  let toastTimer: ReturnType<typeof setTimeout> | undefined
  let idCounter = 0
  const form = kalenderTaskFormStateCreate()

  const events = createMemo(() => {
    const date = month.get()
    if (!date) return new Map<string, KalenderTask[][]>()
    return new Map(
      [-1, 0, 1].map((offset) => {
        const target = new Date(date.getFullYear(), date.getMonth() + offset, 1)
        return [
          `${target.getFullYear()}-${target.getMonth()}`,
          kalenderEventsCreate(target.getFullYear(), target.getMonth()),
        ]
      }),
    )
  })
  const dayDate = (day: number) => {
    const date = month.get()
    return date ? new Date(date.getFullYear(), date.getMonth(), day) : undefined
  }
  const dayKey = (day: number) => {
    const date = dayDate(day)
    return date ? kalenderDateKey(date.getFullYear(), date.getMonth(), date.getDate()) : ""
  }
  const dayTasks = (day: number) => {
    const date = dayDate(day)
    return date
      ? (overrides.get()[dayKey(day)] ??
          events().get(`${date.getFullYear()}-${date.getMonth()}`)?.[date.getDate() - 1] ??
          [])
      : []
  }
  /** Next half hour for today, otherwise 09:00. */
  const defaultStart = (day: number) => {
    const now = today.get()
    const date = dayDate(day)
    return now && date && date.toDateString() === now.toDateString() ? startAfter(now) : "09:00"
  }

  const toastShow = (message: string, undo: Overrides) => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.set({ message, undo })
    toastTimer = setTimeout(() => toast.set(undefined), toastDurationMs)
  }
  const toastClose = () => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.set(undefined)
  }
  onCleanup(() => {
    if (toastTimer) clearTimeout(toastTimer)
  })

  const dialogClose = () => {
    dialog.set(undefined)
    dialogParamWrite(undefined)
  }
  const createOpen = (day: number, start?: string) => {
    quickDay.set(undefined)
    form.reset(start ?? defaultStart(day))
    openDay.set(undefined)
    dialog.set({ mode: "create", day })
    dialogParamWrite({ mode: "create", value: dayKey(day) })
  }
  const quickOpen = (day: number) => {
    if (window.matchMedia("(max-width: 639px)").matches) return createOpen(day)
    form.reset(defaultStart(day))
    openDay.set(undefined)
    quickDay.set(day)
  }
  const editOpen = (day: number, id: string) => {
    quickDay.set(undefined)
    const task = dayTasks(day).find((entry) => entry.id === id)
    if (!task) return
    form.load(task)
    openDay.set(undefined)
    dialog.set({ mode: "edit", day, id })
    dialogParamWrite({ mode: "edit", value: id })
  }
  const dayTasksSet = (day: number, tasks: KalenderTask[], message: string) => {
    const previous = overrides.get()
    overrides.set({ ...previous, [dayKey(day)]: kalenderTasksSort(tasks) })
    toastShow(message, previous)
  }

  onSettled(() => {
    const now = new Date()
    today.set(now)
    month.set(new Date(now.getFullYear(), now.getMonth(), 1))
    cursor.set(now)
    // Restore an open dialog from the URL. Writes are batched until the next flush, so this
    // block derives everything from the parsed date instead of reading the `month` signal back.
    const params = new URL(window.location.href).searchParams
    const editId = params.get(editParam)
    const target = dateKeyParse(editId ?? params.get(createParam))
    if (!target) return dialogParamWrite(undefined)
    const [year, monthIndex, day] = target
    month.set(new Date(year, monthIndex, 1))
    cursor.set(new Date(year, monthIndex, day))
    if (!editId) {
      const isToday = year === now.getFullYear() && monthIndex === now.getMonth() && day === now.getDate()
      form.reset(isToday ? startAfter(now) : "09:00")
      dialog.set({ mode: "create", day })
      return
    }
    const task = kalenderEventsCreate(year, monthIndex)[day - 1]?.find((entry) => entry.id === editId)
    if (!task) return dialogParamWrite(undefined)
    form.load(task)
    dialog.set({ mode: "edit", day, id: editId })
  })

  const days = () => {
    const date = month.get()
    if (!date) return []
    const reference = cursor.get()
    if (!reference) return []
    return kalenderRangeCreate(reference, view.get()).map((cellDate, index) => {
      const day = cellDate
        ? Math.round(
            (Date.UTC(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()) -
              Date.UTC(date.getFullYear(), date.getMonth(), 1)) /
              86400000,
          ) + 1
        : undefined
      return {
        index,
        day,
        displayDay: cellDate?.getDate(),
        week: weekNumber(
          cellDate ??
            new Date(
              date.getFullYear(),
              date.getMonth(),
              index - ((new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7) + 1,
            ),
        ),
        isToday: !!cellDate && cellDate.toDateString() === today.get()?.toDateString(),
        tasks: day !== undefined ? kalenderTasksSort(dayTasks(day)) : [],
      }
    })
  }

  return {
    days,
    openDay: openDay.get,
    quickDay: quickDay.get,
    quickOpenChange: (open: boolean) => {
      if (!open) quickDay.set(undefined)
    },
    quickOpen,
    quickMore: () => {
      const day = quickDay.get()
      if (day === undefined) return
      quickDay.set(undefined)
      let timer: ReturnType<typeof setTimeout> | undefined
      const open = () => {
        document.removeEventListener("focusin", open)
        clearTimeout(timer)
        dialog.set({ mode: "create", day })
        dialogParamWrite({ mode: "create", value: dayKey(day) })
      }
      document.addEventListener("focusin", open)
      timer = setTimeout(open, 500)
    },
    monthLabel: () => {
      const date = cursor.get()
      if (!date) return ""
      if (view.get() === "Monat") return date.toLocaleDateString("de-DE", { month: "long", year: "numeric" })
      if (view.get() === "Woche") {
        const range = kalenderRangeCreate(date, "Woche")
        return `KW ${weekNumber(range[0]!)} · ${range[0]!.toLocaleDateString("de-DE")} – ${range[6]!.toLocaleDateString("de-DE")}`
      }
      return date.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    },
    todayWeekday: () => {
      const now = today.get()
      const date = cursor.get()
      if (!now || !date) return -1
      if (view.get() === "Monat") {
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
          ? (now.getDay() + 6) % 7
          : -1
      }
      return kalenderRangeCreate(date, view.get()).findIndex((day) => day?.toDateString() === now.toDateString())
    },
    todayLabel: () => {
      const now = today.get()
      if (!now) return ""
      const key = kalenderDateKey(now.getFullYear(), now.getMonth(), now.getDate())
      const generated = kalenderEventsCreate(now.getFullYear(), now.getMonth())[now.getDate() - 1] ?? []
      const count = (overrides.get()[key] ?? generated).length
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
        cursor.set(now)
        view.set("Heute")
        openDay.set(undefined)
        quickDay.set(undefined)
        dialogClose()
        return
      }
      quickDay.set(undefined)
      openDay.set(undefined)
      view.set(value)
    },
    changeMonth: (delta: number) => {
      const date = cursor.get()
      if (!date) return
      const next = kalenderDateShift(date, view.get(), delta)
      cursor.set(next)
      month.set(new Date(next.getFullYear(), next.getMonth(), 1))
      if (view.get() === "Heute") view.set("Tag")
      openDay.set(undefined)
      quickDay.set(undefined)
      dialogClose()
    },
    setOpenDay: (day: number | undefined) => openDay.set(day),
    form,
    dialog: dialog.get,
    isEditing: () => dialog.get()?.mode === "edit",
    createOpen,
    editOpen,
    /**
     * Opens the edit dialog from the "N weitere" popover. The popover first returns focus to its
     * trigger; a dialog opened before that would treat the focus change as outside focus and close.
     */
    popoverEditOpen: (day: number, id: string) => {
      openDay.set(undefined)
      let timer: ReturnType<typeof setTimeout> | undefined
      const open = () => {
        document.removeEventListener("focusin", open)
        clearTimeout(timer)
        editOpen(day, id)
      }
      document.addEventListener("focusin", open)
      timer = setTimeout(open, 500)
    },
    dialogOpenChange: (open: boolean) => {
      if (!open) dialogClose()
    },
    /** Opens the create dialog for clicks on a day cell's free area, not on its buttons or markers. */
    cellClick: (event: MouseEvent, day: number | undefined) => {
      if (day === undefined) return
      const target = event.target as Element
      const interactive = target.closest("button, a, input, select, [tabindex]")
      if (interactive && interactive !== event.currentTarget) return
      quickOpen(day)
    },
    dialogSubmit: (event: SubmitEvent) => {
      event.preventDefault()
      const quick = quickDay.get()
      const current = dialog.get() ?? (quick === undefined ? undefined : { mode: "create" as const, day: quick })
      if (!current) return
      const input = form.validate()
      if (!input) return
      const tasks = dayTasks(current.day)
      if (current.mode === "create") {
        idCounter += 1
        const task = kalenderTaskCreate({ ...input, id: `${dayKey(current.day)}-n${idCounter}` })
        dayTasksSet(current.day, [...tasks, task], `„${task.title}“ erstellt`)
        quickDay.set(undefined)
        if (dialog.get()) dialogClose()
        return
      }
      const previous = tasks.find((task) => task.id === current.id)
      const task = kalenderTaskCreate({
        ...input,
        id: current.id,
        color: previous ? { color: previous.color, name: previous.name } : undefined,
      })
      dayTasksSet(
        current.day,
        tasks.map((entry) => (entry.id === current.id ? task : entry)),
        `„${task.title}“ gespeichert`,
      )
      dialogClose()
    },
    dialogDelete: () => {
      const current = dialog.get()
      if (current?.mode !== "edit") return
      const tasks = dayTasks(current.day)
      const task = tasks.find((entry) => entry.id === current.id)
      dayTasksSet(
        current.day,
        tasks.filter((entry) => entry.id !== current.id),
        `„${task?.title ?? "Termin"}“ gelöscht`,
      )
      dialogClose()
    },
    toast: () => toast.get()?.message,
    toastUndo: () => {
      const current = toast.get()
      if (!current) return
      overrides.set(current.undo)
      toastClose()
    },
    toastClose,
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

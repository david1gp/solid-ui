import { untrack } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsDateIso } from "./cmsDateIso.js"
import { cmsDatePickerDays } from "./cmsDatePickerDays.js"

const monthOf = (iso: string) => {
  const date = new Date(`${iso}T12:00:00`)
  const valid = Number.isNaN(date.getTime()) ? new Date() : date
  return new Date(valid.getFullYear(), valid.getMonth(), 1)
}
export function cmsDatePickerStateCreate(value: () => string, select: (iso: string) => void) {
  const open = createSignalObject(false)
  const month = createSignalObject(untrack(() => monthOf(value())))
  const accent = createSignalObject("")
  let trigger: HTMLElement | undefined
  const format = (options: Intl.DateTimeFormatOptions, date: Date) =>
    new Intl.DateTimeFormat("de-DE", options).format(date)
  return {
    open: () => open.get(),
    openSet: (next: boolean) => {
      if (next) {
        month.set(monthOf(value()))
        // The popover is portaled outside the CMS root, so carry the accent color over.
        if (trigger) accent.set(getComputedStyle(trigger).getPropertyValue("--dashboard-accent").trim())
      }
      open.set(next)
    },
    triggerRef: (element: HTMLElement) => {
      trigger = element
    },
    accent: () => accent.get(),
    title: () => format({ month: "long", year: "numeric" }, month.get()),
    days: () => cmsDatePickerDays(month.get()),
    weekday: (date: Date) => format({ weekday: "short" }, date).replace(".", ""),
    dayLabel: (date: Date) => format({ weekday: "long", day: "numeric", month: "long", year: "numeric" }, date),
    inMonth: (date: Date) => date.getMonth() === month.get().getMonth(),
    selected: (date: Date) => cmsDateIso(date) === value(),
    today: (date: Date) => cmsDateIso(date) === cmsDateIso(new Date()),
    monthChange: (offset: number) => {
      const current = month.get()
      month.set(new Date(current.getFullYear(), current.getMonth() + offset, 1))
    },
    pick: (date: Date) => {
      select(cmsDateIso(date))
      open.set(false)
    },
  }
}

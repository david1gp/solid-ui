import { createEffect, onSettled } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"

export function kalenderTimeGridStateCreate(props: { state: ReturnType<typeof kalenderStateCreate> }) {
  const now = createSignalObject(new Date())
  let scroller: HTMLDivElement | undefined
  onSettled(() => {
    const timer = setInterval(() => now.set(new Date()), 60_000)
    return () => clearInterval(timer)
  })
  createEffect(props.state.days, (days) => {
    if (!days.length || !scroller) return
    const date = new Date()
    scroller.scrollTop = days.some((day) => day.isToday) ? Math.max(0, (date.getHours() - 1) * 48) : 7 * 48
  })
  return {
    now: now.get,
    scrollerSet: (element: HTMLDivElement) => {
      scroller = element
    },
    slotClick: (event: MouseEvent, day: number) => {
      if ((event.target as Element).closest("button, [role=img]")) return
      const rect = event.currentTarget instanceof HTMLElement ? event.currentTarget.getBoundingClientRect() : undefined
      if (!rect) return
      const minutes = Math.min(23 * 60 + 30, Math.max(0, Math.floor((event.clientY - rect.top) / 24) * 30))
      props.state.createOpen(day, kalenderTimeFromMinutes(minutes))
    },
  }
}

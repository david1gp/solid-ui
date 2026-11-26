import { createMemo, onSettled } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderHourMinuteToY } from "./kalenderHourMinuteToY.js"
import { kalenderHourSegmentsCreate } from "./kalenderHourSegmentsCreate.js"
import { kalenderHourYToMinute } from "./kalenderHourYToMinute.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"

export function kalenderTimeGridStateCreate(props: { state: ReturnType<typeof kalenderStateCreate> }) {
  const now = createSignalObject(new Date())
  const segments = createMemo(() => kalenderHourSegmentsCreate(props.state.days().flatMap((day) => day.tasks)))
  onSettled(() => {
    const timer = setInterval(() => now.set(new Date()), 60_000)
    return () => clearInterval(timer)
  })
  return {
    segments,
    height: () => segments().reduce((total, segment) => total + segment.height, 0),
    timeLabel: kalenderTimeFromMinutes,
    y: (minute: number) => kalenderHourMinuteToY(segments(), minute),
    nowY: () => {
      const minute = now.get().getHours() * 60 + now.get().getMinutes()
      const segment = segments().find((item) => minute >= item.startMinute && minute < item.endMinute)
      return segment && !segment.collapsed ? kalenderHourMinuteToY(segments(), minute) : undefined
    },
    slotClick: (event: MouseEvent, day: number) => {
      if ((event.target as Element).closest("button, [role=img]")) return
      const rect = event.currentTarget instanceof HTMLElement ? event.currentTarget.getBoundingClientRect() : undefined
      if (!rect) return
      const minute = kalenderHourYToMinute(segments(), event.clientY - rect.top)
      if (minute === undefined) return
      props.state.createOpen(day, kalenderTimeFromMinutes(Math.min(1410, Math.floor(minute / 30) * 30)))
    },
  }
}

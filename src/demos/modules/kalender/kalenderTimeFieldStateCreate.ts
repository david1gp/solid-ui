import { createEffect, createUniqueId, untrack } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"
import { kalenderTimeNormalize } from "./kalenderTimeNormalize.js"

export function kalenderTimeFieldStateCreate(props: { value: string; onChange: (value: string) => void }) {
  const id = `kalender-time-${createUniqueId()}`
  const times = Array.from({ length: 96 }, (_, index) => kalenderTimeFromMinutes(index * 15))
  const open = createSignalObject(false)
  const active = createSignalObject(0)
  const draft = createSignalObject(untrack(() => props.value))
  const focused = createSignalObject(false)
  createEffect(
    () => [props.value, focused.get()] as const,
    ([value, isFocused]) => {
      if (!isFocused) draft.set(value)
    },
  )
  const scroll = () =>
    queueMicrotask(() => document.getElementById(`${id}-option-${active.get()}`)?.scrollIntoView({ block: "nearest" }))
  const show = () => {
    const index = times.indexOf(kalenderTimeNormalize(draft.get()) ?? "")
    active.set(index < 0 ? 0 : index)
    open.set(true)
    scroll()
  }
  const select = (value: string) => {
    draft.set(value)
    props.onChange(value)
    open.set(false)
  }
  return {
    id,
    times,
    open: open.get,
    active: active.get,
    draft: draft.get,
    focus: () => focused.set(true),
    input: (value: string) => {
      draft.set(value)
      props.onChange(value)
    },
    blur: () => {
      focused.set(false)
      const value = kalenderTimeNormalize(draft.get()) ?? draft.get()
      draft.set(value)
      props.onChange(value)
      open.set(false)
    },
    toggle: () => {
      document.getElementById(id)?.focus()
      if (open.get()) return open.set(false)
      show()
    },
    select,
    keyDown: (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
        if (!open.get()) return show()
        active.set((active.get() + (event.key === "ArrowDown" ? 1 : -1) + times.length) % times.length)
        scroll()
      } else if (event.key === "Enter" && open.get()) {
        event.preventDefault()
        select(times[active.get()]!)
      } else if (event.key === "Enter") {
        const value = kalenderTimeNormalize(draft.get())
        if (value) {
          draft.set(value)
          props.onChange(value)
        }
      } else if (event.key === "Escape" && open.get()) {
        event.preventDefault()
        event.stopPropagation()
        open.set(false)
      }
    },
  }
}

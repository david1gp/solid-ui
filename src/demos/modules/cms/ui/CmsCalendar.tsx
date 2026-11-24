import { createMemo, createSignal, For, type Element as JSXElement } from "solid-js"
import { cmsButtonClass } from "./cmsButtonClass.js"
import { cmsCardClass } from "./cmsCardClass.js"

type Props<T> = {
  events: readonly T[]
  eventDate: (event: T) => Date
  renderEvent: (event: T) => JSXElement
  locale?: string
  labels?: Partial<{ previousMonth: string; nextMonth: string }>
  initialDate?: Date
}

/** A Monday-first month grid; events are grouped by their local calendar date. */
export function CmsCalendar<T>(props: Props<T>) {
  const initial = props.initialDate ?? new Date()
  const [month, setMonth] = createSignal(new Date(initial.getFullYear(), initial.getMonth(), 1))
  const locale = () => props.locale ?? "de-DE"
  const days = createMemo(() => {
    const first = month()
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - ((first.getDay() + 6) % 7))
    return Array.from(
      { length: 42 },
      (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index),
    )
  })
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  const changeMonth = (offset: number) => setMonth((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1))
  return (
    <section class={cmsCardClass}>
      <header class="mb-4 flex items-center justify-between gap-2">
        <h3 class="text-sm font-semibold">
          {new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(month())}
        </h3>
        <div class="flex gap-1">
          <button
            type="button"
            class={cmsButtonClass}
            aria-label={props.labels?.previousMonth ?? "Vorheriger Monat"}
            onClick={() => changeMonth(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            class={cmsButtonClass}
            aria-label={props.labels?.nextMonth ?? "Nächster Monat"}
            onClick={() => changeMonth(1)}
          >
            ›
          </button>
        </div>
      </header>
      <div class="overflow-x-auto">
        <div class="grid min-w-[35rem] grid-cols-7">
          <For each={days().slice(0, 7)}>
            {(day) => (
              <div class="p-2 text-xs text-neutral-500">
                {new Intl.DateTimeFormat(locale(), { weekday: "short" }).format(day)}
              </div>
            )}
          </For>
          <For each={days()}>
            {(day) => (
              <div
                class={`min-h-24 border-t border-gray-100 p-2 text-xs dark:border-neutral-800 ${day.getMonth() === month().getMonth() ? "" : "text-neutral-400"}`}
              >
                <time
                  datetime={`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`}
                >
                  {new Intl.DateTimeFormat(locale(), { day: "numeric" }).format(day)}
                </time>
                <div class="mt-1 space-y-1">
                  <For each={props.events.filter((event) => sameDay(props.eventDate(event), day))}>
                    {(event) => (
                      <div class="rounded-md bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] px-1 py-0.5 text-[var(--dashboard-accent)]">
                        {props.renderEvent(event)}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}

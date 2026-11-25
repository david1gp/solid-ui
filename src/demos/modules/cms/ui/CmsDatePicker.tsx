import { mdiCalendarMonthOutline } from "@adaptive-ds/mdi/mdiCalendarMonthOutline.js"
import { For } from "solid-js"
import { CorvuPopover } from "#ui/interactive/popover/CorvuPopover.jsx"
import { cmsDatePickerStateCreate } from "./cmsDatePickerStateCreate.js"

/** Calendar button with a German, Monday-first month grid; `value` and `onSelect` use ISO YYYY-MM-DD. */
export function CmsDatePicker(props: { value: string; onSelect: (iso: string) => void; label?: string }) {
  const state = cmsDatePickerStateCreate(
    () => props.value,
    (iso) => props.onSelect(iso),
  )
  const nav =
    "rounded-lg px-2 py-1 text-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[var(--dashboard-accent,var(--color-blue-600))] dark:hover:bg-neutral-800"
  return (
    <CorvuPopover
      variant="outline"
      icon={mdiCalendarMonthOutline}
      class="shrink-0 px-2.5"
      ref={state.triggerRef}
      aria-label={props.label ?? "Kalender öffnen"}
      open={state.open()}
      onOpenChange={state.openSet}
      innerClass="w-72 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div style={state.accent() ? { "--dashboard-accent": state.accent() } : undefined}>
        <div class="mb-2 flex items-center justify-between gap-2">
          <button type="button" class={nav} aria-label="Vorheriger Monat" onClick={() => state.monthChange(-1)}>
            ‹
          </button>
          <span class="text-sm font-semibold" aria-live="polite">
            {state.title()}
          </span>
          <button type="button" class={nav} aria-label="Nächster Monat" onClick={() => state.monthChange(1)}>
            ›
          </button>
        </div>
        <div class="grid grid-cols-7 gap-0.5 text-center text-xs">
          <For each={state.days().slice(0, 7)}>
            {(day) => <span class="py-1 font-medium text-neutral-500">{state.weekday(day)}</span>}
          </For>
          <For each={state.days()}>
            {(day) => (
              <button
                type="button"
                aria-label={state.dayLabel(day)}
                aria-pressed={state.selected(day) ? "true" : "false"}
                class={`rounded-lg py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-[var(--dashboard-accent,var(--color-blue-600))] ${
                  state.selected(day)
                    ? "bg-[var(--dashboard-accent,var(--color-blue-600))] font-semibold text-white"
                    : `hover:bg-gray-100 dark:hover:bg-neutral-800 ${state.inMonth(day) ? "" : "text-neutral-400 dark:text-neutral-600"} ${state.today(day) ? "font-semibold text-[var(--dashboard-accent,var(--color-blue-600))]" : ""}`
                }`}
                onClick={() => state.pick(day)}
              >
                {day.getDate()}
              </button>
            )}
          </For>
        </div>
      </div>
    </CorvuPopover>
  )
}

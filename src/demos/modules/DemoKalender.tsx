import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import { mdiChevronRight } from "@adaptive-ds/mdi/mdiChevronRight.js"
import { mdiClockOutline } from "@adaptive-ds/mdi/mdiClockOutline.js"
import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import { For, Show } from "solid-js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import "./kalender/KalenderDay.css"
import { demoKalenderStateCreate } from "./demoKalenderStateCreate.js"
import { KalenderEvent } from "./kalender/KalenderEvent.jsx"
import { KalenderQuickCreate } from "./kalender/KalenderQuickCreate.jsx"
import { KalenderTaskDialog } from "./kalender/KalenderTaskDialog.jsx"
import { KalenderTimeGrid } from "./kalender/KalenderTimeGrid.jsx"
import { KalenderToast } from "./kalender/KalenderToast.jsx"
import { kalenderNewTaskDayPick } from "./kalender/kalenderNewTaskDayPick.js"

export function DemoKalender() {
  const demo = demoKalenderStateCreate()
  const state = demo.calendar
  return (
    <div
      class="flex h-dvh w-full overflow-hidden bg-neutral-100 text-neutral-900 dark:bg-[#1e2023] dark:text-neutral-100"
      data-viewport-shell
    >
      <main class="min-w-0 flex-1 overflow-auto p-5 lg:p-8">
        <header class="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-lg font-semibold">Terminkalender</h1>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">{state.todayLabel()}</p>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <Show
              when={demo.searchOpen()}
              fallback={
                <button
                  type="button"
                  aria-label="Suchen"
                  onClick={demo.searchShow}
                  class="cursor-pointer text-neutral-500 dark:text-neutral-300"
                >
                  <Icon path={mdiMagnify} class="size-5" />
                </button>
              }
            >
              <div class="flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-neutral-500 focus-within:border-violet-500 dark:border-neutral-600 dark:bg-[#1b1d20] dark:text-neutral-300">
                <Icon path={mdiMagnify} class="size-5" />
                <input
                  ref={(element) => queueMicrotask(() => element.focus())}
                  type="search"
                  aria-label="Termine suchen"
                  placeholder="Termine suchen…"
                  value={demo.search()}
                  onInput={(event) => demo.searchChange(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") demo.searchClose()
                  }}
                  class="w-36 min-w-0 bg-transparent text-sm text-neutral-900 outline-none dark:text-neutral-100 [&::-webkit-search-cancel-button]:hidden"
                />
                <button
                  type="button"
                  aria-label="Suche schließen"
                  onClick={demo.searchClose}
                  class="cursor-pointer hover:text-violet-500"
                >
                  <Icon path={mdiClose} class="size-5" />
                </button>
              </div>
            </Show>
            <div class="flex items-center gap-1 text-sm font-medium">
              <span class="min-w-28 text-center">{state.monthLabel()}</span>
              <button
                type="button"
                aria-label={
                  state.view() === "Woche"
                    ? "Vorherige Woche"
                    : `Vorheriger ${state.view() === "Monat" ? "Monat" : "Tag"}`
                }
                onClick={() => state.changeMonth(-1)}
              >
                <Icon path={mdiChevronLeft} class="size-5" />
              </button>
              <button
                type="button"
                aria-label={
                  state.view() === "Woche" ? "Nächste Woche" : `Nächster ${state.view() === "Monat" ? "Monat" : "Tag"}`
                }
                onClick={() => state.changeMonth(1)}
              >
                <Icon path={mdiChevronRight} class="size-5" />
              </button>
            </div>
            <Button
              variant="none"
              class="gap-1 bg-violet-600 text-sm text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
              aria-label="Neuer Termin"
              onClick={() => {
                const day = kalenderNewTaskDayPick(state.days())
                if (day !== undefined) state.createOpen(day)
              }}
            >
              <Icon path={mdiPlus} class="size-4" />
              <span class="sm:hidden">Neu</span>
              <span class="hidden sm:inline">Neuer Termin</span>
            </Button>
            <fieldset class="flex rounded-md bg-neutral-200 p-1 dark:bg-[#181a1d]" aria-label="Kalenderansicht">
              <For each={["Heute", "Woche", "Monat"]}>
                {(view) => (
                  <button
                    type="button"
                    aria-pressed={state.view() === view ? "true" : "false"}
                    onClick={() => state.selectView(view)}
                    class={`rounded px-3 py-1.5 text-xs transition-colors ${state.view() === view ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"}`}
                  >
                    {view}
                  </button>
                )}
              </For>
            </fieldset>
          </div>
        </header>
        <Show when={state.view() === "Monat"} fallback={<KalenderTimeGrid state={state} />}>
          <div class="overflow-x-auto rounded border border-neutral-300 dark:border-black/50">
            <div class="grid min-w-[1000px] grid-cols-[58px_repeat(7,minmax(0,1fr))] bg-white dark:bg-[#1b1d20]">
              <div class="flex h-12 flex-col items-center justify-center border-r border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-black/60 dark:bg-[#111315]">
                <Icon path={mdiClockOutline} class="size-4" />
                <span class="text-[9px]">MEZ</span>
              </div>
              <For each={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}>
                {(day, index) => (
                  <div
                    class={`grid h-12 place-items-center bg-neutral-100 text-sm font-semibold dark:bg-[#111315] ${index() === state.todayWeekday() ? "text-violet-500" : ""}`}
                  >
                    {day}
                  </div>
                )}
              </For>
              <For each={state.days()}>
                {(cell) => (
                  <>
                    <Show when={cell.index % 7 === 0}>
                      <div class="min-h-28 border-r border-t border-neutral-300 px-2 pt-3 text-[10px] text-neutral-500 dark:border-black/60">
                        KW {cell.week}
                      </div>
                    </Show>
                    <KalenderQuickCreate cell={cell} state={state}>
                      <Show when={cell.day !== undefined}>
                        <div class="flex items-center justify-between">
                          <span
                            class={`inline-block rounded-sm px-1 text-[10px] shadow-sm ${cell.isToday ? "bg-violet-600 font-bold text-white" : "bg-neutral-200 text-neutral-600 dark:bg-[#33363b] dark:text-neutral-300"}`}
                          >
                            {cell.displayDay}
                          </span>
                          <button
                            type="button"
                            aria-label={`Termin am ${state.dateLabel(cell.day!)} hinzufügen`}
                            title="Neuer Termin"
                            onClick={() => state.quickOpen(cell.day!)}
                            class="kalender-day-add grid size-5 place-items-center rounded text-neutral-500 transition-opacity hover:bg-violet-600 hover:text-white dark:text-neutral-400"
                          >
                            <Icon path={mdiPlus} class="size-4" />
                          </button>
                        </div>
                      </Show>
                      <Show
                        when={state.view() === "Monat"}
                        fallback={
                          <For each={cell.tasks}>
                            {(task) => <KalenderEvent cell={{ ...cell, tasks: [task] }} state={state} />}
                          </For>
                        }
                      >
                        <KalenderEvent cell={cell} state={state} />
                      </Show>
                    </KalenderQuickCreate>
                  </>
                )}
              </For>
            </div>
          </div>
        </Show>
      </main>
      <KalenderTaskDialog state={state} />
      <KalenderToast state={state} />
    </div>
  )
}

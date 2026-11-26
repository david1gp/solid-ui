import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import { mdiChevronRight } from "@adaptive-ds/mdi/mdiChevronRight.js"
import { mdiClockOutline } from "@adaptive-ds/mdi/mdiClockOutline.js"
import { mdiFilterOutline } from "@adaptive-ds/mdi/mdiFilterOutline.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import { For, Show } from "solid-js"
import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import "./kalender/KalenderDay.css"
import { KalenderEvent } from "./kalender/KalenderEvent.jsx"
import { KalenderTaskDialog } from "./kalender/KalenderTaskDialog.jsx"
import { KalenderToast } from "./kalender/KalenderToast.jsx"
import { kalenderStateCreate } from "./kalender/kalenderStateCreate.js"

export function DemoKalender() {
  const state = kalenderStateCreate()
  return (
    <div
      class="flex h-dvh w-full overflow-hidden bg-neutral-100 text-neutral-900 dark:bg-[#1e2023] dark:text-neutral-100"
      data-viewport-shell
    >
      <main class="min-w-0 flex-1 overflow-auto p-5 lg:p-8">
        <header class="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-lg font-semibold">Aufgabenplanung</h1>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">{state.todayLabel()}</p>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex -space-x-2">
              <For each={["#b88c77", "#947c76", "#9b785f", "#ad8d7b"]}>
                {(color) => (
                  <span
                    class="grid size-8 place-items-center overflow-hidden rounded-full border-2 border-neutral-100 dark:border-[#1e2023]"
                    style={{ background: color }}
                  >
                    <AppSidebarCssAvatar />
                  </span>
                )}
              </For>
              <span class="grid size-8 place-items-center rounded-full border-2 border-neutral-100 bg-neutral-600 text-[10px] text-white dark:border-[#1e2023]">
                +4
              </span>
            </div>
            <button type="button" aria-label="Filtern" class="cursor-pointer text-neutral-500 dark:text-neutral-300">
              <Icon path={mdiFilterOutline} class="size-5" />
            </button>
            <button type="button" aria-label="Suchen" class="cursor-pointer text-neutral-500 dark:text-neutral-300">
              <Icon path={mdiMagnify} class="size-5" />
            </button>
            <div class="flex items-center gap-1 text-sm font-medium">
              <span class="min-w-28 text-center">{state.monthLabel()}</span>
              <button type="button" aria-label="Vorheriger Monat" onClick={() => state.changeMonth(-1)}>
                <Icon path={mdiChevronLeft} class="size-5" />
              </button>
              <button type="button" aria-label="Nächster Monat" onClick={() => state.changeMonth(1)}>
                <Icon path={mdiChevronRight} class="size-5" />
              </button>
            </div>
            <fieldset class="flex rounded-md bg-neutral-200 p-1 dark:bg-[#181a1d]" aria-label="Kalenderansicht">
              <For each={["Heute", "Tag", "Woche", "Monat"]}>
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
                  {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse shortcut; the focusable "+" button is the keyboard path */}
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: mouse shortcut; the focusable "+" button is the keyboard path */}
                  <div
                    class={`kalender-day min-h-28 border-r border-t border-neutral-300 p-1 last:border-r-0 dark:border-black/60 ${cell.day ? "cursor-pointer hover:bg-violet-500/5" : ""}`}
                    onClick={(event) => state.cellClick(event, cell.day)}
                  >
                    <Show when={cell.day}>
                      <div class="flex items-center justify-between">
                        <span
                          class={`inline-block rounded-sm px-1 text-[10px] shadow-sm ${cell.isToday ? "bg-violet-600 font-bold text-white" : "bg-neutral-200 text-neutral-600 dark:bg-[#33363b] dark:text-neutral-300"}`}
                        >
                          {cell.day}
                        </span>
                        <button
                          type="button"
                          aria-label={`Termin am ${state.dateLabel(cell.day!)} hinzufügen`}
                          title="Neuer Termin"
                          onClick={() => state.createOpen(cell.day!)}
                          class="kalender-day-add grid size-5 place-items-center rounded text-neutral-500 transition-opacity hover:bg-violet-600 hover:text-white dark:text-neutral-400"
                        >
                          <Icon path={mdiPlus} class="size-4" />
                        </button>
                      </div>
                    </Show>
                    <KalenderEvent cell={cell} state={state} />
                  </div>
                </>
              )}
            </For>
          </div>
        </div>
      </main>
      <KalenderTaskDialog state={state} />
      <KalenderToast state={state} />
    </div>
  )
}

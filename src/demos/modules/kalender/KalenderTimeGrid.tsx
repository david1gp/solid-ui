import { mdiClockOutline } from "@adaptive-ds/mdi/mdiClockOutline.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { KalenderQuickCreate } from "./KalenderQuickCreate.jsx"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderOverlapLayout } from "./kalenderOverlapLayout.js"
import { kalenderTimeGridStateCreate } from "./kalenderTimeGridStateCreate.js"
import "./KalenderEvent.css"
import "./KalenderTimeGrid.css"

export function KalenderTimeGrid(props: { state: ReturnType<typeof kalenderStateCreate> }) {
  const state = kalenderTimeGridStateCreate(props)
  return (
    <div class="kalender-time-grid overflow-x-auto rounded border border-neutral-300 bg-white dark:border-black/50 dark:bg-[#1b1d20]">
      <div class={props.state.view() === "Woche" ? "min-w-[1000px]" : "min-w-0"}>
        <div class="flex border-b border-neutral-300 bg-neutral-100 dark:border-black/60 dark:bg-[#111315]">
          <div class="flex h-12 w-[58px] shrink-0 flex-col items-center justify-center border-r border-neutral-300 text-neutral-500 dark:border-black/60">
            <Icon path={mdiClockOutline} class="size-4" />
            <span class="text-[9px]">MEZ</span>
          </div>
          <For each={props.state.days()}>
            {(cell, index) => (
              <KalenderQuickCreate cell={cell} state={props.state} header>
                <div class="flex h-12 min-w-0 items-center justify-between border-r border-neutral-300 px-2 last:border-r-0 dark:border-black/60">
                  <span class={`text-sm font-semibold ${cell.isToday ? "text-violet-500" : ""}`}>
                    {props.state.view() === "Woche"
                      ? ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"][index()]
                      : props.state.dateLabel(cell.day!)}
                    <Show when={props.state.view() === "Woche"}>
                      {" "}
                      <span class={cell.isToday ? "rounded bg-violet-600 px-1 text-white" : ""}>{cell.displayDay}</span>
                    </Show>
                  </span>
                  <button
                    type="button"
                    aria-label={`Termin am ${props.state.dateLabel(cell.day!)} hinzufügen`}
                    title="Neuer Termin"
                    onClick={() => props.state.quickOpen(cell.day!)}
                    class="grid size-6 place-items-center rounded text-neutral-500 hover:bg-violet-600 hover:text-white"
                  >
                    <Icon path={mdiPlus} class="size-4" />
                  </button>
                </div>
              </KalenderQuickCreate>
            )}
          </For>
        </div>
        <div class="flex min-h-10 border-b border-neutral-300 dark:border-black/60">
          <div class="w-[58px] shrink-0 border-r border-neutral-300 px-1 pt-2 text-[10px] text-neutral-500 dark:border-black/60">
            Ganztägig
          </div>
          <For each={props.state.days()}>
            {(cell) => (
              <div class="min-w-0 flex-1 space-y-1 border-r border-neutral-300 p-1 last:border-r-0 dark:border-black/60">
                <For each={cell.tasks.filter((task) => task.allDay)}>
                  {(task) => (
                    <button
                      type="button"
                      aria-label={`Termin „${task.title}“ (${task.meta}) bearbeiten`}
                      onClick={() => props.state.editOpen(cell.day!, task.id)}
                      class="block w-full truncate rounded-sm border-l-2 bg-neutral-100 px-2 py-1 text-left text-xs font-medium shadow-md hover:bg-violet-500/10 dark:bg-[#262c2e]"
                      style={{ "border-left-color": task.color }}
                    >
                      {task.title}
                    </button>
                  )}
                </For>
              </div>
            )}
          </For>
        </div>
        <div>
          <div class="flex" style={{ height: `${state.height()}px` }}>
            <div class="relative w-[58px] shrink-0 border-r border-neutral-300 dark:border-black/60">
              <For each={state.segments()}>
                {(segment) => (
                  <div
                    class={`absolute inset-x-0 flex items-center justify-end pr-1 text-right tabular-nums text-neutral-500 dark:text-neutral-400 ${segment.collapsed ? "bg-neutral-100 text-[9px] dark:bg-neutral-800" : "text-xs font-medium"}`}
                    style={{ top: `${segment.top}px`, height: segment.collapsed ? `${segment.height}px` : "auto" }}
                  >
                    <Show when={segment.collapsed || state.hourLabelVisible(segment.top)}>
                      {segment.collapsed
                        ? `${state.timeLabel(segment.startMinute)}–${state.timeLabel(segment.endMinute)}`
                        : state.timeLabel(segment.startMinute)}
                    </Show>
                  </div>
                )}
              </For>
              <Show when={state.nowY() !== undefined}>
                <div
                  class="pointer-events-none absolute inset-x-0 z-30 -translate-y-1/2 rounded bg-white px-1 text-right text-xs font-medium tabular-nums text-violet-600 dark:bg-[#1b1d20] dark:text-violet-400"
                  style={{ top: `${state.nowY()}px` }}
                >
                  {state.nowLabel()}
                </div>
              </Show>
            </div>
            <For each={props.state.days()}>
              {(cell) => (
                <div
                  class="relative min-w-0 flex-1 cursor-pointer border-r border-neutral-300 last:border-r-0 dark:border-black/60"
                  onClick={(event) => state.slotClick(event, cell.day!)}
                >
                  <For each={state.segments()}>
                    {(segment) => (
                      <div
                        class={
                          segment.collapsed
                            ? "pointer-events-none absolute inset-x-0 border-y border-dashed border-neutral-300 bg-neutral-100/80 dark:border-neutral-600 dark:bg-neutral-800/80"
                            : "pointer-events-none absolute inset-x-0 border-t border-neutral-300 dark:border-neutral-700"
                        }
                        style={{
                          top: `${segment.top}px`,
                          height: `${segment.height}px`,
                          ...(segment.collapsed
                            ? {}
                            : {
                                "background-image":
                                  "linear-gradient(to bottom, transparent 23px, var(--grid-half) 23px, var(--grid-half) 24px, transparent 24px)",
                              }),
                        }}
                      />
                    )}
                  </For>
                  <For each={kalenderOverlapLayout(cell.tasks)}>
                    {(item) => (
                      <div
                        class="absolute z-10 overflow-hidden rounded-sm border-l-2 bg-neutral-100 px-2 py-0.5 shadow-md dark:bg-[#262c2e]"
                        style={{
                          top: `${state.y(item.start) ?? 0}px`,
                          height: `${Math.max(20, (state.y(item.end) ?? 0) - (state.y(item.start) ?? 0))}px`,
                          left: `${(item.column / item.columns) * 100}%`,
                          width: `${100 / item.columns}%`,
                          "border-left-color": item.task.color,
                        }}
                      >
                        <button
                          type="button"
                          aria-label={`Termin „${item.task.title}“ (${item.task.meta}) bearbeiten`}
                          class="absolute inset-0 cursor-pointer rounded-sm hover:bg-violet-500/10 focus-visible:outline-2 focus-visible:outline-violet-500"
                          onClick={() => props.state.editOpen(cell.day!, item.task.id)}
                        />
                        <span
                          class="kalender-event-marker absolute right-1 top-1 z-10"
                          tabindex="0"
                          role="img"
                          aria-label={`Farbe ${item.task.name} für ${item.task.title}`}
                        >
                          <span class="block size-2 rounded-[2px]" style={{ background: item.task.color }} />
                          <span
                            role="tooltip"
                            class="kalender-event-tooltip pointer-events-none absolute right-0 top-4 z-10 hidden w-max rounded bg-neutral-900 px-2 py-1 text-[10px] text-white"
                          >
                            Farbe {item.task.name} für {item.task.title}
                          </span>
                        </span>
                        <div class="pointer-events-none truncate pr-3 text-xs font-medium">
                          {item.task.title}{" "}
                          <span class="text-[9px] font-normal text-neutral-500 dark:text-neutral-400">
                            {item.task.meta}
                          </span>
                        </div>
                      </div>
                    )}
                  </For>
                  <Show when={state.nowY() !== undefined}>
                    <div
                      class={`pointer-events-none absolute z-20 h-px w-full ${cell.isToday ? "bg-violet-600" : "bg-violet-500/40"}`}
                      style={{ top: `${state.nowY()}px` }}
                    >
                      <Show when={cell.isToday}>
                        <span class="absolute -left-1 -top-1 size-2 rounded-full bg-violet-600" />
                      </Show>
                    </div>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

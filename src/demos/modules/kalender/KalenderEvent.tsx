import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { For, Show } from "solid-js"
import { CorvuPopover } from "#ui/interactive/popover/CorvuPopover.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { kalenderCategoryOf } from "./kalenderCategoryOf.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import "./KalenderEvent.css"

type State = ReturnType<typeof kalenderStateCreate>
type Cell = ReturnType<State["days"]>[number]

export function KalenderEvent(props: { cell: Cell; state: State }) {
  return (
    <Show when={props.cell.tasks[0]}>
      {(task) => (
        <div class="mt-2">
          <div
            class="relative rounded-sm border-l-2 bg-neutral-100 px-2 py-1.5 shadow-md dark:bg-[#262c2e]"
            style={{ "border-left-color": task().color }}
          >
            <button
              type="button"
              aria-label={`Termin „${task().title}“ (${task().meta}) bearbeiten`}
              class="absolute inset-0 cursor-pointer rounded-sm hover:bg-violet-500/10 focus-visible:outline-2 focus-visible:outline-violet-500"
              onClick={() => props.state.editOpen(props.cell.day!, task().id)}
            />
            <span
              class="kalender-event-marker absolute right-1.5 top-1.5 z-10"
              tabindex="0"
              aria-label={`Kategorie ${kalenderCategoryOf(task().title).name} · ${task().name}`}
              role="img"
            >
              <span class="block size-2.5 rounded-[2px]" style={{ background: task().color }} />
              <span
                role="tooltip"
                class="kalender-event-tooltip pointer-events-none absolute right-0 top-4 z-10 hidden w-max max-w-40 rounded bg-neutral-900 px-2 py-1 text-[10px] text-white shadow-lg dark:bg-white dark:text-neutral-900"
              >
                Kategorie {kalenderCategoryOf(task().title).name} · {task().name}
              </span>
            </span>
            <div class="pointer-events-none relative">
              <div class="truncate pr-3 text-xs font-medium">{task().title}</div>
              <div class="truncate text-[9px] text-neutral-500 dark:text-neutral-400">{task().meta}</div>
              <Show when={task().people.length > 0}>
                <div class="truncate text-[9px] text-violet-600 dark:text-violet-300">
                  mit {task().people.join(", ")}
                </div>
              </Show>
            </div>
          </div>
          <Show when={props.cell.tasks.length > 1}>
            <CorvuPopover
              variant="none"
              class="px-0 py-0.5 text-[10px] hover:underline"
              buttonChildren={
                <span>
                  <span class="text-violet-500">●</span> {props.cell.tasks.length - 1} weitere
                </span>
              }
              aria-label={`Aufgaben am ${props.state.dateLabel(props.cell.day!)}`}
              open={props.cell.day !== undefined && props.state.openDay() === props.cell.day}
              onOpenChange={(open) => props.state.setOpenDay(open ? props.cell.day : undefined)}
              innerClass="w-56 rounded border border-neutral-300 bg-white p-4 shadow-xl dark:border-neutral-700 dark:bg-[#25282c]"
            >
              <div class="flex items-center justify-between text-xs font-semibold">
                {props.state.dateLabel(props.cell.day!)}
                <button type="button" aria-label="Schließen" onClick={() => props.state.setOpenDay(undefined)}>
                  <Icon path={mdiClose} class="size-4" />
                </button>
              </div>
              <div class="mt-3 space-y-1">
                <For each={props.cell.tasks}>
                  {(event) => (
                    <button
                      type="button"
                      aria-label={`Termin „${event.title}“ (${event.meta}) bearbeiten`}
                      class="-mx-1.5 flex w-[calc(100%+0.75rem)] cursor-pointer gap-2 rounded px-1.5 py-1 text-left hover:bg-violet-500/10"
                      onClick={() => props.state.popoverEditOpen(props.cell.day!, event.id)}
                    >
                      <span
                        class="mt-1 size-2.5 shrink-0 rounded-[2px]"
                        style={{
                          background: event.color,
                        }}
                      />
                      <div>
                        <div class="text-xs font-medium">{event.title}</div>
                        <div class="text-[9px] text-neutral-500">{event.meta}</div>
                        <Show when={event.people.length > 0}>
                          <div class="text-[9px] text-violet-600 dark:text-violet-300">
                            mit {event.people.join(", ")}
                          </div>
                        </Show>
                      </div>
                    </button>
                  )}
                </For>
              </div>
            </CorvuPopover>
          </Show>
        </div>
      )}
    </Show>
  )
}

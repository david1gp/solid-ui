import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { For, Show } from "solid-js"
import { CorvuPopover } from "#ui/interactive/popover/CorvuPopover.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import "./KalenderEvent.css"

type State = ReturnType<typeof kalenderStateCreate>
type Cell = ReturnType<State["days"]>[number]

export function KalenderEvent(props: { cell: Cell; state: State }) {
  return (
    <Show when={props.cell.task}>
      {(task) => (
        <div class="mt-2">
          <div
            class="relative rounded-sm border-l-2 bg-neutral-100 px-2 py-1.5 shadow-md dark:bg-[#262c2e]"
            style={{ "border-left-color": task().borderColor }}
          >
            <span
              class="kalender-event-marker absolute right-1.5 top-1.5"
              tabindex="0"
              aria-label={`Farbe ${task().name} für ${task().title}`}
              role="img"
            >
              <span class="block size-2.5 rounded-[2px]" style={{ background: task().color }} />
              <span
                role="tooltip"
                class="kalender-event-tooltip pointer-events-none absolute right-0 top-4 z-10 hidden w-max max-w-40 rounded bg-neutral-900 px-2 py-1 text-[10px] text-white shadow-lg dark:bg-white dark:text-neutral-900"
              >
                Farbe {task().name} für {task().title}
              </span>
            </span>
            <div class="truncate pr-3 text-xs font-medium">{task().title}</div>
            <div class="truncate text-[9px] text-neutral-500 dark:text-neutral-400">{task().meta}</div>
          </div>
          <Show when={task().count > 0}>
            <CorvuPopover
              variant="none"
              class="px-0 py-0.5 text-[10px] hover:underline"
              buttonChildren={
                <span>
                  <span class="text-violet-500">●</span> {task().count} weitere
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
              <div class="mt-4 space-y-3">
                <For
                  each={[
                    task().title,
                    "BareMinerals",
                    "NakedPoppy",
                    "Linen & Leah",
                    "Refresh Skin Therapy",
                    "Linen & Leah",
                  ].slice(0, task().count + 1)}
                >
                  {(title, index) => (
                    <div class="flex gap-2">
                      <span
                        class="mt-1 size-2.5 shrink-0 rounded-[2px]"
                        style={{
                          background: ["#ed967b", "#b4d5bd", "#5bcfe0", "#ed9dbc", "#c1afda"][index() % 5],
                        }}
                      />
                      <div>
                        <div class="text-xs font-medium">{title}</div>
                        <div class="text-[9px] text-neutral-500">{task().meta}</div>
                      </div>
                    </div>
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

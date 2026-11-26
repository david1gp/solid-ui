import Popover from "@corvu-next/popover"
import { For, Show } from "solid-js"
import type { JSX } from "@solidjs/web"
import { kalenderQuickCreateStateCreate } from "./kalenderQuickCreateStateCreate.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderTitles } from "./kalenderTitles.js"

type State = ReturnType<typeof kalenderStateCreate>
type Cell = ReturnType<State["days"]>[number]

const fieldClass =
  "w-full min-w-0 rounded border border-neutral-300 bg-white px-2.5 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-600 dark:bg-[#1b1d20] dark:text-neutral-100"

/** A day cell and its anchored quick-create form. */
export function KalenderQuickCreate(props: { cell: Cell; state: State; children: JSX.Element }) {
  const { anchor, anchorSet, form } = kalenderQuickCreateStateCreate(props.state)
  return (
    <Popover
      open={props.cell.day !== undefined && props.state.quickDay() === props.cell.day}
      onOpenChange={props.state.quickOpenChange}
      finalFocusEl={anchor()}
      floatingOptions={{ offset: 8, flip: true, shift: true }}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: the plus button is the keyboard path */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the plus button is the keyboard path */}
      <Popover.Anchor
        ref={anchorSet}
        tabindex="-1"
        class={`kalender-day ${props.state.view() === "Monat" ? "min-h-28" : "min-h-80"} border-r border-t border-neutral-300 p-1 last:border-r-0 dark:border-black/60 ${props.cell.day !== undefined ? "cursor-pointer hover:bg-violet-500/5" : ""}`}
        onClick={(event) => props.state.cellClick(event, props.cell.day)}
      >
        {props.children}
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content class="z-50 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-neutral-300 bg-white p-4 text-neutral-900 shadow-xl dark:border-neutral-700 dark:bg-[#25282c] dark:text-neutral-100">
          <h2 class="mb-3 text-sm font-semibold">{props.cell.day !== undefined && props.state.dateLabel(props.cell.day)}</h2>
          <form class="space-y-3" novalidate onSubmit={props.state.dialogSubmit}>
            <label class="block space-y-1 text-sm">
              <span class="font-medium">Titel</span>
              <input
                class={fieldClass}
                type="text"
                list="kalender-quick-titel-vorschlaege"
                required
                autocomplete="off"
                autofocus
                placeholder="z. B. Teammeeting"
                value={form.title()}
                onInput={(event) => form.titleChange(event.currentTarget.value)}
              />
              <datalist id="kalender-quick-titel-vorschlaege">
                <For each={kalenderTitles}>{(title) => <option value={title} />}</For>
              </datalist>
            </label>
            <div class="grid grid-cols-2 gap-3">
              <label class="block space-y-1 text-sm">
                <span class="font-medium">Beginn</span>
                <input
                  class={fieldClass}
                  type="time"
                  step="900"
                  required
                  value={form.start()}
                  onInput={(event) => form.startChange(event.currentTarget.value)}
                />
              </label>
              <label class="block space-y-1 text-sm">
                <span class="font-medium">Ende</span>
                <input
                  class={fieldClass}
                  type="time"
                  step="900"
                  required
                  value={form.end()}
                  onInput={(event) => form.endChange(event.currentTarget.value)}
                />
              </label>
            </div>
            <Show when={form.error()}>
              <p role="alert" class="text-sm text-red-600 dark:text-red-400">
                {form.error()}
              </p>
            </Show>
            <div class="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                class="rounded px-2 py-2 text-sm text-violet-600 hover:bg-violet-500/10 dark:text-violet-300"
                onClick={props.state.quickMore}
              >
                Weitere Optionen
              </button>
              <button
                type="submit"
                formnovalidate
                class="rounded bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
              >
                Speichern
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}

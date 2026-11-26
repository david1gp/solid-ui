import { mdiDragVertical } from "@adaptive-ds/mdi/mdiDragVertical.js"
import { For, Show } from "solid-js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import type { cmsEventEditStateCreate } from "./cmsEventEditStateCreate.js"
import { cmsEventFieldReorderStateCreate } from "./cmsEventFieldReorderStateCreate.js"

export function CmsEventAgendaField(props: { state: ReturnType<typeof cmsEventEditStateCreate> }) {
  const reorder = cmsEventFieldReorderStateCreate(
    () => props.state.agenda(),
    (from, to) => props.state.agendaMove(from, to),
  )
  return (
    <fieldset class="min-w-0 space-y-3">
      <legend class="mb-2 text-sm font-medium">Ablauf</legend>
      <div class="space-y-0">
        <For each={props.state.agenda().map((item) => item.id)}>
          {(id, index) => (
            <div class="relative flex gap-3 pb-4">
              <div aria-hidden="true" class="relative flex w-4 shrink-0 justify-center">
                <Show when={index() < props.state.agenda().length - 1}>
                  <span class="absolute bottom-[-1rem] top-3 w-px bg-gray-300 dark:bg-neutral-600" />
                </Show>
                <span class="relative mt-3 size-3 rounded-full bg-[var(--dashboard-accent)]" />
              </div>
              <div
                class={`min-w-0 flex-1 space-y-3 rounded-lg border border-gray-200 p-3 dark:border-neutral-700 ${reorder.dragged() === id ? "opacity-50" : ""} ${reorder.target() === id && reorder.dragged() !== id ? "ring-2 ring-inset ring-[var(--dashboard-accent)]" : ""}`}
                onDragOver={(event) => reorder.over(event, id)}
                onDrop={(event) => reorder.drop(event, id)}
              >
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    draggable="true"
                    class={`${cmsButtonClass} cursor-grab`}
                    aria-label={`Schritt ${index() + 1} verschieben`}
                    aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown"
                    title="Ziehen oder mit Alt und Pfeiltasten verschieben"
                    onDragStart={(event) => reorder.start(event, id)}
                    onDragEnd={reorder.end}
                    onKeyDown={(event) => reorder.key(event, id)}
                  >
                    <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d={mdiDragVertical} />
                    </svg>
                  </button>
                  <span class="flex-1 text-sm font-medium">Schritt {index() + 1}</span>
                  <button
                    type="button"
                    class={cmsButtonClass}
                    aria-label={`Schritt ${index() + 1} entfernen`}
                    onClick={() => props.state.agendaRemove(id)}
                  >
                    Entfernen
                  </button>
                </div>
                <div class="grid min-w-0 gap-3 @min-[20rem]:grid-cols-2">
                  <label class="block min-w-0 text-sm">
                    Art
                    <select
                      class={`mt-1 w-full ${cmsInputClass}`}
                      value={props.state.agenda().find((item) => item.id === id)!.kind}
                      onChange={(event) =>
                        props.state.agendaUpdate(id, { kind: event.currentTarget.value as "day" | "time" })
                      }
                    >
                      <option value="day">Tag</option>
                      <option value="time">Uhrzeit</option>
                    </select>
                  </label>
                  <Show
                    when={props.state.agenda().find((item) => item.id === id)!.kind === "day"}
                    fallback={
                      <label class="block min-w-0 text-sm">
                        Uhrzeit
                        <input
                          class={`mt-1 w-full ${cmsInputClass}`}
                          lang="de"
                          inputmode="numeric"
                          placeholder="HH:MM"
                          aria-invalid={props.state.agendaInvalid(id) ? "true" : "false"}
                          value={props.state.agenda().find((item) => item.id === id)!.time ?? ""}
                          onInput={(event) => props.state.agendaUpdate(id, { time: event.currentTarget.value })}
                        />
                        <Show when={props.state.agendaInvalid(id)}>
                          <span class="mt-1 block text-xs text-red-600 dark:text-red-400">
                            Format: HH:MM (24 Stunden)
                          </span>
                        </Show>
                      </label>
                    }
                  >
                    <label class="block min-w-0 text-sm">
                      Tag
                      <input
                        class={`mt-1 w-full ${cmsInputClass}`}
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Tag N"
                        aria-invalid={props.state.agendaInvalid(id) ? "true" : "false"}
                        value={props.state.agenda().find((item) => item.id === id)!.day ?? ""}
                        onInput={(event) =>
                          props.state.agendaUpdate(id, {
                            day: event.currentTarget.value ? Number(event.currentTarget.value) : undefined,
                          })
                        }
                      />
                      <Show when={props.state.agendaInvalid(id)}>
                        <span class="mt-1 block text-xs text-red-600 dark:text-red-400">
                          Bitte eine positive ganze Tageszahl angeben
                        </span>
                      </Show>
                    </label>
                  </Show>
                </div>
                <label class="block text-sm">
                  Titel
                  <input
                    class={`mt-1 w-full ${cmsInputClass}`}
                    value={props.state.agenda().find((item) => item.id === id)!.title}
                    onInput={(event) => props.state.agendaUpdate(id, { title: event.currentTarget.value })}
                  />
                </label>
                <label class="block text-sm">
                  Beschreibung (optional)
                  <textarea
                    class={`mt-1 w-full ${cmsInputClass}`}
                    rows="3"
                    value={props.state.agenda().find((item) => item.id === id)!.description ?? ""}
                    onInput={(event) => props.state.agendaUpdate(id, { description: event.currentTarget.value })}
                  />
                </label>
              </div>
            </div>
          )}
        </For>
      </div>
      <button type="button" class={cmsButtonClass} onClick={props.state.agendaAdd}>
        + Schritt hinzufügen
      </button>
    </fieldset>
  )
}

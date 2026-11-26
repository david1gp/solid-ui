import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { For, Show } from "solid-js"
import { CorvuDialog } from "#ui/interactive/dialog/CorvuDialog.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { kalenderCustomTitle } from "./kalenderCustomTitle.js"
import { kalenderDurations } from "./kalenderDurations.js"
import { kalenderPeople } from "./kalenderPeople.js"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderTitles } from "./kalenderTitles.js"

type State = ReturnType<typeof kalenderStateCreate>

const fieldClass =
  "w-full rounded border border-neutral-300 bg-white px-2.5 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-600 dark:bg-[#1b1d20] dark:text-neutral-100"

export function KalenderCreateDialog(props: { state: State }) {
  const form = props.state.form
  return (
    <CorvuDialog
      title="Neuer Termin"
      description={props.state.createDay() ? props.state.dateLabel(props.state.createDay()!) : undefined}
      open={props.state.createDay() !== undefined}
      onOpenChange={props.state.createOpenChange}
      class="hidden"
      descriptionClass="text-sm text-neutral-500 dark:text-neutral-400"
      innerClass="w-[calc(100%-2rem)] max-w-md rounded-lg border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-[#25282c] dark:text-neutral-100"
    >
      <form class="space-y-4" novalidate onSubmit={props.state.createSubmit}>
        <label class="block space-y-1 text-sm">
          <span class="font-medium">Titel</span>
          <select
            class={fieldClass}
            value={form.titleChoice()}
            onChange={(event) => form.titleChoiceSelect(event.currentTarget.value)}
          >
            <For each={kalenderTitles}>{(title) => <option value={title}>{title}</option>}</For>
            <option value={kalenderCustomTitle}>Eigener Titel …</option>
          </select>
        </label>
        <Show when={form.isCustomTitle()}>
          <label class="block space-y-1 text-sm">
            <span class="font-medium">Eigener Titel</span>
            <input
              class={fieldClass}
              type="text"
              placeholder="z. B. Planungsrunde"
              value={form.customTitle()}
              onInput={(event) => form.customTitleChange(event.currentTarget.value)}
            />
          </label>
        </Show>
        <div class="grid grid-cols-2 gap-3">
          <label class="block space-y-1 text-sm">
            <span class="font-medium">Uhrzeit</span>
            <input
              class={fieldClass}
              type="time"
              step="900"
              required
              value={form.time()}
              onInput={(event) => form.timeChange(event.currentTarget.value)}
            />
          </label>
          <label class="block space-y-1 text-sm">
            <span class="font-medium">Dauer</span>
            <select
              class={fieldClass}
              value={String(form.duration())}
              onChange={(event) => form.durationChange(Number(event.currentTarget.value))}
            >
              <For each={kalenderDurations}>{(minutes) => <option value={String(minutes)}>{minutes} Min</option>}</For>
            </select>
          </label>
        </div>
        <fieldset class="space-y-2 text-sm">
          <legend class="mb-1 font-medium">Personen</legend>
          <div class="flex flex-wrap gap-2">
            <For each={kalenderPeople}>
              {(person) => (
                <button
                  type="button"
                  aria-pressed={form.hasPerson(person) ? "true" : "false"}
                  onClick={() => form.personToggle(person)}
                  class={`rounded-full border px-3 py-1 text-xs transition-colors ${form.hasPerson(person) ? "border-violet-600 bg-violet-600 text-white" : "border-neutral-300 text-neutral-600 hover:border-violet-500 dark:border-neutral-600 dark:text-neutral-300"}`}
                >
                  {person}
                </button>
              )}
            </For>
          </div>
          <Show when={form.extraPeople().length > 0}>
            <ul class="flex flex-wrap gap-2" aria-label="Weitere Personen">
              <For each={form.extraPeople()}>
                {(person) => (
                  <li class="flex items-center gap-1 rounded-full bg-violet-600 py-1 pl-3 pr-1 text-xs text-white">
                    {person}
                    <button
                      type="button"
                      aria-label={`${person} entfernen`}
                      class="rounded-full p-0.5 hover:bg-white/20"
                      onClick={() => form.personRemove(person)}
                    >
                      <Icon path={mdiClose} class="size-3.5" />
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </Show>
          <div class="flex gap-2">
            <input
              class={fieldClass}
              type="text"
              aria-label="Weitere Person"
              placeholder="Weitere Person eintragen"
              value={form.personDraft()}
              onInput={(event) => form.personDraftChange(event.currentTarget.value)}
              onKeyDown={form.personDraftKeyDown}
            />
            <button
              type="button"
              class="shrink-0 rounded border border-neutral-300 px-3 text-sm hover:border-violet-500 dark:border-neutral-600"
              onClick={form.personAdd}
            >
              Hinzufügen
            </button>
          </div>
        </fieldset>
        <Show when={form.error()}>
          <p role="alert" class="text-sm text-red-600 dark:text-red-400">
            {form.error()}
          </p>
        </Show>
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            class="rounded border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-600"
            onClick={() => props.state.createOpenChange(false)}
          >
            Abbrechen
          </button>
          <button
            type="submit"
            class="rounded bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
          >
            Termin speichern
          </button>
        </div>
      </form>
    </CorvuDialog>
  )
}

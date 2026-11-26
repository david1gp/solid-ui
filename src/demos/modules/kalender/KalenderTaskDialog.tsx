import { KalenderTimeField } from "./KalenderTimeField.jsx"
import { mdiDeleteOutline } from "@adaptive-ds/mdi/mdiDeleteOutline.js"
import { For, Show } from "solid-js"
import { CorvuDialog } from "#ui/interactive/dialog/CorvuDialog.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { kalenderColors } from "./kalenderColors.js"
import { KalenderPeopleField } from "./KalenderPeopleField.jsx"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"
import { kalenderTitles } from "./kalenderTitles.js"
import "./KalenderTaskDialog.css"

type State = ReturnType<typeof kalenderStateCreate>

const fieldClass =
  "w-full rounded border border-neutral-300 bg-white px-2.5 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-600 dark:bg-[#1b1d20] dark:text-neutral-100"

/** Create and edit dialog for one appointment. */
export function KalenderTaskDialog(props: { state: State }) {
  const form = props.state.form
  return (
    <CorvuDialog
      title={props.state.isEditing() ? "Termin bearbeiten" : "Neuer Termin"}
      description={props.state.dialog() ? props.state.dateLabel(props.state.dialog()!.day) : undefined}
      open={props.state.dialog() !== undefined}
      onOpenChange={props.state.dialogOpenChange}
      class="hidden"
      descriptionClass="text-sm text-neutral-500 dark:text-neutral-400"
      innerClass="kalender-task-dialog w-[calc(100%-2rem)] max-w-md rounded-lg border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-[#25282c] dark:text-neutral-100"
    >
      <form class="space-y-4" novalidate onSubmit={props.state.dialogSubmit}>
        <label class="block space-y-1 text-sm">
          <span class="font-medium">Titel</span>
          <input
            class={fieldClass}
            type="text"
            list="kalender-titel-vorschlaege"
            required
            autocomplete="off"
            placeholder="z. B. Teammeeting"
            value={form.title()}
            onInput={(event) => form.titleChange(event.currentTarget.value)}
          />
          <datalist id="kalender-titel-vorschlaege">
            <For each={kalenderTitles}>{(title) => <option value={title} />}</For>
          </datalist>
        </label>
        <label class="flex cursor-pointer items-center justify-between gap-3 text-sm">
          <span class="font-medium">Ganztägig</span>
          <input
            type="checkbox"
            role="switch"
            aria-checked={form.allDay() ? "true" : "false"}
            class="peer sr-only"
            checked={form.allDay()}
            onChange={(event) => form.allDayChange(event.currentTarget.checked)}
          />
          <span
            aria-hidden="true"
            class="relative h-5 w-9 rounded-full bg-neutral-300 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-violet-600 peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500/50 dark:bg-neutral-600"
          />
        </label>
        <Show when={!form.allDay()}>
          <div class="space-y-1">
            <div class="grid grid-cols-2 gap-3">
              <KalenderTimeField label="Beginn" value={form.start()} onChange={form.startChange} />
              <KalenderTimeField label="Ende" value={form.end()} onChange={form.endChange} />
            </div>
            <Show when={form.durationLabel()}>
              <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Dauer: {form.durationLabel()}</p>
            </Show>
          </div>
        </Show>
        <fieldset class="space-y-2">
          <legend class="text-sm font-medium">Farbe</legend>
          <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Farbe">
            <label title={`Automatisch · ${form.autoColor().name}`} class="cursor-pointer">
              <input
                class="peer sr-only"
                type="radio"
                name="kalender-farbe"
                value="Automatisch"
                aria-label="Automatisch"
                checked={form.colorKey() === "Automatisch"}
                onChange={() => form.colorChange("Automatisch")}
              />
              <span
                class="flex size-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ring-1 ring-neutral-400 peer-checked:ring-2 peer-checked:ring-violet-600 peer-focus-visible:outline-2 peer-focus-visible:outline-violet-500"
                style={{ background: form.autoColor().color }}
              >
                A
              </span>
            </label>
            <For each={kalenderColors}>
              {(color) => (
                <label title={color.name} class="cursor-pointer">
                  <input
                    class="peer sr-only"
                    type="radio"
                    name="kalender-farbe"
                    value={color.name}
                    aria-label={color.name}
                    checked={form.colorKey() === color.name}
                    onChange={() => form.colorChange(color.name)}
                  />
                  <span
                    class="block size-8 rounded-full border-2 border-white ring-1 ring-neutral-400 peer-checked:ring-2 peer-checked:ring-violet-600 peer-focus-visible:outline-2 peer-focus-visible:outline-violet-500"
                    style={{ background: color.color }}
                  />
                </label>
              )}
            </For>
          </div>
        </fieldset>
        <KalenderPeopleField form={form} />
        <Show when={form.error()}>
          <p role="alert" class="text-sm text-red-600 dark:text-red-400">
            {form.error()}
          </p>
        </Show>
        <div class="flex flex-wrap items-center gap-2 pt-2">
          <Show when={props.state.isEditing()}>
            <button
              type="button"
              class="flex items-center gap-1 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-600/10 dark:text-red-400"
              onClick={props.state.dialogDelete}
            >
              <Icon path={mdiDeleteOutline} class="size-4" />
              Löschen
            </button>
          </Show>
          <div class="ml-auto flex gap-2">
            <button
              type="button"
              class="rounded border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-600"
              onClick={() => props.state.dialogOpenChange(false)}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              class="rounded bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500"
            >
              {props.state.isEditing() ? "Speichern" : "Termin speichern"}
            </button>
          </div>
        </div>
      </form>
    </CorvuDialog>
  )
}

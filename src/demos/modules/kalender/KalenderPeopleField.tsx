import { mdiAccountPlusOutline } from "@adaptive-ds/mdi/mdiAccountPlusOutline.js"
import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { createUniqueId, For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { kalenderPersonInitials } from "./kalenderPersonInitials.js"
import type { kalenderTaskFormStateCreate } from "./kalenderTaskFormStateCreate.js"

type Form = ReturnType<typeof kalenderTaskFormStateCreate>

/** Search field with team suggestions; selected people appear as removable chips. */
export function KalenderPeopleField(props: { form: Form }) {
  const id = createUniqueId()
  const listId = `${id}-list`
  return (
    <div class="space-y-1 text-sm">
      <label for={id} class="font-medium">
        Personen
      </label>
      <div class="flex flex-wrap items-center gap-1.5 rounded border border-neutral-300 bg-white px-2 py-1.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/30 dark:border-neutral-600 dark:bg-[#1b1d20]">
        <Show when={props.form.people().length > 0}>
          <ul class="contents" aria-label="Ausgewählte Personen">
            <For each={props.form.people()}>
              {(person) => (
                <li class="flex items-center gap-1 rounded-full bg-violet-600/10 py-0.5 pl-0.5 pr-1 text-xs text-violet-800 dark:bg-violet-500/20 dark:text-violet-100">
                  <span
                    aria-hidden="true"
                    class="grid size-5 place-items-center rounded-full bg-violet-600 text-[9px] font-semibold text-white"
                  >
                    {kalenderPersonInitials(person)}
                  </span>
                  {person}
                  <button
                    type="button"
                    aria-label={`${person} entfernen`}
                    class="rounded-full p-0.5 hover:bg-violet-600 hover:text-white"
                    onClick={() => props.form.personRemove(person)}
                  >
                    <Icon path={mdiClose} class="size-3" />
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Show>
        <input
          id={id}
          type="text"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          aria-expanded={props.form.suggestionsOpen() || props.form.externalEmail() ? "true" : "false"}
          aria-controls={listId}
          aria-activedescendant={props.form.suggestionsOpen() ? `${id}-${props.form.activeSuggestion()}` : undefined}
          placeholder={props.form.people().length ? "Weitere Person …" : "Name oder E-Mail suchen"}
          class="min-w-32 flex-1 bg-transparent py-0.5 text-neutral-900 outline-none dark:text-neutral-100"
          value={props.form.personQuery()}
          onInput={(event) => props.form.personQueryChange(event.currentTarget.value)}
          onKeyDown={props.form.personQueryKeyDown}
        />
      </div>
      <div
        id={listId}
        role="listbox"
        aria-label="Vorschläge"
        class={`overflow-hidden rounded border border-neutral-200 dark:border-neutral-700 ${props.form.suggestionsOpen() || props.form.externalEmail() ? "" : "hidden"}`}
      >
        <For each={props.form.suggestionsOpen() ? props.form.suggestions() : []}>
          {(person, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: chosen with ↑/↓/Enter in the combobox input (aria-activedescendant)
            // biome-ignore lint/a11y/useFocusableInteractive: focus stays in the combobox input (aria-activedescendant)
            <div
              id={`${id}-${index()}`}
              role="option"
              aria-selected={index() === props.form.activeSuggestion() ? "true" : "false"}
              class={`flex cursor-pointer items-center gap-2 px-2 py-1.5 ${index() === props.form.activeSuggestion() ? "bg-violet-600 text-white" : "hover:bg-neutral-100 dark:hover:bg-white/5"}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => props.form.personAdd(person.name)}
            >
              <span
                aria-hidden="true"
                class="grid size-6 shrink-0 place-items-center rounded-full bg-violet-600 text-[10px] font-semibold text-white ring-1 ring-white/40"
              >
                {kalenderPersonInitials(person.name)}
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm">{person.name}</span>
                <span
                  class={`block truncate text-[11px] ${index() === props.form.activeSuggestion() ? "text-violet-100" : "text-neutral-500 dark:text-neutral-400"}`}
                >
                  {person.email}
                </span>
              </span>
            </div>
          )}
        </For>
        <Show when={props.form.externalEmail()}>
          {(email) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: chosen with Enter in the combobox input
            // biome-ignore lint/a11y/useFocusableInteractive: focus stays in the combobox input
            <div
              role="option"
              aria-selected="false"
              class="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-white/5"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => props.form.personAdd(email())}
            >
              <Icon path={mdiAccountPlusOutline} class="size-5 text-violet-500" />
              <span class="truncate">„{email()}“ als externe Person einladen</span>
            </div>
          )}
        </Show>
      </div>
      <p class="text-[11px] text-neutral-500 dark:text-neutral-400">
        Tippen zum Suchen, ↑/↓ und Enter zum Auswählen, externe Personen per E-Mail.
      </p>
    </div>
  )
}

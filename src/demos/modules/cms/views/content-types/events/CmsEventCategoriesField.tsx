import { createUniqueId, For } from "solid-js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsEventCategoriesFieldStateCreate } from "./cmsEventCategoriesFieldStateCreate.js"

export function CmsEventCategoriesField(props: {
  categories: () => string[]
  suggestions: () => string[]
  add: (value: string) => void
  remove: (value: string) => void
}) {
  const state = cmsEventCategoriesFieldStateCreate(props)
  const id = createUniqueId()
  return (
    <div class="text-sm">
      <label for={`${id}-input`}>Kategorien</label>
      <div class="mt-1 flex flex-wrap gap-2">
        <For each={props.categories()}>
          {(category) => (
            <span class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-neutral-700">
              {category}
              <button
                type="button"
                aria-label={`${category} entfernen`}
                class="ml-1 font-bold"
                onClick={() => props.remove(category)}
              >
                ×
              </button>
            </span>
          )}
        </For>
      </div>
      <input
        id={`${id}-input`}
        class={`mt-1 w-full ${cmsInputClass}`}
        list={`${id}-suggestions`}
        value={state.draft()}
        onInput={(event) => state.draftSet(event.currentTarget.value)}
        onKeyDown={state.keyDown}
        placeholder="Kategorie eingeben und Enter drücken"
      />
      <datalist id={`${id}-suggestions`}>
        <For each={props.suggestions()}>{(suggestion) => <option value={suggestion} />}</For>
      </datalist>
    </div>
  )
}

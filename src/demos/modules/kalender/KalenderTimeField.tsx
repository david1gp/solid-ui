import { For, Show } from "solid-js"
import { kalenderTimeFieldStateCreate } from "./kalenderTimeFieldStateCreate.js"

export function KalenderTimeField(props: { label: string; value: string; onChange: (value: string) => void }) {
  const state = kalenderTimeFieldStateCreate(props)
  return (
    <div class="relative min-w-0 space-y-1 text-sm">
      <label class="font-medium" for={state.id}>
        {props.label}
      </label>
      <div class="relative">
        <input
          id={state.id}
          class="w-full min-w-0 rounded border border-neutral-300 bg-white px-2.5 py-2 pr-8 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-600 dark:bg-[#1b1d20] dark:text-neutral-100"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          required
          role="combobox"
          aria-expanded={state.open() ? "true" : "false"}
          aria-controls={`${state.id}-list`}
          aria-activedescendant={state.open() ? `${state.id}-option-${state.active()}` : undefined}
          aria-autocomplete="list"
          value={state.draft()}
          onFocus={state.focus}
          onInput={(event) => state.input(event.currentTarget.value)}
          onBlur={state.blur}
          onKeyDown={state.keyDown}
        />
        <button
          type="button"
          tabindex="-1"
          aria-label={`${props.label}: Uhrzeiten anzeigen`}
          class="absolute inset-y-0 right-0 px-2 text-neutral-500"
          onMouseDown={(event) => event.preventDefault()}
          onClick={state.toggle}
        >
          ▾
        </button>
      </div>
      <Show when={state.open()}>
        <ul
          id={`${state.id}-list`}
          role="listbox"
          class="absolute z-50 max-h-48 w-full overflow-y-auto rounded border border-neutral-300 bg-white py-1 shadow-lg dark:border-neutral-600 dark:bg-[#25282c]"
        >
          <For each={state.times}>
            {(time, index) => (
              <li
                id={`${state.id}-option-${index()}`}
                role="option"
                aria-selected={index() === state.active() ? "true" : "false"}
                class={`cursor-pointer px-2.5 py-1.5 ${index() === state.active() ? "bg-violet-100 dark:bg-violet-900" : "hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => state.select(time)}
              >
                {time}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}

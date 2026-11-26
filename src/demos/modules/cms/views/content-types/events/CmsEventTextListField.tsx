import { For } from "solid-js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"

export function CmsEventTextListField(props: {
  label: string
  addLabel: string
  optional?: boolean
  entries: () => string[]
  add: () => void
  update: (index: number, value: string) => void
  remove: (index: number) => void
}) {
  return (
    <fieldset class="min-w-0 space-y-2">
      <legend class="text-sm font-medium">
        {props.label}
        {props.optional ? " (optional)" : ""}
      </legend>
      <For each={Array.from({ length: props.entries().length }, (_, index) => index)}>
        {(index) => (
          <div class="flex min-w-0 items-center gap-2">
            <input
              class={`min-w-0 flex-1 ${cmsInputClass}`}
              aria-label={`${props.label} ${index + 1}`}
              value={props.entries()[index]}
              onInput={(event) => props.update(index, event.currentTarget.value)}
            />
            <button
              type="button"
              class={cmsButtonClass}
              aria-label={`${props.label} ${index + 1} entfernen`}
              onClick={() => props.remove(index)}
            >
              Entfernen
            </button>
          </div>
        )}
      </For>
      <button type="button" class={cmsButtonClass} onClick={props.add}>
        {props.addLabel}
      </button>
    </fieldset>
  )
}

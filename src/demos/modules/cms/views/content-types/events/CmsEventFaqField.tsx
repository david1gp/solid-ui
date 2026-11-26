import { mdiDragVertical } from "@adaptive-ds/mdi/mdiDragVertical.js"
import { For, Show } from "solid-js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import type { cmsEventEditStateCreate } from "./cmsEventEditStateCreate.js"
import { cmsEventFieldReorderStateCreate } from "./cmsEventFieldReorderStateCreate.js"

export function CmsEventFaqField(props: {
  state: Pick<
    ReturnType<typeof cmsEventEditStateCreate>,
    "faq" | "faqAdd" | "faqRemove" | "faqUpdate" | "faqMove" | "faqValidationAttempted"
  >
}) {
  const reorder = cmsEventFieldReorderStateCreate(
    () => props.state.faq(),
    (from, to) => props.state.faqMove(from, to),
  )
  return (
    <fieldset class="min-w-0 space-y-3">
      <legend class="mb-2 text-sm font-medium">Häufige Fragen</legend>
      <For each={props.state.faq().map((item) => item.id)}>
        {(id, index) => (
          <div
            class={`min-w-0 space-y-3 rounded-lg border border-gray-200 p-3 dark:border-neutral-700 ${reorder.dragged() === id ? "opacity-50" : ""} ${reorder.target() === id && reorder.dragged() !== id ? "ring-2 ring-inset ring-[var(--dashboard-accent)]" : ""}`}
            onDragOver={(event) => reorder.over(event, id)}
            onDrop={(event) => reorder.drop(event, id)}
          >
            <div class="flex items-center gap-2">
              <button
                type="button"
                draggable="true"
                class={`${cmsButtonClass} cursor-grab`}
                aria-label={`Frage ${index() + 1} verschieben`}
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
              <span class="flex-1 text-sm font-medium">Frage {index() + 1}</span>
              <button
                type="button"
                class={cmsButtonClass}
                aria-label={`Frage ${index() + 1} entfernen`}
                onClick={() => props.state.faqRemove(id)}
              >
                Entfernen
              </button>
            </div>
            <label class="block text-sm">
              Frage
              <input
                class={`mt-1 w-full ${cmsInputClass}`}
                aria-invalid={
                  props.state.faqValidationAttempted() &&
                  !props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .question.trim() &&
                  props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .answer.trim()
                    ? "true"
                    : "false"
                }
                value={props.state.faq().find((item) => item.id === id)!.question}
                onInput={(event) => props.state.faqUpdate(id, { question: event.currentTarget.value })}
              />
              <Show
                when={
                  props.state.faqValidationAttempted() &&
                  !props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .question.trim() &&
                  !!props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .answer.trim()
                }
              >
                <span class="mt-1 block text-xs text-red-600 dark:text-red-400">Bitte eine Frage angeben</span>
              </Show>
            </label>
            <label class="block text-sm">
              Antwort
              <textarea
                class={`mt-1 w-full ${cmsInputClass}`}
                aria-invalid={
                  props.state.faqValidationAttempted() &&
                  !props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .answer.trim() &&
                  props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .question.trim()
                    ? "true"
                    : "false"
                }
                rows="3"
                value={props.state.faq().find((item) => item.id === id)!.answer}
                onInput={(event) => props.state.faqUpdate(id, { answer: event.currentTarget.value })}
              />
              <Show
                when={
                  props.state.faqValidationAttempted() &&
                  !props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .answer.trim() &&
                  !!props.state
                    .faq()
                    .find((item) => item.id === id)!
                    .question.trim()
                }
              >
                <span class="mt-1 block text-xs text-red-600 dark:text-red-400">Bitte eine Antwort angeben</span>
              </Show>
            </label>
          </div>
        )}
      </For>
      <button type="button" class={cmsButtonClass} onClick={props.state.faqAdd}>
        + Frage hinzufügen
      </button>
    </fieldset>
  )
}

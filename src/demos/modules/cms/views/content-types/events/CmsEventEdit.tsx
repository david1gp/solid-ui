import { Show, untrack } from "solid-js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../../ui/PageHeader.js"
import { CmsEventDateBadge } from "./CmsEventDateBadge.js"
import { cmsEventDateParts } from "./cmsEventDateParts.js"
import { cmsEventEditStateCreate } from "./cmsEventEditStateCreate.js"
import type { cmsEvents } from "./cmsEvents.js"

const input = `mt-1 w-full ${cmsInputClass}`
export function CmsEventEdit(props: { event: ReturnType<typeof cmsEvents.get>[number] }) {
  const state = untrack(() => cmsEventEditStateCreate(props.event))
  return (
    <div>
      <button
        type="button"
        class="mb-5 text-sm font-medium text-[var(--dashboard-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
        onClick={state.back}
      >
        ← Veranstaltung / Event
      </button>
      <PageHeader title={props.event.title} />
      <div class="grid items-start gap-6 lg:grid-cols-2">
        <section class={cmsCardClass}>
          <h2 class="mb-4 font-semibold">Vorschau</h2>
          <div class="flex flex-wrap items-center gap-4">
            <CmsEventDateBadge date={state.date()} color={props.event.color} large />
            <div class="min-w-0 flex-1">
              <p class="font-semibold">{state.title()}</p>
              <p class="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                {cmsEventDateParts(state.date()).long}, {state.time()} Uhr
              </p>
              <p class="text-sm text-gray-500 dark:text-neutral-400">{state.location()}</p>
              <Show when={state.featured()}>
                <span class="mt-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-neutral-800 dark:text-neutral-300">
                  Top
                </span>
              </Show>
            </div>
          </div>
        </section>
        <section class={`${cmsCardClass} space-y-4`}>
          <h2 class="font-semibold">Veranstaltungsdetails</h2>
          <label class="block text-sm">
            Titel
            <input class={input} value={state.title()} onInput={(e) => state.titleSet(e.currentTarget.value)} />
          </label>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block text-sm">
              Datum
              <input
                class={input}
                type="date"
                value={state.date()}
                onInput={(e) => e.currentTarget.value && state.dateSet(e.currentTarget.value)}
              />
            </label>
            <label class="block text-sm">
              Uhrzeit
              <input
                class={input}
                type="time"
                value={state.time()}
                onInput={(e) => state.timeSet(e.currentTarget.value)}
              />
            </label>
            <label class="block text-sm">
              Ort
              <input class={input} value={state.location()} onInput={(e) => state.locationSet(e.currentTarget.value)} />
            </label>
            <label class="block text-sm">
              Plätze
              <input
                class={input}
                type="number"
                min="0"
                step="1"
                value={state.capacity()}
                onInput={(e) => state.capacitySet(e.currentTarget.value)}
              />
            </label>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              class="size-4 accent-[var(--dashboard-accent)]"
              checked={state.featured()}
              onChange={(e) => state.featuredSet(e.currentTarget.checked)}
            />
            Hervorgehoben (Top-Veranstaltung)
          </label>
          <label class="block text-sm">
            Beschreibung
            <textarea
              class={input}
              rows="4"
              value={state.description()}
              onInput={(e) => state.descriptionSet(e.currentTarget.value)}
            />
          </label>
        </section>
      </div>
      <Show when={state.notice()}>
        <p role="status" class="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
          {state.notice()}
        </p>
      </Show>
      <div class="mt-6 flex flex-wrap gap-2">
        <button type="button" class={cmsPrimaryButtonClass} onClick={state.save}>
          Speichern
        </button>
        <button type="button" class={cmsButtonClass} onClick={state.back}>
          Abbrechen
        </button>
      </div>
    </div>
  )
}

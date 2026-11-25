import { createUniqueId, For, Show, untrack } from "solid-js"
import { CmsDatePicker } from "../../../ui/CmsDatePicker.js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../../ui/PageHeader.js"
import { CmsFestivalIllustration } from "./CmsFestivalIllustration.js"
import { cmsEventDateParts } from "./cmsEventDateParts.js"
import { cmsEventEditStateCreate } from "./cmsEventEditStateCreate.js"
import type { cmsEvents } from "./cmsEvents.js"

const input = `mt-1 w-full ${cmsInputClass}`
export function CmsEventEdit(props: { event: ReturnType<typeof cmsEvents.get>[number] }) {
  const state = untrack(() => cmsEventEditStateCreate(props.event))
  const idPrefix = createUniqueId()
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
          <div class="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl">
            <CmsFestivalIllustration color={props.event.color} />
            <div class="absolute left-4 top-4 flex gap-2">
              <span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                #{state.position()}
              </span>
              <Show when={state.featured()}>
                <span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                  Top
                </span>
              </Show>
            </div>
            <div class="absolute bottom-16 left-4 right-4 text-white drop-shadow-lg">
              <p class="text-lg font-semibold leading-tight">{state.title()}</p>
              <p class="mt-1 text-sm text-white/80">{state.location()}</p>
            </div>
            <p class="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-emerald-300">
              {cmsEventDateParts(state.scheduleSorted()[0]?.date ?? "").day}.{" "}
              {cmsEventDateParts(state.scheduleSorted()[0]?.date ?? "").month} · {state.scheduleSorted()[0]?.time} Uhr
              <Show when={state.scheduleSorted().length > 1}>
                {" "}
                · +{state.scheduleSorted().length - 1} weitere Termine
              </Show>
            </p>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button type="button" class={cmsButtonClass} onClick={state.imageUnavailable}>
              Aus Mediathek wählen
            </button>
            <button type="button" class={cmsButtonClass} onClick={state.imageUnavailable}>
              Neues Bild hochladen
            </button>
          </div>
          <Show when={state.imageNotice()}>
            <p role="status" class="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              {state.imageNotice()}
            </p>
          </Show>
        </section>
        <section class={`${cmsCardClass} @container space-y-4`}>
          <h2 class="font-semibold">Veranstaltungsdetails</h2>
          <label class="block text-sm">
            Titel
            <input class={input} value={state.title()} onInput={(e) => state.titleSet(e.currentTarget.value)} />
          </label>
          <label class="block text-sm">
            Position in der Liste
            <select class={input} value={state.position()} onChange={(e) => state.positionSet(Number(e.currentTarget.value))}>
              <For each={Array.from({ length: state.positionCount() })}>
                {(_, index) => <option value={index() + 1}>{index() + 1} von {state.positionCount()}</option>}
              </For>
            </select>
          </label>
          <fieldset class="@container min-w-0 space-y-3">
            <legend class="mb-2 text-sm font-medium">Termine</legend>
            <For each={state.schedule()}>
              {(row, index) => (
                <div class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 @min-[34rem]:grid-cols-[minmax(0,2fr)_minmax(7rem,1fr)_auto]">
                  <div class="col-span-2 min-w-0 text-sm @min-[34rem]:col-span-1">
                    <label for={`${idPrefix}-date-${row.id}`}>Datum</label>
                    <div class="mt-1 flex gap-2">
                      <input
                        id={`${idPrefix}-date-${row.id}`}
                        class={`min-w-0 flex-1 ${cmsInputClass}`}
                        lang="de"
                        inputmode="numeric"
                        placeholder="TT.MM.JJJJ"
                        aria-invalid={state.dateValid(row) ? "false" : "true"}
                        value={row.dateText.get()}
                        onInput={(e) => state.dateTextSet(row.id, e.currentTarget.value)}
                      />
                      <CmsDatePicker
                        value={row.date.get()}
                        onSelect={(iso) => state.datePick(row.id, iso)}
                        label={`Datum von Termin ${index() + 1} im Kalender wählen`}
                      />
                    </div>
                    <Show when={!state.dateValid(row)}>
                      <span class="mt-1 block text-xs text-red-600 dark:text-red-400">Format: TT.MM.JJJJ</span>
                    </Show>
                  </div>
                  <label class="block min-w-0 text-sm">
                    Uhrzeit
                    <input
                      class={input}
                      lang="de"
                      inputmode="numeric"
                      placeholder="HH:MM"
                      aria-invalid={state.timeValid(row) ? "false" : "true"}
                      value={row.timeText.get()}
                      onInput={(e) => state.timeTextSet(row.id, e.currentTarget.value)}
                    />
                    <Show when={!state.timeValid(row)}>
                      <span class="mt-1 block text-xs text-red-600 dark:text-red-400">Format: HH:MM (24 Stunden)</span>
                    </Show>
                  </label>
                  <Show when={state.schedule().length > 1}>
                    <button
                      type="button"
                      class={`${cmsButtonClass} mt-6`}
                      aria-label={`Termin ${index() + 1} entfernen`}
                      onClick={() => state.scheduleRemove(row.id)}
                    >
                      Entfernen
                    </button>
                  </Show>
                </div>
              )}
            </For>
            <button type="button" class={cmsButtonClass} onClick={state.scheduleAdd}>
              + Termin hinzufügen
            </button>
          </fieldset>
          <div class="grid gap-4 @min-[28rem]:grid-cols-2">
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

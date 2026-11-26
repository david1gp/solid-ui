import { createUniqueId, For, Show, untrack } from "solid-js"
import { TabsTop } from "#ui/interactive/tabs/TabsTop.jsx"
import { CmsDatePicker } from "../../../ui/CmsDatePicker.js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { CmsCollapsiblePreviewColumn } from "../../../ui/CmsCollapsiblePreviewColumn.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../../ui/PageHeader.js"
import { CmsTopsellerRibbon } from "../CmsTopsellerRibbon.js"
import { CmsFestivalIllustration } from "./CmsFestivalIllustration.js"
import { cmsEventDateParts } from "./cmsEventDateParts.js"
import { cmsEventEditStateCreate } from "./cmsEventEditStateCreate.js"
import type { cmsEvents } from "./cmsEvents.js"
import { cmsEventTitleSplit } from "./cmsEventTitleSplit.js"

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
      <div class="@container flex flex-col items-start gap-6 lg:flex-row">
        <CmsCollapsiblePreviewColumn title="Vorschau">
          <div class="@container relative mx-auto aspect-[330/460] w-full max-w-sm overflow-hidden rounded-2xl">
            <CmsFestivalIllustration color={props.event.color} />
            <div class="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(to_top,rgb(8_12_16/.97)_0%,rgb(8_12_16/.88)_50%,transparent_100%)]" />
            <Show when={state.featured()}>
              <CmsTopsellerRibbon />
            </Show>
            <div class="absolute inset-x-[6.06cqw] bottom-[6.06cqw]">
              <Show when={cmsEventTitleSplit(state.title()).eyebrow}>
                <p class="mb-[1.82cqw] text-[3.64cqw] font-bold uppercase tracking-[.12em] text-teal-300">
                  {cmsEventTitleSplit(state.title()).eyebrow}
                </p>
              </Show>
              <p class="mb-[3.03cqw] line-clamp-2 text-[7.27cqw] font-extrabold leading-[1.2] text-white">
                {cmsEventTitleSplit(state.title()).title}
              </p>
              <Show when={state.location()}>
                <div class="flex items-center gap-[2.12cqw] text-[4.24cqw] text-[#d6dde3]">
                  <svg
                    aria-hidden="true"
                    class="size-[4.55cqw] shrink-0 text-teal-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.2"
                  >
                    <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{state.location()}</span>
                </div>
              </Show>
              <div class="mt-[4.85cqw] flex items-center justify-between border-t border-white/[.14] pt-[4.24cqw]">
                <Show when={state.scheduleSorted()[0]} fallback={<span />}>
                  {(entry) => (
                    <time
                      datetime={
                        entry().date && entry().time ? `${entry().date}T${entry().time}` : entry().date || entry().time
                      }
                      class="flex items-center gap-[3.64cqw]"
                    >
                      <Show when={entry().date}>
                        <span class="flex flex-col items-center">
                          <span class="text-[8.48cqw] font-extrabold leading-none text-white">
                            {cmsEventDateParts(entry().date).day}
                          </span>
                          <span class="mt-[.91cqw] text-[3.33cqw] font-extrabold uppercase tracking-[.14em] text-teal-300">
                            {cmsEventDateParts(entry().date).month}
                          </span>
                        </span>
                      </Show>
                      <Show when={entry().date && entry().time}>
                        <span aria-hidden="true" class="h-[10.3cqw] w-px bg-white/25" />
                      </Show>
                      <Show when={entry().time}>
                        <span class="whitespace-nowrap text-[4.55cqw] font-semibold text-[#d6dde3]">
                          {entry().time} Uhr
                        </span>
                      </Show>
                    </time>
                  )}
                </Show>
                <span
                  aria-hidden="true"
                  class="flex size-[12.73cqw] shrink-0 items-center justify-center rounded-full bg-teal-300 text-[6.06cqw] font-bold text-[#06201c]"
                >
                  →
                </span>
              </div>
            </div>
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
        </CmsCollapsiblePreviewColumn>
        <section class={`${cmsCardClass} @container w-full min-w-0 space-y-4 lg:flex-1`}>
          <h2 class="font-semibold">Veranstaltungsdetails</h2>
          <TabsTop
            valueSignal={state.tab}
            getOptions={() => ["Details", "Tickets"]}
            valueChildren={(value) =>
              value === "Details" ? (
                <div class="space-y-4 pt-4">
                  <label class="block text-sm">
                    Titel
                    <input class={input} value={state.title()} onInput={(e) => state.titleSet(e.currentTarget.value)} />
                  </label>
                  <label class="block text-sm">
                    Position in der Liste
                    <select
                      class={input}
                      value={state.position()}
                      onChange={(e) => state.positionSet(Number(e.currentTarget.value))}
                    >
                      <For each={Array.from({ length: state.positionCount() })}>
                        {(_, index) => (
                          <option value={index() + 1}>
                            {index() + 1} von {state.positionCount()}
                          </option>
                        )}
                      </For>
                    </select>
                  </label>
                  <label class="block text-sm">
                    Ort
                    <input
                      class={input}
                      value={state.location()}
                      onInput={(e) => state.locationSet(e.currentTarget.value)}
                    />
                  </label>
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
                  </label>{" "}
                </div>
              ) : (
                <div class="pt-4">
                  <fieldset class="@container min-w-0 space-y-3">
                    <legend class="mb-2 text-sm font-medium">Termine</legend>
                    <For each={state.schedule()}>
                      {(row, index) => (
                        <div class="grid min-w-0 gap-x-4 gap-y-2 @min-[28rem]:grid-cols-2">
                          <div class="min-w-0 text-sm">
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
                              <span class="mt-1 block text-xs text-red-600 dark:text-red-400">
                                Format: HH:MM (24 Stunden)
                              </span>
                            </Show>
                          </label>
                          <label class="block min-w-0 text-sm" for={`${idPrefix}-capacity-${row.id}`}>
                            Plätze
                            <input
                              id={`${idPrefix}-capacity-${row.id}`}
                              class={input}
                              type="number"
                              min="0"
                              step="1"
                              value={row.capacity.get()}
                              onInput={(e) => state.scheduleFieldSet(row.id, "capacity", e.currentTarget.value)}
                            />
                          </label>
                          <label class="block min-w-0 text-sm" for={`${idPrefix}-price-regular-${row.id}`}>
                            Preis normal (€)
                            <input
                              id={`${idPrefix}-price-regular-${row.id}`}
                              class={input}
                              type="number"
                              min="0"
                              step="0.01"
                              value={row.priceRegular.get()}
                              onInput={(e) => state.scheduleFieldSet(row.id, "priceRegular", e.currentTarget.value)}
                            />
                          </label>
                          <label class="block min-w-0 text-sm" for={`${idPrefix}-price-reduced-${row.id}`}>
                            Preis ermäßigt (€)
                            <input
                              id={`${idPrefix}-price-reduced-${row.id}`}
                              class={input}
                              type="number"
                              min="0"
                              step="0.01"
                              value={row.priceReduced.get()}
                              onInput={(e) => state.scheduleFieldSet(row.id, "priceReduced", e.currentTarget.value)}
                            />
                          </label>
                          <Show when={state.schedule().length > 1}>
                            <button
                              type="button"
                              class={`${cmsButtonClass} justify-self-start @min-[28rem]:col-span-2`}
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
                </div>
              )
            }
          />
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

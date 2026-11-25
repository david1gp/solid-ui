import { mdiDragVertical } from "@adaptive-ds/mdi/mdiDragVertical.js"
import { For, Show } from "solid-js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsPillClass } from "../../../ui/cmsPillClass.js"
import { cmsProductReorderStateCreate } from "../products/cmsProductReorderStateCreate.js"
import { CmsEventDateBadge } from "./CmsEventDateBadge.js"
import { cmsEventDateParts } from "./cmsEventDateParts.js"
import { cmsEventOrder } from "./cmsEventOrder.js"
import { cmsEventScheduleSorted } from "./cmsEventScheduleSorted.js"
import type { cmsEventsSorted } from "./cmsEventsSorted.js"

export function CmsEventList(props: { events: typeof cmsEventsSorted }) {
  const state = cmsProductReorderStateCreate(false, cmsEventOrder)
  return (
    <section class={cmsCardClass} aria-label="Veranstaltungen" onDragOver={state.containerOver} onDrop={state.drop}>
      <div class="sr-only" aria-live="polite">
        {state.announcement()}
      </div>
      <div class="flex flex-col divide-y divide-gray-200 dark:divide-neutral-800">
        <For each={props.events()}>
          {(event, index) => (
            <article
              class={`flex flex-wrap items-center gap-3 py-3 ${state.dragged() === event.id ? "opacity-50 ring-2 ring-inset ring-[var(--dashboard-accent)]" : ""}`}
              style={{ order: state.position(event.id, index() + 1) }}
              onDragOver={(e) => state.over(e, event.id)}
              onDrop={state.drop}
            >
              <button
                type="button"
                draggable="true"
                aria-label={`Verschieben: ${event.shortTitle}`}
                class="cursor-grab rounded p-1 active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
                onDragStart={(e) => state.start(e, event.id)}
                onDragEnd={state.end}
                onKeyDown={(e) => state.key(e, event.id, event.shortTitle)}
              >
                <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                  <path d={mdiDragVertical} />
                </svg>
              </button>
              <CmsEventDateBadge date={cmsEventScheduleSorted(event.schedule)[0]?.date ?? ""} color={event.color} />
              <div class="min-w-0 flex-1">
                <h2 class="text-sm font-medium">{event.shortTitle}</h2>
                <p class="mt-0.5 text-xs text-gray-500 dark:text-neutral-400">
                  {event.title} · {event.description}
                </p>
                <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-neutral-400">
                  <Show when={cmsEventScheduleSorted(event.schedule)[0]}>
                    {(first) => (
                      <span>
                        {cmsEventDateParts(first().date).long}, {first().time} Uhr
                      </span>
                    )}
                  </Show>
                  <Show when={event.schedule.length > 1}>
                    <span class={cmsPillClass}>
                      {event.schedule.length - 1 === 1
                        ? "+1 weiterer Termin"
                        : `+${event.schedule.length - 1} weitere Termine`}
                    </span>
                  </Show>
                  <span>{event.location}</span>
                  <span>Plätze: {event.capacity}</span>
                  <span>#{state.position(event.id, index() + 1)}</span>
                  <Show when={event.featured}>
                    <span class={cmsPillClass}>Top</span>
                  </Show>
                </div>
              </div>
              <div class="flex w-full justify-end sm:w-auto">
                <button
                  type="button"
                  class={cmsButtonClass}
                  aria-label={`Bearbeiten: ${event.title}`}
                  onClick={() => cmsNavigate("content-types", `event:${event.id}`)}
                >
                  Bearbeiten
                </button>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  )
}

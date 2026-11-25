import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { For, Show, untrack } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../../ui/PageHeader.js"
import { CmsTopsellerRibbon } from "../CmsTopsellerRibbon.js"
import { CmsHeadphonesIllustration } from "./CmsHeadphonesIllustration.js"
import { cmsProductEditStateCreate } from "./cmsProductEditStateCreate.js"
import { cmsProductPriceFormat } from "./cmsProductPriceFormat.js"
import { cmsProductStockStatus } from "./cmsProductStockStatus.js"
import { cmsProducts } from "./cmsProducts.js"

export function CmsProductEdit(props: { product: ReturnType<typeof cmsProducts.get>[number]; backToList?: boolean }) {
  const state = untrack(() => cmsProductEditStateCreate(props.product, props.backToList))
  return (
    <div>
      <button
        type="button"
        class="mb-5 text-sm font-medium text-[var(--dashboard-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
        onClick={state.back}
      >
        ← Artikel / Article
      </button>
      <PageHeader title={state.title() || "Produktname"} />
      <div class="grid items-start gap-6 lg:grid-cols-2">
        <section class={cmsCardClass}>
          <h2 class="mb-4 font-semibold">Produktbild</h2>
          <div class="@container relative mx-auto aspect-[330/460] w-full max-w-sm overflow-hidden rounded-2xl">
            <CmsHeadphonesIllustration colorway={props.product.colorway} />
            <div class="absolute inset-x-0 bottom-0 h-[50%] bg-[linear-gradient(to_top,rgb(8_12_16/.98)_0%,rgb(8_12_16/.92)_55%,transparent_100%)]" />
            <Show when={state.featured()}>
              <CmsTopsellerRibbon />
            </Show>
            <div class="absolute inset-x-[6.06cqw] bottom-[6.06cqw]">
              <p
                class={`line-clamp-1 text-[7.27cqw] font-extrabold leading-[1.2] ${state.name() ? "text-white" : "text-white/50"}`}
              >
                {state.name() || "Produktname"}
              </p>
              <Show when={state.subtitle()}>
                <p class="mt-[1.21cqw] line-clamp-2 text-[4.24cqw] leading-[1.3] text-[#d6dde3]">{state.subtitle()}</p>
              </Show>
              <div class="mt-[2.42cqw] flex items-center gap-[2.12cqw] text-[3.94cqw] text-[#d6dde3]">
                <span
                  aria-hidden="true"
                  class={`size-[2.12cqw] shrink-0 rounded-full ${cmsProductStockStatus(state.quantity()).dotClass}`}
                />
                <span>{cmsProductStockStatus(state.quantity()).label}</span>
              </div>
              <div class="mt-[4.85cqw] flex items-center justify-between border-t border-white/[.14] pt-[4.24cqw]">
                <div>
                  <p class="whitespace-nowrap text-[8.48cqw] font-extrabold leading-none text-white">
                    {cmsProductPriceFormat(Number(state.price()) || 0)}
                  </p>
                  <p class="mt-[1.21cqw] text-[3.33cqw] text-[#9fb0b8]">inkl. MwSt.</p>
                </div>
                <span
                  aria-hidden="true"
                  class="flex size-[12.73cqw] shrink-0 items-center justify-center rounded-full bg-teal-300 text-[#06201c]"
                >
                  <svg
                    aria-hidden="true"
                    class="size-[6.06cqw]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 8h14l1 13H4L5 8Z" />
                    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
                  </svg>
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
        </section>
        <div class="space-y-6">
          <section class={`${cmsCardClass} space-y-4`}>
            <h2 class="font-semibold">Produktdetails</h2>
            <label class="block text-sm">
              Produktname
              <input
                class={`mt-1 w-full ${cmsInputClass}`}
                value={state.name()}
                onInput={(e) => state.nameSet(e.currentTarget.value)}
              />
            </label>
            <div>
              <label class="block text-sm">
                Kurzbeschreibung
                <input
                  class={`mt-1 w-full ${cmsInputClass}`}
                  value={state.subtitle()}
                  onInput={(e) => state.subtitleSet(e.currentTarget.value)}
                />
              </label>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block text-sm">
                Preis (€)
                <input
                  class={`mt-1 w-full ${cmsInputClass}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={state.price()}
                  onInput={(e) => state.priceSet(e.currentTarget.value)}
                />
              </label>
              <div>
                <label class="block text-sm">
                  Menge
                  <input
                    class={`mt-1 w-full ${cmsInputClass}`}
                    type="number"
                    min="0"
                    step="1"
                    value={state.quantity()}
                    onInput={(e) => state.quantitySet(e.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm">
                Position im Shop
                <select
                  class={`mt-1 w-full ${cmsInputClass}`}
                  value={state.position()}
                  onChange={(e) => state.positionSet(Number(e.currentTarget.value))}
                >
                  <For each={cmsProducts.get()}>
                    {(_, index) => (
                      <option value={index() + 1}>
                        {index() + 1} von {cmsProducts.get().length}
                      </option>
                    )}
                  </For>
                </select>
              </label>
              <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                Bestimmt die Reihenfolge in der Produktübersicht.
              </p>
            </div>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                class="size-4 accent-[var(--dashboard-accent)]"
                checked={state.featured()}
                onChange={(e) => state.featuredSet(e.currentTarget.checked)}
              />
              Hervorgehoben (Top-Produkt)
            </label>
            <label class="block text-sm">
              Beschreibung
              <textarea
                class={`mt-1 w-full ${cmsInputClass}`}
                rows="4"
                value={state.description()}
                onInput={(e) => state.descriptionSet(e.currentTarget.value)}
              />
            </label>
          </section>
          <section class={cmsCardClass}>
            <h2 class="font-semibold">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-2 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
                aria-expanded={state.faqOpen() ? "true" : "false"}
                aria-controls={state.faqContentId}
                onClick={state.faqToggle}
              >
                FAQ
                <Icon
                  path={mdiChevronDown}
                  class={`size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${state.faqOpen() ? "" : "-rotate-90"}`}
                />
              </button>
            </h2>
            <div
              id={state.faqContentId}
              aria-hidden={state.faqOpen() ? "false" : "true"}
              inert={!state.faqOpen()}
              class="grid grid-rows-[1fr] opacity-100 aria-hidden:grid-rows-[0fr] aria-hidden:opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none"
            >
              <div class="min-h-0 overflow-hidden">
                <div class="space-y-4 pt-4">
                  <For each={state.faq()}>
                    {(item, index) => (
                      <div class="space-y-3 rounded-xl border border-gray-200 p-4 dark:border-neutral-800">
                        <div class="flex items-center justify-between gap-2">
                          <h3 class="text-sm font-semibold">Frage {index() + 1}</h3>
                          <button
                            type="button"
                            class={cmsButtonClass}
                            aria-label={`Frage ${index() + 1} entfernen`}
                            onClick={() => state.faqRemove(item.id)}
                          >
                            Entfernen
                          </button>
                        </div>
                        <label class="block text-sm">
                          Frage
                          <input
                            class={`mt-1 w-full ${cmsInputClass}`}
                            value={item.question.get()}
                            onInput={(e) => state.faqChange(item.id, "question", e.currentTarget.value)}
                          />
                        </label>
                        <label class="block text-sm">
                          Antwort
                          <textarea
                            class={`mt-1 w-full ${cmsInputClass}`}
                            rows="2"
                            value={item.answer.get()}
                            onInput={(e) => state.faqChange(item.id, "answer", e.currentTarget.value)}
                          />
                        </label>
                      </div>
                    )}
                  </For>
                </div>
                <button type="button" class={`${cmsButtonClass} mt-4`} onClick={state.faqAdd}>
                  + Frage hinzufügen
                </button>
              </div>
            </div>
          </section>
        </div>
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

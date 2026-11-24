import { For, Show, untrack } from "solid-js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsInputClass } from "../../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../../ui/PageHeader.js"
import { CmsHeadphonesIllustration } from "./CmsHeadphonesIllustration.js"
import { cmsProductEditStateCreate } from "./cmsProductEditStateCreate.js"
import { cmsProductPriceFormat } from "./cmsProductPriceFormat.js"
import { cmsProducts } from "./cmsProducts.js"

export function CmsProductEdit(props: { product: (typeof cmsProducts)[number]; backToList?: boolean }) {
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
      <PageHeader title={props.product.title} />
      <div class="grid items-start gap-6 lg:grid-cols-2">
        <section class={cmsCardClass}>
          <h2 class="mb-4 font-semibold">Produktbild</h2>
          <div class="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl">
            <CmsHeadphonesIllustration colorway={props.product.colorway} />
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
            <p class="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm font-semibold text-emerald-300">
              {cmsProductPriceFormat(Number(state.price()) || 0)}
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
        <div class="space-y-6">
          <section class={`${cmsCardClass} space-y-4`}>
            <h2 class="font-semibold">Produktdetails</h2>
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
            <div>
              <label class="block text-sm">
                Position im Shop
                <select
                  class={`mt-1 w-full ${cmsInputClass}`}
                  value={state.position()}
                  onChange={(e) => state.positionSet(Number(e.currentTarget.value))}
                >
                  <For each={cmsProducts}>
                    {(_, index) => (
                      <option value={index() + 1}>
                        {index() + 1} von {cmsProducts.length}
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
            <h2 class="mb-4 font-semibold">FAQ</h2>
            <div class="space-y-4">
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

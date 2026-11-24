import { mdiDragVertical } from "@adaptive-ds/mdi/mdiDragVertical.js"
import { For, Show } from "solid-js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsPillClass } from "../../../ui/cmsPillClass.js"
import { CmsHeadphonesIllustration } from "./CmsHeadphonesIllustration.js"
import { cmsProductReorderStateCreate } from "./cmsProductReorderStateCreate.js"
import { cmsProductPriceFormat } from "./cmsProductPriceFormat.js"
import { cmsProductsSorted } from "./cmsProductsSorted.js"

export function CmsProductList(props: { products: typeof cmsProductsSorted }) {
  const state = cmsProductReorderStateCreate(false)
  return (
    <section class={cmsCardClass} aria-label="Produkte" onDragOver={state.containerOver} onDrop={state.drop}>
      <div class="sr-only" aria-live="polite">
        {state.announcement()}
      </div>
      <div class="flex flex-col divide-y divide-gray-200 dark:divide-neutral-800">
        <For each={props.products()}>
          {(product, index) => (
            <article
              class={`flex flex-wrap items-center gap-3 py-3 ${state.dragged() === product.id ? "opacity-50 ring-2 ring-inset ring-[var(--dashboard-accent)]" : ""}`}
              style={{ order: state.position(product.id, index() + 1) }}
              onDragOver={(event) => state.over(event, product.id)}
              onDrop={state.drop}
            >
              <button
                type="button"
                draggable="true"
                aria-label={`Verschieben: ${product.shortTitle ?? product.title}`}
                class="cursor-grab rounded p-1 active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
                onDragStart={(event) => state.start(event, product.id)}
                onDragEnd={state.end}
                onKeyDown={(event) => state.key(event, product.id, product.shortTitle ?? product.title)}
              >
                <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                  <path d={mdiDragVertical} />
                </svg>
              </button>
              <div class="size-16 shrink-0 overflow-hidden rounded-lg">
                <CmsHeadphonesIllustration colorway={product.colorway} />
              </div>
              <div class="min-w-0 flex-1">
                <h2 class="text-sm font-medium">{product.shortTitle ?? product.title}</h2>
                <p class="mt-0.5 text-xs text-gray-500 dark:text-neutral-400">
                  {product.title} · {product.description}
                </p>
                <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-neutral-400">
                  <span>{cmsProductPriceFormat(product.price)}</span>
                  <span>Menge: {product.quantity}</span>
                  <span>#{state.position(product.id, index() + 1)}</span>
                  <Show when={product.featured}>
                    <span class={cmsPillClass}>Top</span>
                  </Show>
                </div>
              </div>
              <div class="flex w-full justify-end sm:w-auto">
                <button
                  type="button"
                  class={cmsButtonClass}
                  aria-label={`Bearbeiten: ${product.title}`}
                  onClick={() => cmsNavigate("content-types", `article:${product.id}:list`)}
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

import { For, Show } from "solid-js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsButtonClass } from "../../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../../ui/cmsCardClass.js"
import { cmsPillClass } from "../../../ui/cmsPillClass.js"
import { CmsHeadphonesIllustration } from "./CmsHeadphonesIllustration.js"
import { cmsProductPriceFormat } from "./cmsProductPriceFormat.js"
import { cmsProductsSorted } from "./cmsProductsSorted.js"

export function CmsProductList() {
  return (
    <section class={cmsCardClass} aria-label="Produkte">
      <div class="divide-y divide-gray-200 dark:divide-neutral-800">
        <For each={cmsProductsSorted()}>
          {(product) => (
            <article class="flex flex-wrap items-center gap-3 py-3">
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
                  <span>#{product.position}</span>
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

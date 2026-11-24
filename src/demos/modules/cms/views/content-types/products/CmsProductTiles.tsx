import { mdiPencilOutline } from "@adaptive-ds/mdi/mdiPencilOutline.js"
import { For, Show } from "solid-js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { CmsHeadphonesIllustration } from "./CmsHeadphonesIllustration.js"
import { cmsProductPriceFormat } from "./cmsProductPriceFormat.js"
import { cmsProducts } from "./cmsProducts.js"

export function CmsProductTiles() {
  return (
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <For each={[...cmsProducts].sort((a, b) => a.position - b.position)}>
        {(product) => (
          <article class="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm dark:border dark:border-neutral-800">
            <CmsHeadphonesIllustration colorway={product.colorway} />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <Show when={product.featured}>
              <span class="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                Top
              </span>
            </Show>
            <div class="absolute inset-x-0 bottom-0 p-4">
              <h2 class="font-semibold text-white" title={product.title}>
                {product.shortTitle ?? product.title}
              </h2>
              <div class="mt-1 flex items-end justify-between gap-2">
                <p class="text-sm font-medium text-emerald-300">{cmsProductPriceFormat(product.price)}</p>
                <button
                  type="button"
                  class="flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
                  aria-label={`Bearbeiten: ${product.title}`}
                  onClick={() => cmsNavigate("content-types", `article:${product.id}`)}
                >
                  <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
                    <path d={mdiPencilOutline} />
                  </svg>
                  Bearbeiten
                </button>
              </div>
            </div>
          </article>
        )}
      </For>
    </div>
  )
}

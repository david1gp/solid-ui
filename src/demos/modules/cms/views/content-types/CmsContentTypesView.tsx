import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { cmsButtonClass } from "../../ui/cmsButtonClass.js"
import { cmsCardClass } from "../../ui/cmsCardClass.js"
import { cmsIconCircleClass } from "../../ui/cmsIconCircleClass.js"
import { cmsInputClass } from "../../ui/cmsInputClass.js"
import { cmsPillClass } from "../../ui/cmsPillClass.js"
import { cmsPrimaryButtonClass } from "../../ui/cmsPrimaryButtonClass.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsContentTypesStateCreate } from "./cmsContentTypesStateCreate.js"
import { CmsProductEdit } from "./products/CmsProductEdit.js"
import { CmsProductList } from "./products/CmsProductList.js"
import { CmsProductTiles } from "./products/CmsProductTiles.js"
import { cmsProducts } from "./products/cmsProducts.js"

const text = {
  de: {
    title: "Inhaltstypen",
    description: "Strukturieren Sie Ihre Inhalte mit wiederverwendbaren Feldern.",
    back: "← Alle Inhaltstypen",
    fields: "Felder",
    add: "Feld hinzufügen",
    type: "Feldtyp",
    up: "Nach oben",
    down: "Nach unten",
    count: "Einträge",
    countOne: "Eintrag",
    types: {
      text: "Text",
      number: "Zahl",
      date: "Datum",
      relation: "Relation",
      media: "Medien",
      repeater: "Wiederholungsgruppe",
    },
  },
  en: {
    title: "Content types",
    description: "Structure your content with reusable fields.",
    back: "← All content types",
    fields: "Fields",
    add: "Add field",
    type: "Field type",
    up: "Move up",
    down: "Move down",
    count: "entries",
    countOne: "entry",
    types: {
      text: "Text",
      number: "Number",
      date: "Date",
      relation: "Relation",
      media: "Media",
      repeater: "Repeater group",
    },
  },
}
const button = cmsButtonClass
const input = `w-full ${cmsInputClass}`
export function CmsContentTypesView(props: { id?: string }) {
  const state = cmsContentTypesStateCreate(() => props.id)
  const t = () => text[cmsLocale.get()]
  const product = () =>
    props.id === "article:fields"
      ? undefined
      : cmsProducts.get().find((item) => props.id === `article:${item.id}` || props.id === `article:${item.id}:list`)
  return (
    <div>
      <Show
        when={!product()}
        fallback={
          <Show when={product()} keyed>
            {(item) => <CmsProductEdit product={item} backToList={props.id?.endsWith(":list")} />}
          </Show>
        }
      >
        <Show
          when={state.current()}
          fallback={
            <>
              <PageHeader title={t().title} description={t().description} />
              <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <For each={state.types()}>
                  {(item) => (
                    <button
                      type="button"
                      class={`${cmsCardClass} flex min-h-40 flex-col items-start gap-4 text-left hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)] dark:hover:bg-neutral-800/60`}
                      onClick={() => cmsNavigate("content-types", item.id)}
                    >
                      <span class={cmsIconCircleClass}>
                        <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                          <path d={mdiClipboardTextOutline} />
                        </svg>
                      </span>
                      <span class="text-base font-semibold">{item.name}</span>
                      <span class={cmsPillClass}>
                        {`${state.entryCount(item.id)} ${state.entryCount(item.id) === 1 ? t().countOne : t().count} →`}
                      </span>
                    </button>
                  )}
                </For>
              </div>
            </>
          }
        >
          {(item) => (
            <>
              <button
                class="mb-5 text-sm font-medium text-[var(--dashboard-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
                type="button"
                onClick={() => cmsNavigate("content-types")}
              >
                {t().back}
              </button>
              <PageHeader title={item().name} description={t().description} />
              <Show when={item().id === "article"}>
                <div
                  class="mb-6 flex gap-6 border-b border-gray-200 dark:border-neutral-800"
                  role="tablist"
                  aria-label="Ansicht"
                >
                  <For
                    each={
                      [
                        ["list", "Liste"],
                        ["tiles", "Kacheln"],
                      ] as const
                    }
                  >
                    {([value, label]) => (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={state.tab() === value ? "true" : "false"}
                        class={`border-b-2 pb-3 text-sm ${state.tab() === value ? "border-[var(--dashboard-accent)] font-semibold text-[var(--dashboard-accent)]" : "border-transparent font-medium text-gray-500 hover:text-[var(--dashboard-accent)] dark:text-neutral-400"}`}
                        onClick={() => state.tabSet(value)}
                      >
                        {label}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
              <Show when={item().id === "article" && state.tab() === "list"}>
                <CmsProductList />
              </Show>
              <Show
                when={item().id === "article" && state.tab() === "tiles"}
                fallback={
                  <Show when={item().id !== "article"}>
                    <section class={cmsCardClass}>
                      <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
                        <h2 class="font-semibold">{t().fields}</h2>
                        <div class="flex flex-wrap items-end gap-2">
                          <label class="text-sm">
                            {t().type}
                            <select
                              class={`${input} mt-1`}
                              value={state.picker()}
                              onChange={(event) =>
                                state.pickerSet(event.currentTarget.value as ReturnType<typeof state.picker>)
                              }
                            >
                              <For each={Object.entries(t().types)}>
                                {([key, label]) => <option value={key}>{label}</option>}
                              </For>
                            </select>
                          </label>
                          <button class={cmsPrimaryButtonClass} type="button" onClick={state.add}>
                            + {t().add}
                          </button>
                        </div>
                      </div>
                      <div class="divide-y divide-gray-200 dark:divide-neutral-800">
                        <For each={item().fields}>
                          {(field, index) => (
                            <div class="flex flex-wrap items-center gap-3 py-3">
                              <span class={cmsIconCircleClass}>
                                <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
                                  <path d={mdiClipboardTextOutline} />
                                </svg>
                              </span>
                              <div class="min-w-0 flex-1">
                                <span class="block text-sm font-medium">{field.label}</span>
                                <span class="mt-0.5 block text-xs text-gray-500 dark:text-neutral-400">
                                  {field.key} · {t().types[field.type]}
                                </span>
                              </div>
                              <button
                                class={button}
                                type="button"
                                aria-label={`${t().up}: ${field.label}`}
                                disabled={index() === 0}
                                onClick={() => state.move(field.id, -1)}
                              >
                                ↑
                              </button>
                              <button
                                class={button}
                                type="button"
                                aria-label={`${t().down}: ${field.label}`}
                                disabled={index() === item().fields.length - 1}
                                onClick={() => state.move(field.id, 1)}
                              >
                                ↓
                              </button>
                            </div>
                          )}
                        </For>
                      </div>
                    </section>
                  </Show>
                }
              >
                <CmsProductTiles />
              </Show>
            </>
          )}
        </Show>
      </Show>
    </div>
  )
}

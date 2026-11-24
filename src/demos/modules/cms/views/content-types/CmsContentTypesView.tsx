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
import { Drawer } from "../../ui/Drawer.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsContentTypesStateCreate } from "./cmsContentTypesStateCreate.js"

const text = {
  de: {
    title: "Inhaltstypen",
    description: "Strukturieren Sie Ihre Inhalte mit wiederverwendbaren Feldern.",
    back: "← Alle Inhaltstypen",
    fields: "Felder",
    add: "Feld hinzufügen",
    type: "Feldtyp",
    settings: "Feldeinstellungen",
    label: "Bezeichnung",
    key: "Schlüssel",
    help: "Hilfetext",
    required: "Pflichtfeld",
    up: "Nach oben",
    down: "Nach unten",
    remove: "Feld entfernen",
    count: "Felder",
    countOne: "Feld",
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
    settings: "Field settings",
    label: "Label",
    key: "Key",
    help: "Help text",
    required: "Required",
    up: "Move up",
    down: "Move down",
    remove: "Remove field",
    count: "fields",
    countOne: "field",
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
  return (
    <div>
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
                      {`${item.fields.length} ${item.fields.length === 1 ? t().countOne : t().count} →`}
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
                      <button type="button" class="min-w-0 flex-1 text-left" onClick={() => state.select(field.id)}>
                        <span class="block text-sm font-medium">{field.label}</span>
                        <span class="mt-0.5 block text-xs text-gray-500 dark:text-neutral-400">
                          {field.key} · {t().types[field.type]}
                        </span>
                      </button>
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
                      <button class={button} type="button" onClick={() => state.select(field.id)}>
                        {t().settings}
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </section>
          </>
        )}
      </Show>
      <Drawer
        title={t().settings}
        open={!!state.field()}
        onOpenChange={(open) => {
          if (!open) state.select()
        }}
      >
        <Show when={state.field()}>
          {(field) => (
            <div class="space-y-4 pt-4">
              <label class="block text-sm">
                {t().label}
                <input
                  class={`${input} mt-1`}
                  value={field().label}
                  onInput={(e) => state.change({ label: e.currentTarget.value })}
                />
              </label>
              <label class="block text-sm">
                {t().key}
                <input
                  class={`${input} mt-1`}
                  value={field().key}
                  onInput={(e) => state.change({ key: e.currentTarget.value })}
                />
              </label>
              <label class="block text-sm">
                {t().help}
                <textarea
                  class={`${input} mt-1`}
                  value={field().help}
                  onInput={(e) => state.change({ help: e.currentTarget.value })}
                />
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field().required}
                  onChange={(e) => state.change({ required: e.currentTarget.checked })}
                />
                {t().required}
              </label>
              <button
                class={`${button} text-red-700 dark:text-red-400`}
                type="button"
                onClick={() => state.remove(field().id)}
              >
                {t().remove}
              </button>
            </div>
          )}
        </Show>
      </Drawer>
    </div>
  )
}

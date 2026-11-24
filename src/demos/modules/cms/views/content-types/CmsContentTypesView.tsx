import { Button } from "#ui/interactive/button/Button.jsx"
import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
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
const button =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
const input = "w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
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
            <div class="grid gap-3 sm:grid-cols-2">
              <For each={state.types()}>
                {(item) => (
                  <button
                    type="button"
                    class="rounded-2xl border border-neutral-200 p-4 text-left hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    onClick={() => cmsNavigate("content-types", item.id)}
                  >
                    <div class="font-semibold">{item.name}</div>
                    <div class="mt-1 text-sm text-neutral-500">
                      {`${item.fields.length} ${item.fields.length === 1 ? t().countOne : t().count} →`}
                    </div>
                  </button>
                )}
              </For>
            </div>
          </>
        }
      >
        {(item) => (
          <>
            <button class={`${button} mb-5`} type="button" onClick={() => cmsNavigate("content-types")}>
              {t().back}
            </button>
            <PageHeader title={item().name} description={t().description} />
            <section class="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
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
                  <Button class={button} type="button" onClick={state.add}>
                    + {t().add}
                  </Button>
                </div>
              </div>
              <div class="space-y-2">
                <For each={item().fields}>
                  {(field, index) => (
                    <div class="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800">
                      <button type="button" class="min-w-0 flex-1 text-left" onClick={() => state.select(field.id)}>
                        <span class="block text-sm font-medium">{field.label}</span>
                        <span class="text-xs text-neutral-500">
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
              <button class={button} type="button" onClick={() => state.remove(field().id)}>
                {t().remove}
              </button>
            </div>
          )}
        </Show>
      </Drawer>
    </div>
  )
}

import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { CmsTree } from "../../ui/CmsTree.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsMenusViewStateCreate } from "./cmsMenusViewStateCreate.js"

const text = {
  de: {
    title: "Menüs",
    description: "Navigationsmenüs und ihre Einträge verwalten.",
    menu: "Menü",
    entries: "Menüeinträge",
    hint: "Einträge ziehen, um ihre Reihenfolge oder Ebene zu ändern.",
    add: "Eintrag hinzufügen",
    addChild: "Unterpunkt hinzufügen",
    edit: "Bearbeiten",
    remove: "Löschen",
    confirm: "Diesen Eintrag und alle Unterpunkte löschen?",
    label: "Bezeichnung",
    url: "Link",
    save: "Speichern",
    cancel: "Abbrechen",
    newItem: "Neuer Eintrag",
    editItem: "Eintrag bearbeiten",
    child: "Neuer Unterpunkt",
    expand: "Aufklappen",
    collapse: "Zuklappen",
    empty: "Noch keine Einträge.",
  },
  en: {
    title: "Menus",
    description: "Manage navigation menus and their items.",
    menu: "Menu",
    entries: "Menu items",
    hint: "Drag items to change their order or level.",
    add: "Add item",
    addChild: "Add child item",
    edit: "Edit",
    remove: "Delete",
    confirm: "Delete this item and all its children?",
    label: "Label",
    url: "Link",
    save: "Save",
    cancel: "Cancel",
    newItem: "New item",
    editItem: "Edit item",
    child: "New child item",
    expand: "Expand",
    collapse: "Collapse",
    empty: "No items yet.",
  },
}

export function CmsMenusView(_props: { id?: string }) {
  const state = cmsMenusViewStateCreate()
  return (
    <div>
      <PageHeader title={text[cmsLocale.get()].title} description={text[cmsLocale.get()].description} />
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section class="min-w-0 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
          <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
            <label class="block min-w-0 flex-1 basis-48 text-sm font-medium">
              {text[cmsLocale.get()].menu}
              <select
                class="mt-1 block w-full min-w-0 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                value={state.selectedMenuId()}
                onChange={(event) => state.selectMenu(event.currentTarget.value)}
              >
                <For each={state.menus()}>
                  {(menu) => (
                    <option value={menu.id} selected={menu.id === state.selectedMenuId()}>
                      {menu.id === "main"
                        ? cmsLocale.get() === "de"
                          ? "Hauptnavigation"
                          : "Main navigation"
                        : menu.name}
                    </option>
                  )}
                </For>
              </select>
            </label>
            <button
              type="button"
              class="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
              onClick={() => state.add()}
            >
              {text[cmsLocale.get()].add}
            </button>
          </div>
          <h2 class="font-semibold">{text[cmsLocale.get()].entries}</h2>
          <p class="mb-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400">{text[cmsLocale.get()].hint}</p>
          <Show
            when={state.menu().items.length}
            fallback={<p class="text-sm text-neutral-500">{text[cmsLocale.get()].empty}</p>}
          >
            <CmsTree
              items={state.menu().items}
              itemId={(item) => item.id}
              itemChildren={(item) => item.children}
              onMove={state.move}
              labels={{ expand: text[cmsLocale.get()].expand, collapse: text[cmsLocale.get()].collapse }}
              renderItem={(item) => (
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="break-words font-medium">{item.label}</div>
                    <div class="break-all text-xs text-neutral-500">{item.url}</div>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      class="rounded-lg border border-neutral-200 px-2 py-1 dark:border-neutral-700"
                      onClick={() => state.add(item.id)}
                    >
                      {text[cmsLocale.get()].addChild}
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-neutral-200 px-2 py-1 dark:border-neutral-700"
                      onClick={() => state.edit(item)}
                    >
                      {text[cmsLocale.get()].edit}
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-neutral-200 px-2 py-1 text-red-600 dark:border-neutral-700 dark:text-red-400"
                      onClick={() => {
                        if (window.confirm(text[cmsLocale.get()].confirm)) state.remove(item.id)
                      }}
                    >
                      {text[cmsLocale.get()].remove}
                    </button>
                  </div>
                </div>
              )}
            />
          </Show>
        </section>
        <Show when={state.formOpen()}>
          <section class="h-fit rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
            <h2 class="font-semibold">
              {state.editingId()
                ? text[cmsLocale.get()].editItem
                : state.parentId()
                  ? text[cmsLocale.get()].child
                  : text[cmsLocale.get()].newItem}
            </h2>
            <form
              class="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                state.save()
              }}
            >
              <label class="block text-sm font-medium">
                {text[cmsLocale.get()].label}
                <input
                  required
                  value={state.label()}
                  onInput={(event) => state.setLabel(event.currentTarget.value)}
                  class="mt-1 block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
                />
              </label>
              <label class="block text-sm font-medium">
                {text[cmsLocale.get()].url}
                <input
                  required
                  value={state.url()}
                  onInput={(event) => state.setUrl(event.currentTarget.value)}
                  class="mt-1 block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
                  placeholder="/about"
                />
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  type="submit"
                  class="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {text[cmsLocale.get()].save}
                </button>
                <button
                  type="button"
                  class="rounded-xl border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
                  onClick={state.closeForm}
                >
                  {text[cmsLocale.get()].cancel}
                </button>
              </div>
            </form>
          </section>
        </Show>
      </div>
    </div>
  )
}

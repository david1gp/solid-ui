import { mdiViewGridOutline } from "@adaptive-ds/mdi/mdiViewGridOutline.js"
import { mdiViewListOutline } from "@adaptive-ds/mdi/mdiViewListOutline.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsMediaLibraryStateCreate } from "./cmsMediaLibraryStateCreate.js"
import { cmsMediaStore, type CmsMediaItem } from "./cmsMediaStore.js"

/** Shared library UI; onSelect enables picker mode. */
export function CmsMediaLibrary(p: { onSelect?: (item: CmsMediaItem) => void }) {
  const state = cmsMediaLibraryStateCreate()
  return (
    <div class="space-y-4">
      <label
        class="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-neutral-400 p-6 text-center text-sm dark:border-neutral-600"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          if (event.dataTransfer) state.upload(event.dataTransfer.files)
        }}
      >
        <span>{state.text().drop}</span>
        <span class="rounded-xl bg-neutral-900 px-4 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900">
          {state.text().upload}
        </span>
        <input
          class="sr-only"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            if (event.currentTarget.files) state.upload(event.currentTarget.files)
            event.currentTarget.value = ""
          }}
        />
      </label>
      <div class="flex flex-col gap-4 lg:flex-row">
        <aside class="w-full shrink-0 space-y-2 lg:w-48">
          <h2 class="text-sm font-semibold">{state.text().folders}</h2>
          <For
            each={[
              { value: "*", label: state.text().all },
              { value: "", label: state.text().root },
              ...cmsMediaStore.folders().map((name) => ({ value: name, label: name })),
            ]}
          >
            {(folder) => (
              <button
                type="button"
                class={`block w-full rounded-lg px-3 py-2 text-left text-sm ${state.folder() === folder.value ? "bg-neutral-200 dark:bg-neutral-800" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                onClick={() => state.changeFolder(folder.value)}
              >
                {folder.label}
              </button>
            )}
          </For>
          <form
            class="flex gap-1"
            onSubmit={(event) => {
              event.preventDefault()
              state.addFolder()
            }}
          >
            <input
              aria-label={state.text().folderName}
              placeholder={state.text().folderName}
              class="min-w-0 w-full rounded-lg border border-neutral-300 bg-transparent px-2 py-1 text-sm dark:border-neutral-700"
              value={state.folderName()}
              onInput={(event) => state.changeFolderName(event.currentTarget.value)}
            />
            <button
              type="submit"
              aria-label={state.text().addFolder}
              title={state.text().addFolder}
              class="rounded-lg border px-2 dark:border-neutral-700"
            >
              +
            </button>
          </form>
        </aside>
        <section class="min-w-0 flex-1 space-y-4">
          <div class="flex flex-wrap gap-2">
            <input
              type="search"
              aria-label={state.text().search}
              placeholder={state.text().search}
              value={state.search()}
              onInput={(event) => state.changeSearch(event.currentTarget.value)}
              class="min-w-40 flex-1 rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
            />
            <button
              type="button"
              aria-pressed={state.layout() === "grid" ? "true" : "false"}
              aria-label={state.text().grid}
              class="rounded-xl border px-3 py-2 text-sm dark:border-neutral-700"
              onClick={() => state.changeLayout("grid")}
            >
              <Icon path={mdiViewGridOutline} class="size-5 sm:hidden" />
              <span class="hidden sm:inline">{state.text().grid}</span>
            </button>
            <button
              type="button"
              aria-pressed={state.layout() === "list" ? "true" : "false"}
              aria-label={state.text().list}
              class="rounded-xl border px-3 py-2 text-sm dark:border-neutral-700"
              onClick={() => state.changeLayout("list")}
            >
              <Icon path={mdiViewListOutline} class="size-5 sm:hidden" />
              <span class="hidden sm:inline">{state.text().list}</span>
            </button>
          </div>
          <Show when={state.filtered().length} fallback={<p class="text-sm text-neutral-500">{state.text().empty}</p>}>
            <div
              class={state.layout() === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4" : "space-y-2"}
            >
              <For each={state.filtered()}>
                {(item) => (
                  <button
                    type="button"
                    onClick={() => state.select(item.id)}
                    aria-pressed={state.selected()?.id === item.id ? "true" : "false"}
                    class={`overflow-hidden rounded-xl border text-left text-sm dark:border-neutral-700 ${state.selected()?.id === item.id ? "ring-2 ring-neutral-500" : ""} ${state.layout() === "list" ? "flex items-center gap-3" : ""}`}
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      class={state.layout() === "grid" ? "aspect-square w-full object-cover" : "h-14 w-14 object-cover"}
                    />
                    <span class="block min-w-0 truncate p-2">{item.name}</span>
                  </button>
                )}
              </For>
            </div>
          </Show>
        </section>
        <Show when={state.selected()}>
          {(item) => (
            <aside class="w-full space-y-4 rounded-2xl border p-4 dark:border-neutral-700 lg:w-72">
              <div class="flex items-center justify-between">
                <h2 class="font-semibold">{state.text().details}</h2>
                <button type="button" aria-label={state.text().close} onClick={() => state.select(undefined)}>
                  ×
                </button>
              </div>
              <p class="break-all text-sm">{item().name}</p>
              <button
                type="button"
                aria-label={state.text().focus}
                class="relative block w-full overflow-hidden rounded-xl"
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect()
                  cmsMediaStore.update(item().id, {
                    focusX: Math.round(Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))),
                    focusY: Math.round(Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))),
                  })
                }}
              >
                <img src={item().url} alt={item().alt} class="block w-full" />
                <span
                  class="pointer-events-none absolute border-2 border-white shadow"
                  style={{
                    left: `${item().cropX}%`,
                    top: `${item().cropY}%`,
                    width: `${item().cropWidth}%`,
                    height: `${item().cropHeight}%`,
                  }}
                />
                <span
                  class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-neutral-900"
                  style={{ left: `${item().focusX}%`, top: `${item().focusY}%` }}
                />
              </button>
              <p class="text-xs text-neutral-500">
                {state.text().focusHint} ({item().focusX}%, {item().focusY}%)
              </p>
              <label class="block text-sm">
                {state.text().alt}
                <input
                  class="mt-1 w-full rounded-lg border bg-transparent px-2 py-1 dark:border-neutral-700"
                  value={item().alt}
                  onInput={(event) => cmsMediaStore.update(item().id, { alt: event.currentTarget.value })}
                />
              </label>
              <label class="block text-sm">
                {state.text().folder}
                <select
                  class="mt-1 w-full rounded-lg border bg-transparent px-2 py-1 dark:border-neutral-700"
                  value={item().folder}
                  onChange={(event) => cmsMediaStore.update(item().id, { folder: event.currentTarget.value })}
                >
                  <option value="">{state.text().root}</option>
                  <For each={cmsMediaStore.folders()}>{(folder) => <option value={folder}>{folder}</option>}</For>
                </select>
              </label>
              <fieldset class="space-y-2">
                <legend class="text-sm font-medium">{state.text().crop}</legend>
                <p class="text-xs text-neutral-500">{state.text().cropHint}</p>
                <For each={["cropX", "cropY", "cropWidth", "cropHeight"] as const}>
                  {(key, index) => (
                    <label class="flex items-center gap-2 text-xs">
                      <span class="w-14">
                        {[state.text().x, state.text().y, state.text().width, state.text().height][index()]}
                      </span>
                      <input
                        type="range"
                        min={key === "cropWidth" || key === "cropHeight" ? 1 : 0}
                        max={
                          key === "cropX"
                            ? 100 - item().cropWidth
                            : key === "cropY"
                              ? 100 - item().cropHeight
                              : key === "cropWidth"
                                ? 100 - item().cropX
                                : 100 - item().cropY
                        }
                        value={item()[key]}
                        onInput={(event) =>
                          cmsMediaStore.update(item().id, { [key]: Number(event.currentTarget.value) })
                        }
                        class="min-w-0 flex-1"
                      />
                      <span>{item()[key]}%</span>
                    </label>
                  )}
                </For>
              </fieldset>
              <div class="flex flex-wrap gap-2">
                <Show when={p.onSelect}>
                  <button
                    type="button"
                    class="rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
                    onClick={() => p.onSelect?.(item())}
                  >
                    {state.text().select}
                  </button>
                </Show>
                <button
                  type="button"
                  class="rounded-xl border border-red-300 px-3 py-2 text-sm text-red-700 dark:text-red-400"
                  onClick={state.remove}
                >
                  {state.text().delete}
                </button>
              </div>
            </aside>
          )}
        </Show>
      </div>
    </div>
  )
}

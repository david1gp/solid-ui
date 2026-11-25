import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsButtonClass } from "../../ui/cmsButtonClass.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { cmsCardClass } from "../../ui/cmsCardClass.js"
import { cmsIconCircleClass } from "../../ui/cmsIconCircleClass.js"
import { cmsInputClass } from "../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../ui/cmsPrimaryButtonClass.js"
import { cmsMediaLibraryStateCreate } from "./cmsMediaLibraryStateCreate.js"
import { cmsMediaStore } from "./cmsMediaStore.js"

export function CmsMediaLibrary() {
  const state = cmsMediaLibraryStateCreate()
  return (
    <div class="space-y-4">
      <label
        class="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm dark:border-neutral-700"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          if (event.dataTransfer) state.upload(event.dataTransfer.files)
        }}
      >
        <span class={cmsIconCircleClass}>
          <Icon path={mdiFolderMultipleOutline} class="size-5" />
        </span>
        <span>{state.text().drop}</span>
        <span class={cmsPrimaryButtonClass}>{state.text().upload}</span>
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
      <div ref={state.observeContainer} class="@container flex flex-col gap-4 lg:flex-row">
        <aside class={`${cmsCardClass} w-full shrink-0 space-y-2 lg:w-56 lg:self-start`}>
          <h2 class="mb-4 text-base font-semibold">{state.text().folders}</h2>
          <For
            each={[
              { value: "*", label: state.text().all },
              { value: "", label: state.text().root },
            ]}
          >
            {(folder) => (
              <button
                type="button"
                class={`block w-full rounded-lg px-3 py-2 text-left text-sm ${state.folder() === folder.value ? "bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] font-medium text-[var(--dashboard-accent)]" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                onClick={() => state.changeFolder(folder.value)}
              >
                {folder.label}
              </button>
            )}
          </For>
          <For each={cmsMediaStore.folders()}>
            {(name) => (
              <div class="group flex items-center">
                <button
                  type="button"
                  class={`min-w-0 flex-1 truncate rounded-lg px-3 py-2 text-left text-sm ${state.folder() === name ? "bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] font-medium text-[var(--dashboard-accent)]" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                  onClick={() => state.changeFolder(name)}
                >
                  {name}
                </button>
                <button
                  type="button"
                  aria-label={`${state.text().deleteFolder}: ${name}`}
                  title={state.text().deleteFolder}
                  class="rounded-lg px-2 py-1 text-neutral-500 opacity-0 hover:bg-neutral-100 focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 dark:hover:bg-neutral-800 [@media(hover:none)]:opacity-100"
                  onClick={() => state.requestFolderRemove(name)}
                >
                  ×
                </button>
              </div>
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
              class={`${cmsInputClass} min-w-0 w-full`}
              value={state.folderName()}
              onInput={(event) => state.changeFolderName(event.currentTarget.value)}
            />
            <button
              type="submit"
              aria-label={state.text().addFolder}
              title={state.text().addFolder}
              class={`${cmsButtonClass} inline-flex size-[34px] shrink-0 items-center justify-center !p-0`}
            >
              <Icon path={mdiPlus} class="size-4" />
            </button>
          </form>
        </aside>
        <div
          class="grid min-w-0 flex-1 overflow-hidden opacity-100 transition-[grid-template-rows,flex-grow,opacity] duration-500 ease-in-out motion-reduce:transition-none aria-hidden:opacity-0 max-lg:grid-rows-[1fr] max-lg:aria-hidden:grid-rows-[0fr] lg:aria-hidden:flex-[0_1_0%]"
          aria-hidden={state.gridCollapsed() ? "true" : undefined}
          inert={state.gridCollapsed()}
        >
          <section
            class={`min-h-0 min-w-0 space-y-4 overflow-hidden ${state.narrow() ? "lg:w-[calc(100cqw-15rem)]" : ""}`}
          >
            <div class="flex flex-wrap gap-2">
              <input
                type="search"
                aria-label={state.text().search}
                placeholder={state.text().search}
                value={state.search()}
                onInput={(event) => state.changeSearch(event.currentTarget.value)}
                class={`${cmsInputClass} min-w-40 flex-1`}
              />
            </div>
            <Show
              when={state.filtered().length}
              fallback={
                <div class={`${cmsCardClass} flex flex-col items-center gap-3 py-12 text-center`}>
                  <span class={cmsIconCircleClass}>
                    <Icon path={mdiFolderMultipleOutline} class="size-5" />
                  </span>
                  <p class="text-sm text-gray-500 dark:text-neutral-400">{state.text().empty}</p>
                </div>
              }
            >
              <div class={`${cmsCardClass} grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4`}>
                <For each={state.filtered()}>
                  {(item) => (
                    <button
                      type="button"
                      onClick={() => state.select(item.id)}
                      aria-pressed={state.selected()?.id === item.id ? "true" : "false"}
                      class={`${cmsCardClass} overflow-hidden p-0 text-left text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 ${state.selected()?.id === item.id ? "ring-2 ring-[var(--dashboard-accent)]" : ""}`}
                    >
                      <img src={item.url} alt={item.alt} class="aspect-square w-full object-cover" />
                      <span class="block min-w-0 truncate p-2">{item.name}</span>
                    </button>
                  )}
                </For>
              </div>
            </Show>
          </section>
        </div>
        <Show when={state.selected()}>
          {(item) => (
            <aside class={`${cmsCardClass} w-full space-y-4 lg:w-72 lg:shrink-0`}>
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
                  class={`${cmsInputClass} mt-1 w-full`}
                  value={item().alt}
                  onInput={(event) => cmsMediaStore.update(item().id, { alt: event.currentTarget.value })}
                />
              </label>
              <label class="block text-sm">
                {state.text().folder}
                <select
                  class={`${cmsInputClass} mt-1 w-full`}
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
                <button type="button" class={`${cmsButtonClass} text-red-700 dark:text-red-400`} onClick={state.remove}>
                  {state.text().delete}
                </button>
              </div>
            </aside>
          )}
        </Show>
      </div>
      <ConfirmDialog
        title={state.text().deleteFolder}
        description={state.text().deleteFolderDescription(state.folderToRemove() ?? "", state.folderRemoveCount())}
        open={state.folderToRemove() !== undefined}
        onOpenChange={(open) => {
          if (!open) state.closeFolderRemove()
        }}
        onConfirm={() => state.confirmFolderRemove()}
        confirmLabel={state.text().deleteFolderOnly}
        cancelLabel={state.text().cancel}
        extraAction={{ label: state.text().deleteAll, onClick: () => state.confirmFolderRemove(true) }}
      />
    </div>
  )
}

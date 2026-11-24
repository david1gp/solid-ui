import { mdiClockOutline } from "@adaptive-ds/mdi/mdiClockOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import type { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardDraftsCard(props: {
  state: ReturnType<typeof cmsDashboardStateCreate>
  accentColor?: string
}) {
  return (
    <section
      class="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60"
      style={props.accentColor ? { "--dashboard-accent": props.accentColor } : undefined}
    >
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800">
        <div role="tablist" aria-label={props.state.text().drafts} class="flex min-w-0 gap-4">
          <button
            id="dashboard-drafts-tab"
            type="button"
            role="tab"
            aria-selected={props.state.activeTab() === "drafts" ? "true" : "false"}
            aria-controls="dashboard-content-panel"
            onClick={() => props.state.selectTab("drafts")}
            class={
              props.state.activeTab() === "drafts"
                ? "border-b-2 border-[var(--dashboard-accent,var(--color-blue-600))] pb-3 text-sm font-semibold text-[var(--dashboard-accent,var(--color-blue-600))]"
                : "border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }
          >
            {props.state.text().drafts}
          </button>
          <button
            id="dashboard-activity-tab"
            type="button"
            role="tab"
            aria-selected={props.state.activeTab() === "activity" ? "true" : "false"}
            aria-controls="dashboard-content-panel"
            onClick={() => props.state.selectTab("activity")}
            class={
              props.state.activeTab() === "activity"
                ? "border-b-2 border-[var(--dashboard-accent,var(--color-blue-600))] pb-3 text-sm font-semibold text-[var(--dashboard-accent,var(--color-blue-600))]"
                : "border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }
          >
            {props.state.text().activity}
          </button>
        </div>
        <Show when={props.state.activeTab() === "drafts"}>
          <label class="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{props.state.text().sort}</span>
            <select
              aria-label={props.state.text().sort}
              value={props.state.draftSort()}
              onChange={(event) => props.state.selectDraftSort(event.currentTarget.value === "name" ? "name" : "date")}
              class="rounded-lg border border-gray-200 bg-transparent px-2 py-1.5 text-xs text-gray-700 dark:border-gray-700 dark:text-gray-200 dark:[color-scheme:dark]"
            >
              <option value="date">{props.state.text().date}</option>
              <option value="name">{props.state.text().name}</option>
            </select>
          </label>
        </Show>
      </div>
      <div
        id="dashboard-content-panel"
        role="tabpanel"
        aria-labelledby={props.state.activeTab() === "drafts" ? "dashboard-drafts-tab" : "dashboard-activity-tab"}
      >
        <Show
          when={props.state.activeTab() === "drafts"}
          fallback={
            <ul class="divide-y divide-gray-100 dark:divide-gray-800">
              <For each={props.state.activities}>
                {(activity) => (
                  <li class="flex items-center gap-3 py-3">
                    <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      <Icon path={mdiClockOutline} class="size-5" />
                    </span>
                    <span class="min-w-0 flex-1 text-sm font-medium">{activity.label[cmsLocale.get()]}</span>
                    <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                      {props.state.relative(activity.time, activity.unit)}
                    </span>
                  </li>
                )}
              </For>
            </ul>
          }
        >
          <ul class="divide-y divide-gray-100 dark:divide-gray-800">
            <For each={props.state.sortedDrafts()}>
              {(draft) => (
                <li>
                  <button
                    type="button"
                    onClick={() => props.state.navigate("pages")}
                    class="flex w-full items-center gap-3 rounded-lg py-3 text-left hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent,var(--color-blue-500))] dark:hover:bg-gray-800/60"
                  >
                    <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[var(--dashboard-accent,var(--color-blue-600))] dark:bg-gray-800">
                      <Icon path={mdiFileDocumentOutline} class="size-5" />
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="block text-sm font-medium">{draft.name[cmsLocale.get()]}</span>
                      <span class="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                        {props.state.text().lastEdited}:{" "}
                        {new Intl.DateTimeFormat(cmsLocale.get(), { dateStyle: "medium", timeStyle: "short" }).format(
                          new Date(draft.lastEdited),
                        )}
                      </span>
                    </span>
                    <span class="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {props.state.text().draft}
                    </span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </section>
  )
}

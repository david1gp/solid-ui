import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiEmailOpenOutline } from "@adaptive-ds/mdi/mdiEmailOpenOutline.js"
import { mdiEmailOutline } from "@adaptive-ds/mdi/mdiEmailOutline.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsNumberFormat } from "../../i18n/cmsNumberFormat.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { CmsDashboardAlertIcon } from "../dashboard/CmsDashboardAlertIcon.js"
import { cmsNotificationsViewStateCreate } from "./cmsNotificationsViewStateCreate.js"

export function CmsNotificationsView(_props: { id?: string }) {
  const state = cmsNotificationsViewStateCreate()
  return (
    <div>
      <PageHeader
        title={state.t().title}
        description={state.t().description}
        actions={
          <button
            type="button"
            disabled={state.store.unreadCount() === 0}
            class="rounded-xl border border-neutral-300 px-4 py-2 text-sm disabled:opacity-40 dark:border-neutral-700"
            onClick={state.store.markAllRead}
          >
            {state.t().allRead}
          </button>
        }
      />
      <div class="mb-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={state.t().title}>
        <For each={state.filters()}>
          {(filter) => (
            <button
              type="button"
              aria-pressed={state.filter() === filter.id ? "true" : "false"}
              onClick={() => state.setFilter(filter.id)}
              class={`shrink-0 rounded-lg px-3 py-2 text-sm ${state.filter() === filter.id ? "bg-[var(--dashboard-accent)] text-white" : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"}`}
            >
              {filter.label} <span class="ml-1 opacity-75">{filter.count}</span>
            </button>
          )}
        </For>
      </div>
      <p role="status" class="mb-2 text-sm text-emerald-700 dark:text-emerald-400">
        {state.feedback()}
      </p>
      <div class="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        <Show
          when={state.items().length > 0}
          fallback={
            <p class="p-6 text-sm text-neutral-500 dark:text-neutral-400">
              {state.store.visible().length === 0 ? state.t().empty : state.t().emptyFilter}
            </p>
          }
        >
          <For each={state.items()}>
            {(item) => (
              <div
                class={`flex flex-wrap items-start justify-between gap-3 p-4 ${state.store.isUnread(item.id) ? "bg-[color-mix(in_oklab,var(--dashboard-accent)_5%,transparent)] dark:bg-[color-mix(in_oklab,var(--dashboard-accent)_8%,transparent)]" : ""}`}
              >
                <CmsDashboardAlertIcon type={item.type} size="small" />
                <button type="button" class="min-w-0 flex-1 text-left" onClick={() => state.store.markRead(item.id)}>
                  <span class="flex flex-wrap items-center gap-2 text-sm font-medium">
                    <span
                      class={`h-2 w-2 shrink-0 rounded-full ${state.store.isUnread(item.id) ? "bg-[var(--dashboard-accent)]" : "bg-neutral-300 dark:bg-neutral-700"}`}
                    />
                    {item.title[state.locale()]}{" "}
                    <Show when={state.store.isUnread(item.id)}>
                      <span class="rounded-full bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] px-2 py-0.5 text-xs text-[color-mix(in_srgb,var(--dashboard-accent)_75%,black)] dark:text-[color-mix(in_srgb,var(--dashboard-accent)_65%,white)]">
                        {state.t().new}
                      </span>
                    </Show>
                  </span>
                  <span class="mt-1 block pl-4 text-xs text-neutral-500 dark:text-neutral-400">
                    {item.subtitle[state.locale()]}
                  </span>
                  <Show when={"amount" in item && item.amount}>
                    {(amount) => (
                      <span class="mt-1 block pl-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        +{cmsNumberFormat(amount(), { style: "currency", currency: "EUR" })}
                      </span>
                    )}
                  </Show>
                  <time
                    class="mt-1 block pl-4 text-xs text-neutral-500 dark:text-neutral-400"
                    datetime={item.createdAt.toISOString()}
                    title={state.fullTime(item.createdAt)}
                  >
                    {state.time(item.createdAt)}
                  </time>
                </button>
                <div class="flex w-full flex-wrap items-center gap-3 pl-8 text-sm sm:w-auto sm:pl-4">
                  <Show when={item.type !== "success"}>
                    <button
                      type="button"
                      class="text-[var(--dashboard-accent)] underline"
                      onClick={() => state.action(item.id)}
                    >
                      {state.actionLabel(item)}
                    </button>
                  </Show>
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    aria-label={state.store.isUnread(item.id) ? state.t().read : state.t().unread}
                    title={state.store.isUnread(item.id) ? state.t().read : state.t().unread}
                    onClick={() => state.store.toggleRead(item.id)}
                  >
                    <Icon path={state.store.isUnread(item.id) ? mdiEmailOpenOutline : mdiEmailOutline} class="size-4" />
                  </button>
                  <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                    aria-label={`${state.t().dismiss}: ${item.title[state.locale()]}`}
                    title={state.t().dismiss}
                    onClick={() => state.store.dismiss(item.id)}
                  >
                    <Icon path={mdiClose} class="size-4" />
                  </button>
                </div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  )
}

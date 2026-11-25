import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiEmailOpenOutline } from "@adaptive-ds/mdi/mdiEmailOpenOutline.js"
import { mdiEmailOutline } from "@adaptive-ds/mdi/mdiEmailOutline.js"
import { mdiRefresh } from "@adaptive-ds/mdi/mdiRefresh.js"
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
      <div class="mb-4 flex flex-wrap gap-2 pb-1" role="group" aria-label={state.t().title}>
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
                class={`flex items-center gap-3 p-4 ${state.store.isUnread(item.id) ? "bg-[color-mix(in_oklab,var(--dashboard-accent)_5%,transparent)] dark:bg-[color-mix(in_oklab,var(--dashboard-accent)_8%,transparent)]" : ""}`}
              >
                <div class="relative shrink-0">
                  <CmsDashboardAlertIcon type={item.type} size="small" />
                  <Show when={state.store.isUnread(item.id)}>
                    <span
                      class="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[var(--dashboard-accent)] ring-2 ring-white dark:ring-neutral-900"
                      role="img"
                      aria-label={state.t().unreadFilter}
                    />
                  </Show>
                </div>
                <div class="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-left">
                  <span class="col-span-2 min-w-0 text-sm font-medium sm:col-span-1 sm:col-start-1 sm:row-start-1">
                    <Show when={state.actionInfo(item.id)?.kind === "navigation"} fallback={item.title[state.locale()]}>
                      <button
                        type="button"
                        class="font-medium hover:text-[var(--dashboard-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        title={state.actionInfo(item.id)?.label}
                        aria-label={`${item.title[state.locale()]}: ${state.actionInfo(item.id)?.label}`}
                        onClick={() => state.action(item.id)}
                      >
                        {item.title[state.locale()]}
                      </button>
                    </Show>
                  </span>
                  <Show when={item.subtitle[state.locale()]}>
                    <span class="col-span-2 min-w-0 truncate text-xs text-neutral-500 dark:text-neutral-400 sm:col-span-1 sm:col-start-1 sm:row-start-2">
                      {item.subtitle[state.locale()]}
                    </span>
                  </Show>
                  <Show when={"amount" in item && item.amount}>
                    {(amount) => (
                      <span class="col-start-2 row-start-3 text-right text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-400 sm:row-start-2">
                        +{cmsNumberFormat(amount(), { style: "currency", currency: "EUR" })}
                      </span>
                    )}
                  </Show>
                  <time
                    class="col-start-1 row-start-3 text-xs text-neutral-500 dark:text-neutral-400 sm:col-start-2 sm:row-start-1 sm:text-right"
                    datetime={item.createdAt.toISOString()}
                    title={state.fullTime(item.createdAt)}
                  >
                    {state.time(item.createdAt)}
                  </time>
                </div>
                <div class="flex shrink-0 items-center gap-1 text-sm sm:w-[136px] sm:justify-end sm:gap-3 sm:pl-4">
                  <Show when={state.actionInfo(item.id)?.kind === "restart"}>
                    <button
                      type="button"
                      class="flex size-8 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      aria-label={state.actionInfo(item.id)?.label}
                      title={state.actionInfo(item.id)?.label}
                      onClick={() => state.action(item.id)}
                    >
                      <Icon path={mdiRefresh} class="size-4" />
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

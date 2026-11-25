import { mdiBellOutline } from "@adaptive-ds/mdi/mdiBellOutline.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsShellText } from "../i18n/cmsShellText.js"
import { CmsDashboardAlertIcon } from "../views/dashboard/CmsDashboardAlertIcon.js"
import { cmsNotificationsStore } from "../notifications/cmsNotificationsStore.js"
import { cmsShellHeaderStateCreate } from "./cmsShellHeaderStateCreate.js"

export function CmsShellHeader(p: { group: string; title: string; locale: "de" | "en"; onNavigate: () => void }) {
  const state = cmsShellHeaderStateCreate(() => p.onNavigate())
  return (
    <header class="sticky top-0 z-30 flex shrink-0 flex-wrap items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 text-sm sm:px-8 dark:border-white/10 dark:bg-[#222326]">
      <nav aria-label="Breadcrumb" class="min-w-0 flex-1 truncate text-neutral-500">
        <span class="hidden sm:inline">
          {p.group} <span aria-hidden="true">/</span>{" "}
        </span>
        <span class="font-medium text-neutral-950 dark:text-neutral-50">{p.title}</span>
      </nav>
      <details class="relative -mr-1.5">
        <summary
          class="relative cursor-pointer list-none rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label={`${cmsShellText[p.locale].notifications}: ${cmsNotificationsStore.unreadCount()} ${cmsShellText[p.locale].unreadNotifications}`}
        >
          <Icon path={mdiBellOutline} class="size-5" />
          <Show when={cmsNotificationsStore.unreadCount() > 0}>
            <span
              aria-hidden="true"
              class="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-4 text-white"
            >
              {cmsNotificationsStore.unreadCount()}
            </span>
          </Show>
        </summary>
        <div class="absolute right-0 z-30 mt-2 w-[min(20rem,calc(100vw-6rem))] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-900">
          <div class="border-b border-neutral-100 px-4 py-3 font-semibold dark:border-neutral-800">
            {cmsShellText[p.locale].notifications}
          </div>
          <Show
            when={cmsNotificationsStore.unreadCount() > 0}
            fallback={
              <p class="p-4 text-neutral-500 dark:text-neutral-400">{cmsShellText[p.locale].noNotifications}</p>
            }
          >
            <ul class="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
              <For each={cmsNotificationsStore.unread()}>
                {(alert) => (
                  <li>
                    <button
                      type="button"
                      onClick={state.openNotifications}
                      class="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[var(--dashboard-accent)] dark:hover:bg-neutral-800"
                    >
                      <CmsDashboardAlertIcon type={alert.type} />
                      <span class="min-w-0 flex-1">
                        <span class="block font-medium">{alert.title[p.locale]}</span>
                        <span class="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-300">
                          {alert.subtitle[p.locale]}
                        </span>
                      </span>
                      <Show when={"amount" in alert && alert.amount}>
                        {(amount) => (
                          <span class="shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            +{new Intl.NumberFormat(p.locale, { style: "currency", currency: "EUR" }).format(amount())}
                          </span>
                        )}
                      </Show>
                    </button>
                  </li>
                )}
              </For>
            </ul>
            <button
              type="button"
              onClick={state.openNotifications}
              class="w-full border-t border-neutral-100 px-4 py-3 text-center font-medium text-[var(--dashboard-accent)] hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              {cmsShellText[p.locale].viewAll}
            </button>
          </Show>
        </div>
      </details>
    </header>
  )
}

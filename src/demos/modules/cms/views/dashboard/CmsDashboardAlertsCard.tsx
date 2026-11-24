import { mdiAlertCircleOutline } from "@adaptive-ds/mdi/mdiAlertCircleOutline.js"
import { mdiCash } from "@adaptive-ds/mdi/mdiCash.js"
import { mdiEmailOutline } from "@adaptive-ds/mdi/mdiEmailOutline.js"
import { For, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import type { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardAlertsCard(props: {
  state: ReturnType<typeof cmsDashboardStateCreate>
  accentColor?: string
}) {
  return (
    <section
      class="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60"
      style={props.accentColor ? { "--dashboard-accent": props.accentColor } : undefined}
    >
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-base font-semibold">{props.state.text().alerts}</h2>
        <button
          type="button"
          onClick={() => props.state.navigate("notifications")}
          class="text-sm font-medium text-[var(--dashboard-accent,var(--color-blue-600))] hover:underline"
        >
          {props.state.text().all}
        </button>
      </div>
      <ul class="mt-3 divide-y divide-gray-100 dark:divide-neutral-800">
        <For each={props.state.alerts}>
          {(alert) => (
            <li>
              <button
                type="button"
                onClick={() => props.state.navigate("notifications")}
                class="flex w-full items-center gap-3 rounded-lg py-3 text-left hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent,var(--color-blue-500))] dark:hover:bg-neutral-800/60"
              >
                <span
                  class={
                    alert.type === "payment"
                      ? "flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-neutral-800 dark:text-emerald-400"
                      : alert.type === "error"
                        ? "flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-neutral-800 dark:text-red-400"
                        : "flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[var(--dashboard-accent,var(--color-blue-600))] dark:bg-neutral-800"
                  }
                >
                  <Icon
                    path={
                      alert.type === "payment"
                        ? mdiCash
                        : alert.type === "error"
                          ? mdiAlertCircleOutline
                          : mdiEmailOutline
                    }
                    class="size-5"
                  />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-medium">{alert.title[cmsLocale.get()]}</span>
                  <span class="mt-0.5 block text-xs text-gray-500 dark:text-neutral-400">
                    {alert.subtitle[cmsLocale.get()]}
                  </span>
                </span>
                <Show when={"amount" in alert && alert.amount}>
                  {(amount) => (
                    <span class="shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      +{new Intl.NumberFormat(cmsLocale.get(), { style: "currency", currency: "EUR" }).format(amount())}
                    </span>
                  )}
                </Show>
              </button>
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}

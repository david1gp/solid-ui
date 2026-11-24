import type { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardSiteInfoCard(props: { state: ReturnType<typeof cmsDashboardStateCreate> }) {
  return (
    <section class="min-w-0">
      <h2 class="mb-4 font-semibold">{props.state.text().siteInfo}</h2>
      <div class="relative mt-9 flex min-h-40 flex-col justify-between rounded-2xl border border-blue-100 bg-[color-mix(in_oklab,var(--dashboard-accent)_8%,white)] p-5 dark:border-gray-700 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-900 dark:shadow-xl">
        <div
          class="absolute -top-8 left-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[color-mix(in_oklab,var(--dashboard-accent)_55%,white)] to-[var(--dashboard-accent)] text-3xl font-bold text-white shadow-[0_8px_24px_color-mix(in_oklab,var(--dashboard-accent)_45%,transparent)] dark:border-gray-800"
          aria-hidden="true"
        >
          A<span class="text-lg">.</span>
        </div>
        <div class="flex items-start justify-end gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-gray-800 dark:text-emerald-400">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {props.state.text().online}
          </span>
        </div>
        <div>
          <p class="text-lg font-semibold">{props.state.siteInfo.name}</p>
          <p class="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">{props.state.siteInfo.url}</p>
        </div>
      </div>
    </section>
  )
}

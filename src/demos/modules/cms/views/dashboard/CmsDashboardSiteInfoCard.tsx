import type { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardSiteInfoCard(props: { state: ReturnType<typeof cmsDashboardStateCreate> }) {
  return (
    <section class="flex min-w-0 flex-col">
      <h2 class="mb-4 font-semibold">{props.state.text().siteInfo}</h2>
      <div class="relative flex min-h-40 flex-1 flex-col justify-between rounded-2xl border border-blue-100 bg-[color-mix(in_oklab,var(--dashboard-accent)_8%,white)] p-5 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-xl">
        <div
          class="absolute -top-3 left-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[color-mix(in_oklab,var(--dashboard-accent)_55%,white)] to-[var(--dashboard-accent)] text-3xl font-bold text-white shadow-[0_8px_24px_color-mix(in_oklab,var(--dashboard-accent)_45%,transparent)] dark:border-neutral-800"
          aria-hidden="true"
        >
          A<span class="text-lg">.</span>
        </div>
        <div class="flex items-start justify-end gap-3">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-neutral-800 dark:text-emerald-400">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {props.state.text().online}
          </span>
        </div>
        <div>
          <p class="text-lg font-semibold">{props.state.siteInfo.name}</p>
          <p class="mt-1 break-all text-sm text-gray-500 dark:text-neutral-400">{props.state.siteInfo.url}</p>
        </div>
      </div>
    </section>
  )
}

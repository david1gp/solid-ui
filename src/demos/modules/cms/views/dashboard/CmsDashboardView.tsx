import { CmsDashboardAlertsCard } from "./CmsDashboardAlertsCard.js"
import { CmsDashboardDraftsCard } from "./CmsDashboardDraftsCard.js"
import { CmsDashboardQuickActionTiles } from "./CmsDashboardQuickActionTiles.js"
import { CmsDashboardSiteInfoCard } from "./CmsDashboardSiteInfoCard.js"
import { CmsDashboardStatisticsPanel } from "./CmsDashboardStatisticsPanel.js"
import { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardView(_props: { id?: string }) {
  const state = cmsDashboardStateCreate()
  return (
    <div class="min-w-0" style={{ "--dashboard-accent": "var(--app-sidebar-accent, var(--color-blue-600))" }}>
      <div class="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.4fr)]">
        <div class="min-w-0 space-y-8">
          <header>
            <h1 class="text-2xl font-semibold tracking-tight">{state.text().welcome}</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-neutral-400">{state.text().description}</p>
          </header>
          <div class="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
            <div class="min-w-0 space-y-8">
              <CmsDashboardSiteInfoCard state={state} />
              <CmsDashboardAlertsCard state={state} />
            </div>
            <div class="min-w-0 space-y-8">
              <CmsDashboardQuickActionTiles state={state} />
              <CmsDashboardDraftsCard state={state} />
            </div>
          </div>
        </div>
        <CmsDashboardStatisticsPanel state={state} />
      </div>
    </div>
  )
}

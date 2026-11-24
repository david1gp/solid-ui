import { createMemo, onCleanup } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { cmsDashboardActivities } from "./cmsDashboardActivities.js"
import { cmsDashboardAlerts } from "./cmsDashboardAlerts.js"
import { cmsDashboardDrafts } from "./cmsDashboardDrafts.js"
import { cmsDashboardQuickActions } from "./cmsDashboardQuickActions.js"
import { cmsDashboardSiteInfo } from "./cmsDashboardSiteInfo.js"
import { cmsDashboardVisitorSeries } from "./cmsDashboardVisitorSeries.js"

const text = {
  de: {
    title: "Dashboard",
    welcome: "Willkommen, Max",
    siteInfo: "Seiten-Info",
    online: "Online",
    alerts: "Benachrichtigungen",
    all: "Alle",
    drafts: "Entwürfe",
    draft: "Entwurf",
    lastEdited: "Zuletzt bearbeitet",
    sort: "Sortieren",
    date: "Datum",
    name: "Name",
    statistics: "Statistik",
    totalVisitors: "Besucher gesamt",
    totalPageviews: "Seitenaufrufe gesamt",
    visitors: "Besucher",
    pageviews: "Seitenaufrufe",
    month: "Monat",
    week: "Woche",
    activity: "Letzte Aktivitäten",
    actions: "Schnellaktionen",
  },
  en: {
    title: "Dashboard",
    welcome: "Welcome, Max",
    siteInfo: "Site info",
    online: "Online",
    alerts: "Alerts",
    all: "All",
    drafts: "Drafts",
    draft: "Draft",
    lastEdited: "Last edited",
    sort: "Sort",
    date: "Date",
    name: "Name",
    statistics: "Statistics",
    totalVisitors: "Total visitors",
    totalPageviews: "Total pageviews",
    visitors: "Visitors",
    pageviews: "Pageviews",
    month: "Month",
    week: "Week",
    activity: "Recent activity",
    actions: "Quick actions",
  },
}

export function cmsDashboardStateCreate() {
  const tabFromUrl = (): "drafts" | "activity" =>
    typeof window !== "undefined" && new URL(window.location.href).searchParams.get("dashboardTab") === "activity"
      ? "activity"
      : "drafts"
  const activeTab = createSignalObject<"drafts" | "activity">(tabFromUrl())
  const draftSort = createSignalObject<"date" | "name">("date")
  const chartRange = createSignalObject<"month" | "week">("month")
  const chartMetric = createSignalObject<"visitors" | "pageviews">("visitors")
  const sortedDrafts = createMemo(() =>
    [...cmsDashboardDrafts].sort((a, b) =>
      draftSort.get() === "name"
        ? a.name[cmsLocale.get()].localeCompare(b.name[cmsLocale.get()], cmsLocale.get())
        : b.lastEdited.localeCompare(a.lastEdited),
    ),
  )
  const chartSeries = createMemo(() => {
    const series = cmsDashboardVisitorSeries[chartRange.get()]
    return series[chartMetric.get()].map((value, index) => ({
      label:
        chartRange.get() === "month"
          ? new Intl.DateTimeFormat(cmsLocale.get(), { month: "short" })
              .format(new Date(new Date().getFullYear(), new Date().getMonth() - 6 + index, 1))
              .replace(/\.$/, "")
          : series.labels[cmsLocale.get()][index],
      value,
    }))
  })
  if (typeof window !== "undefined") {
    const syncTab = () => activeTab.set(tabFromUrl())
    window.addEventListener("popstate", syncTab)
    onCleanup(() => window.removeEventListener("popstate", syncTab))
  }
  return {
    siteInfo: cmsDashboardSiteInfo,
    quickActions: cmsDashboardQuickActions,
    alerts: cmsDashboardAlerts,
    activities: cmsDashboardActivities,
    activeTab: activeTab.get,
    selectTab: (tab: "drafts" | "activity") => {
      activeTab.set(tab)
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.searchParams.set("dashboardTab", tab)
        window.history.replaceState(window.history.state, "", url)
      }
    },
    draftSort: draftSort.get,
    selectDraftSort: (sort: "date" | "name") => draftSort.set(sort),
    sortedDrafts,
    chartRange: chartRange.get,
    selectChartRange: (range: "month" | "week") => chartRange.set(range),
    chartMetric: chartMetric.get,
    selectChartMetric: (metric: "visitors" | "pageviews") => chartMetric.set(metric),
    chartSeries,
    chartTotal: () => chartSeries().reduce((sum, point) => sum + point.value, 0),
    locale: cmsLocale.get,
    text: () => text[cmsLocale.get()],
    number: (value: number) => new Intl.NumberFormat(cmsLocale.get()).format(value),
    relative: (value: number, unit: Intl.RelativeTimeFormatUnit) =>
      new Intl.RelativeTimeFormat(cmsLocale.get(), { numeric: "auto" }).format(value, unit),
    navigate: (view: "posts" | "media" | "users" | "notifications") => cmsNavigate(view),
  }
}

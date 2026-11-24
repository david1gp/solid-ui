import { For } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { PageHeader } from "../../ui/PageHeader.js"

const text = {
  de: {
    title: "Systemstatus",
    description: "Übersicht über die Gesundheit deiner Dienste.",
    operational: "Alle Systeme betriebsbereit",
    note: "Demo-Daten · Keine Live-Überwachung",
    services: "Dienste",
    status: "Betriebsbereit",
    names: ["Website", "API", "Datenbank", "Medien-Speicher", "E-Mail-Dienst"],
  },
  en: {
    title: "System status",
    description: "An overview of your service health.",
    operational: "All systems operational",
    note: "Demo data · No live monitoring",
    services: "Services",
    status: "Operational",
    names: ["Website", "API", "Database", "Media storage", "Email service"],
  },
}
export function CmsSystemStatusView(_props: { id?: string }) {
  const t = () => text[cmsLocale.get()]
  return (
    <div>
      <PageHeader title={t().title} description={t().description} />
      <div class="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
        <p class="font-medium text-emerald-800 dark:text-emerald-200">● {t().operational}</p>
        <p class="mt-1 text-sm text-emerald-700 dark:text-emerald-300">{t().note}</p>
      </div>
      <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <h2 class="border-b border-neutral-200 p-4 font-semibold dark:border-neutral-800">{t().services}</h2>
        <For each={t().names}>
          {(name) => (
            <div class="flex items-center justify-between gap-4 border-b border-neutral-100 p-4 text-sm last:border-0 dark:border-neutral-800">
              <span>{name}</span>
              <span class="whitespace-nowrap text-emerald-700 dark:text-emerald-400">● {t().status}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

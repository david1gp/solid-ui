import { cmsLocale } from "../../i18n/cmsLocale.js"
import { CmsDataTable } from "../../ui/CmsDataTable.js"
import { PageHeader } from "../../ui/PageHeader.js"

const text = {
  de: {
    title: "Audit-Protokoll",
    description: "Nachvollziehen, wer welche Änderungen vorgenommen hat.",
    date: "Zeitpunkt",
    actor: "Person",
    action: "Aktion",
    resource: "Objekt",
    actions: ["Aktualisiert", "Erstellt", "Angemeldet", "Gelöscht"],
    labels: {
      search: "Suchen",
      filter: "Filtern",
      all: "Alle",
      columns: "Spalten",
      selected: "ausgewählt",
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      noResults: "Keine Ergebnisse",
      selectAll: "Alle auswählen",
      selectRow: "Zeile auswählen",
      pageSize: "Zeilen pro Seite",
    },
  },
  en: {
    title: "Audit log",
    description: "See who made changes and when.",
    date: "Date",
    actor: "User",
    action: "Action",
    resource: "Resource",
    actions: ["Updated", "Created", "Signed in", "Deleted"],
    labels: {
      search: "Search",
      filter: "Filter",
      all: "All",
      columns: "Columns",
      selected: "selected",
      previous: "Previous",
      next: "Next",
      page: "Page",
      noResults: "No results",
      selectAll: "Select all",
      selectRow: "Select row",
      pageSize: "Rows per page",
    },
  },
}
const rows = [
  { id: "1", date: "2026-11-24T10:30:00", actor: "Anna Weber", action: 0, resource: "Startseite" },
  { id: "2", date: "2026-11-24T09:15:00", actor: "Max Müller", action: 1, resource: "Blog post" },
  { id: "3", date: "2026-11-23T16:20:00", actor: "Anna Weber", action: 2, resource: "Admin" },
  { id: "4", date: "2026-11-23T14:05:00", actor: "Lisa Schmidt", action: 3, resource: "Draft" },
  ...Array.from({ length: 26 }, (_, index) => ({
    id: String(index + 5),
    date: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
    actor: ["Anna Schmidt", "David Weber", "Mia Fischer", "Lukas Becker", "Sophie Wagner"][index % 5],
    action: index % 4,
    resource: ["Startseite", "Produktupdate", "Medienbibliothek", "Team", "Einstellungen", "Blog"][index % 6],
  })),
]
export function CmsAuditLogView(_props: { id?: string }) {
  const t = () => text[cmsLocale.get()]
  return (
    <div>
      <PageHeader title={t().title} description={t().description} />
      <CmsDataTable
        rows={rows}
        rowId={(row) => row.id}
        labels={t().labels}
        columns={[
          {
            id: "date",
            label: t().date,
            value: (row) =>
              new Intl.DateTimeFormat(cmsLocale.get() === "de" ? "de-DE" : "en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(row.date)),
            sortable: true,
          },
          {
            id: "actor",
            label: t().actor,
            value: (row) => row.actor,
            sortable: true,
            searchable: true,
            filterable: true,
          },
          {
            id: "action",
            label: t().action,
            value: (row) => t().actions[row.action],
            sortable: true,
            filterable: true,
          },
          { id: "resource", label: t().resource, value: (row) => row.resource, searchable: true, sortable: true },
        ]}
      />
    </div>
  )
}

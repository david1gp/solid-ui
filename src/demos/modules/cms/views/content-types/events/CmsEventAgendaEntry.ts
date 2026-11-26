export type CmsEventAgendaEntry = {
  id: string
  kind: "day" | "time"
  day?: number
  time?: string
  title: string
  description?: string
}

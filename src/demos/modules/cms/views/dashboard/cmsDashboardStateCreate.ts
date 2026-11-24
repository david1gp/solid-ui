import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

const text = {
  de: {
    title: "Dashboard",
    description: "Ein Überblick über Ihre Inhalte und Aufgaben.",
    metrics: ["Beiträge", "Seiten", "Medien", "Benutzer"],
    trend: "zum Vormonat",
    activity: "Letzte Aktivitäten",
    activities: ["Beitrag veröffentlicht", "Startseite aktualisiert", "Neue Medien hinzugefügt", "Benutzer eingeladen"],
    actions: "Schnellaktionen",
    actionLabels: ["Beiträge verwalten", "Seiten bearbeiten", "Medien öffnen", "Benutzer verwalten"],
    tasks: "Aufgaben",
    taskLabels: ["Entwurf prüfen", "Startseite aktualisieren", "Medienbibliothek aufräumen", "Team einladen"],
  },
  en: {
    title: "Dashboard",
    description: "An overview of your content and tasks.",
    metrics: ["Posts", "Pages", "Media", "Users"],
    trend: "vs. last month",
    activity: "Recent activity",
    activities: ["Post published", "Homepage updated", "New media added", "User invited"],
    actions: "Quick actions",
    actionLabels: ["Manage posts", "Edit pages", "Open media", "Manage users"],
    tasks: "Tasks",
    taskLabels: ["Review draft", "Update homepage", "Organize media library", "Invite the team"],
  },
}

export function cmsDashboardStateCreate() {
  const checked = createSignalObject<number[]>([2])
  return {
    text: () => text[cmsLocale.get()],
    number: (value: number) => new Intl.NumberFormat(cmsLocale.get()).format(value),
    relative: (value: number, unit: Intl.RelativeTimeFormatUnit) =>
      new Intl.RelativeTimeFormat(cmsLocale.get(), { numeric: "auto" }).format(value, unit),
    checked: (index: number) => checked.get().includes(index),
    toggle: (index: number) =>
      checked.set(
        checked.get().includes(index) ? checked.get().filter((item) => item !== index) : [...checked.get(), index],
      ),
    navigate: (view: "posts" | "pages" | "media" | "users") => cmsNavigate(view),
  }
}

export const cmsDashboardActivities = [
  { id: "published", label: { de: "Beitrag veröffentlicht", en: "Post published" }, time: -15, unit: "minute" },
  { id: "homepage", label: { de: "Startseite aktualisiert", en: "Homepage updated" }, time: -2, unit: "hour" },
  { id: "media", label: { de: "Neue Medien hinzugefügt", en: "New media added" }, time: -1, unit: "day" },
  { id: "invited", label: { de: "Benutzer eingeladen", en: "User invited" }, time: -3, unit: "day" },
] as const

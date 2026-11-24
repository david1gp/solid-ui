export const cmsDashboardMetrics = [
  {
    key: "posts",
    value: 128,
    trend: "+12%",
    label: { de: "Beiträge", en: "Posts" },
    values: [34, 42, 39, 55, 52, 68, 75],
  },
  { key: "pages", value: 24, trend: "+8%", label: { de: "Seiten", en: "Pages" }, values: [20, 25, 24, 30, 32, 34, 40] },
  {
    key: "media",
    value: 846,
    trend: "+16%",
    label: { de: "Medien", en: "Media" },
    values: [30, 38, 45, 43, 56, 67, 80],
  },
  {
    key: "users",
    value: 18,
    trend: "+5%",
    label: { de: "Benutzer", en: "Users" },
    values: [20, 23, 23, 27, 30, 30, 35],
  },
] as const

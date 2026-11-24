export const cmsDashboardVisitorSeries = {
  month: {
    visitors: [1200, 1450, 1630, 1780, 1910, 2130, 2380],
    pageviews: [2800, 3200, 3700, 4100, 4600, 5100, 5500],
    labels: { de: [], en: [] },
  },
  week: {
    visitors: [360, 420, 390, 510, 480, 600, 540],
    pageviews: [820, 970, 910, 1150, 1080, 1350, 1220],
    labels: { de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"], en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  },
} as const

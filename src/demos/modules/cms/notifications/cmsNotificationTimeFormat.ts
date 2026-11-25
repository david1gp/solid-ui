export function cmsNotificationTimeFormat(date: Date, locale: "de" | "en", now = Date.now()) {
  const elapsed = Math.max(0, now - date.getTime())
  if (elapsed >= 7 * 86_400_000) return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date)
  const [value, unit] =
    elapsed < 3_600_000
      ? ([Math.floor(elapsed / 60_000), "minute"] as const)
      : elapsed < 86_400_000
        ? ([Math.floor(elapsed / 3_600_000), "hour"] as const)
        : ([Math.floor(elapsed / 86_400_000), "day"] as const)
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" }).format(-value, unit)
}

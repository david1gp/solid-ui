export function demoSearch(
  list: Record<string, Record<string, unknown>>,
  displayNames: Record<string, string>,
  query: string,
) {
  const term = query.trim().toLowerCase()
  if (!term) return []
  return Object.entries(list).flatMap(([category, demos]) =>
    Object.keys(demos)
      .filter((name) =>
        [category, name, displayNames[name] ?? name.replace(/^Demo/, "")].some((value) =>
          value.toLowerCase().includes(term),
        ),
      )
      .map((name) => ({ category, name, displayName: displayNames[name] ?? name.replace(/^Demo/, "") })),
  )
}

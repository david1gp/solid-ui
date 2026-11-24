import { demoSubcategories } from "#src/app/demos/demoSubcategories.js"

/** Group module names in registry order, putting unassigned names in Seiten. */
export function demoGroupsCreate(category: string, names: readonly string[]) {
  const subcategories = demoSubcategories[category]
  if (!subcategories) return []
  const entries = Object.entries(subcategories)
  const assigned = new Set(entries.flatMap(([, keys]) => keys))
  return entries
    .map(([heading, keys], index) => ({
      heading,
      names: names.filter((name) => keys.includes(name) || (index === 0 && !assigned.has(name))),
    }))
    .filter((group) => group.names.length > 0)
}

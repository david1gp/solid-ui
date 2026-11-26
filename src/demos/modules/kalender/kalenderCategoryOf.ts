import { kalenderCategories } from "./kalenderCategories.js"

export function kalenderCategoryOf(title: string): { name: string; color: string } {
  const normalized = title.trim().toLocaleLowerCase("de-DE")
  let match: { name: string; color: string } | undefined
  for (const category of kalenderCategories) {
    const keyword = category.name.toLocaleLowerCase("de-DE")
    if (!normalized.startsWith(keyword)) continue
    const next = normalized.slice(keyword.length)
    if (next && /^[\p{L}\p{N}\p{M}]/u.test(next)) continue
    if (!match || category.name.length > match.name.length) match = category
  }
  return match ?? { name: "Sonstiges", color: "Grau" }
}

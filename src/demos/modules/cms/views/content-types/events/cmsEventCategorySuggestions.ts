import { cmsEventCategoryAdd } from "./cmsEventCategoryAdd.js"

export function cmsEventCategorySuggestions(events: { categories: string[] }[], selected: string[]): string[] {
  const categories = events.flatMap((event) => event.categories).reduce(cmsEventCategoryAdd, [] as string[])
  const selectedKeys = new Set(selected.map((category) => category.trim().toLocaleLowerCase("de")))
  return categories.filter((category) => !selectedKeys.has(category.toLocaleLowerCase("de")))
}

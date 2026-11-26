export function cmsEventCategoryAdd(categories: string[], value: string): string[] {
  const trimmed = value.trim()
  if (
    !trimmed ||
    categories.some((category) => category.trim().toLocaleLowerCase("de") === trimmed.toLocaleLowerCase("de"))
  )
    return [...categories]
  return [...categories, trimmed]
}

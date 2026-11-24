export function cmsProductsMove<T>(items: readonly T[], fromIndex: number, toIndex: number): T[] {
  const result = [...items]
  if (
    !Number.isInteger(fromIndex) ||
    !Number.isInteger(toIndex) ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  )
    return result
  const [item] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, item as T)
  return result
}

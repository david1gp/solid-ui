export function cmsProductsSwap<T>(items: readonly T[], firstIndex: number, secondIndex: number): T[] {
  const result = [...items]
  if (
    !Number.isInteger(firstIndex) ||
    !Number.isInteger(secondIndex) ||
    firstIndex < 0 ||
    secondIndex < 0 ||
    firstIndex >= items.length ||
    secondIndex >= items.length ||
    firstIndex === secondIndex
  )
    return result
  ;[result[firstIndex], result[secondIndex]] = [result[secondIndex] as T, result[firstIndex] as T]
  return result
}

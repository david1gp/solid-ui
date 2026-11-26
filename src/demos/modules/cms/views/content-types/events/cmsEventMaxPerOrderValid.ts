/** An empty limit is unlimited; otherwise it must be a positive integer within capacity. */
export function cmsEventMaxPerOrderValid(value: string, capacity: string): boolean {
  if (!value.trim()) return true
  const limit = Number(value)
  if (!Number.isInteger(limit) || limit < 1) return false
  if (!capacity.trim()) return true
  return limit <= Number(capacity)
}

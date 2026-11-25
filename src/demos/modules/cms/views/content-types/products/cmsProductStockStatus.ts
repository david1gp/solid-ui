export function cmsProductStockStatus(quantity: string) {
  const value = Number(quantity)
  if (!quantity.trim() || !Number.isInteger(value) || value <= 0) {
    return { label: "Ausverkauft", dotClass: "bg-rose-400" }
  }
  if (value <= 5) return { label: `Nur noch ${value} Stück`, dotClass: "bg-amber-400" }
  return { label: "Auf Lager", dotClass: "bg-teal-300" }
}

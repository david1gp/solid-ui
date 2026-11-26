import { kalenderCategoryOf } from "./kalenderCategoryOf.js"
import { kalenderColors } from "./kalenderColors.js"

export function kalenderColorResolve(title: string, key: string) {
  const name = key === "Automatisch" ? kalenderCategoryOf(title).color : key
  return kalenderColors.find((entry) => entry.name === name) ?? kalenderColors[kalenderColors.length - 1]!
}

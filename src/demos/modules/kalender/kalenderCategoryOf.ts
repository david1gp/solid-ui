import { kalenderCategories } from "./kalenderCategories.js"

export function kalenderCategoryOf(title: string): { name: string; color: string } {
  const prefix = title
    .trim()
    .replace(/\s+(?:\([^)]*\)|mit\s+.+)$/i, "")
    .trim()
    .toLocaleLowerCase("de-DE")
  return (
    kalenderCategories.find((category) => category.name.toLocaleLowerCase("de-DE") === prefix) ?? {
      name: "Sonstiges",
      color: "Grau",
    }
  )
}

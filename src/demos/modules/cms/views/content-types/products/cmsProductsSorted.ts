import { cmsProducts } from "./cmsProducts.js"

export const cmsProductsSorted = [...cmsProducts].sort((a, b) => a.position - b.position)

import { cmsProducts } from "./cmsProducts.js"

export const cmsProductsSorted = () => [...cmsProducts.get()].sort((a, b) => a.position - b.position)

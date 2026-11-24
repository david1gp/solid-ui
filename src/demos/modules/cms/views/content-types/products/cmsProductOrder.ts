import { cmsProducts } from "./cmsProducts.js"
import { cmsProductsSorted } from "./cmsProductsSorted.js"

export const cmsProductOrder = {
  get: () => cmsProductsSorted().map((product) => product.id),
  set: (ids: string[]) => {
    const positions = new Map(ids.map((id, index) => [id, index + 1]))
    const products = cmsProducts.get()
    for (const product of products) product.position = positions.get(product.id) ?? product.position
    cmsProducts.set([...products])
  },
}

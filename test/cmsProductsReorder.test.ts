import { expect, test } from "bun:test"
import { cmsProductsMove } from "../src/demos/modules/cms/views/content-types/products/cmsProductsMove.js"
import { cmsProductsSwap } from "../src/demos/modules/cms/views/content-types/products/cmsProductsSwap.js"

test("moving a product shifts intervening products without mutating the original", () => {
  const ids = ["a", "b", "c", "d"]
  expect(cmsProductsMove(ids, 0, 2)).toEqual(["b", "c", "a", "d"])
  expect(cmsProductsMove(ids, 3, 1)).toEqual(["a", "d", "b", "c"])
  expect(ids).toEqual(["a", "b", "c", "d"])
})

test("swapping products exchanges only their positions without mutating the original", () => {
  const ids = ["a", "b", "c"]
  expect(cmsProductsSwap(ids, 0, 2)).toEqual(["c", "b", "a"])
  expect(ids).toEqual(["a", "b", "c"])
})

test("invalid and identical indices produce unchanged copies", () => {
  const ids = ["a", "b"]
  for (const reorder of [cmsProductsMove, cmsProductsSwap]) {
    for (const [from, to] of [
      [-1, 0],
      [0, 2],
      [0.5, 1],
      [NaN, 1],
      [1, 1],
    ] as const) {
      const result = reorder(ids, from, to)
      expect(result).toEqual(ids)
      expect(result).not.toBe(ids)
    }
    expect(reorder([], 0, 0)).toEqual([])
  }
})

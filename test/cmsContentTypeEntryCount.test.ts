import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { cmsContentTypesStateCreate } from "../src/demos/modules/cms/views/content-types/cmsContentTypesStateCreate.js"
import { cmsProducts } from "../src/demos/modules/cms/views/content-types/products/cmsProducts.js"

test("content type entry counts follow the article list as entries change", () => {
  const state = cmsContentTypesStateCreate(() => undefined)
  const original = cmsProducts.get()
  expect(state.entryCount("article")).toBe(original.length)
  expect(state.entryCount("event")).toBe(0)

  cmsProducts.set(original.slice(1))
  flush()
  expect(state.entryCount("article")).toBe(original.length - 1)

  cmsProducts.set(original)
  flush()
  expect(state.entryCount("article")).toBe(original.length)
})

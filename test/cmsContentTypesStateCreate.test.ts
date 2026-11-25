import { expect, test } from "bun:test"
import { cmsContentTypesStateCreate } from "../src/demos/modules/cms/views/content-types/cmsContentTypesStateCreate.js"

test("legacy article fields URL falls back to the list tab", () => {
  const state = cmsContentTypesStateCreate(() => "article:fields")
  expect(state.current()?.id).toBe("article")
  expect(state.tab()).toBe("list")
})

test("article list, tiles and product routes retain their content type", () => {
  for (const [id, tab] of [
    ["article", "list"],
    ["article:tiles", "tiles"],
    ["article:product-1", "list"],
    ["article:product-1:list", "list"],
  ] as const) {
    const state = cmsContentTypesStateCreate(() => id)
    expect(state.current()?.id).toBe("article")
    expect(state.tab()).toBe(tab)
  }
})

test("event list and event edit routes retain their content type", () => {
  for (const id of ["event", "event:event-1"]) {
    const state = cmsContentTypesStateCreate(() => id)
    expect(state.current()?.id).toBe("event")
  }
})

import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { cmsProductEditStateCreate } from "../src/demos/modules/cms/views/content-types/products/cmsProductEditStateCreate.js"
import { cmsProducts } from "../src/demos/modules/cms/views/content-types/products/cmsProducts.js"

test("product FAQ entries can be edited, reordered, validated and removed", () => {
  const { state, dispose } = createRoot((dispose) => ({ state: cmsProductEditStateCreate(cmsProducts.get()[0]!), dispose }))
  const initialLength = state.faq().length
  state.faqAdd()
  flush()
  const id = state.faq().at(-1)!.id
  state.faqUpdate(id, { question: "Neue Frage" })
  flush()
  state.save()
  flush()
  expect(state.tabHasErrors("FAQ")).toBe(true)
  expect(state.tabHasErrors("Details")).toBe(false)
  expect(state.notice()).toContain("FAQ")
  state.faqUpdate(id, { answer: "Antwort" })
  flush()
  expect(state.tabHasErrors("FAQ")).toBe(false)
  state.faqMove(initialLength, 0)
  flush()
  expect(state.faq()[0]?.id).toBe(id)
  state.save()
  flush()
  expect(state.notice()).toContain("Demo")
  state.faqRemove(id)
  flush()
  expect(state.faq()).toHaveLength(initialLength)
  dispose()
})

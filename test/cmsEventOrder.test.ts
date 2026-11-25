import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { cmsEventOrder } from "../src/demos/modules/cms/views/content-types/events/cmsEventOrder.js"

test("event order persists new positions", () => {
  const original = cmsEventOrder.get()
  const reversed = [...original].reverse()
  cmsEventOrder.set(reversed)
  flush()
  expect(cmsEventOrder.get()).toEqual(reversed)
  cmsEventOrder.set(original)
  flush()
  expect(cmsEventOrder.get()).toEqual(original)
})

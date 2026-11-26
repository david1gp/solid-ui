import { expect, test } from "bun:test"
import { cmsEventPriceMinimumFormat } from "../src/demos/modules/cms/views/content-types/events/cmsEventPriceMinimumFormat.js"

test("returns undefined when no ticket prices are set", () => {
  expect(cmsEventPriceMinimumFormat([])).toBeUndefined()
  expect(cmsEventPriceMinimumFormat([{}, { priceRegular: undefined }])).toBeUndefined()
})

test("ignores empty values and formats whole-euro prices", () => {
  expect(cmsEventPriceMinimumFormat([{}, { priceRegular: 15 }, { priceReduced: undefined }])).toBe("ab 15 €")
})

test("finds the minimum across dates and both price types with German decimals", () => {
  expect(
    cmsEventPriceMinimumFormat([
      { priceRegular: 20, priceReduced: 12 },
      { priceRegular: 9.5, priceReduced: 15 },
      { priceReduced: 10 },
    ]),
  ).toBe("ab 9,50 €")
  expect(cmsEventPriceMinimumFormat([{ priceRegular: 15, priceReduced: 9.5 }])).toBe("ab 9,50 €")
})

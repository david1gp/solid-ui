import { expect, test } from "bun:test"
import { cmsProductStockStatus } from "../src/demos/modules/cms/views/content-types/products/cmsProductStockStatus.js"

test("reports available and low stock at the threshold", () => {
  expect(cmsProductStockStatus("6").label).toBe("Auf Lager")
  expect(cmsProductStockStatus("5").label).toBe("Nur noch 5 Stück")
  expect(cmsProductStockStatus("1").label).toBe("Nur noch 1 Stück")
})

test("reports zero and invalid quantities as sold out", () => {
  for (const quantity of ["0", "-1", "", "abc", "1.5", "Infinity"]) {
    expect(cmsProductStockStatus(quantity).label).toBe("Ausverkauft")
  }
})

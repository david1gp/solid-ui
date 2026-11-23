import { expect, test } from "bun:test"
import { demoSearch } from "../src/app/demos/demoSearch.js"

test("search matches display names, route names and categories in catalog order", () => {
  const list = { input: { DemoSearchBox: {}, DemoOther: {} }, layout: { DemoCard: {} } }
  const names = { DemoCard: "Special card" }
  expect(demoSearch(list, names, " SEARCH ").map((entry) => entry.name)).toEqual(["DemoSearchBox"])
  expect(demoSearch(list, names, "democard").map((entry) => entry.name)).toEqual(["DemoCard"])
  expect(demoSearch(list, names, "special").map((entry) => entry.name)).toEqual(["DemoCard"])
  expect(demoSearch(list, names, "INPUT").map((entry) => entry.name)).toEqual(["DemoSearchBox", "DemoOther"])
  expect(demoSearch(list, names, "zzz")).toEqual([])
  expect(demoSearch(list, names, "  ")).toEqual([])
})

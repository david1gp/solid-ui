import { describe, expect, test } from "bun:test"
import { cmsEventMaxPerOrderValid } from "../src/demos/modules/cms/views/content-types/events/cmsEventMaxPerOrderValid.js"

describe("max tickets per order", () => {
  test("allows unlimited and positive integers up to the capacity", () => {
    expect(cmsEventMaxPerOrderValid("", "0")).toBe(true)
    expect(cmsEventMaxPerOrderValid("1", "")).toBe(true)
    expect(cmsEventMaxPerOrderValid("4", "4")).toBe(true)
  })
  test("rejects zero, fractions, non-numbers, and values exceeding capacity", () => {
    for (const value of ["0", "-1", "1.5", "abc", "5"]) {
      expect(cmsEventMaxPerOrderValid(value, "4")).toBe(false)
    }
  })
})

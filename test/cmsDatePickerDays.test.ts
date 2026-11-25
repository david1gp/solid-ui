import { expect, test } from "bun:test"
import { cmsDateIso } from "../src/demos/modules/cms/ui/cmsDateIso.js"
import { cmsDatePickerDays } from "../src/demos/modules/cms/ui/cmsDatePickerDays.js"

test("date picker grid starts on Monday and covers six weeks", () => {
  const days = cmsDatePickerDays(new Date(2026, 11, 1))
  expect(days).toHaveLength(42)
  expect(days[0]?.getDay()).toBe(1)
  expect(cmsDateIso(days[0] as Date)).toBe("2026-11-30")
  expect(days.some((day) => cmsDateIso(day) === "2026-12-31")).toBe(true)
})

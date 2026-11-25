import { expect, test } from "bun:test"
import { cmsEventDateGermanFormat } from "../src/demos/modules/cms/views/content-types/events/cmsEventDateGermanFormat.js"
import { cmsEventDateGermanParse } from "../src/demos/modules/cms/views/content-types/events/cmsEventDateGermanParse.js"
import { cmsEventTimeGermanParse } from "../src/demos/modules/cms/views/content-types/events/cmsEventTimeGermanParse.js"

test("German date format round-trips ISO dates", () => {
  expect(cmsEventDateGermanFormat("2026-12-04")).toBe("04.12.2026")
  expect(cmsEventDateGermanParse("04.12.2026")).toBe("2026-12-04")
  expect(cmsEventDateGermanParse("4.1.2027")).toBe("2027-01-04")
})

test("German date parse rejects invalid dates and other formats", () => {
  for (const text of ["31.02.2026", "2026-12-04", "12/04/2026", "04.12.26", ""])
    expect(cmsEventDateGermanParse(text)).toBeUndefined()
})

test("24-hour time parse accepts HH:MM and rejects AM/PM or out-of-range values", () => {
  expect(cmsEventTimeGermanParse("18:30")).toBe("18:30")
  expect(cmsEventTimeGermanParse("9.05")).toBe("09:05")
  for (const text of ["24:00", "12:60", "6:30 PM", "1830", ""]) expect(cmsEventTimeGermanParse(text)).toBeUndefined()
})

import { describe, expect, test } from "bun:test"
import { kalenderDateShift } from "../src/demos/modules/kalender/kalenderDateShift.js"
import { kalenderRangeCreate } from "../src/demos/modules/kalender/kalenderRangeCreate.js"

describe("calendar ranges", () => {
  test("week starts Monday and crosses the year boundary", () => {
    const range = kalenderRangeCreate(new Date(2027, 0, 1), "Woche")
    expect(range.map((date) => date?.toLocaleDateString("en-CA"))).toEqual([
      "2026-12-28",
      "2026-12-29",
      "2026-12-30",
      "2026-12-31",
      "2027-01-01",
      "2027-01-02",
      "2027-01-03",
    ])
  })
  test("month pads incomplete weeks and day returns one date", () => {
    const date = new Date(2026, 1, 10)
    const range = kalenderRangeCreate(date, "Monat")
    expect(range.length).toBe(35)
    expect(range[0]).toBeUndefined()
    expect(range[6]?.getDate()).toBe(1)
    expect(kalenderRangeCreate(date, "Tag")[0]?.getDate()).toBe(10)
  })
  test("calendar days remain consecutive across daylight saving transitions", () => {
    for (const date of [new Date(2026, 2, 29), new Date(2026, 9, 25)]) {
      const range = kalenderRangeCreate(date, "Woche")
      expect(range.map((day) => day?.getDay())).toEqual([1, 2, 3, 4, 5, 6, 0])
      const next = kalenderDateShift(date, "Tag", 1)
      expect(next.getDate()).toBe(date.getDate() + 1)
      expect(next.getHours()).toBe(0)
    }
  })
  test("navigation clamps months and shifts days and weeks", () => {
    expect(kalenderDateShift(new Date(2024, 0, 31), "Monat", 1).getDate()).toBe(29)
    expect(kalenderDateShift(new Date(2026, 11, 30), "Woche", 1).getDate()).toBe(6)
    expect(kalenderDateShift(new Date(2026, 0, 1), "Heute", -1).getFullYear()).toBe(2025)
  })
})

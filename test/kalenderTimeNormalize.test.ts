import { describe, expect, test } from "bun:test"
import { kalenderTimeNormalize } from "../src/demos/modules/kalender/kalenderTimeNormalize.js"

describe("kalenderTimeNormalize", () => {
  test("normalizes hours, compact times and colon-separated times", () => {
    for (const [input, expected] of [
      ["9", "09:00"],
      ["930", "09:30"],
      ["1530", "15:30"],
      [" 9:15 ", "09:15"],
      ["23:45", "23:45"],
      ["0", "00:00"],
    ]) {
      expect(kalenderTimeNormalize(input!)).toBe(expected)
    }
  })
  test("rejects invalid times and values outside quarter-hour steps", () => {
    for (const input of ["", "24", "1260", "9:5", "09:10", "-1", "9am", "12345"]) {
      expect(kalenderTimeNormalize(input)).toBeUndefined()
    }
  })
})

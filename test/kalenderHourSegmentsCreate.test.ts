import { describe, expect, test } from "bun:test"
import type { KalenderTask } from "../src/demos/modules/kalender/KalenderTask.js"
import { kalenderHourSegmentsCreate } from "../src/demos/modules/kalender/kalenderHourSegmentsCreate.js"
import { kalenderHourMinuteToY } from "../src/demos/modules/kalender/kalenderHourMinuteToY.js"
import { kalenderHourYToMinute } from "../src/demos/modules/kalender/kalenderHourYToMinute.js"

const task = (start: string, end: string, allDay = false): KalenderTask => ({
  id: start,
  start,
  end,
  allDay,
  title: start,
  color: "red",
  name: "rot",
  meta: "",
  people: [],
})

describe("compact calendar hours", () => {
  test("uses the default hours when there are no valid timed tasks", () => {
    const segments = kalenderHourSegmentsCreate([task("00:00", "23:00", true), task("bad", "10:00")])
    expect(segments.map(({ startMinute }) => startMinute)).toEqual([480, 540, 600, 660])
    expect(segments.every((segment) => !segment.collapsed)).toBe(true)
  })
  test("folds multiple empty hours but retains a single empty hour", () => {
    const segments = kalenderHourSegmentsCreate([
      task("08:30", "09:00"),
      task("10:00", "11:00"),
      task("14:00", "15:30"),
    ])
    expect(
      segments.map(({ startMinute, endMinute, collapsed, top, height }) => [
        startMinute,
        endMinute,
        collapsed,
        top,
        height,
      ]),
    ).toEqual([
      [480, 540, false, 0, 48],
      [540, 600, false, 48, 48],
      [600, 660, false, 96, 48],
      [660, 840, true, 144, 20],
      [840, 900, false, 164, 48],
      [900, 960, false, 212, 48],
    ])
    expect(kalenderHourMinuteToY(segments, 870)).toBe(188)
    expect(kalenderHourMinuteToY(segments, 960)).toBe(260)
    expect(kalenderHourYToMinute(segments, 174)).toBe(852.5)
    expect(kalenderHourYToMinute(segments, 150)).toBeUndefined()
    expect(kalenderHourYToMinute(segments, 260)).toBeUndefined()
  })
  test("considers tasks across days and expands for earlier appointments", () => {
    const segments = kalenderHourSegmentsCreate([
      task("06:00", "07:00"),
      task("09:00", "10:00"),
      task("12:00", "13:00"),
    ])
    expect(
      segments.filter((segment) => segment.collapsed).map((segment) => [segment.startMinute, segment.endMinute]),
    ).toEqual([
      [420, 540],
      [600, 720],
    ])
    expect(segments[0]?.startMinute).toBe(360)
  })
})

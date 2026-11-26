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
      [420, 480, false, 0, 48],
      [480, 540, false, 48, 48],
      [540, 600, false, 96, 48],
      [600, 660, false, 144, 48],
      [660, 840, true, 192, 20],
      [840, 900, false, 212, 48],
      [900, 960, false, 260, 48],
      [960, 1020, false, 308, 48],
    ])
    expect(kalenderHourMinuteToY(segments, 870)).toBe(236)
    expect(kalenderHourMinuteToY(segments, 960)).toBe(308)
    expect(kalenderHourYToMinute(segments, 222)).toBe(852.5)
    expect(kalenderHourYToMinute(segments, 198)).toBeUndefined()
    expect(kalenderHourYToMinute(segments, 356)).toBeUndefined()
  })
  test("pads a single appointment and shows at least four full hours", () => {
    const segments = kalenderHourSegmentsCreate([task("10:15", "11:00")])
    expect(segments.map(({ startMinute }) => startMinute)).toEqual([540, 600, 660, 720])
    expect(segments.every((segment) => !segment.collapsed)).toBe(true)
  })
  test("clamps padding and extends the range at midnight", () => {
    const early = kalenderHourSegmentsCreate([task("00:00", "00:30")])
    const late = kalenderHourSegmentsCreate([task("23:00", "23:59")])
    expect(early.map(({ startMinute }) => startMinute)).toEqual([0, 60, 120, 180])
    expect(late.map(({ startMinute }) => startMinute)).toEqual([1200, 1260, 1320, 1380])
    expect([...early, ...late].every((segment) => !segment.collapsed)).toBe(true)
  })
  test("keeps the current hour visible inside a normally collapsed gap", () => {
    const segments = kalenderHourSegmentsCreate([task("08:00", "09:00"), task("16:00", "17:00")], 12)
    expect(segments.find((segment) => segment.startMinute === 720)).toMatchObject({ endMinute: 780, collapsed: false })
    expect(
      segments.filter((segment) => segment.collapsed).map((segment) => [segment.startMinute, segment.endMinute]),
    ).toEqual([
      [540, 720],
      [780, 960],
    ])
  })
  test("extends the range for the current hour, including at midnight and without tasks", () => {
    for (const hour of [0, 23]) {
      const segments = kalenderHourSegmentsCreate([], hour)
      expect(segments.find((segment) => segment.startMinute === hour * 60)).toMatchObject({ collapsed: false })
      expect(segments.length).toBeGreaterThanOrEqual(4)
    }
    const segments = kalenderHourSegmentsCreate([task("10:00", "11:00")], 20)
    expect(segments.find((segment) => segment.startMinute === 1200)).toMatchObject({ collapsed: false })
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
    expect(segments[0]?.startMinute).toBe(300)
  })
})

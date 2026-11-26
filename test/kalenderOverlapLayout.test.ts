import { describe, expect, test } from "bun:test"
import type { KalenderTask } from "../src/demos/modules/kalender/KalenderTask.js"
import { kalenderOverlapLayout } from "../src/demos/modules/kalender/kalenderOverlapLayout.js"

const task = (id: string, start: string, end: string, allDay = false): KalenderTask => ({
  id,
  start,
  end,
  allDay,
  title: id,
  color: "red",
  name: "rot",
  meta: "",
  people: [],
})

describe("kalenderOverlapLayout", () => {
  test("lays out overlapping clusters separately and reuses free columns", () => {
    const result = kalenderOverlapLayout([
      task("a", "09:00", "11:00"),
      task("b", "09:30", "10:00"),
      task("c", "10:00", "10:30"),
      task("d", "11:00", "12:00"),
      task("all", "00:00", "00:00", true),
    ])
    expect(result.map(({ task, column, columns }) => [task.id, column, columns])).toEqual([
      ["a", 0, 2],
      ["b", 1, 2],
      ["c", 1, 2],
      ["d", 0, 1],
    ])
  })
  test("ignores invalid ranges", () => {
    expect(kalenderOverlapLayout([task("invalid", "bad", "10:00"), task("reverse", "11:00", "10:00")])).toEqual([])
  })
})

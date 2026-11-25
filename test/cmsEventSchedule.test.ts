import { expect, test } from "bun:test"
import { cmsEventScheduleNext } from "../src/demos/modules/cms/views/content-types/events/cmsEventScheduleNext.js"
import { cmsEventScheduleSorted } from "../src/demos/modules/cms/views/content-types/events/cmsEventScheduleSorted.js"

test("event schedule sorts by date, then time, without mutating the input", () => {
  const schedule = [
    { date: "2026-12-12", time: "14:00" },
    { date: "2026-12-11", time: "10:00" },
    { date: "2026-12-12", time: "09:30" },
  ]
  expect(cmsEventScheduleSorted(schedule)).toEqual([
    { date: "2026-12-11", time: "10:00" },
    { date: "2026-12-12", time: "09:30" },
    { date: "2026-12-12", time: "14:00" },
  ])
  expect(schedule[0]?.date).toBe("2026-12-12")
})

test("a new appointment defaults to the following day at the same time", () => {
  expect(cmsEventScheduleNext({ date: "2026-12-31", time: "18:30" })).toEqual({ date: "2027-01-01", time: "18:30" })
  expect(cmsEventScheduleNext(undefined).time).toBe("10:00")
})

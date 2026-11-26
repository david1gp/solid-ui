import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { cmsEventEditStateCreate } from "../src/demos/modules/cms/views/content-types/events/cmsEventEditStateCreate.js"
import { cmsEvents } from "../src/demos/modules/cms/views/content-types/events/cmsEvents.js"
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

test("ticket fields belong to individual appointments and new appointments start empty", () => {
  const { state, dispose } = createRoot((dispose) => ({ state: cmsEventEditStateCreate(cmsEvents.get()[1]!), dispose }))
  const first = state.schedule()[0]!
  expect(first.capacity.get()).toBe("16")
  state.scheduleFieldSet(first.id, "priceRegular", "12.50")
  state.scheduleFieldSet(first.id, "capacity", "20")
  flush()
  expect(first.priceRegular.get()).toBe("12.50")
  expect(state.schedule()[1]!.capacity.get()).toBe("16")
  state.scheduleAdd()
  flush()
  expect(state.schedule().at(-1)!.capacity.get()).toBe("")
  expect(state.schedule().at(-1)!.priceRegular.get()).toBe("")
  expect(state.schedule().at(-1)!.priceReduced.get()).toBe("")
  dispose()
})

test("a new appointment defaults to the following day at the same time", () => {
  expect(cmsEventScheduleNext({ date: "2026-12-31", time: "18:30" })).toEqual({
    date: "2027-01-01",
    time: "18:30",
    unlockCodeRequired: false,
  })
  expect(cmsEventScheduleNext(undefined).time).toBe("10:00")
})

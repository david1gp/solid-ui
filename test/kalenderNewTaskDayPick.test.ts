import { expect, test } from "bun:test"
import { kalenderNewTaskDayPick } from "../src/demos/modules/kalender/kalenderNewTaskDayPick.js"

test("new appointment chooses today when it is displayed", () => {
  expect(
    kalenderNewTaskDayPick([
      { day: undefined, isToday: false },
      { day: 1, isToday: false },
      { day: 26, isToday: true },
    ]),
  ).toBe(26)
})

test("new appointment chooses the first displayed day when today is outside the range", () => {
  expect(
    kalenderNewTaskDayPick([
      { day: undefined, isToday: false },
      { day: 1, isToday: false },
      { day: 2, isToday: false },
    ]),
  ).toBe(1)
})

test("new appointment chooses today at either month boundary", () => {
  expect(
    kalenderNewTaskDayPick([
      { day: 1, isToday: true },
      { day: 2, isToday: false },
    ]),
  ).toBe(1)
  expect(
    kalenderNewTaskDayPick([
      { day: 1, isToday: false },
      { day: 31, isToday: true },
    ]),
  ).toBe(31)
})

test("new appointment has no day before the calendar is populated", () => {
  expect(kalenderNewTaskDayPick([])).toBeUndefined()
  expect(kalenderNewTaskDayPick([{ day: undefined, isToday: false }])).toBeUndefined()
})

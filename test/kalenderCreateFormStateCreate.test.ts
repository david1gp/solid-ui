import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { kalenderCreateFormStateCreate } from "../src/demos/modules/kalender/kalenderCreateFormStateCreate.js"
import { kalenderCustomTitle } from "../src/demos/modules/kalender/kalenderCustomTitle.js"

test("new appointment form rejects an empty custom title", () => {
  const form = kalenderCreateFormStateCreate()
  form.titleChoiceSelect(kalenderCustomTitle)
  form.customTitleChange("   ")
  flush()
  expect(form.validate()).toBeUndefined()
  flush()
  expect(form.error()).toBe("Bitte einen Titel eingeben.")
})

test("new appointment form returns title, time, duration and selected plus typed people", () => {
  const form = kalenderCreateFormStateCreate()
  form.titleChoiceSelect("Workshop")
  form.timeChange("14:30")
  form.durationChange(60)
  form.personToggle("Mia Fischer")
  form.personDraftChange("Jonas Klein")
  flush()
  expect(form.validate()).toEqual({
    title: "Workshop",
    time: "14:30",
    duration: 60,
    people: ["Mia Fischer", "Jonas Klein"],
  })
})

test("new appointment form reset clears previous input", () => {
  const form = kalenderCreateFormStateCreate()
  form.titleChoiceSelect(kalenderCustomTitle)
  form.personToggle("Anna Schmidt")
  form.timeChange("17:00")
  flush()
  form.reset()
  flush()
  expect(form.isCustomTitle()).toBe(false)
  expect(form.people()).toEqual([])
  expect(form.time()).toBe("09:00")
})

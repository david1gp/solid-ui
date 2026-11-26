import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { kalenderTaskCreate } from "../src/demos/modules/kalender/kalenderTaskCreate.js"
import { kalenderTaskFormStateCreate } from "../src/demos/modules/kalender/kalenderTaskFormStateCreate.js"

function keyDown(key: string) {
  return { key, preventDefault: () => {} } as KeyboardEvent
}

test("appointment form requires a title", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.titleChange("   ")
  flush()
  expect(form.validate()).toBeUndefined()
  flush()
  expect(form.error()).toBe("Bitte einen Titel eingeben.")
})

test("appointment form rejects an end time before the start", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.titleChange("Workshop")
  form.endChange("08:30")
  flush()
  expect(form.validate()).toBeUndefined()
  flush()
  expect(form.error()).toBe("Das Ende muss nach dem Beginn liegen.")
})

test("moving the start keeps the duration", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.endChange("10:30")
  flush()
  form.startChange("14:00")
  flush()
  expect(form.end()).toBe("15:30")
  expect(form.durationLabel()).toBe("1 Std. 30 Min.")
})

test("editing an incomplete start preserves the previous duration once normalized", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.endChange("10:30")
  flush()
  form.startChange("1530")
  flush()
  form.startChange("15:30")
  flush()
  expect(form.end()).toBe("17:00")
})

test("appointment form rejects times outside quarter-hour steps", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.titleChange("Workshop")
  form.endChange("10:10")
  flush()
  expect(form.validate()).toBeUndefined()
})

test("all-day appointments skip the time check", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.titleChange("Geburtstag")
  form.endChange("08:00")
  form.allDayChange(true)
  flush()
  expect(form.validate()).toMatchObject({ title: "Geburtstag", allDay: true })
})

test("people search adds a suggested team member with Enter", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.personQueryChange("mia")
  flush()
  expect(form.suggestions().map((person) => person.name)).toEqual(["Mia Fischer"])
  form.personQueryKeyDown(keyDown("Enter"))
  flush()
  expect(form.people()).toEqual(["Mia Fischer"])
  expect(form.personQuery()).toBe("")
})

test("people search adds external people by e-mail and rejects unknown names", () => {
  const form = kalenderTaskFormStateCreate()
  form.reset("09:00")
  form.titleChange("Kundentermin")
  form.personQueryChange("kunde@firma.de")
  flush()
  expect(form.externalEmail()).toBe("kunde@firma.de")
  form.personQueryKeyDown(keyDown("Enter"))
  flush()
  form.personQueryChange("Unbekannt")
  flush()
  expect(form.validate()).toBeUndefined()
  flush()
  expect(form.people()).toEqual(["kunde@firma.de"])
  expect(form.error()).toContain("Person nicht gefunden")
})

test("editing loads an existing appointment into the form", () => {
  const form = kalenderTaskFormStateCreate()
  form.load(
    kalenderTaskCreate({
      id: "2026-11-26-g0",
      title: "Teammeeting",
      allDay: false,
      start: "10:00",
      end: "10:45",
      people: ["Anna Schmidt"],
    }),
  )
  flush()
  expect(form.validate()).toEqual({
    title: "Teammeeting",
    allDay: false,
    start: "10:00",
    end: "10:45",
    people: ["Anna Schmidt"],
  })
})

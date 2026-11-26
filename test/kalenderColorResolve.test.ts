import { expect, test } from "bun:test"
import { kalenderCategoryOf } from "../src/demos/modules/kalender/kalenderCategoryOf.js"
import { kalenderColorResolve } from "../src/demos/modules/kalender/kalenderColorResolve.js"
import { kalenderTaskCreate } from "../src/demos/modules/kalender/kalenderTaskCreate.js"

test("categories match case-insensitive titles and optional name suffixes", () => {
  expect(kalenderCategoryOf(" kundenanruf (Schmidt) ").name).toBe("Kundenanruf")
  expect(kalenderCategoryOf("MITTAGESSEN mit Lisa").name).toBe("Mittagessen")
  expect(kalenderCategoryOf("Teammeeting").name).toBe("Teammeeting")
  expect(kalenderCategoryOf("Präsentation Y").name).toBe("Präsentation")
  expect(kalenderCategoryOf("Präsentation Q3-Zahlen").name).toBe("Präsentation")
  expect(kalenderCategoryOf("Teammeeting Marketing").name).toBe("Teammeeting")
  expect(kalenderCategoryOf("Workshop: Design").name).toBe("Workshop")
  expect(kalenderCategoryOf("Code-Review PR 12").name).toBe("Code-Review")
  expect(kalenderCategoryOf("Mittagessen mit Lisa").name).toBe("Mittagessen")
  expect(kalenderCategoryOf("1:1-Gespräch Anna").name).toBe("1:1-Gespräch")
  expect(kalenderCategoryOf("Präsentationen").name).toBe("Sonstiges")
  expect(kalenderCategoryOf("Teammeetings").name).toBe("Sonstiges")
  expect(kalenderCategoryOf("Teammeeting2").name).toBe("Sonstiges")
  expect(kalenderCategoryOf("Teammeetingextra").name).toBe("Sonstiges")
  expect(kalenderColorResolve("Unbekannt", "Automatisch").name).toBe("Grau")
})

test("automatic colors follow the title while manual colors remain fixed", () => {
  expect(kalenderColorResolve("Teammeeting", "Automatisch").name).toBe("Grün")
  expect(kalenderColorResolve("Präsentation Y", "Automatisch").name).toBe("Lila")
  expect(kalenderColorResolve("Präsentation", "Orange").name).toBe("Orange")
  const task = kalenderTaskCreate({
    id: "1",
    title: "Präsentation",
    allDay: true,
    start: "09:00",
    end: "10:00",
    colorKey: "Orange",
  })
  expect(task.colorManual).toBe(true)
  expect(task.name).toBe("Orange")
})

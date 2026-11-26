import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { cmsEventCategoryAdd } from "../src/demos/modules/cms/views/content-types/events/cmsEventCategoryAdd.js"
import { cmsEventCategorySuggestions } from "../src/demos/modules/cms/views/content-types/events/cmsEventCategorySuggestions.js"
import { cmsEventEditStateCreate } from "../src/demos/modules/cms/views/content-types/events/cmsEventEditStateCreate.js"
import { cmsEventListMove } from "../src/demos/modules/cms/views/content-types/events/cmsEventListMove.js"
import { cmsEvents } from "../src/demos/modules/cms/views/content-types/events/cmsEvents.js"

test("reordering moves an item without mutating the original and ignores invalid indices", () => {
  const items = ["a", "b", "c"]
  expect(cmsEventListMove(items, 0, 2)).toEqual(["b", "c", "a"])
  expect(cmsEventListMove(items, 2, 0)).toEqual(["c", "a", "b"])
  expect(cmsEventListMove(items, -1, 1)).toEqual(items)
  expect(items).toEqual(["a", "b", "c"])
})

test("categories are trimmed and deduplicated case-insensitively", () => {
  expect(cmsEventCategoryAdd(["Audio"], " audio ")).toEqual(["Audio"])
  expect(cmsEventCategoryAdd(["Audio"], "  Live  ")).toEqual(["Audio", "Live"])
  expect(cmsEventCategoryAdd([], "  ")).toEqual([])
  expect(
    cmsEventCategorySuggestions([{ categories: [" Audio ", "Live"] }, { categories: ["audio", "Workshop"] }], ["LIVE"]),
  ).toEqual(["Audio", "Workshop"])
})

test("content edits reorder and validate FAQ and agenda before dropping empty entries", () => {
  const { state, dispose } = createRoot((dispose) => ({ state: cmsEventEditStateCreate(cmsEvents.get()[0]!), dispose }))
  state.categoryAdd(" audio ")
  state.categoryAdd(" Neue Kategorie ")
  flush()
  expect(state.categories()).toContain("Neue Kategorie")
  expect(state.categories().filter((item) => item.toLowerCase() === "audio")).toHaveLength(1)
  state.faqAdd()
  flush()
  const faqId = state.faq().at(-1)!.id
  state.faqUpdate(faqId, { question: "Frage" })
  flush()
  state.save()
  flush()
  expect(state.notice()).toContain("Frage und Antwort")
  state.faqUpdate(faqId, { answer: "Antwort" })
  flush()
  state.faqMove(1, 0)
  state.agendaAdd()
  flush()
  const agendaId = state.agenda().at(-1)!.id
  state.agendaUpdate(agendaId, { kind: "time", time: "25:00", title: "Ende" })
  flush()
  state.save()
  flush()
  expect(state.notice()).toContain("gültige Uhrzeit")
  state.agendaUpdate(agendaId, { time: "20:00" })
  flush()
  state.agendaMove(2, 0)
  state.textListAdd("highlights")
  state.faqAdd()
  flush()
  state.save()
  flush()
  flush()
  expect(state.notice()).toContain("Demo")
  expect(state.faq()[0]!.id).toBe(faqId)
  expect(state.faq()).toHaveLength(2)
  expect(state.agenda()[0]!.id).toBe(agendaId)
  expect(state.highlights()).not.toContain("")
  dispose()
})

test("save reports all invalid areas and clears their tab markers as entries are corrected", () => {
  const { state, dispose } = createRoot((dispose) => ({ state: cmsEventEditStateCreate(cmsEvents.get()[0]!), dispose }))
  state.faqAdd()
  state.agendaAdd()
  flush()
  const faqId = state.faq().at(-1)!.id
  const agendaId = state.agenda().at(-1)!.id
  state.faqUpdate(faqId, { question: "Frage" })
  state.agendaUpdate(agendaId, { kind: "time", time: "25:99", title: "Ende" })
  flush()
  state.save()
  flush()
  expect(state.notice()).toContain("Ablauf:")
  expect(state.notice()).toContain("FAQ:")
  expect(state.tabHasErrors("Ablauf")).toBe(true)
  expect(state.tabHasErrors("FAQ")).toBe(true)
  expect(state.agendaInvalid(agendaId)).toBe(true)
  state.agendaUpdate(agendaId, { kind: "day", day: 0 })
  flush()
  expect(state.agendaInvalid(agendaId)).toBe(true)
  state.agendaUpdate(agendaId, { day: 2 })
  state.faqUpdate(faqId, { answer: "Antwort" })
  flush()
  expect(state.tabHasErrors("Ablauf")).toBe(false)
  expect(state.tabHasErrors("FAQ")).toBe(false)
  state.save()
  flush()
  expect(state.notice()).toContain("Demo")
  dispose()
})

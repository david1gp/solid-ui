import { expect, test } from "bun:test"
import { cmsEventTitleSplit } from "../src/demos/modules/cms/views/content-types/events/cmsEventTitleSplit.js"

test("splits a title at the first spaced en dash or hyphen", () => {
  expect(cmsEventTitleSplit("Festival – Sommernacht – Open Air")).toEqual({
    eyebrow: "Festival",
    title: "Sommernacht – Open Air",
  })
  expect(cmsEventTitleSplit("Festival - Sommernacht")).toEqual({ eyebrow: "Festival", title: "Sommernacht" })
})

test("keeps titles without a spaced separator intact", () => {
  expect(cmsEventTitleSplit("Open-Air Festival")).toEqual({ eyebrow: "", title: "Open-Air Festival" })
  expect(cmsEventTitleSplit("")).toEqual({ eyebrow: "", title: "" })
})

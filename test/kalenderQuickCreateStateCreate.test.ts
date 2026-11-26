import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { kalenderQuickCreateStateCreate } from "../src/demos/modules/kalender/kalenderQuickCreateStateCreate.js"
import type { kalenderStateCreate } from "../src/demos/modules/kalender/kalenderStateCreate.js"
import { kalenderTaskFormStateCreate } from "../src/demos/modules/kalender/kalenderTaskFormStateCreate.js"

test("quick create shares the full dialog form and its validation", () => {
  const form = kalenderTaskFormStateCreate()
  const quick = kalenderQuickCreateStateCreate({ form } as ReturnType<typeof kalenderStateCreate>)
  expect(quick.form).toBe(form)

  quick.form.reset("09:00")
  quick.form.titleChange("  ")
  flush()
  expect(quick.form.validate()).toBeUndefined()
  flush()
  expect(form.error()).toBe("Bitte einen Titel eingeben.")

  quick.form.titleChange("Workshop")
  quick.form.endChange("10:30")
  flush()
  expect(form.validate()).toMatchObject({ title: "Workshop", start: "09:00", end: "10:30" })
})

test("quick create stores its anchor independently of the shared form", () => {
  const form = kalenderTaskFormStateCreate()
  const quick = kalenderQuickCreateStateCreate({ form } as ReturnType<typeof kalenderStateCreate>)
  const element = {} as HTMLElement
  expect(quick.anchor()).toBeUndefined()
  quick.anchorSet(element)
  flush()
  expect(quick.anchor()).toBe(element)
  expect(quick.form).toBe(form)
})

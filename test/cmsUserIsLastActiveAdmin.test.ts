import { describe, expect, test } from "bun:test"
import { cmsUserIsLastActiveAdmin } from "../src/demos/modules/cms/views/users/cmsUserIsLastActiveAdmin.js"

describe("last active administrator", () => {
  const admin = { id: "1", role: "Administrator", status: "Aktiv" as const }
  test("protects the only active administrator", () => {
    expect(cmsUserIsLastActiveAdmin([admin, { id: "2", role: "Administrator", status: "Deaktiviert" }], "1")).toBe(true)
  })
  test("does not protect an administrator when another is active", () => {
    expect(cmsUserIsLastActiveAdmin([admin, { ...admin, id: "2" }], "1")).toBe(false)
  })
  test("does not protect a non-admin or an unknown user", () => {
    expect(cmsUserIsLastActiveAdmin([admin, { id: "2", role: "Editor", status: "Aktiv" }], "2")).toBe(false)
    expect(cmsUserIsLastActiveAdmin([admin], "missing")).toBe(false)
  })
})

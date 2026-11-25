import { describe, expect, test } from "bun:test"
import { cmsUsersRemovalRemovesLastActiveAdmin } from "../src/demos/modules/cms/views/users/cmsUsersRemovalRemovesLastActiveAdmin.js"

describe("removal of active administrators", () => {
  const admin = { id: "1", role: "Administrator", status: "Aktiv" as const }
  const second = { ...admin, id: "2" }
  const editor = { id: "3", role: "Editor", status: "Aktiv" as const }
  const inactive = { id: "4", role: "Administrator", status: "Deaktiviert" as const }

  test("rejects removing the sole active administrator with other users", () => {
    expect(cmsUsersRemovalRemovesLastActiveAdmin([admin, editor, inactive], ["1", "3"])).toBe(true)
  })
  test("rejects removing all active administrators together", () => {
    expect(cmsUsersRemovalRemovesLastActiveAdmin([admin, second], ["1", "2"])).toBe(true)
  })
  test("allows removing an administrator when another remains", () => {
    expect(cmsUsersRemovalRemovesLastActiveAdmin([admin, second], ["1"])).toBe(false)
  })
  test("allows other removals and does not block an already admin-less list", () => {
    expect(cmsUsersRemovalRemovesLastActiveAdmin([admin, editor, inactive], ["3", "4"])).toBe(false)
    expect(cmsUsersRemovalRemovesLastActiveAdmin([editor, inactive], ["4"])).toBe(false)
  })
})

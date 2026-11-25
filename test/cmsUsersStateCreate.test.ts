import { expect, test } from "bun:test"
import { createRoot } from "solid-js"
import { createSignalObject } from "../ui/utils/createSignalObject.js"
import { cmsUsersStateCreate } from "../src/demos/modules/cms/views/users/cmsUsersStateCreate.js"

test("initializes an invited user's draft and resets it when navigating directly to another user", async () => {
  await createRoot(async (dispose) => {
    try {
      const id = createSignalObject("3")
      const state = cmsUsersStateCreate(() => ({ id: id.get() }))
      await Promise.resolve()
      expect(state.draftRole()).toBe("Author")
      expect(state.draftStatus()).toBe("Eingeladen")
      expect(state.dirty()).toBe(false)
      state.draftRoleSet("Editor")
      await Promise.resolve()
      expect(state.dirty()).toBe(true)
      id.set("1")
      await Promise.resolve()
      expect(state.draftRole()).toBe("Administrator")
      expect(state.draftStatus()).toBe("Aktiv")
      expect(state.dirty()).toBe(false)
    } finally {
      dispose()
    }
  })
})

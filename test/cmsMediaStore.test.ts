import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { cmsMediaStore } from "../src/demos/modules/cms/views/media/cmsMediaStore.js"

test("removing a folder moves only its files to unfiled", () => {
  cmsMediaStore.folderAdd("Photos")
  cmsMediaStore.folderAdd("Other")
  cmsMediaStore.update("demo-og-image", { folder: "Photos" })
  cmsMediaStore.update("demo-logo", { folder: "Other" })
  flush()

  cmsMediaStore.folderRemove("Photos")
  flush()

  expect(cmsMediaStore.folders()).toEqual(["Other"])
  expect(cmsMediaStore.items().find((item) => item.id === "demo-og-image")?.folder).toBe("")
  expect(cmsMediaStore.items().find((item) => item.id === "demo-logo")?.folder).toBe("Other")
  cmsMediaStore.folderRemove("Other")
  flush()
})

test("removing an unknown folder leaves unfiled files unchanged", () => {
  const items = cmsMediaStore.items()
  cmsMediaStore.folderRemove("")
  expect(cmsMediaStore.items()).toBe(items)
})

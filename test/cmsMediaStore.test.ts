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

test("deleting a folder and its files revokes their object URLs and preserves other files", () => {
  cmsMediaStore.folderAdd("Delete")
  cmsMediaStore.folderAdd("Keep")
  cmsMediaStore.upload([new File(["image"], "delete.png", { type: "image/png" })], "Delete")
  cmsMediaStore.upload([new File(["image"], "keep.png", { type: "image/png" })], "Keep")
  flush()
  const deleted = cmsMediaStore.items().find((item) => item.name === "delete.png")!
  const kept = cmsMediaStore.items().find((item) => item.name === "keep.png")!
  const revoked: string[] = []
  const originalRevoke = URL.revokeObjectURL
  URL.revokeObjectURL = (url) => {
    revoked.push(url)
    originalRevoke(url)
  }
  try {
    cmsMediaStore.folderRemove("Delete", { deleteItems: true })
    flush()
    expect(cmsMediaStore.folders()).not.toContain("Delete")
    expect(cmsMediaStore.items().some((item) => item.id === deleted.id)).toBe(false)
    expect(cmsMediaStore.items().some((item) => item.id === kept.id)).toBe(true)
    expect(revoked).toEqual([deleted.url])
  } finally {
    URL.revokeObjectURL = originalRevoke
    cmsMediaStore.remove(kept.id)
    cmsMediaStore.folderRemove("Keep")
    flush()
  }
})

test("removing an unknown folder leaves unfiled files unchanged", () => {
  const items = cmsMediaStore.items()
  cmsMediaStore.folderRemove("")
  expect(cmsMediaStore.items()).toBe(items)
})

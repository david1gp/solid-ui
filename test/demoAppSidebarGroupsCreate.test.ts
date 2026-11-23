import { expect, test } from "bun:test"
import { createRoot, flush } from "solid-js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { demoAppSidebarGroupsCreate } from "../src/demos/modules/demoAppSidebarGroupsCreate.js"

test("settings selection updates existing navigation rows without rebuilding the project drawer", () => {
  const { navigation, drawer, dispose } = createRoot((dispose) => {
    const settingsOpen = createSignalObject(false)
    const active = createSignalObject("project-1")
    const [navigation, drawer] = demoAppSidebarGroupsCreate({
      entries: [{ label: "Projekte", icon: "" }],
      settingsIcon: "",
      projectIcon: "",
      settingsLabel: "Einstellungen",
      settingsPageKey: "settings-page",
      settingsOpen,
      active: active.get,
      setActive: active.set,
      projects: createSignalObject([{ id: "project-1", label: "Projekt 1" }]),
      newProjectId: createSignalObject<string | undefined>(undefined),
      renameProject: () => {},
      deleteProject: () => {},
    })
    return { navigation: navigation!, drawer: drawer!, dispose }
  })
  try {
    const projects = drawer.items
    const [project] = projects
    const [projectsButton, settingsButton] = navigation.items
    expect(project?.isActive).toBe(true)
    settingsButton?.onClick?.()
    flush()
    expect(settingsButton?.isActive).toBe(true)
    expect(project?.isActive).toBe(false)
    expect(drawer.items).toBe(projects)
    projectsButton?.onClick?.()
    flush()
    expect(settingsButton?.isActive).toBe(false)
    expect(projectsButton?.isActive).toBe(true)
  } finally {
    dispose()
  }
})

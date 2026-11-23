import { createMemo } from "solid-js"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"

type Project = { id: string; label: string }

/** Selection updates the affected rows without rebuilding both navigation groups. */
export function demoAppSidebarGroupsCreate(p: {
  entries: readonly { icon: string; label: string }[]
  settingsIcon: string
  projectIcon: string
  settingsLabel: string
  settingsPageKey: string
  settingsOpen: SignalObject<boolean>
  active: () => string
  setActive: (id: string) => void
  projects: SignalObject<Project[]>
  newProjectId: SignalObject<string | undefined>
  renameProject: (id: string, label: string) => void
  deleteProject: (id: string) => void
}): AppSidebarNavGroup[] {
  let nextProject = 6
  const select = (id: string) => {
    p.setActive(id)
    p.settingsOpen.set(false)
  }
  const isSelected = (id: string) => !p.settingsOpen.get() && p.active() === id
  const items = createMemo(() =>
    p.projects.get().map(({ id, label }) => ({
      id,
      icon: p.projectIcon,
      label,
      get isActive() {
        return isSelected(id)
      },
      get autoEdit() {
        return p.newProjectId.get() === id
      },
      onRename: (name: string) => p.renameProject(id, name),
      onDelete: () => p.deleteProject(id),
      onClick: () => select(id),
    })),
  )

  return [
    {
      label: "Navigation",
      items: [
        ...p.entries.map((entry) => ({
          ...entry,
          get isActive() {
            return isSelected(entry.label)
          },
          onClick: () => select(entry.label),
        })),
        {
          icon: p.settingsIcon,
          label: `${p.settingsLabel} 1-3 (Mobil)`,
          get isActive() {
            return p.settingsOpen.get()
          },
          onClick: () => p.settingsOpen.set(!p.settingsOpen.get()),
        },
        {
          icon: p.settingsIcon,
          label: `${p.settingsLabel} 4+`,
          get isActive() {
            return isSelected(p.settingsPageKey)
          },
          onClick: () => select(p.settingsPageKey),
        },
      ],
    },
    {
      label: "Projekte",
      collapsible: true,
      get items() {
        return items()
      },
      onReorder: (from, to) => {
        const reordered = [...p.projects.get()]
        const [item] = reordered.splice(from, 1)
        if (!item) return
        reordered.splice(to, 0, item)
        p.projects.set(reordered)
      },
      addItem: {
        label: "Neues Projekt",
        onAdd: () => {
          const n = nextProject++
          const project = { id: `project-${n}`, label: `Projekt ${n}` }
          p.newProjectId.set(project.id)
          p.projects.set([...p.projects.get(), project])
          select(project.id)
          // autoEdit is only read when mounting a row; reopening the drawer must not restart it.
          queueMicrotask(() => p.newProjectId.set(undefined))
        },
      },
    },
  ]
}

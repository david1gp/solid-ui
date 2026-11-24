import { createSignal } from "solid-js"

type MenuItem = { id: string; label: string; url: string; children: MenuItem[] }
type Menu = { id: string; name: string; items: MenuItem[] }

const initialMenus: Menu[] = [
  {
    id: "main",
    name: "Hauptnavigation / Main navigation",
    items: [
      { id: "home", label: "Startseite / Home", url: "/", children: [] },
      {
        id: "about",
        label: "Über uns / About",
        url: "/about",
        children: [{ id: "team", label: "Team", url: "/about/team", children: [] }],
      },
      { id: "contact", label: "Kontakt / Contact", url: "/contact", children: [] },
    ],
  },
  {
    id: "footer",
    name: "Footer",
    items: [{ id: "privacy", label: "Datenschutz / Privacy", url: "/privacy", children: [] }],
  },
]

function findItem(items: MenuItem[], id: string): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) return item
    const found = findItem(item.children, id)
    if (found) return found
  }
  return undefined
}

function removeItem(items: MenuItem[], id: string): MenuItem[] {
  return items.filter((item) => item.id !== id).map((item) => ({ ...item, children: removeItem(item.children, id) }))
}

function updateItem(items: MenuItem[], id: string, update: (item: MenuItem) => MenuItem): MenuItem[] {
  return items.map((item) =>
    item.id === id ? update(item) : { ...item, children: updateItem(item.children, id, update) },
  )
}

function insertRelative(items: MenuItem[], targetId: string, item: MenuItem, position: "before" | "after"): MenuItem[] {
  return items.flatMap((node) => {
    if (node.id === targetId) return position === "before" ? [item, node] : [node, item]
    return [{ ...node, children: insertRelative(node.children, targetId, item, position) }]
  })
}

export function cmsMenusViewStateCreate() {
  const [menus, setMenus] = createSignal(initialMenus)
  const [selectedMenuId, setSelectedMenuId] = createSignal("main")
  const [editingId, setEditingId] = createSignal<string>()
  const [parentId, setParentId] = createSignal<string>()
  const [label, setLabel] = createSignal("")
  const [url, setUrl] = createSignal("")
  const [formOpen, setFormOpen] = createSignal(false)
  const menu = () => menus().find((entry) => entry.id === selectedMenuId())!
  const updateItems = (update: (items: MenuItem[]) => MenuItem[]) =>
    setMenus((entries) =>
      entries.map((entry) => (entry.id === selectedMenuId() ? { ...entry, items: update(entry.items) } : entry)),
    )
  const closeForm = () => {
    setFormOpen(false)
    setEditingId(undefined)
    setParentId(undefined)
    setLabel("")
    setUrl("")
  }
  return {
    menus,
    menu,
    selectedMenuId,
    editingId,
    parentId,
    label,
    url,
    formOpen,
    setLabel,
    setUrl,
    closeForm,
    selectMenu: (id: string) => {
      setSelectedMenuId(id)
      closeForm()
    },
    add: (parent?: string) => {
      closeForm()
      setParentId(parent)
      setFormOpen(true)
    },
    edit: (item: MenuItem) => {
      setEditingId(item.id)
      setParentId(undefined)
      setLabel(item.label)
      setUrl(item.url)
      setFormOpen(true)
    },
    remove: (id: string) => {
      updateItems((items) => removeItem(items, id))
      closeForm()
    },
    save: () => {
      const name = label().trim()
      const href = url().trim()
      if (!name || !href) return
      const id = editingId()
      if (id) updateItems((items) => updateItem(items, id, (item) => ({ ...item, label: name, url: href })))
      else {
        const item: MenuItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          label: name,
          url: href,
          children: [],
        }
        const parent = parentId()
        updateItems((items) =>
          parent
            ? updateItem(items, parent, (node) => ({ ...node, children: [...node.children, item] }))
            : [...items, item],
        )
      }
      closeForm()
    },
    move: (id: string, targetId: string, position: "before" | "after") => {
      const items = menu().items
      const item = findItem(items, id)
      if (!item || id === targetId || findItem(item.children, targetId) || !findItem(items, targetId)) return
      updateItems((current) => insertRelative(removeItem(current, id), targetId, item, position))
    },
  }
}

import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"

const text = {
  de: {
    title: "Rollen & Berechtigungen",
    description: "Lege fest, welche Aktionen Rollen ausführen dürfen.",
    add: "Rolle hinzufügen",
    name: "Rollenname",
    resource: "Ressource",
    read: "Lesen",
    create: "Erstellen",
    edit: "Bearbeiten",
    delete: "Löschen",
    pages: "Seiten",
    posts: "Beiträge",
    media: "Medien",
    users: "Benutzer",
  },
  en: {
    title: "Roles & permissions",
    description: "Choose which actions each role can perform.",
    add: "Add role",
    name: "Role name",
    resource: "Resource",
    read: "Read",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    pages: "Pages",
    posts: "Posts",
    media: "Media",
    users: "Users",
  },
}
export function cmsRolesStateCreate() {
  const roles = createSignalObject(["Administrator", "Editor", "Author"])
  const name = createSignalObject("")
  const permissions = createSignalObject<Record<string, boolean>>({})
  return {
    text: () => text[cmsLocale.get()],
    roles: roles.get,
    name: name.get,
    nameSet: (value: string) => name.set(value),
    add: () => {
      const value = name.get().trim()
      if (!value || roles.get().includes(value)) return
      roles.set([...roles.get(), value])
      name.set("")
    },
    checked: (role: string, resource: string, action: string) =>
      permissions.get()[`${role}:${resource}:${action}`] ??
      (role === "Administrator" ||
        (role === "Editor" && resource !== "users") ||
        (role === "Author" && action === "read")),
    toggle: (role: string, resource: string, action: string, checked: boolean) =>
      permissions.set({ ...permissions.get(), [`${role}:${resource}:${action}`]: checked }),
  }
}

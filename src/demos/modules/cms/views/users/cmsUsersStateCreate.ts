import { createEffect, untrack } from "solid-js"
import { toastAdd } from "#ui/interactive/toast/toastAdd.js"
import { cmsUserIsLastActiveAdmin } from "./cmsUserIsLastActiveAdmin.js"
import { cmsUsersRemovalRemovesLastActiveAdmin } from "./cmsUsersRemovalRemovesLastActiveAdmin.js"
import type { CmsUserStatus } from "./cmsUserStatus.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

const users = createSignalObject<{ id: string; name: string; email: string; role: string; status: CmsUserStatus }[]>([
  {
    id: "1",
    name: "Anna Schmidt",
    email: "anna@example.com",
    role: "Administrator",
    status: "Aktiv",
  },
  { id: "2", name: "David Weber", email: "david@example.com", role: "Editor", status: "Aktiv" },
  { id: "3", name: "Mia Fischer", email: "mia@example.com", role: "Author", status: "Eingeladen" },
  { id: "4", name: "Lukas Becker", email: "lukas@example.com", role: "Editor", status: "Aktiv" },
  { id: "5", name: "Sophie Wagner", email: "sophie@example.com", role: "Author", status: "Aktiv" },
  {
    id: "6",
    name: "Paul Hoffmann",
    email: "paul@example.com",
    role: "Editor",
    status: "Eingeladen",
  },
  { id: "7", name: "Emma Schulz", email: "emma@example.com", role: "Author", status: "Aktiv" },
  { id: "8", name: "Noah Bauer", email: "noah@example.com", role: "Editor", status: "Aktiv" },
  { id: "9", name: "Lea Richter", email: "lea@example.com", role: "Author", status: "Eingeladen" },
  {
    id: "10",
    name: "Felix Klein",
    email: "felix@example.com",
    role: "Administrator",
    status: "Aktiv",
  },
  { id: "11", name: "Marie Wolf", email: "marie@example.com", role: "Editor", status: "Aktiv" },
  { id: "12", name: "Jonas Neumann", email: "jonas@example.com", role: "Author", status: "Aktiv" },
  {
    id: "13",
    name: "Lena Schwarz",
    email: "lena@example.com",
    role: "Editor",
    status: "Eingeladen",
  },
  { id: "14", name: "Ben Zimmermann", email: "ben@example.com", role: "Author", status: "Aktiv" },
  { id: "15", name: "Clara Braun", email: "clara@example.com", role: "Editor", status: "Aktiv" },
])
const text = {
  de: {
    title: "Benutzer",
    description: "Verwalte Benutzer und ihre Zugriffsrechte.",
    invite: "Benutzer einladen",
    name: "Name",
    email: "E-Mail",
    role: "Rolle",
    status: "Status",
    back: "Zurück zu Benutzern",
    send: "Einladung senden",
    cancel: "Abbrechen",
    details: "Benutzerdetails",
    invited: "Eingeladen",
    active: "Aktiv",
    deactivated: "Deaktiviert",
    deactivate: "Deaktivieren",
    removeGuard: "Der letzte aktive Administrator kann nicht entfernt werden.",
    guard: "Der letzte aktive Administrator kann weder deaktiviert werden noch eine andere Rolle erhalten.",
    noAccess: "Kein Zugriff auf das CMS",
    confirm: "Benutzer deaktivieren?",
    confirmDescription: "Dieser Benutzer hat keinen Zugriff mehr auf das CMS.",
    saved: "Benutzer gespeichert",
    remove: "Ausgewählte entfernen",
  },
  en: {
    title: "Users",
    description: "Manage users and their access.",
    invite: "Invite user",
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    back: "Back to users",
    send: "Send invitation",
    cancel: "Cancel",
    details: "User details",
    invited: "Invited",
    active: "Active",
    deactivated: "Deactivated",
    deactivate: "Deactivate",
    removeGuard: "The last active administrator cannot be removed.",
    guard: "The last active administrator cannot be deactivated or assigned another role.",
    noAccess: "No access to the CMS",
    confirm: "Deactivate user?",
    confirmDescription: "This user will no longer have access to the CMS.",
    saved: "User saved",
    remove: "Remove selected",
  },
}
export function cmsUsersStateCreate(props: () => { id?: string }) {
  const open = createSignalObject(false)
  const name = createSignalObject("")
  const email = createSignalObject("")
  const role = createSignalObject("Editor")
  const draftRole = createSignalObject("")
  const draftStatus = createSignalObject<CmsUserStatus>("Aktiv")
  const confirmOpen = createSignalObject(false)
  const user = () => users.get().find((item) => item.id === props().id)
  const lastAdmin = () => cmsUserIsLastActiveAdmin(users.get(), props().id ?? "")
  const discard = () => {
    const current = user()
    if (!current) return
    draftRole.set(current.role)
    draftStatus.set(current.status)
  }
  createEffect(
    () => props().id,
    () => untrack(discard),
  )
  const userUpdate = (id: string, changes: { role: string; status: CmsUserStatus }) => {
    if (cmsUserIsLastActiveAdmin(users.get(), id) && (changes.role !== "Administrator" || changes.status !== "Aktiv"))
      return false
    users.set(users.get().map((item) => (item.id === id ? { ...item, ...changes } : item)))
    return true
  }
  const save = () => {
    const current = user()
    if (!current || !userUpdate(current.id, { role: draftRole.get(), status: draftStatus.get() })) return
    toastAdd({ title: text[cmsLocale.get()].saved, duration: 3000 })
  }
  return {
    text: () => text[cmsLocale.get()],
    users: users.get,
    user,
    lastAdmin,
    draftRole: draftRole.get,
    draftRoleSet: (value: string) => draftRole.set(value),
    draftStatus: draftStatus.get,
    draftStatusSet: (value: CmsUserStatus) => draftStatus.set(value),
    dirty: () => !!user() && (user()?.role !== draftRole.get() || user()?.status !== draftStatus.get()),
    discard,
    confirmOpen: confirmOpen.get,
    confirmOpenSet: (value: boolean) => confirmOpen.set(value),
    save,
    submit: () => {
      if (draftStatus.get() === "Deaktiviert" && user()?.status !== "Deaktiviert") confirmOpen.set(true)
      else save()
    },
    statusLabel: (status: CmsUserStatus) =>
      status === "Eingeladen"
        ? text[cmsLocale.get()].invited
        : status === "Deaktiviert"
          ? text[cmsLocale.get()].deactivated
          : text[cmsLocale.get()].active,
    open: open.get,
    openSet: (value: boolean) => open.set(value),
    name: name.get,
    nameSet: (value: string) => name.set(value),
    email: email.get,
    emailSet: (value: string) => email.set(value),
    role: role.get,
    roleSet: (value: string) => role.set(value),
    detail: (id: string) => cmsNavigate("users", id),
    back: () => cmsNavigate("users"),
    remove: (ids: string[]) => {
      if (cmsUsersRemovalRemovesLastActiveAdmin(users.get(), ids)) {
        toastAdd({ title: text[cmsLocale.get()].removeGuard, duration: 3000 })
        return
      }
      users.set(users.get().filter((user) => !ids.includes(user.id)))
    },
    invite: () => {
      if (!email.get().trim()) return
      users.set([
        ...users.get(),
        {
          id: String(Date.now()),
          name: name.get().trim() || email.get().split("@")[0] || email.get(),
          email: email.get().trim(),
          role: role.get(),
          status: "Eingeladen",
        },
      ])
      name.set("")
      email.set("")
      open.set(false)
    },
  }
}

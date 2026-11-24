import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

const users = createSignalObject([
  {
    id: "1",
    name: "Anna Schmidt",
    email: "anna@example.com",
    role: "Administrator",
    team: "Marketing",
    status: "Aktiv",
  },
  { id: "2", name: "David Weber", email: "david@example.com", role: "Editor", team: "Redaktion", status: "Aktiv" },
  { id: "3", name: "Mia Fischer", email: "mia@example.com", role: "Author", team: "Redaktion", status: "Eingeladen" },
  { id: "4", name: "Lukas Becker", email: "lukas@example.com", role: "Editor", team: "Redaktion", status: "Aktiv" },
  { id: "5", name: "Sophie Wagner", email: "sophie@example.com", role: "Author", team: "Marketing", status: "Aktiv" },
  {
    id: "6",
    name: "Paul Hoffmann",
    email: "paul@example.com",
    role: "Editor",
    team: "Marketing",
    status: "Eingeladen",
  },
  { id: "7", name: "Emma Schulz", email: "emma@example.com", role: "Author", team: "Redaktion", status: "Aktiv" },
  { id: "8", name: "Noah Bauer", email: "noah@example.com", role: "Editor", team: "Redaktion", status: "Aktiv" },
  { id: "9", name: "Lea Richter", email: "lea@example.com", role: "Author", team: "Marketing", status: "Eingeladen" },
  {
    id: "10",
    name: "Felix Klein",
    email: "felix@example.com",
    role: "Administrator",
    team: "Marketing",
    status: "Aktiv",
  },
  { id: "11", name: "Marie Wolf", email: "marie@example.com", role: "Editor", team: "Redaktion", status: "Aktiv" },
  { id: "12", name: "Jonas Neumann", email: "jonas@example.com", role: "Author", team: "Redaktion", status: "Aktiv" },
  {
    id: "13",
    name: "Lena Schwarz",
    email: "lena@example.com",
    role: "Editor",
    team: "Marketing",
    status: "Eingeladen",
  },
  { id: "14", name: "Ben Zimmermann", email: "ben@example.com", role: "Author", team: "Redaktion", status: "Aktiv" },
  { id: "15", name: "Clara Braun", email: "clara@example.com", role: "Editor", team: "Marketing", status: "Aktiv" },
])
const text = {
  de: {
    title: "Benutzer",
    description: "Verwalte Benutzer und ihre Zugriffsrechte.",
    invite: "Benutzer einladen",
    name: "Name",
    email: "E-Mail",
    role: "Rolle",
    team: "Team",
    status: "Status",
    back: "Zurück zu Benutzern",
    send: "Einladung senden",
    cancel: "Abbrechen",
    details: "Benutzerdetails",
    invited: "Eingeladen",
    active: "Aktiv",
    remove: "Ausgewählte entfernen",
  },
  en: {
    title: "Users",
    description: "Manage users and their access.",
    invite: "Invite user",
    name: "Name",
    email: "Email",
    role: "Role",
    team: "Team",
    status: "Status",
    back: "Back to users",
    send: "Send invitation",
    cancel: "Cancel",
    details: "User details",
    invited: "Invited",
    active: "Active",
    remove: "Remove selected",
  },
}
export function cmsUsersStateCreate(props: () => { id?: string }) {
  const open = createSignalObject(false)
  const name = createSignalObject("")
  const email = createSignalObject("")
  const role = createSignalObject("Editor")
  const team = createSignalObject("Redaktion")
  return {
    text: () => text[cmsLocale.get()],
    users: users.get,
    user: () => users.get().find((user) => user.id === props().id),
    open: open.get,
    openSet: (value: boolean) => open.set(value),
    name: name.get,
    nameSet: (value: string) => name.set(value),
    email: email.get,
    emailSet: (value: string) => email.set(value),
    role: role.get,
    roleSet: (value: string) => role.set(value),
    team: team.get,
    teamSet: (value: string) => team.set(value),
    detail: (id: string) => cmsNavigate("users", id),
    back: () => cmsNavigate("users"),
    remove: (ids: string[]) => users.set(users.get().filter((user) => !ids.includes(user.id))),
    invite: () => {
      if (!email.get().trim()) return
      users.set([
        ...users.get(),
        {
          id: String(Date.now()),
          name: name.get().trim() || email.get().split("@")[0] || email.get(),
          email: email.get().trim(),
          role: role.get(),
          team: team.get(),
          status: "Eingeladen",
        },
      ])
      name.set("")
      email.set("")
      open.set(false)
    },
  }
}

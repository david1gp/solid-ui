import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
const text = {
  de: {
    title: "Teams",
    description: "Organisiere Benutzer in Teams.",
    members: "Mitglieder",
    member: "Mitglied",
    add: "Team hinzufügen",
    name: "Teamname",
    editorial: "Redaktion",
    development: "Entwicklung",
  },
  en: {
    title: "Teams",
    description: "Organize users into teams.",
    members: "members",
    member: "member",
    add: "Add team",
    name: "Team name",
    editorial: "Editorial",
    development: "Development",
  },
}
export function cmsTeamsStateCreate() {
  const teams = createSignalObject([
    { name: "Marketing", members: 1 },
    { name: "Redaktion", members: 2 },
    { name: "Entwicklung", members: 0 },
  ])
  const name = createSignalObject("")
  return {
    text: () => text[cmsLocale.get()],
    teams: teams.get,
    name: name.get,
    nameSet: (value: string) => name.set(value),
    teamName: (value: string) =>
      value === "Redaktion"
        ? text[cmsLocale.get()].editorial
        : value === "Entwicklung"
          ? text[cmsLocale.get()].development
          : value,
    add: () => {
      const value = name.get().trim()
      if (!value || teams.get().some((team) => team.name === value)) return
      teams.set([...teams.get(), { name: value, members: 0 }])
      name.set("")
    },
  }
}

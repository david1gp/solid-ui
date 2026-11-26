import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderCustomTitle } from "./kalenderCustomTitle.js"
import { kalenderPeople } from "./kalenderPeople.js"
import { kalenderTitles } from "./kalenderTitles.js"

/** Form state for the "Neuer Termin" dialog. */
export function kalenderCreateFormStateCreate() {
  const titleChoice = createSignalObject(kalenderTitles[0]!)
  const customTitle = createSignalObject("")
  const time = createSignalObject("09:00")
  const duration = createSignalObject(30)
  const people = createSignalObject<string[]>([])
  const personDraft = createSignalObject("")
  const error = createSignalObject("")

  const title = () => (titleChoice.get() === kalenderCustomTitle ? customTitle.get().trim() : titleChoice.get())
  const extraPeople = () => people.get().filter((person) => !kalenderPeople.includes(person))

  const personAdd = () => {
    const name = personDraft.get().trim()
    personDraft.set("")
    if (!name || people.get().includes(name)) return
    people.set([...people.get(), name])
  }

  return {
    titleChoice: titleChoice.get,
    titleChoiceSelect: (value: string) => {
      titleChoice.set(value)
      error.set("")
    },
    isCustomTitle: () => titleChoice.get() === kalenderCustomTitle,
    customTitle: customTitle.get,
    customTitleChange: (value: string) => {
      customTitle.set(value)
      error.set("")
    },
    time: time.get,
    timeChange: (value: string) => {
      time.set(value)
      error.set("")
    },
    duration: duration.get,
    durationChange: (value: number) => duration.set(value),
    people: people.get,
    extraPeople,
    hasPerson: (name: string) => people.get().includes(name),
    personToggle: (name: string) => {
      const current = people.get()
      people.set(current.includes(name) ? current.filter((person) => person !== name) : [...current, name])
    },
    personRemove: (name: string) => people.set(people.get().filter((person) => person !== name)),
    personDraft: personDraft.get,
    personDraftChange: (value: string) => personDraft.set(value),
    personDraftKeyDown: (event: KeyboardEvent) => {
      if (event.key !== "Enter") return
      event.preventDefault()
      personAdd()
    },
    personAdd,
    error: error.get,
    reset: () => {
      titleChoice.set(kalenderTitles[0]!)
      customTitle.set("")
      time.set("09:00")
      duration.set(30)
      people.set([])
      personDraft.set("")
      error.set("")
    },
    /** Returns the validated input, or undefined after setting a German error message. */
    validate: () => {
      if (!title()) {
        error.set("Bitte einen Titel eingeben.")
        return undefined
      }
      if (!/^\d{2}:\d{2}$/.test(time.get())) {
        error.set("Bitte eine gültige Uhrzeit wählen.")
        return undefined
      }
      const pending = personDraft.get().trim()
      const allPeople = pending && !people.get().includes(pending) ? [...people.get(), pending] : people.get()
      return { title: title(), time: time.get(), duration: duration.get(), people: allPeople }
    },
  }
}

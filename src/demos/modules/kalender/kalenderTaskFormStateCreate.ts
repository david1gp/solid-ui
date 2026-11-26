import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderColors } from "./kalenderColors.js"
import { kalenderColorResolve } from "./kalenderColorResolve.js"
import { kalenderEmailIs } from "./kalenderEmailIs.js"
import { kalenderPeople } from "./kalenderPeople.js"
import type { KalenderTask } from "./KalenderTask.js"
import { kalenderTimeFromMinutes } from "./kalenderTimeFromMinutes.js"
import { kalenderTimeMinutes } from "./kalenderTimeMinutes.js"

const defaultDuration = 60
const suggestionLimit = 6

/** Form state for the "Neuer Termin" / "Termin bearbeiten" dialog. */
export function kalenderTaskFormStateCreate() {
  const title = createSignalObject("")
  const colorKey = createSignalObject("Automatisch")
  const allDay = createSignalObject(false)
  const start = createSignalObject("09:00")
  let lastValidStart = "09:00"
  const end = createSignalObject("10:00")
  const people = createSignalObject<string[]>([])
  const personQuery = createSignalObject("")
  const activeSuggestion = createSignalObject(0)
  const error = createSignalObject("")

  const suggestions = () => {
    const query = personQuery.get().trim().toLowerCase()
    return kalenderPeople
      .filter((person) => !people.get().includes(person.name))
      .filter(
        (person) => !query || person.name.toLowerCase().includes(query) || person.email.toLowerCase().includes(query),
      )
      .slice(0, suggestionLimit)
  }
  /** Team member name for an exact name/e-mail match, the e-mail for external people, else undefined. */
  const memberFind = (query: string) =>
    kalenderPeople.find((person) => person.name.toLowerCase() === query || person.email.toLowerCase() === query)
  const personResolve = (value: string) => {
    const query = value.trim().toLowerCase()
    if (!query) return undefined
    const member = memberFind(query)
    if (member) return member.name
    return kalenderEmailIs(query) ? query : undefined
  }
  const personAdd = (person: string) => {
    personQuery.set("")
    activeSuggestion.set(0)
    error.set("")
    if (people.get().includes(person)) return
    people.set([...people.get(), person])
  }
  const personQueryCommit = () => {
    const active = suggestions()[activeSuggestion.get()]
    if (personQuery.get().trim() && active) return personAdd(active.name)
    const person = personResolve(personQuery.get())
    if (person) return personAdd(person)
    if (personQuery.get().trim()) error.set("Person nicht gefunden – bitte aus der Liste wählen oder E-Mail eingeben.")
  }
  const fill = (values: {
    title: string
    allDay: boolean
    start: string
    end: string
    people: string[]
    colorManual?: boolean
    name?: string
  }) => {
    title.set(values.title)
    colorKey.set(values.colorManual ? (values.name ?? "Automatisch") : "Automatisch")
    allDay.set(values.allDay)
    start.set(values.start)
    lastValidStart = values.start
    end.set(values.end)
    people.set(values.people)
    personQuery.set("")
    activeSuggestion.set(0)
    error.set("")
  }

  return {
    colorKey: colorKey.get,
    colorChange: (value: string) => {
      colorKey.set(value)
      error.set("")
    },
    autoColor: () => kalenderColorResolve(title.get(), "Automatisch"),
    title: title.get,
    titleChange: (value: string) => {
      title.set(value)
      error.set("")
    },
    allDay: allDay.get,
    allDayChange: (value: boolean) => {
      allDay.set(value)
      error.set("")
    },
    start: start.get,
    /** Moving the start keeps the current duration. */
    startChange: (value: string) => {
      const next = kalenderTimeMinutes(value)
      const duration = kalenderTimeMinutes(end.get()) - kalenderTimeMinutes(lastValidStart)
      start.set(value)
      error.set("")
      if (Number.isNaN(next)) return
      lastValidStart = value
      end.set(kalenderTimeFromMinutes(next + (duration > 0 ? duration : defaultDuration)))
    },
    end: end.get,
    /** "1 Std. 30 Min." for a valid range, else empty. */
    durationLabel: () => {
      const minutes = kalenderTimeMinutes(end.get()) - kalenderTimeMinutes(start.get())
      if (!(minutes > 0)) return ""
      const hours = Math.floor(minutes / 60)
      const rest = minutes % 60
      return [hours && `${hours} Std.`, rest && `${rest} Min.`].filter(Boolean).join(" ")
    },
    endChange: (value: string) => {
      end.set(value)
      error.set("")
    },
    people: people.get,
    personRemove: (person: string) => people.set(people.get().filter((entry) => entry !== person)),
    personQuery: personQuery.get,
    personQueryChange: (value: string) => {
      personQuery.set(value)
      activeSuggestion.set(0)
      error.set("")
    },
    personQueryKeyDown: (event: KeyboardEvent) => {
      const count = suggestions().length
      if (event.key === "ArrowDown" && count) {
        event.preventDefault()
        activeSuggestion.set((activeSuggestion.get() + 1) % count)
        return
      }
      if (event.key === "ArrowUp" && count) {
        event.preventDefault()
        activeSuggestion.set((activeSuggestion.get() - 1 + count) % count)
        return
      }
      if (event.key === "Enter") {
        event.preventDefault()
        personQueryCommit()
        return
      }
      if (event.key === "Backspace" && !personQuery.get() && people.get().length) {
        people.set(people.get().slice(0, -1))
      }
    },
    personAdd,
    suggestions,
    activeSuggestion: activeSuggestion.get,
    /** Shows suggestions only while typing, so the list does not cover the form. */
    suggestionsOpen: () => personQuery.get().trim().length > 0 && suggestions().length > 0,
    /** Offers the typed e-mail as an external person when no team member matches. */
    externalEmail: () => {
      const query = personQuery.get().trim().toLowerCase()
      return kalenderEmailIs(query) && !memberFind(query) && !people.get().includes(query) ? query : undefined
    },
    error: error.get,
    /** Empty form for a new appointment starting at `startTime`. */
    reset: (startTime: string) => {
      const minutes = kalenderTimeMinutes(startTime)
      fill({
        title: "",
        allDay: false,
        start: startTime,
        end: kalenderTimeFromMinutes(minutes + defaultDuration),
        people: [],
      })
    },
    load: (task: KalenderTask) => fill(task),
    /** Returns the validated input, or undefined after setting a German error message. */
    validate: () => {
      const trimmed = title.get().trim()
      if (!trimmed) {
        error.set("Bitte einen Titel eingeben.")
        return undefined
      }
      if (colorKey.get() !== "Automatisch" && !kalenderColors.some((color) => color.name === colorKey.get())) {
        error.set("Bitte eine gültige Farbe wählen.")
        return undefined
      }
      const startMinutes = kalenderTimeMinutes(start.get())
      const endMinutes = kalenderTimeMinutes(end.get())
      if (
        !allDay.get() &&
        (Number.isNaN(startMinutes) || Number.isNaN(endMinutes) || startMinutes % 15 !== 0 || endMinutes % 15 !== 0)
      ) {
        error.set("Bitte gültige Uhrzeiten wählen.")
        return undefined
      }
      if (!allDay.get() && endMinutes <= startMinutes) {
        error.set("Das Ende muss nach dem Beginn liegen.")
        return undefined
      }
      const pending = personQuery.get().trim()
      const pendingPerson = personResolve(pending)
      if (pending && !pendingPerson) {
        error.set("Person nicht gefunden – bitte aus der Liste wählen oder E-Mail eingeben.")
        return undefined
      }
      const allPeople =
        pendingPerson && !people.get().includes(pendingPerson) ? [...people.get(), pendingPerson] : people.get()
      return {
        title: trimmed,
        allDay: allDay.get(),
        start: start.get(),
        end: end.get(),
        people: allPeople,
        colorKey: colorKey.get(),
      }
    },
  }
}

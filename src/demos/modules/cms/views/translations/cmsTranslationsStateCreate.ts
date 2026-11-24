import { createSignalObject } from "#ui/utils/createSignalObject.js"

type Entry = { id: string; name: string; de: { title: string; body: string }; en: { title: string; body: string } }
const entries = createSignalObject<Entry[]>([
  {
    id: "welcome",
    name: "Startseite / Home",
    de: { title: "Willkommen", body: "Entdecken Sie unsere Inhalte." },
    en: { title: "Welcome", body: "Discover our content." },
  },
  {
    id: "about",
    name: "Über uns / About",
    de: { title: "Über uns", body: "Lernen Sie unser Team kennen." },
    en: { title: "", body: "" },
  },
  {
    id: "contact",
    name: "Kontakt / Contact",
    de: { title: "Kontakt", body: "Schreiben Sie uns eine Nachricht." },
    en: { title: "Contact", body: "" },
  },
])
export function cmsTranslationsStateCreate(id: () => string | undefined) {
  const target = createSignalObject<"en" | "de">("en")
  return {
    entries: () => entries.get(),
    current: () => entries.get().find((entry) => entry.id === id()),
    target: () => target.get(),
    switchLanguage: () => target.set(target.get() === "en" ? "de" : "en"),
    change: (language: "de" | "en", key: "title" | "body", value: string) =>
      entries.set(
        entries
          .get()
          .map((entry) => (entry.id === id() ? { ...entry, [language]: { ...entry[language], [key]: value } } : entry)),
      ),
  }
}

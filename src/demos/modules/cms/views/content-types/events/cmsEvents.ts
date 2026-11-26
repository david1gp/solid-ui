import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { CmsEventAgendaEntry } from "./CmsEventAgendaEntry.js"
import type { CmsEventFaqEntry } from "./CmsEventFaqEntry.js"
import type { CmsEventScheduleEntry } from "./CmsEventScheduleEntry.js"

export const cmsEvents = createSignalObject<
  {
    id: string
    position: number
    featured: boolean
    title: string
    shortTitle: string
    schedule: CmsEventScheduleEntry[]
    location: string
    description: string
    organizer: string
    categories: string[]
    highlights: string[]
    servicesIncluded: string[]
    servicesExcluded: string[]
    faq: CmsEventFaqEntry[]
    agenda: CmsEventAgendaEntry[]
    color: string
  }[]
>([
  {
    id: "event-1",
    organizer: "Klang-Team Berlin",
    categories: ["Audio", "Live"],
    highlights: ["Probehören", "Fachberatung"],
    servicesIncluded: ["Getränke", "Beratung"],
    servicesExcluded: ["Anreise"],
    faq: [{ id: "faq-1-1", question: "Muss ich Kopfhörer mitbringen?", answer: "Nein, alle Modelle stehen bereit." }],
    agenda: [
      { id: "agenda-1-1", kind: "day", day: 1, title: "Veranstaltungstag" },
      { id: "agenda-1-2", kind: "time", time: "18:30", title: "Begrüßung", description: "Wir freuen uns auf Sie." },
    ],
    position: 1,
    featured: true,
    title: "Hörtest-Abend – Studio One live erleben",
    shortTitle: "Hörtest-Abend",
    schedule: [
      {
        title: "Abendvorstellung",
        description: "Einlass ab 18 Uhr.",
        unlockCodeRequired: false,
        maxPerOrder: 4,
        date: "2026-12-04",
        time: "18:30",
        capacity: 40,
        priceRegular: 15,
        priceReduced: 9.5,
      },
    ],
    location: "Berlin, Showroom Mitte",
    description: "Probehören aller Modelle mit Beratung durch unser Klang-Team.",
    color: "#263d39",
  },
  {
    id: "event-2",
    organizer: "Tonstudio Elbe",
    categories: ["Workshop", "Audio"],
    highlights: ["Praxisübungen", "Mixing"],
    servicesIncluded: ["Arbeitsplatz", "Unterlagen"],
    servicesExcluded: ["Mittagessen"],
    faq: [{ id: "faq-2-1", question: "Sind Vorkenntnisse nötig?", answer: "Grundkenntnisse sind hilfreich." }],
    agenda: [
      { id: "agenda-2-1", kind: "day", day: 1, title: "Veranstaltungstag" },
      { id: "agenda-2-2", kind: "time", time: "10:00", title: "Einführung", description: "Wir freuen uns auf Sie." },
    ],
    position: 2,
    featured: false,
    title: "Workshop – Mixing mit Kopfhörern",
    shortTitle: "Mixing-Workshop",
    schedule: [
      {
        title: "Workshop am Vormittag",
        description: "Materialien sind enthalten.",
        unlockCodeRequired: true,
        maxPerOrder: 2,
        date: "2026-12-11",
        time: "10:00",
        capacity: 16,
        priceRegular: 35,
        priceReduced: 25,
      },
      {
        title: "Workshop am Morgen",
        description: "Kreativer Start in den Tag.",
        unlockCodeRequired: false,
        date: "2026-12-12",
        time: "09:30",
        capacity: 16,
      },
      {
        title: "Workshop am Nachmittag",
        description: "Nachmittagskurs mit Materialien.",
        unlockCodeRequired: false,
        maxPerOrder: 2,
        date: "2026-12-12",
        time: "14:00",
        capacity: 16,
      },
    ],
    location: "Hamburg, Tonstudio Elbe",
    description: "Praxisnaher Workshop für Homerecording und Podcasts.",
    color: "#283e50",
  },
  {
    id: "event-3",
    organizer: "Studio One",
    categories: ["Online", "Angebote"],
    highlights: ["Sonderpreise", "Neuheiten"],
    servicesIncluded: ["Online-Zugang"],
    servicesExcluded: ["Versandkosten"],
    faq: [{ id: "faq-3-1", question: "Wie erhalte ich Zugang?", answer: "Der Sale ist online frei zugänglich." }],
    agenda: [
      { id: "agenda-3-1", kind: "day", day: 1, title: "Veranstaltungstag" },
      { id: "agenda-3-2", kind: "time", time: "09:00", title: "Sale-Start", description: "Wir freuen uns auf Sie." },
    ],
    position: 3,
    featured: false,
    title: "Winter-Sale Opening",
    shortTitle: "Winter-Sale",
    schedule: [
      {
        title: "Tageskarte",
        description: "Zugang zum Veranstaltungsgelände.",
        unlockCodeRequired: false,
        maxPerOrder: 4,
        date: "2026-12-18",
        time: "09:00",
        capacity: 500,
      },
    ],
    location: "Online",
    description: "Exklusive Angebote zum Start der Wintersaison.",
    color: "#593c3d",
  },
  {
    id: "event-4",
    organizer: "Studio One München",
    categories: ["Live", "Produktvorstellung"],
    highlights: ["Live-DJ", "Produktpremiere"],
    servicesIncluded: ["Eintritt", "Getränke"],
    servicesExcluded: ["Anreise"],
    faq: [{ id: "faq-4-1", question: "Gibt es eine Garderobe?", answer: "Ja, eine Garderobe ist vorhanden." }],
    agenda: [
      { id: "agenda-4-1", kind: "day", day: 1, title: "Veranstaltungstag" },
      { id: "agenda-4-2", kind: "time", time: "19:00", title: "Einlass", description: "Wir freuen uns auf Sie." },
    ],
    position: 4,
    featured: true,
    title: "Launch-Event – Silver Wave",
    shortTitle: "Silver Wave Launch",
    schedule: [
      {
        title: "Konzertabend",
        description: "Sitzplatz für den Konzertabend.",
        unlockCodeRequired: true,
        maxPerOrder: 2,
        date: "2027-01-15",
        time: "19:00",
        capacity: 120,
        priceRegular: 20,
        priceReduced: 12.5,
      },
    ],
    location: "München, Werksviertel",
    description: "Vorstellung unseres neuen Premium-Kopfhörers mit Live-DJ-Set.",
    color: "#3a4149",
  },
  {
    id: "event-5",
    organizer: "Audio Community Köln",
    categories: ["Community", "Audio"],
    highlights: ["Audio-Talk", "Austausch"],
    servicesIncluded: ["Moderation", "Getränke"],
    servicesExcluded: ["Verpflegung"],
    faq: [
      { id: "faq-5-1", question: "Kann ich eigene Musik mitbringen?", answer: "Ja, Lieblingsalben sind willkommen." },
    ],
    agenda: [
      { id: "agenda-5-1", kind: "day", day: 1, title: "Veranstaltungstag" },
      { id: "agenda-5-2", kind: "time", time: "17:00", title: "Begrüßung", description: "Wir freuen uns auf Sie." },
    ],
    position: 5,
    featured: false,
    title: "Community-Treffen – Audio-Talk",
    shortTitle: "Audio-Talk",
    schedule: [
      {
        title: "Führung",
        description: "Geführter Rundgang.",
        unlockCodeRequired: false,
        maxPerOrder: 4,
        date: "2027-02-02",
        time: "17:00",
        capacity: 30,
        priceRegular: 15,
      },
    ],
    location: "Köln, Coworking Ehrenfeld",
    description: "Austausch rund um Klang, Technik und Lieblingsalben.",
    color: "#473f52",
  },
])

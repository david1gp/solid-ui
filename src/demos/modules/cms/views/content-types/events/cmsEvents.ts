import { createSignalObject } from "#ui/utils/createSignalObject.js"
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
    color: string
  }[]
>([
  {
    id: "event-1",
    position: 1,
    featured: true,
    title: "Hörtest-Abend – Studio One live erleben",
    shortTitle: "Hörtest-Abend",
    schedule: [{ date: "2026-12-04", time: "18:30", capacity: 40, priceRegular: 15, priceReduced: 9.5 }],
    location: "Berlin, Showroom Mitte",
    description: "Probehören aller Modelle mit Beratung durch unser Klang-Team.",
    color: "#263d39",
  },
  {
    id: "event-2",
    position: 2,
    featured: false,
    title: "Workshop – Mixing mit Kopfhörern",
    shortTitle: "Mixing-Workshop",
    schedule: [
      { date: "2026-12-11", time: "10:00", capacity: 16, priceRegular: 35, priceReduced: 25 },
      { date: "2026-12-12", time: "09:30", capacity: 16 },
      { date: "2026-12-12", time: "14:00", capacity: 16 },
    ],
    location: "Hamburg, Tonstudio Elbe",
    description: "Praxisnaher Workshop für Homerecording und Podcasts.",
    color: "#283e50",
  },
  {
    id: "event-3",
    position: 3,
    featured: false,
    title: "Winter-Sale Opening",
    shortTitle: "Winter-Sale",
    schedule: [{ date: "2026-12-18", time: "09:00", capacity: 500 }],
    location: "Online",
    description: "Exklusive Angebote zum Start der Wintersaison.",
    color: "#593c3d",
  },
  {
    id: "event-4",
    position: 4,
    featured: true,
    title: "Launch-Event – Silver Wave",
    shortTitle: "Silver Wave Launch",
    schedule: [{ date: "2027-01-15", time: "19:00", capacity: 120, priceRegular: 20, priceReduced: 12.5 }],
    location: "München, Werksviertel",
    description: "Vorstellung unseres neuen Premium-Kopfhörers mit Live-DJ-Set.",
    color: "#3a4149",
  },
  {
    id: "event-5",
    position: 5,
    featured: false,
    title: "Community-Treffen – Audio-Talk",
    shortTitle: "Audio-Talk",
    schedule: [{ date: "2027-02-02", time: "17:00", capacity: 30, priceRegular: 15 }],
    location: "Köln, Coworking Ehrenfeld",
    description: "Austausch rund um Klang, Technik und Lieblingsalben.",
    color: "#473f52",
  },
])

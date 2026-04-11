import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { SearchBox } from "#ui/interactive/searchbox/index.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { mdiMapMarker, mdiSort, mdiTag } from "@mdi/js"
import { createMemo } from "solid-js"

const cityNames = [
  "Berlin",
  "München",
  "Hamburg",
  "Köln",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Leipzig",
  "Aachen",
  "Bonn",
  "Bremen",
  "Darmstadt",
  "Dresden",
  "Erlangen",
  "Freiburg",
  "Gießen",
  "Göttingen",
  "Halle",
  "Hannover",
  "Heidelberg",
  "Jena",
  "Karlsruhe",
  "Kassel",
  "Kiel",
  "Konstanz",
  "Lübeck",
  "Magdeburg",
  "Mainz",
  "Mannheim",
  "Marburg",
  "Münster",
  "Paderborn",
  "Passau",
  "Potsdam",
  "Regensburg",
  "Rostock",
  "Saarbrücken",
  "Siegen",
  "Tübingen",
  "Ulm",
  "Würzburg",
]

const categories = [
  { name: "Sport", emoji: "🏃" },
  { name: "Business", emoji: "💼" },
  { name: "Events", emoji: "🎉" },
  { name: "Eltern", emoji: "👨‍👩‍👧" },
  { name: "Tech", emoji: "💻" },
  { name: "Sprachen", emoji: "🌍" },
  { name: "Uni/Hochschule", emoji: "🎓" },
  { name: "Schule", emoji: "📚" },
]

const sortOptions = [
  { value: "newest", label: "Neueste zuerst" },
  { value: "members", label: "Meiste Mitglieder" },
  { value: "activity", label: "Hohe Aktivität" },
]

interface Group {
  id: number
  name: string
  city: string
  category: string
  members: number
  activity: number
  createdAt: Date
}

const mockGroups: Group[] = [
  {
    id: 1,
    name: "Berlin Volleyball Treff",
    city: "Berlin",
    category: "Sport",
    members: 45,
    activity: 85,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "München Startup Meetup",
    city: "München",
    category: "Business",
    members: 120,
    activity: 72,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: 3,
    name: "Hamburg Tech Talks",
    city: "Hamburg",
    category: "Tech",
    members: 89,
    activity: 90,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: 4,
    name: "Köln Elterngruppe",
    city: "Köln",
    category: "Eltern",
    members: 67,
    activity: 78,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: 5,
    name: "Frankfurt Sprachentausch",
    city: "Frankfurt",
    category: "Sprachen",
    members: 34,
    activity: 65,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 6,
    name: "Stuttgart Hackathon",
    city: "Stuttgart",
    category: "Tech",
    members: 56,
    activity: 88,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: 7,
    name: "Düsseldorf Yoga am Rhein",
    city: "Düsseldorf",
    category: "Sport",
    members: 28,
    activity: 55,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: 8,
    name: "Leipzig Events Netzwerk",
    city: "Leipzig",
    category: "Events",
    members: 93,
    activity: 82,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: 9,
    name: "Aachen Uni Lerngruppe",
    city: "Aachen",
    category: "Uni/Hochschule",
    members: 41,
    activity: 70,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: 10,
    name: "Bonn Musikanten",
    city: "Bonn",
    category: "Events",
    members: 22,
    activity: 45,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: 11,
    name: "Bremen Ruderclub",
    city: "Bremen",
    category: "Sport",
    members: 38,
    activity: 62,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: 12,
    name: "Dresden Schule Elternabend",
    city: "Dresden",
    category: "Schule",
    members: 55,
    activity: 75,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: 13,
    name: "Heidelberg Business Breakfast",
    city: "Heidelberg",
    category: "Business",
    members: 31,
    activity: 58,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: 14,
    name: "Hannover Tech Stammtisch",
    city: "Hannover",
    category: "Tech",
    members: 47,
    activity: 80,
    createdAt: new Date("2024-02-25"),
  },
  {
    id: 15,
    name: "Karlsruhe Coding Dojo",
    city: "Karlsruhe",
    category: "Tech",
    members: 63,
    activity: 92,
    createdAt: new Date("2024-03-15"),
  },
]

export function DemoSearchBox() {
  const searchQuerySignal = createSignalObject("")
  const citySignal = createSignalObject("")
  const categorySignal = createSignalObject("")
  const sortSignal = createSignalObject("")

  const filteredGroups = createMemo(() => {
    const query = searchQuerySignal.get().toLowerCase().trim()
    const city = citySignal.get()
    const category = categorySignal.get()
    const sort = sortSignal.get()

    let result = [...mockGroups]

    if (query) {
      result = result.filter((g) => g.name.toLowerCase().includes(query))
    }

    if (city) {
      result = result.filter((g) => g.city === city)
    }

    if (category) {
      result = result.filter((g) => g.category === category)
    }

    if (sort === "newest") {
      result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (sort === "members") {
      result.sort((a, b) => b.members - a.members)
    } else if (sort === "activity") {
      result.sort((a, b) => b.activity - a.activity)
    }

    return result
  })

  const handleSearch = () => {
    console.log("Search triggered:")
    console.log("  Query:", searchQuerySignal.get())
    console.log("  City:", citySignal.get())
    console.log("  Category:", categorySignal.get())
    console.log("  Sort:", sortSignal.get())
  }

  const filters = [
    {
      key: "city",
      label: "City",
      valueSignal: citySignal,
      getOptions: () => cityNames,
      isSearchable: true,
      icon: mdiMapMarker,
      buttonVariant: buttonVariant.outline,
    },
    {
      key: "category",
      label: "Category",
      valueSignal: categorySignal,
      getOptions: () => categories.map((c) => c.name),
      getOptionText: (value: string) => {
        const cat = categories.find((c) => c.name === value)
        return cat ? `${cat.emoji} ${cat.name}` : value
      },
      isSearchable: true,
      icon: mdiTag,
      buttonVariant: buttonVariant.outline,
    },
    {
      key: "sort",
      label: "Sort",
      valueSignal: sortSignal,
      getOptions: () => sortOptions.map((o) => o.value),
      getOptionText: (value: string) => sortOptions.find((o) => o.value === value)?.label ?? value,
      isSearchable: false,
      icon: mdiSort,
      buttonVariant: buttonVariant.outline,
    },
  ]

  const getCategoryEmoji = (name: string) => categories.find((c) => c.name === name)?.emoji ?? ""

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">SearchBox Demo</h1>
          <p class="text-slate-600 dark:text-slate-400">A generic search component with filterable dropdowns</p>
        </div>

        <SearchBox
          searchQuerySignal={searchQuerySignal}
          filters={filters}
          onSearch={handleSearch}
          placeholder="Search groups..."
          searchButtonText="Search groups"
          scrollToId="results"
        />

        <div id="results" class="mt-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Results ({filteredGroups().length})
            </h2>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              City: <span class="font-medium text-slate-700 dark:text-slate-300">{citySignal.get() || "All"}</span> |
              Category:{" "}
              <span class="font-medium text-slate-700 dark:text-slate-300">{categorySignal.get() || "All"}</span> |
              Sort: <span class="font-medium text-slate-700 dark:text-slate-300">{sortSignal.get() || "Newest"}</span>
            </div>
          </div>

          <div class="space-y-3">
            {filteredGroups().length === 0 ? (
              <div class="p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <p class="text-slate-500 dark:text-slate-400">No groups found.</p>
              </div>
            ) : (
              filteredGroups().map((group) => (
                <div
                  data-id={group.id}
                  class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-semibold text-slate-900 dark:text-slate-100">{group.name}</h3>
                        <span class="text-sm">{getCategoryEmoji(group.category)}</span>
                      </div>
                      <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>{group.city}</span>
                        <span>{group.category}</span>
                      </div>
                    </div>
                    <div class="text-right text-sm">
                      <div class="text-slate-900 dark:text-slate-100 font-medium">{group.members} members</div>
                      <div class="text-slate-500 dark:text-slate-400">Activity: {group.activity}%</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

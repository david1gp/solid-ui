import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { kalenderStateCreate } from "./kalender/kalenderStateCreate.js"

export function demoKalenderStateCreate() {
  const calendar = kalenderStateCreate()
  const searchOpen = createSignalObject(false)
  const search = createSignalObject("")
  const filteredCalendar = {
    ...calendar,
    days: () => {
      const query = search.get().trim().toLocaleLowerCase()
      const days = calendar.days()
      if (!query) return days
      return days.map((day) => ({
        ...day,
        tasks: day.tasks.filter((task) => task.title.toLocaleLowerCase().includes(query)),
      }))
    },
  }
  return {
    calendar: filteredCalendar,
    searchOpen: searchOpen.get,
    search: search.get,
    searchShow: () => searchOpen.set(true),
    searchClose: () => {
      search.set("")
      searchOpen.set(false)
    },
    searchChange: (value: string) => search.set(value),
  }
}

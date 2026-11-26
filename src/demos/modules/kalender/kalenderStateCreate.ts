import { mdiCalendarMonth } from "@adaptive-ds/mdi/mdiCalendarMonth.js"
import { mdiCardMultiple } from "@adaptive-ds/mdi/mdiCardMultiple.js"
import { mdiChartBar } from "@adaptive-ds/mdi/mdiChartBar.js"
import { mdiCrown } from "@adaptive-ds/mdi/mdiCrown.js"
import { mdiFormatListBulleted } from "@adaptive-ds/mdi/mdiFormatListBulleted.js"
import { mdiLayers } from "@adaptive-ds/mdi/mdiLayers.js"
import { mdiMapMarker } from "@adaptive-ds/mdi/mdiMapMarker.js"
import { mdiPackageVariant } from "@adaptive-ds/mdi/mdiPackageVariant.js"
import { mdiViewDashboardOutline } from "@adaptive-ds/mdi/mdiViewDashboardOutline.js"
import { mdiViewGrid } from "@adaptive-ds/mdi/mdiViewGrid.js"
import { onSettled } from "solid-js"
import { themeInit } from "#ui/interactive/theme/themeSignal.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const tasks = [
  { day: 2, title: "BareMinerals", color: "#d575d4", name: "Purple", count: 0 },
  { day: 3, title: "CosmoProf", color: "#ed967b", name: "Coral", count: 5 },
  { day: 7, title: "Bobbi Brown", color: "#b4d5bd", name: "Green", count: 1 },
  { day: 8, title: "Napoleon Perdis", color: "#c1afda", name: "Lavender", count: 0 },
  { day: 14, title: "Yves Saint Laurent", color: "#ed967b", name: "Coral", count: 0 },
  { day: 20, title: "Napoleon Perdis", color: "#ed9dbc", name: "Pink", count: 2 },
  { day: 22, title: "Palm Angels", color: "#ed9dbc", name: "Pink", count: 1 },
  { day: 23, title: "Estee Lauder", color: "#ed967b", name: "Coral", count: 2 },
  { day: 24, title: "Yves Saint Laurent", color: "#b4d5bd", name: "Green", count: 1 },
  { day: 28, title: "Estee Lauder", color: "#5bcfe0", name: "Cyan", count: 2 },
  { day: 31, title: "Estee Lauder", color: "#5bcfe0", name: "Cyan", count: 1 },
].map((task, i) => ({
  ...task,
  borderColor: task.day === 3 || task.day === 23 ? "#ef6464" : task.day === 31 ? "#e8c85b" : "#55d6a4",
  meta: `${["Card06-250", "Card02-450", "Card02-03", "Card02-90", "Card02-35"][i % 5]} | PT- ${[45, 30, 30, 40, 45][i % 5]} Min`,
}))

export function kalenderStateCreate() {
  onSettled(themeInit)
  const collapsed = createSignalObject(true)
  const month = createSignalObject(new Date(2020, 3, 1))
  const view = createSignalObject("Month")
  const openDay = createSignalObject<number | undefined>(undefined)
  const groups = [
    {
      label: "Workspace",
      items: [
        { icon: mdiLayers, label: "Workspace" },
        { icon: mdiCalendarMonth, label: "Calendar", isActive: true },
        { icon: mdiViewGrid, label: "Apps" },
        { icon: mdiCardMultiple, label: "Cards" },
        { icon: mdiCrown, label: "Premium" },
        { icon: mdiChartBar, label: "Reports" },
        { icon: mdiViewDashboardOutline, label: "Dashboard" },
        { icon: mdiMapMarker, label: "Locations" },
        { icon: mdiPackageVariant, label: "Packages" },
        { icon: mdiFormatListBulleted, label: "Lists" },
      ],
    },
  ]
  const days = () => {
    const date = month.get()
    const offset = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7
    const total = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const length = Math.ceil((offset + total) / 7) * 7
    return Array.from({ length }, (_, index) => {
      const day = index - offset + 1
      return {
        index,
        day: day > 0 && day <= total ? day : undefined,
        task:
          day > 0 && day <= total && date.getFullYear() === 2020 && date.getMonth() === 3
            ? tasks.find((task) => task.day === day)
            : undefined,
      }
    })
  }
  return {
    collapsed,
    groups,
    days,
    openDay: openDay.get,
    monthLabel: () => month.get().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    view: view.get,
    selectView: (value: string) => view.set(value),
    changeMonth: (delta: number) => {
      const date = month.get()
      month.set(new Date(date.getFullYear(), date.getMonth() + delta, 1))
      openDay.set(undefined)
    },
    setOpenDay: (day: number | undefined) => openDay.set(day),
    weekday: (day: number) =>
      new Date(month.get().getFullYear(), month.get().getMonth(), day).toLocaleDateString("en-US", { weekday: "long" }),
  }
}

import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function demoBottomMobileNavbarStateCreate() {
  const active = createSignalObject<"Home" | "Search" | "Create" | "Reels" | "Profile">("Home")
  return { active: active.get, select: (item: "Home" | "Search" | "Create" | "Reels" | "Profile") => active.set(item) }
}

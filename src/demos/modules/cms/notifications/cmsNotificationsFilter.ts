import { cmsNotificationsData } from "./cmsNotificationsData.js"

type Item = (typeof cmsNotificationsData)[number]
type Filter = "all" | "unread" | "error" | "payment" | "message"
export function cmsNotificationsFilter(items: readonly Item[], filter: Filter, isUnread: (id: string) => boolean) {
  return items.filter((item) => filter === "all" || (filter === "unread" ? isUnread(item.id) : item.type === filter))
}

import { createSignal } from "solid-js"
import { cmsNotificationsData } from "./cmsNotificationsData.js"

export function cmsNotificationsStoreCreate() {
  const [read, setRead] = createSignal(
    new Set<string>(cmsNotificationsData.filter((item) => !item.isCurrent).map((item) => item.id)),
  )
  const [dismissed, setDismissed] = createSignal(new Set<string>())
  const visible = () => cmsNotificationsData.filter((item) => !dismissed().has(item.id))
  const isUnread = (id: string) => !read().has(id)
  const markRead = (id: string) => setRead((previous) => new Set([...previous, id]))
  return {
    visible,
    isUnread,
    markRead,
    unread: () => visible().filter((item) => isUnread(item.id)),
    unreadCount: () => visible().filter((item) => isUnread(item.id)).length,
    toggleRead: (id: string) =>
      setRead((previous) => {
        const next = new Set(previous)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }),
    markAllRead: () => setRead((previous) => new Set([...previous, ...visible().map((item) => item.id)])),
    dismiss: (id: string) => setDismissed((previous) => new Set([...previous, id])),
  }
}

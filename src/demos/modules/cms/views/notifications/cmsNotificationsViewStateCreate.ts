import { createSignal } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNotificationsFilter } from "../../notifications/cmsNotificationsFilter.js"
import { cmsNotificationsStore } from "../../notifications/cmsNotificationsStore.js"
import { cmsNotificationTimeFormat } from "../../notifications/cmsNotificationTimeFormat.js"

const text = {
  de: {
    title: "Benachrichtigungen",
    description: "Neuigkeiten und Aktivitäten auf einen Blick.",
    allRead: "Alle als gelesen markieren",
    read: "Als gelesen markieren",
    unread: "Als ungelesen markieren",
    new: "Neu",
    all: "Alle",
    unreadFilter: "Ungelesen",
    error: "Fehler",
    payment: "Zahlungen",
    message: "Nachrichten",
    empty: "Keine Benachrichtigungen",
    emptyFilter: "Keine Einträge für diesen Filter",
    dismiss: "Ausblenden",
    backup: "Backup erneut starten",
    form: "Formular-Log ansehen",
    inquiry: "Anfrage öffnen",
    invoice: "Rechnung ansehen",
    feedback: "Demo-Aktion ausgeführt",
  },
  en: {
    title: "Notifications",
    description: "Updates and activity at a glance.",
    allRead: "Mark all as read",
    read: "Mark as read",
    unread: "Mark as unread",
    new: "New",
    all: "All",
    unreadFilter: "Unread",
    error: "Errors",
    payment: "Payments",
    message: "Messages",
    empty: "No notifications",
    emptyFilter: "No entries for this filter",
    dismiss: "Dismiss",
    backup: "Restart backup",
    form: "View form log",
    inquiry: "Open inquiry",
    invoice: "View invoice",
    feedback: "Demo action completed",
  },
}
export function cmsNotificationsViewStateCreate() {
  const [filter, setFilter] = createSignal<"all" | "unread" | "error" | "payment" | "message">("all")
  const [feedback, setFeedback] = createSignal("")
  const t = () => text[cmsLocale.get()]
  const filters = () =>
    (
      [
        { id: "all", label: t().all },
        { id: "unread", label: t().unreadFilter },
        { id: "error", label: t().error },
        { id: "payment", label: t().payment },
        { id: "message", label: t().message },
      ] as const
    ).map((entry) => ({
      ...entry,
      count: cmsNotificationsFilter(cmsNotificationsStore.visible(), entry.id, cmsNotificationsStore.isUnread).length,
    }))
  return {
    t,
    filter,
    setFilter,
    filters,
    feedback,
    store: cmsNotificationsStore,
    items: () => cmsNotificationsFilter(cmsNotificationsStore.visible(), filter(), cmsNotificationsStore.isUnread),
    time: (date: Date) => cmsNotificationTimeFormat(date, cmsLocale.get()),
    fullTime: (date: Date) =>
      new Intl.DateTimeFormat(cmsLocale.get(), { dateStyle: "full", timeStyle: "short" }).format(date),
    locale: () => cmsLocale.get(),
    actionLabel: (item: { id: string; type: string }) =>
      item.id === "backup-error"
        ? t().backup
        : item.id === "form-error"
          ? t().form
          : item.type === "payment"
            ? t().invoice
            : t().inquiry,
    action: (id: string) => {
      cmsNotificationsStore.markRead(id)
      setFeedback(t().feedback)
    },
  }
}

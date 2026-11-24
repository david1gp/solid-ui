import { createSignal, For } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { PageHeader } from "../../ui/PageHeader.js"

const text = {
  de: {
    title: "Benachrichtigungen",
    description: "Neuigkeiten und Aktivitäten auf einen Blick.",
    all: "Alle als gelesen markieren",
    read: "Als gelesen markieren",
    unread: "Als ungelesen markieren",
    new: "Neu",
    items: [
      "Ein neuer Beitrag wurde veröffentlicht",
      "Das tägliche Backup wurde erstellt",
      "Anna hat dich zu einem Team eingeladen",
    ],
    dates: ["Heute, 10:30", "Heute, 03:00", "Gestern"],
  },
  en: {
    title: "Notifications",
    description: "Updates and activity at a glance.",
    all: "Mark all as read",
    read: "Mark as read",
    unread: "Mark as unread",
    new: "New",
    items: ["A new post was published", "The daily backup was created", "Anna invited you to a team"],
    dates: ["Today, 10:30", "Today, 03:00", "Yesterday"],
  },
}
export function CmsNotificationsView(_props: { id?: string }) {
  const [unread, setUnread] = createSignal([true, true, false])
  const t = () => text[cmsLocale.get()]
  return (
    <div>
      <PageHeader
        title={t().title}
        description={t().description}
        actions={
          <button
            type="button"
            class="rounded-xl border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
            onClick={() => setUnread([false, false, false])}
          >
            {t().all}
          </button>
        }
      />
      <div class="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        <For each={t().items}>
          {(item, i) => (
            <div class="flex flex-wrap items-center justify-between gap-3 p-4">
              <div class="min-w-0">
                <div class="flex items-center gap-2 text-sm font-medium">
                  <span
                    class={`h-2 w-2 shrink-0 rounded-full ${unread()[i()] ? "bg-indigo-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  />
                  {item}
                  {unread()[i()] && (
                    <span class="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {t().new}
                    </span>
                  )}
                </div>
                <p class="mt-1 pl-4 text-xs text-neutral-500">{t().dates[i()]}</p>
              </div>
              <button
                type="button"
                class="text-sm text-neutral-600 underline dark:text-neutral-400"
                onClick={() => setUnread(unread().map((v, n) => (n === i() ? !v : v)))}
              >
                {unread()[i()] ? t().read : t().unread}
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

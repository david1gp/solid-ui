import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsBackupsStateCreate } from "./cmsBackupsStateCreate.js"

const text = {
  de: {
    title: "Backups",
    description: "Sicherungen erstellen und wiederherstellen – nur als Demo.",
    create: "Backup erstellen",
    list: "Sicherungen",
    date: "Erstellt am",
    type: "Typ",
    automatic: "Automatisch",
    manual: "Manuell",
    restore: "Wiederherstellen",
    confirm: "Backup wiederherstellen?",
    detail: "Dies simuliert die Wiederherstellung. Es werden keine Daten verändert.",
    cancel: "Abbrechen",
    restored: "Wiederherstellung simuliert für",
  },
  en: {
    title: "Backups",
    description: "Create and restore backups – demo only.",
    create: "Create backup",
    list: "Backups",
    date: "Created",
    type: "Type",
    automatic: "Automatic",
    manual: "Manual",
    restore: "Restore",
    confirm: "Restore backup?",
    detail: "This simulates a restore. No data will be changed.",
    cancel: "Cancel",
    restored: "Restore simulated for",
  },
}
const primary =
  "rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
const secondary =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"

export function CmsBackupsView(_props: { id?: string }) {
  const state = cmsBackupsStateCreate()
  return (
    <div class="space-y-6">
      <PageHeader
        title={text[cmsLocale.get()].title}
        description={text[cmsLocale.get()].description}
        actions={
          <button class={primary} onClick={state.backupCreate}>
            {text[cmsLocale.get()].create}
          </button>
        }
      />
      <Show when={state.restored.get()}>
        {(date) => (
          <p role="status" class="rounded-xl border border-neutral-200 p-3 text-sm dark:border-neutral-800">
            {text[cmsLocale.get()].restored}{" "}
            {new Intl.DateTimeFormat(cmsLocale.get(), { dateStyle: "medium", timeStyle: "short" }).format(date())}.
          </p>
        )}
      </Show>
      <section class="min-w-0 max-w-full rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <h2 class="mb-4 text-lg font-semibold">{text[cmsLocale.get()].list}</h2>
        <div class="w-full max-w-full overflow-x-auto">
          <table class="w-full min-w-max text-left text-sm">
            <thead>
              <tr class="text-neutral-500">
                <th class="border-b border-neutral-200 p-2 font-medium dark:border-neutral-800">
                  {text[cmsLocale.get()].date}
                </th>
                <th class="border-b border-neutral-200 p-2 font-medium dark:border-neutral-800">
                  {text[cmsLocale.get()].type}
                </th>
                <th class="border-b border-neutral-200 p-2 dark:border-neutral-800">
                  <span class="sr-only">{text[cmsLocale.get()].restore}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={state.backups.get()}>
                {(backup) => (
                  <tr>
                    <td class="border-b border-neutral-200 p-2 dark:border-neutral-800">
                      {new Intl.DateTimeFormat(cmsLocale.get(), { dateStyle: "medium", timeStyle: "short" }).format(
                        backup.date,
                      )}
                    </td>
                    <td class="border-b border-neutral-200 p-2 dark:border-neutral-800">
                      {backup.automatic ? text[cmsLocale.get()].automatic : text[cmsLocale.get()].manual}
                    </td>
                    <td class="border-b border-neutral-200 p-2 text-right dark:border-neutral-800">
                      <button class={secondary} onClick={() => state.restoreSelect(backup.id)}>
                        {text[cmsLocale.get()].restore}
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </section>
      <ConfirmDialog
        title={text[cmsLocale.get()].confirm}
        description={text[cmsLocale.get()].detail}
        open={state.pending.get() !== undefined}
        onOpenChange={(open) => {
          if (!open) state.restoreCancel()
        }}
        onConfirm={state.backupRestore}
        confirmLabel={text[cmsLocale.get()].restore}
        cancelLabel={text[cmsLocale.get()].cancel}
      />
    </div>
  )
}

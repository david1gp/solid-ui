import { createSignal, For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { postsStore } from "../posts/postsStore.js"

const texts = {
  de: {
    title: "Papierkorb",
    description: "Gelöschte Beiträge verwalten",
    restore: "Wiederherstellen",
    delete: "Endgültig löschen",
    cancel: "Abbrechen",
    confirm: "Möchten Sie diese Aktion wirklich ausführen?",
    empty: "Der Papierkorb ist leer.",
  },
  en: {
    title: "Trash",
    description: "Manage deleted posts",
    restore: "Restore",
    delete: "Delete permanently",
    cancel: "Cancel",
    confirm: "Are you sure you want to perform this action?",
    empty: "Trash is empty.",
  },
}
const button =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
export function CmsTrashView(_props: { id?: string }) {
  const t = () => texts[cmsLocale.get()]
  const [action, setAction] = createSignal<{ id: string; kind: "restore" | "delete" }>()
  const deleted = () => postsStore.posts().filter((post) => post.deleted)
  return (
    <div>
      <PageHeader title={t().title} description={t().description} />
      <Show when={deleted().length} fallback={<p class="text-sm text-neutral-500">{t().empty}</p>}>
        <div class="space-y-3">
          <For each={deleted()}>
            {(post) => (
              <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700">
                <span class="font-medium">{post.title}</span>
                <div class="flex gap-2">
                  <button class={button} onClick={() => setAction({ id: post.id, kind: "restore" })}>
                    {t().restore}
                  </button>
                  <button class={button} onClick={() => setAction({ id: post.id, kind: "delete" })}>
                    {t().delete}
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
      <ConfirmDialog
        open={!!action()}
        onOpenChange={(open) => {
          if (!open) setAction(undefined)
        }}
        title={action() ? t()[action()!.kind] : ""}
        description={t().confirm}
        confirmLabel={action() ? t()[action()!.kind] : ""}
        cancelLabel={t().cancel}
        destructive={action()?.kind === "delete"}
        onConfirm={() => {
          const a = action()
          if (!a) return
          if (a.kind === "delete") postsStore.remove(a.id)
          else {
            postsStore.update(a.id, { deleted: false })
            cmsNavigate("posts", a.id)
          }
        }}
      />
    </div>
  )
}

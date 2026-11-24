import { createSignal, For, onCleanup, Show, untrack } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { CmsCalendar } from "../../ui/CmsCalendar.js"
import { CmsDataTable } from "../../ui/CmsDataTable.js"
import { CmsKanban } from "../../ui/CmsKanban.js"
import { CmsRichText } from "../../ui/CmsRichText.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { Drawer } from "../../ui/Drawer.js"
import { Dropdown } from "../../ui/Dropdown.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { postsStore, type Post } from "./postsStore.js"

const texts = {
  de: {
    posts: "Beiträge",
    description: "Inhalte erstellen und verwalten",
    create: "Beitrag erstellen",
    quick: "Schnell erstellen",
    title: "Titel",
    excerpt: "Kurzbeschreibung",
    content: "Inhalt",
    status: "Status",
    draft: "Entwurf",
    published: "Veröffentlicht",
    archived: "Archiviert",
    date: "Datum",
    table: "Tabelle",
    grid: "Kacheln",
    calendar: "Kalender",
    edit: "Bearbeiten",
    back: "Zurück",
    save: "Speichern",
    cancel: "Abbrechen",
    next: "Weiter",
    previous: "Zurück",
    overview: "Übersicht",
    activity: "Aktivität",
    links: "Verknüpfungen",
    details: "Details",
    archive: "Archivieren",
    delete: "In Papierkorb",
    restore: "Wiederherstellen",
    confirm: "Möchten Sie diese Aktion wirklich ausführen?",
    required: "Bitte einen Titel eingeben.",
    unsaved: "Ungespeicherte Änderungen verwerfen?",
    discard: "Verwerfen",
    saved: "Entwurf automatisch gespeichert",
    changes: "Nicht gespeicherte Änderungen",
    noActivity: "Noch keine Aktivitäten.",
    noLinks: "Keine Verknüpfungen.",
    actions: "Aktionen",
    search: "Suchen",
    filter: "Filter",
    all: "Alle",
    columns: "Spalten",
    export: "CSV exportieren",
    selected: "ausgewählt",
    page: "Seite",
    noResults: "Keine Ergebnisse",
    selectAll: "Alle auswählen",
    selectRow: "Zeile auswählen",
    views: "Ansichten",
    saveView: "Ansicht speichern",
    viewName: "Name der Ansicht",
    deleteView: "Ansicht löschen",
    pageSize: "Zeilen pro Seite",
    bold: "Fett",
    italic: "Kursiv",
    heading: "Überschrift",
    list: "Liste",
    link: "Link",
    linkPrompt: "Link-Adresse eingeben",
    editor: "Texteditor",
    drag: "Zum Sortieren ziehen",
    previousMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
  },
  en: {
    posts: "Posts",
    description: "Create and manage content",
    create: "Create post",
    quick: "Quick create",
    title: "Title",
    excerpt: "Excerpt",
    content: "Content",
    status: "Status",
    draft: "Draft",
    published: "Published",
    archived: "Archived",
    date: "Date",
    table: "Table",
    grid: "Grid",
    calendar: "Calendar",
    edit: "Edit",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    overview: "Overview",
    activity: "Activity",
    links: "Links",
    details: "Details",
    archive: "Archive",
    delete: "Move to trash",
    restore: "Restore",
    confirm: "Are you sure you want to perform this action?",
    required: "Please enter a title.",
    unsaved: "Discard unsaved changes?",
    discard: "Discard",
    saved: "Draft autosaved",
    changes: "Unsaved changes",
    noActivity: "No activity yet.",
    noLinks: "No linked items.",
    actions: "Actions",
    search: "Search",
    filter: "Filter",
    all: "All",
    columns: "Columns",
    export: "Export CSV",
    selected: "selected",
    page: "Page",
    noResults: "No results",
    selectAll: "Select all",
    selectRow: "Select row",
    views: "Views",
    saveView: "Save view",
    viewName: "View name",
    deleteView: "Delete view",
    pageSize: "Rows per page",
    bold: "Bold",
    italic: "Italic",
    heading: "Heading",
    list: "List",
    link: "Link",
    linkPrompt: "Enter link URL",
    editor: "Text editor",
    drag: "Drag to reorder",
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },
}
const button =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
const input = "w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
const card = "rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700"
const blank = (): Post => ({
  id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
  title: "",
  excerpt: "",
  content: "",
  status: "draft",
  date: new Date().toISOString().slice(0, 10),
  deleted: false,
})

const drafts = new Map<string, Post>()

function PostForm(p: { post?: Post; create: boolean }) {
  const t = () => texts[cmsLocale.get()]
  const initial = untrack(() => ({ create: p.create, post: p.post }))
  const draftKey = initial.create ? "new" : (initial.post?.id ?? "new")
  const [post, setPost] = createSignal<Post>(drafts.get(draftKey) ?? (initial.post ? { ...initial.post } : blank()))
  const [step, setStep] = createSignal(0)
  const [dirty, setDirty] = createSignal(drafts.has(draftKey))
  const [saved, setSaved] = createSignal(false)
  const [error, setError] = createSignal(false)
  const [confirm, setConfirm] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  const update = (changes: Partial<Post>) => {
    setPost((v) => ({ ...v, ...changes }))
    setDirty(true)
    setSaved(false)
    clearTimeout(timer)
    timer = setTimeout(() => {
      drafts.set(draftKey, { ...post() })
      setSaved(true)
    }, 800)
  }
  const beforeUnload = (event: BeforeUnloadEvent) => {
    if (dirty()) event.preventDefault()
  }
  if (typeof window !== "undefined") window.addEventListener("beforeunload", beforeUnload)
  onCleanup(() => {
    clearTimeout(timer)
    if (typeof window !== "undefined") window.removeEventListener("beforeunload", beforeUnload)
  })
  const back = () => {
    if (dirty()) setConfirm(true)
    else cmsNavigate("posts", p.create ? undefined : post().id)
  }
  const save = () => {
    if (!post().title.trim()) {
      setError(true)
      setStep(0)
      return
    }
    postsStore.save({ ...post(), title: post().title.trim() })
    drafts.delete(draftKey)
    setDirty(false)
    cmsNavigate("posts", post().id)
  }
  return (
    <div class="space-y-5">
      <PageHeader
        title={p.create ? t().create : t().edit}
        actions={
          <>
            <button class={button} onClick={back}>
              {t().cancel}
            </button>
            <button class={button} onClick={save}>
              {t().save}
            </button>
          </>
        }
      />
      <div class="flex flex-wrap gap-2">
        <For each={[t().details, t().content]}>
          {(label, i) => (
            <button class={button} aria-current={step() === i() ? "step" : undefined} onClick={() => setStep(i())}>
              {i() + 1}. {label}
            </button>
          )}
        </For>
      </div>
      <p class="text-xs text-neutral-500">{dirty() ? (saved() ? t().saved : t().changes) : ""}</p>
      <Show
        when={step() === 0}
        fallback={
          <div class={card}>
            <label class="mb-2 block text-sm font-medium">{t().content}</label>
            <CmsRichText value={post().content} onChange={(content) => update({ content })} labels={t()} />
          </div>
        }
      >
        <div class={`${card} space-y-4`}>
          <label class="block space-y-1 text-sm">
            <span>{t().title} *</span>
            <input class={input} value={post().title} onInput={(e) => update({ title: e.currentTarget.value })} />
          </label>
          <Show when={error()}>
            <p class="text-sm text-red-600">{t().required}</p>
          </Show>
          <label class="block space-y-1 text-sm">
            <span>{t().excerpt}</span>
            <textarea
              class={input}
              value={post().excerpt}
              onInput={(e) => update({ excerpt: e.currentTarget.value })}
            />
          </label>
          <label class="block space-y-1 text-sm">
            <span>{t().status}</span>
            <select
              class={input}
              value={post().status}
              onChange={(e) => update({ status: e.currentTarget.value as Post["status"] })}
            >
              <option value="draft">{t().draft}</option>
              <option value="published">{t().published}</option>
              <option value="archived">{t().archived}</option>
            </select>
          </label>
        </div>
      </Show>
      <div class="flex gap-2">
        <Show when={step() > 0}>
          <button class={button} onClick={() => setStep(0)}>
            {t().previous}
          </button>
        </Show>
        <Show when={step() === 0}>
          <button class={button} onClick={() => setStep(1)}>
            {t().next}
          </button>
        </Show>
      </div>
      <ConfirmDialog
        open={confirm()}
        onOpenChange={setConfirm}
        title={t().discard}
        description={t().unsaved}
        confirmLabel={t().discard}
        cancelLabel={t().cancel}
        onConfirm={() => {
          drafts.delete(draftKey)
          cmsNavigate("posts", p.create ? undefined : post().id)
        }}
      />
    </div>
  )
}

export function CmsPostsView(p: { id?: string }) {
  const t = () => texts[cmsLocale.get()]
  const [view, setView] = createSignal("table")
  const [tab, setTab] = createSignal("overview")
  const [drawer, setDrawer] = createSignal(false)
  const [menuOpen, setMenuOpen] = createSignal(false)
  const [quickTitle, setQuickTitle] = createSignal("")
  const [action, setAction] = createSignal<{ id: string; kind: "delete" | "archive" | "restore" }>()
  const current = () => postsStore.posts().find((post) => post.id === p.id && !post.deleted)
  const active = () => postsStore.posts().filter((post) => !post.deleted)
  const status = (post: Post) => t()[post.status]
  const open = (post: Post) => cmsNavigate("posts", post.id)
  const cardPost = (post: Post) => (
    <button class="w-full text-left" onClick={() => open(post)}>
      <strong class="block">{post.title}</strong>
      <span class="mt-1 block text-xs text-neutral-500">
        {status(post)} · {new Intl.DateTimeFormat(cmsLocale.get()).format(new Date(`${post.date}T12:00:00`))}
      </span>
      <span class="mt-2 block text-sm text-neutral-500">{post.excerpt}</span>
    </button>
  )
  const confirmAction = (next: { id: string; kind: "delete" | "archive" | "restore" }) => {
    setMenuOpen(false)
    setTimeout(() => setAction(next), 100)
  }
  const apply = () => {
    const a = action()
    if (!a) return
    postsStore.update(
      a.id,
      a.kind === "delete" ? { deleted: true } : { status: a.kind === "archive" ? "archived" : "draft" },
    )
    if (a.kind === "delete") cmsNavigate("posts")
  }
  return (
    <Show
      when={p.id === "new" || p.id?.endsWith(":edit")}
      fallback={
        <Show
          when={current()}
          fallback={
            <div>
              <PageHeader
                title={t().posts}
                description={t().description}
                actions={
                  <>
                    <button class={button} onClick={() => setDrawer(true)}>
                      {t().quick}
                    </button>
                    <button class={button} onClick={() => cmsNavigate("posts", "new")}>
                      {t().create}
                    </button>
                  </>
                }
              />
              <div class="mb-4 flex flex-wrap gap-2">
                <For
                  each={
                    [
                      ["table", t().table],
                      ["grid", t().grid],
                      ["kanban", "Kanban"],
                      ["calendar", t().calendar],
                    ] as const
                  }
                >
                  {(v) => (
                    <button
                      class={button}
                      aria-pressed={view() === v[0] ? "true" : "false"}
                      onClick={() => setView(v[0])}
                    >
                      {v[1]}
                    </button>
                  )}
                </For>
              </div>
              <Show when={view() === "table"}>
                <CmsDataTable
                  rows={active()}
                  rowId={(post) => post.id}
                  labels={t()}
                  columns={[
                    {
                      id: "title",
                      label: t().title,
                      value: (post) => post.title,
                      sortable: true,
                      searchable: true,
                      render: (post) => (
                        <button class="font-medium underline" onClick={() => open(post)}>
                          {post.title}
                        </button>
                      ),
                    },
                    { id: "status", label: t().status, value: status, sortable: true, filterable: true },
                    { id: "date", label: t().date, value: (post) => post.date, sortable: true },
                  ]}
                  bulkActions={[
                    {
                      label: t().archive,
                      run: (rows) => {
                        if (window.confirm(t().confirm))
                          rows.forEach((post) => postsStore.update(post.id, { status: "archived" }))
                      },
                    },
                    {
                      label: t().delete,
                      run: (rows) => {
                        if (window.confirm(t().confirm))
                          rows.forEach((post) => postsStore.update(post.id, { deleted: true }))
                      },
                    },
                  ]}
                  storageKey="cms-posts"
                />
              </Show>
              <Show when={view() === "grid"}>
                <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <For each={active()}>{(post) => <div class={card}>{cardPost(post)}</div>}</For>
                </div>
              </Show>
              <Show when={view() === "kanban"}>
                <CmsKanban
                  columns={[
                    { id: "draft", label: t().draft },
                    { id: "published", label: t().published },
                    { id: "archived", label: t().archived },
                  ]}
                  items={active()}
                  itemId={(post) => post.id}
                  itemColumn={(post) => post.status}
                  renderItem={cardPost}
                  labels={t()}
                  onMove={(id, column) => postsStore.update(id, { status: column as Post["status"] })}
                />
              </Show>
              <Show when={view() === "calendar"}>
                <CmsCalendar
                  events={active()}
                  eventDate={(post) => new Date(`${post.date}T12:00:00`)}
                  renderEvent={cardPost}
                  locale={cmsLocale.get()}
                  labels={t()}
                />
              </Show>
              <Drawer title={t().quick} open={drawer()} onOpenChange={setDrawer}>
                <div class="mt-4 space-y-4">
                  <label class="block text-sm">
                    {t().title}
                    <input
                      class={`${input} mt-1`}
                      value={quickTitle()}
                      onInput={(e) => setQuickTitle(e.currentTarget.value)}
                    />
                  </label>
                  <button
                    class={button}
                    disabled={!quickTitle().trim()}
                    onClick={() => {
                      const post = { ...blank(), title: quickTitle().trim() }
                      postsStore.save(post)
                      setQuickTitle("")
                      setDrawer(false)
                      open(post)
                    }}
                  >
                    {t().create}
                  </button>
                </div>
              </Drawer>
            </div>
          }
        >
          {(post) => (
            <div>
              <PageHeader
                title={post().title}
                description={status(post())}
                actions={
                  <>
                    <button class={button} onClick={() => cmsNavigate("posts")}>
                      {t().back}
                    </button>
                    <button class={button} onClick={() => cmsNavigate("posts", `${post().id}:edit`)}>
                      {t().edit}
                    </button>
                    <Dropdown trigger={t().actions} open={menuOpen()} onOpenChange={setMenuOpen}>
                      <button
                        class={button}
                        onClick={() =>
                          confirmAction({ id: post().id, kind: post().status === "archived" ? "restore" : "archive" })
                        }
                      >
                        {post().status === "archived" ? t().restore : t().archive}
                      </button>
                      <button class={button} onClick={() => confirmAction({ id: post().id, kind: "delete" })}>
                        {t().delete}
                      </button>
                    </Dropdown>
                  </>
                }
              />
              <div class="mb-4 flex flex-wrap gap-2">
                <For
                  each={
                    [
                      ["overview", t().overview],
                      ["activity", t().activity],
                      ["links", t().links],
                    ] as const
                  }
                >
                  {(v) => (
                    <button
                      class={button}
                      aria-pressed={tab() === v[0] ? "true" : "false"}
                      onClick={() => setTab(v[0])}
                    >
                      {v[1]}
                    </button>
                  )}
                </For>
              </div>
              <div class="grid gap-4 lg:grid-cols-[1fr_16rem]">
                <div class={card}>
                  <Show
                    when={tab() === "overview"}
                    fallback={
                      <p class="text-sm text-neutral-500">{tab() === "activity" ? t().noActivity : t().noLinks}</p>
                    }
                  >
                    <p class="text-sm">{post().excerpt}</p>
                    <div
                      class="prose mt-4 text-sm dark:prose-invert"
                      textContent={post().content.replace(/<[^>]*>/g, " ")}
                    />
                  </Show>
                </div>
                <aside class={`${card} space-y-3 text-sm`}>
                  <h2 class="font-semibold">{t().details}</h2>
                  <p>
                    {t().status}: {status(post())}
                  </p>
                  <p>
                    {t().date}: {new Intl.DateTimeFormat(cmsLocale.get()).format(new Date(`${post().date}T12:00:00`))}
                  </p>
                </aside>
              </div>
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
                onConfirm={apply}
              />
            </div>
          )}
        </Show>
      }
    >
      <PostForm create={p.id === "new"} post={postsStore.posts().find((post) => `${post.id}:edit` === p.id)} />
    </Show>
  )
}

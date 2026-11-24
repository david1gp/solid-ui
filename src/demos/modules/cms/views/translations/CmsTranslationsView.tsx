import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsTranslationsStateCreate } from "./cmsTranslationsStateCreate.js"

const text = {
  de: {
    title: "Übersetzungen",
    description: "Verwalten Sie Inhalte in mehreren Sprachen.",
    back: "← Alle Übersetzungen",
    status: "Englisch",
    complete: "Vollständig",
    partial: "In Bearbeitung",
    missing: "Fehlt",
    source: "Quelle",
    target: "Ziel",
    switch: "Sprachen tauschen",
    heading: "Titel",
    body: "Inhalt",
    german: "Deutsch",
    english: "Englisch",
  },
  en: {
    title: "Translations",
    description: "Manage content in multiple languages.",
    back: "← All translations",
    status: "English",
    complete: "Complete",
    partial: "In progress",
    missing: "Missing",
    source: "Source",
    target: "Target",
    switch: "Swap languages",
    heading: "Title",
    body: "Content",
    german: "German",
    english: "English",
  },
}
const button =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
const input = "w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
export function CmsTranslationsView(props: { id?: string }) {
  const state = cmsTranslationsStateCreate(() => props.id)
  const t = () => text[cmsLocale.get()]
  return (
    <div>
      <Show
        when={state.current()}
        fallback={
          <>
            <PageHeader title={t().title} description={t().description} />
            <div class="space-y-3">
              <For each={state.entries()}>
                {(entry) => (
                  <button
                    type="button"
                    class="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 p-4 text-left hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
                    onClick={() => cmsNavigate("translations", entry.id)}
                  >
                    <span class="font-medium">{entry.name}</span>
                    <span class="rounded-full bg-neutral-100 px-3 py-1 text-xs dark:bg-neutral-800">
                      {t().status}:{" "}
                      {entry.en.title && entry.en.body
                        ? t().complete
                        : entry.en.title || entry.en.body
                          ? t().partial
                          : t().missing}{" "}
                      →
                    </span>
                  </button>
                )}
              </For>
            </div>
          </>
        }
      >
        {(entry) => (
          <>
            <button class={`${button} mb-5`} type="button" onClick={() => cmsNavigate("translations")}>
              {t().back}
            </button>
            <PageHeader
              title={entry().name}
              description={t().description}
              actions={
                <button class={button} type="button" onClick={state.switchLanguage}>
                  {t().switch}
                </button>
              }
            />
            <div class="grid gap-4 md:grid-cols-2">
              <For each={["source", "target"] as const}>
                {(side) => {
                  const language = () => (side === "target" ? state.target() : state.target() === "en" ? "de" : "en")
                  return (
                    <section class="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                      <h2 class="mb-4 font-semibold">
                        {side === "source" ? t().source : t().target} · {language() === "de" ? t().german : t().english}{" "}
                        ({language().toUpperCase()})
                      </h2>
                      <div class="space-y-4">
                        <label class="block text-sm">
                          {t().heading}
                          <input
                            class={`${input} mt-1`}
                            value={entry()[language()].title}
                            onInput={(event) => state.change(language(), "title", event.currentTarget.value)}
                          />
                        </label>
                        <label class="block text-sm">
                          {t().body}
                          <textarea
                            class={`${input} mt-1 min-h-40`}
                            value={entry()[language()].body}
                            onInput={(event) => state.change(language(), "body", event.currentTarget.value)}
                          />
                        </label>
                      </div>
                    </section>
                  )
                }}
              </For>
            </div>
          </>
        )}
      </Show>
    </div>
  )
}

import { createSignal, For, Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { PageHeader } from "../../ui/PageHeader.js"

const text = {
  de: {
    title: "Allgemeine Einstellungen",
    description: "Verwalte die Grundeinstellungen deiner Website.",
    sections: ["Allgemein", "Branding", "E-Mail", "Sprachen"],
    labels: [
      ["Website-Name", "Website-URL"],
      ["Markenname", "Akzentfarbe"],
      ["Absendername", "Absenderadresse"],
      ["Standardsprache", "Zeitzone"],
    ],
    save: "Änderungen speichern",
    saved: "Einstellungen gespeichert (Demo).",
  },
  en: {
    title: "General settings",
    description: "Manage your website’s basic settings.",
    sections: ["General", "Branding", "Email", "Languages"],
    labels: [
      ["Website name", "Website URL"],
      ["Brand name", "Accent color"],
      ["Sender name", "Sender address"],
      ["Default language", "Time zone"],
    ],
    save: "Save changes",
    saved: "Settings saved (demo).",
  },
}

export function CmsSettingsGeneralView(_props: { id?: string }) {
  const [section, setSection] = createSignal(0)
  const [values, setValues] = createSignal([
    ["DemoCMS", "https://example.com"],
    ["DemoCMS", "#6366f1"],
    ["DemoCMS", "hello@example.com"],
    ["Deutsch", "Europe/Berlin"],
  ])
  const [saved, setSaved] = createSignal(false)
  const t = () => text[cmsLocale.get()]
  return (
    <div>
      <PageHeader title={t().title} description={t().description} />
      <div class="flex flex-col gap-6 md:flex-row">
        <nav class="flex gap-1 overflow-x-auto md:w-48 md:shrink-0 md:flex-col" aria-label={t().title}>
          <For each={t().sections}>
            {(name, i) => (
              <button
                type="button"
                class={`whitespace-nowrap rounded-xl px-3 py-2 text-left text-sm ${section() === i() ? "bg-neutral-100 font-medium dark:bg-neutral-800" : "hover:bg-neutral-50 dark:hover:bg-neutral-900"}`}
                onClick={() => {
                  setSection(i())
                  setSaved(false)
                }}
              >
                {name}
              </button>
            )}
          </For>
        </nav>
        <form
          class="min-w-0 flex-1 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
          onSubmit={(e) => {
            e.preventDefault()
            setSaved(true)
          }}
        >
          <h2 class="mb-5 font-semibold">{t().sections[section()]}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <For each={t().labels[section()]}>
              {(label, i) => (
                <label class="grid gap-2 text-sm font-medium">
                  {label}
                  <Input
                    value={values()[section()]?.[i()] ?? ""}
                    onInput={(e) => {
                      const next = values().map((row) => [...row])
                      const row = next[section()]
                      if (row) row[i()] = e.currentTarget.value
                      setValues(next)
                      setSaved(false)
                    }}
                  />
                </label>
              )}
            </For>
          </div>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <button
              class="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
              type="submit"
            >
              {t().save}
            </button>
            <Show when={saved()}>
              <span role="status" class="text-sm text-neutral-500">
                {t().saved}
              </span>
            </Show>
          </div>
        </form>
      </div>
    </div>
  )
}

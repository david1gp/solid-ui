import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsImportExportStateCreate } from "./cmsImportExportStateCreate.js"

const text = {
  de: {
    title: "Import / Export",
    description: "Inhalte als CSV importieren oder exportieren.",
    import: "Import",
    drop: "CSV-Datei hier ablegen oder auswählen",
    hint: "Nur CSV-Dateien. Die Daten bleiben in dieser Demo im Browser.",
    choose: "Datei auswählen",
    invalid: "Die Datei konnte nicht gelesen werden. Bitte eine gültige CSV-Datei auswählen.",
    mapping: "Feldzuordnung",
    source: "CSV-Spalte",
    target: "Zielfeld",
    ignore: "Nicht importieren",
    name: "Titel",
    status: "Status",
    date: "Datum",
    preview: "Vorschau",
    empty: "Keine Datenzeilen vorhanden.",
    run: "Import simulieren",
    done: "Import simuliert. Es wurden keine Inhalte dauerhaft verändert.",
    export: "Export",
    exportDescription: "Beispieldaten als CSV-Datei herunterladen.",
    download: "CSV herunterladen",
  },
  en: {
    title: "Import / Export",
    description: "Import or export content as CSV.",
    import: "Import",
    drop: "Drop a CSV file here or choose a file",
    hint: "CSV files only. Data stays in your browser in this demo.",
    choose: "Choose file",
    invalid: "The file could not be read. Please choose a valid CSV file.",
    mapping: "Field mapping",
    source: "CSV column",
    target: "Target field",
    ignore: "Do not import",
    name: "Title",
    status: "Status",
    date: "Date",
    preview: "Preview",
    empty: "No data rows found.",
    run: "Simulate import",
    done: "Import simulated. No content was permanently changed.",
    export: "Export",
    exportDescription: "Download sample data as a CSV file.",
    download: "Download CSV",
  },
}
const button =
  "rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
const card = "rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"

export function CmsImportExportView(_props: { id?: string }) {
  const state = cmsImportExportStateCreate()
  return (
    <div class="space-y-6">
      <PageHeader title={text[cmsLocale.get()].title} description={text[cmsLocale.get()].description} />
      <section class={card}>
        <h2 class="text-lg font-semibold">{text[cmsLocale.get()].import}</h2>
        <div
          class={`mt-4 rounded-xl border-2 border-dashed p-6 text-center ${state.dragging.get() ? "border-blue-500" : "border-neutral-300 dark:border-neutral-700"}`}
          onDragOver={(event) => {
            event.preventDefault()
            state.dragSet(true)
          }}
          onDragLeave={() => state.dragSet(false)}
          onDrop={(event) => {
            event.preventDefault()
            state.dragSet(false)
            void state.fileLoad(event.dataTransfer?.files[0])
          }}
        >
          <p class="text-sm font-medium">{text[cmsLocale.get()].drop}</p>
          <p class="mt-1 text-xs text-neutral-500">{text[cmsLocale.get()].hint}</p>
          <label class="mt-4 inline-block cursor-pointer rounded-xl border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700">
            {text[cmsLocale.get()].choose}
            <input
              class="sr-only"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => {
                void state.fileLoad(event.currentTarget.files?.[0])
                event.currentTarget.value = ""
              }}
            />
          </label>
          <Show when={state.fileName.get()}>
            <p class="mt-3 break-all text-sm">{state.fileName.get()}</p>
          </Show>
        </div>
        <Show when={state.error.get()}>
          <p role="alert" class="mt-3 text-sm text-red-600">
            {text[cmsLocale.get()].invalid}
          </p>
        </Show>
        <Show when={state.rows.get().length > 0}>
          <div class="mt-6 space-y-4">
            <h3 class="font-semibold">{text[cmsLocale.get()].mapping}</h3>
            <div class="grid gap-3 sm:grid-cols-2">
              <For each={state.rows.get()[0]}>
                {(header, index) => (
                  <label class="text-sm">
                    <span class="mb-1 block text-neutral-500">
                      {header || `${text[cmsLocale.get()].source} ${index() + 1}`}
                    </span>
                    <select
                      class="w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
                      value={state.mappings.get()[index()]}
                      onChange={(event) => state.mappingChange(index(), event.currentTarget.value)}
                    >
                      <option value="ignore">{text[cmsLocale.get()].ignore}</option>
                      <option value="title">{text[cmsLocale.get()].name}</option>
                      <option value="status">{text[cmsLocale.get()].status}</option>
                      <option value="date">{text[cmsLocale.get()].date}</option>
                    </select>
                  </label>
                )}
              </For>
            </div>
            <h3 class="font-semibold">{text[cmsLocale.get()].preview}</h3>
            <Show
              when={state.rows.get().length > 1}
              fallback={<p class="text-sm text-neutral-500">{text[cmsLocale.get()].empty}</p>}
            >
              <div class="w-full max-w-full overflow-x-auto">
                <table class="w-full min-w-max text-left text-sm">
                  <thead>
                    <tr>
                      <For each={state.rows.get()[0]}>
                        {(header) => <th class="border-b border-neutral-200 p-2 dark:border-neutral-800">{header}</th>}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={state.rows.get().slice(1, 6)}>
                      {(row) => (
                        <tr>
                          <For each={state.rows.get()[0]}>
                            {(_, index) => (
                              <td class="border-b border-neutral-200 p-2 dark:border-neutral-800">
                                {row[index()] ?? ""}
                              </td>
                            )}
                          </For>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </Show>
            <button class={button} disabled={state.rows.get().length < 2} onClick={state.importRun}>
              {text[cmsLocale.get()].run}
            </button>
            <Show when={state.imported.get()}>
              <p role="status" class="text-sm text-neutral-500">
                {text[cmsLocale.get()].done}
              </p>
            </Show>
          </div>
        </Show>
      </section>
      <section class={card}>
        <h2 class="text-lg font-semibold">{text[cmsLocale.get()].export}</h2>
        <p class="my-4 text-sm text-neutral-500">{text[cmsLocale.get()].exportDescription}</p>
        <button class={button} onClick={state.exportDownload}>
          {text[cmsLocale.get()].download}
        </button>
      </section>
    </div>
  )
}

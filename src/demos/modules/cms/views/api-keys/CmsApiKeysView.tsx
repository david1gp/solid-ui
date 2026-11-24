import { For } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { Drawer } from "../../ui/Drawer.js"
import { cmsApiKeysViewStateCreate } from "./cmsApiKeysViewStateCreate.js"

const text = {
  de: {
    title: "API-Schlüssel",
    description:
      "Verwalte die Schlüssel für den Zugriff auf die API. Dies ist eine Demo; die Schlüssel gewähren keinen Zugriff.",
    add: "Schlüssel erstellen",
    name: "Name",
    placeholder: "z. B. Produktion",
    key: "Schlüssel",
    created: "Erstellt",
    active: "Aktiv",
    revoked: "Widerrufen",
    revoke: "Widerrufen",
    confirm: "API-Schlüssel widerrufen?",
    confirmDescription: "Anwendungen können diesen Schlüssel danach nicht mehr verwenden.",
    cancel: "Abbrechen",
    create: "Erstellen",
  },
  en: {
    title: "API keys",
    description: "Manage keys for API access. This is a demo; the keys do not grant access.",
    add: "Create key",
    name: "Name",
    placeholder: "e.g. Production",
    key: "Key",
    created: "Created",
    active: "Active",
    revoked: "Revoked",
    revoke: "Revoke",
    confirm: "Revoke API key?",
    confirmDescription: "Applications will no longer be able to use this key.",
    cancel: "Cancel",
    create: "Create",
  },
}
const buttonClass =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"

export function CmsApiKeysView(_props: { id?: string }) {
  const state = cmsApiKeysViewStateCreate()
  return (
    <div class="space-y-6">
      <header class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold">{text[cmsLocale.get()].title}</h1>
          <p class="mt-1 text-sm text-neutral-500">{text[cmsLocale.get()].description}</p>
        </div>
        <button
          class="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
          type="button"
          onClick={() => state.setOpen(true)}
        >
          {text[cmsLocale.get()].add}
        </button>
      </header>
      <div class="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        <For each={state.keys()}>
          {(key) => (
            <div class="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p class="font-medium">
                  {key.name}{" "}
                  <span class="ml-2 text-xs font-normal text-neutral-500">
                    {key.revoked ? text[cmsLocale.get()].revoked : text[cmsLocale.get()].active}
                  </span>
                </p>
                <p
                  class="mt-1 font-mono text-sm text-neutral-500"
                  aria-label={`${text[cmsLocale.get()].key}: ${key.suffix}`}
                >
                  •••• •••• •••• {key.suffix}
                </p>
                <p class="mt-1 text-xs text-neutral-500">
                  {text[cmsLocale.get()].created}:{" "}
                  {new Intl.DateTimeFormat(cmsLocale.get() === "de" ? "de-DE" : "en-US", {
                    dateStyle: "medium",
                    timeZone: "UTC",
                  }).format(new Date(`${key.created}T00:00:00Z`))}
                </p>
              </div>
              <button
                type="button"
                class={buttonClass}
                disabled={key.revoked}
                onClick={() => state.setRevokeId(key.id)}
              >
                {text[cmsLocale.get()].revoke}
              </button>
            </div>
          )}
        </For>
      </div>
      <Drawer title={text[cmsLocale.get()].add} open={state.open()} onOpenChange={state.setOpen}>
        <form
          class="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            state.addKey()
          }}
        >
          <label class="block text-sm">
            {text[cmsLocale.get()].name}
            <input
              class="mt-1 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
              required
              placeholder={text[cmsLocale.get()].placeholder}
              value={state.name()}
              onInput={(e) => state.setName(e.currentTarget.value)}
            />
          </label>
          <div class="flex justify-end gap-2">
            <button type="button" class={buttonClass} onClick={() => state.setOpen(false)}>
              {text[cmsLocale.get()].cancel}
            </button>
            <button
              type="submit"
              class="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              {text[cmsLocale.get()].create}
            </button>
          </div>
        </form>
      </Drawer>
      <ConfirmDialog
        title={text[cmsLocale.get()].confirm}
        description={text[cmsLocale.get()].confirmDescription}
        open={state.revokeId() !== undefined}
        onOpenChange={(open) => {
          if (!open) state.setRevokeId(undefined)
        }}
        onConfirm={state.revokeKey}
        confirmLabel={text[cmsLocale.get()].revoke}
        cancelLabel={text[cmsLocale.get()].cancel}
        destructive
      />
    </div>
  )
}

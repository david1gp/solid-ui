import { For } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import { Drawer } from "../../ui/Drawer.js"
import { cmsIntegrationsViewStateCreate } from "./cmsIntegrationsViewStateCreate.js"

const text = {
  de: {
    title: "Integrationen",
    description: "Verbinde Dienste und verwalte Webhooks.",
    connected: "Verbunden",
    disconnected: "Nicht verbunden",
    connect: "Verbinden",
    disconnect: "Trennen",
    webhooks: "Webhooks",
    webhooksDescription: "Sende Ereignisse an externe Anwendungen.",
    add: "Webhook erstellen",
    name: "Name",
    url: "Endpunkt-URL",
    event: "Ereignis",
    active: "Aktiv",
    inactive: "Inaktiv",
    delete: "Löschen",
    cancel: "Abbrechen",
    create: "Erstellen",
    confirm: "Webhook löschen?",
    confirmDescription: "Dieser Webhook wird nicht mehr ausgelöst.",
    content: "Inhalt aktualisiert",
    published: "Inhalt veröffentlicht",
    user: "Benutzer erstellt",
  },
  en: {
    title: "Integrations",
    description: "Connect services and manage webhooks.",
    connected: "Connected",
    disconnected: "Not connected",
    connect: "Connect",
    disconnect: "Disconnect",
    webhooks: "Webhooks",
    webhooksDescription: "Send events to external applications.",
    add: "Create webhook",
    name: "Name",
    url: "Endpoint URL",
    event: "Event",
    active: "Active",
    inactive: "Inactive",
    delete: "Delete",
    cancel: "Cancel",
    create: "Create",
    confirm: "Delete webhook?",
    confirmDescription: "This webhook will no longer be triggered.",
    content: "Content updated",
    published: "Content published",
    user: "User created",
  },
}
const inputClass =
  "mt-1 w-full rounded-xl border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
const buttonClass =
  "rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"

export function CmsIntegrationsView(_props: { id?: string }) {
  const state = cmsIntegrationsViewStateCreate()
  return (
    <div class="space-y-8">
      <header>
        <h1 class="text-2xl font-semibold">{text[cmsLocale.get()].title}</h1>
        <p class="mt-1 text-sm text-neutral-500">{text[cmsLocale.get()].description}</p>
      </header>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <For each={state.integrations()}>
          {(item) => (
            <article class="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
              <h2 class="font-semibold">{item.name}</h2>
              <p class="mt-1 min-h-10 text-sm text-neutral-500">{item.description[cmsLocale.get()]}</p>
              <div class="mt-4 flex items-center justify-between gap-2">
                <span class="text-xs text-neutral-500">
                  {item.connected ? text[cmsLocale.get()].connected : text[cmsLocale.get()].disconnected}
                </span>
                <button type="button" class={buttonClass} onClick={() => state.toggleIntegration(item.id)}>
                  {item.connected ? text[cmsLocale.get()].disconnect : text[cmsLocale.get()].connect}
                </button>
              </div>
            </article>
          )}
        </For>
      </div>
      <section>
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold">{text[cmsLocale.get()].webhooks}</h2>
            <p class="text-sm text-neutral-500">{text[cmsLocale.get()].webhooksDescription}</p>
          </div>
          <button
            type="button"
            class="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            onClick={() => state.setOpen(true)}
          >
            {text[cmsLocale.get()].add}
          </button>
        </div>
        <div class="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          <For each={state.webhooks()}>
            {(hook) => (
              <div class="flex flex-wrap items-center justify-between gap-3 p-4">
                <div class="min-w-0">
                  <p class="font-medium">{hook.name}</p>
                  <p class="break-all text-sm text-neutral-500">{hook.url}</p>
                  <p class="mt-1 text-xs text-neutral-500">{hook.event}</p>
                </div>
                <div class="flex gap-2">
                  <button
                    type="button"
                    class={buttonClass}
                    aria-pressed={hook.enabled ? "true" : "false"}
                    onClick={() => state.toggleWebhook(hook.id)}
                  >
                    {hook.enabled ? text[cmsLocale.get()].active : text[cmsLocale.get()].inactive}
                  </button>
                  <button type="button" class={buttonClass} onClick={() => state.setRemoveId(hook.id)}>
                    {text[cmsLocale.get()].delete}
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>
      <Drawer title={text[cmsLocale.get()].add} open={state.open()} onOpenChange={state.setOpen}>
        <form
          class="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            state.addWebhook()
          }}
        >
          <label class="block text-sm">
            {text[cmsLocale.get()].name}
            <input
              class={inputClass}
              required
              value={state.name()}
              onInput={(e) => state.setName(e.currentTarget.value)}
            />
          </label>
          <label class="block text-sm">
            {text[cmsLocale.get()].url}
            <input
              class={inputClass}
              type="url"
              required
              placeholder="https://example.com/webhook"
              value={state.url()}
              onInput={(e) => state.setUrl(e.currentTarget.value)}
            />
          </label>
          <label class="block text-sm">
            {text[cmsLocale.get()].event}
            <select class={inputClass} value={state.event()} onChange={(e) => state.setEvent(e.currentTarget.value)}>
              <option value="content.updated">{text[cmsLocale.get()].content}</option>
              <option value="content.published">{text[cmsLocale.get()].published}</option>
              <option value="user.created">{text[cmsLocale.get()].user}</option>
            </select>
          </label>
          <div class="flex justify-end gap-2">
            <button class={buttonClass} type="button" onClick={() => state.setOpen(false)}>
              {text[cmsLocale.get()].cancel}
            </button>
            <button
              class="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
              type="submit"
            >
              {text[cmsLocale.get()].create}
            </button>
          </div>
        </form>
      </Drawer>
      <ConfirmDialog
        title={text[cmsLocale.get()].confirm}
        description={text[cmsLocale.get()].confirmDescription}
        open={state.removeId() !== undefined}
        onOpenChange={(open) => {
          if (!open) state.setRemoveId(undefined)
        }}
        onConfirm={state.removeWebhook}
        confirmLabel={text[cmsLocale.get()].delete}
        cancelLabel={text[cmsLocale.get()].cancel}
        destructive
      />
    </div>
  )
}

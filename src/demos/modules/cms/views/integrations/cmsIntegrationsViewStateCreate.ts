import { createSignal } from "solid-js"

const [integrations, setIntegrations] = createSignal([
  {
    id: "slack",
    name: "Slack",
    description: { de: "Benachrichtigungen an dein Team senden", en: "Send notifications to your team" },
    connected: true,
  },
  {
    id: "github",
    name: "GitHub",
    description: { de: "Repositories mit deinem CMS verbinden", en: "Connect repositories to your CMS" },
    connected: false,
  },
  {
    id: "mail",
    name: "Mailchimp",
    description: { de: "Kontakte und Kampagnen synchronisieren", en: "Sync contacts and campaigns" },
    connected: false,
  },
])
const [webhooks, setWebhooks] = createSignal([
  { id: 1, name: "Content updates", url: "https://example.com/webhook", event: "content.updated", enabled: true },
])

export function cmsIntegrationsViewStateCreate() {
  const [open, setOpen] = createSignal(false)
  const [name, setName] = createSignal("")
  const [url, setUrl] = createSignal("")
  const [event, setEvent] = createSignal("content.updated")
  const [removeId, setRemoveId] = createSignal<number>()
  return {
    integrations,
    webhooks,
    open,
    name,
    url,
    event,
    removeId,
    setOpen,
    setName,
    setUrl,
    setEvent,
    setRemoveId,
    toggleIntegration: (id: string) =>
      setIntegrations((items) =>
        items.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item)),
      ),
    toggleWebhook: (id: number) =>
      setWebhooks((items) => items.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))),
    removeWebhook: () => setWebhooks((items) => items.filter((item) => item.id !== removeId())),
    addWebhook: () => {
      if (!name().trim() || !url().trim()) return
      setWebhooks((items) => [
        ...items,
        { id: Date.now(), name: name().trim(), url: url().trim(), event: event(), enabled: true },
      ])
      setName("")
      setUrl("")
      setEvent("content.updated")
      setOpen(false)
    },
  }
}

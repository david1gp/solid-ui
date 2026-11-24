import { createSignal } from "solid-js"

const [keys, setKeys] = createSignal([
  { id: 1, name: "Production", suffix: "7f3a", created: "2026-01-15", revoked: false },
])

export function cmsApiKeysViewStateCreate() {
  const [open, setOpen] = createSignal(false)
  const [name, setName] = createSignal("")
  const [revokeId, setRevokeId] = createSignal<number>()
  return {
    keys,
    open,
    name,
    revokeId,
    setOpen,
    setName,
    setRevokeId,
    addKey: () => {
      if (!name().trim()) return
      const id = Date.now()
      setKeys((items) => [
        ...items,
        {
          id,
          name: name().trim(),
          suffix: id.toString(16).slice(-4),
          created: new Date().toISOString().slice(0, 10),
          revoked: false,
        },
      ])
      setName("")
      setOpen(false)
    },
    revokeKey: () =>
      setKeys((items) => items.map((item) => (item.id === revokeId() ? { ...item, revoked: true } : item))),
  }
}

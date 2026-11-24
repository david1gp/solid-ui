import { createSignalObject } from "#ui/utils/createSignalObject.js"

type Backup = { id: number; date: Date; automatic: boolean }

export function cmsBackupsStateCreate() {
  const now = Date.now()
  const backups = createSignalObject<Backup[]>([
    { id: 1, date: new Date(now - 86400000), automatic: true },
    { id: 2, date: new Date(now - 7 * 86400000), automatic: true },
  ])
  const pending = createSignalObject<number | undefined>(undefined)
  const restored = createSignalObject<Date | undefined>(undefined)
  function backupCreate() {
    backups.set([{ id: Date.now(), date: new Date(), automatic: false }, ...backups.get()])
    restored.set(undefined)
  }
  function backupRestore() {
    const backup = backups.get().find((item) => item.id === pending.get())
    if (backup) restored.set(backup.date)
    pending.set(undefined)
  }
  return {
    backups,
    pending,
    restored,
    backupCreate,
    backupRestore,
    restoreSelect: (id: number) => pending.set(id),
    restoreCancel: () => pending.set(undefined),
  }
}

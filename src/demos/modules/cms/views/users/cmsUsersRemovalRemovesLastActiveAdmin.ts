import type { CmsUserStatus } from "./cmsUserStatus.js"

export function cmsUsersRemovalRemovesLastActiveAdmin(
  users: { id: string; role: string; status: CmsUserStatus }[],
  ids: string[],
) {
  const activeAdmins = users.filter((user) => user.role === "Administrator" && user.status === "Aktiv")
  return activeAdmins.length > 0 && activeAdmins.every((user) => ids.includes(user.id))
}

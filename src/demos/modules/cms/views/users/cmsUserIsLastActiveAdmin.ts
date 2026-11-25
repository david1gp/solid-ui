import type { CmsUserStatus } from "./cmsUserStatus.js"

export function cmsUserIsLastActiveAdmin(users: { id: string; role: string; status: CmsUserStatus }[], id: string) {
  const user = users.find((item) => item.id === id)
  return (
    user?.role === "Administrator" &&
    user.status === "Aktiv" &&
    users.filter((item) => item.role === "Administrator" && item.status === "Aktiv").length === 1
  )
}

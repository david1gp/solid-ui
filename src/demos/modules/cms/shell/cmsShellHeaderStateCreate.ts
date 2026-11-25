import { cmsNavigate } from "./cmsNavigate.js"

export function cmsShellHeaderStateCreate() {
  return {
    openNotifications: (event: MouseEvent) => {
      const details = (event.currentTarget as HTMLElement).closest("details")
      if (details) details.open = false
      cmsNavigate("notifications")
    },
  }
}

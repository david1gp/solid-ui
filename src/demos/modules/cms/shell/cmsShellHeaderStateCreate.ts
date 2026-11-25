import { cmsNavigate } from "./cmsNavigate.js"

export function cmsShellHeaderStateCreate(onNavigate: () => void) {
  return {
    openNotifications: (event: MouseEvent) => {
      const details = (event.currentTarget as HTMLElement).closest("details")
      if (details) details.open = false
      onNavigate()
      cmsNavigate("notifications")
    },
  }
}

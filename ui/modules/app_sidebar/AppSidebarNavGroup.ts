import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"

/** A labelled group of AppSidebar navigation entries. */
export interface AppSidebarNavGroup {
  label: string
  items: AppSidebarNavItem[]
}

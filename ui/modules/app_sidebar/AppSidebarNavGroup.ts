import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"

/** A labelled group of AppSidebar navigation entries. */
export interface AppSidebarNavGroup {
  label: string
  items: AppSidebarNavItem[]
  /** Render the label as a drawer toggle that shows/hides the items. */
  collapsible?: boolean
  /** Initial drawer state when collapsible; defaults to open. */
  defaultOpen?: boolean
}

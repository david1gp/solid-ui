import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"

/** A labelled group of AppSidebar navigation entries. */
export interface AppSidebarNavGroup {
  label: string
  items: AppSidebarNavItem[]
  /** Render the label as a drawer toggle that shows/hides the items. */
  collapsible?: boolean
  /** Initial drawer state when collapsible; defaults to closed. */
  defaultOpen?: boolean
  /**
   * MDI path shown in the icon rail while a collapsible drawer is closed; clicking it opens a
   * flyout with the items. Defaults to the first item's icon.
   */
  icon?: string
}

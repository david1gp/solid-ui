import type { ModernSidebarNavItem } from "#src/demos/modules/modern/ModernSidebarNavItem.js"

/** A labelled group of ModernSidebar navigation entries. */
export interface ModernSidebarNavGroup {
  label: string
  items: ModernSidebarNavItem[]
  /** Enable item reordering. Indices refer to the current items array. */
  onReorder?: (fromIndex: number, toIndex: number) => void
  /** Optional action displayed after the group's items. */
  addItem?: { label: string; icon?: string; onAdd: () => void }
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

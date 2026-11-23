import type { CmsSidebarNavItem } from "#src/demos/modules/cms/CmsSidebarNavItem.js"

/** A labelled group of CmsSidebar navigation entries. */
export interface CmsSidebarNavGroup {
  label: string
  items: CmsSidebarNavItem[]
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

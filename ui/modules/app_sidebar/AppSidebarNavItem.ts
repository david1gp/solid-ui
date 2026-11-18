/** A single entry of an AppSidebar navigation group. */
export interface AppSidebarNavItem {
  /** MDI path string. */
  icon: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

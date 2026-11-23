/** A navigation entry rendered as a link when href is provided, otherwise as a button. */
export interface NavHeaderNavItem {
  id?: string
  label: string
  /** MDI icon path. */
  icon?: string
  href?: string
  isActive?: boolean
  onClick?: () => void
}

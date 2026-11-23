/** A single entry of an CmsSidebar navigation group. */
export interface CmsSidebarNavItem {
  /** Stable identity for reordering; falls back to label when omitted. */
  id?: string
  /** MDI path string. */
  icon: string
  label: string
  isActive?: boolean
  onClick?: () => void
  /** Enables inline renaming via double-click or F2; called with the trimmed, non-empty new label. */
  onRename?: (label: string) => void
  /** Enables deletion; called directly without confirmation so the consumer can implement undo or confirmation. */
  onDelete?: () => void
  /** Start in rename mode when the entry is first rendered, e.g. right after creating it. */
  autoEdit?: boolean
}

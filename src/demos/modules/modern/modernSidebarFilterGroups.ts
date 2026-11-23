import type { ModernSidebarNavGroup } from "#src/demos/modules/modern/ModernSidebarNavGroup.js"

/**
 * Filters sidebar groups by a search query (case-insensitive substring).
 * A group whose label matches keeps all its items; otherwise only matching items are kept.
 * Empty groups are dropped. While filtering, reordering and the add action are disabled,
 * because their indices / context refer to the unfiltered list.
 */
export function modernSidebarFilterGroups(groups: ModernSidebarNavGroup[], query: string): ModernSidebarNavGroup[] {
  const q = query.trim().toLowerCase()
  if (!q) return groups
  const result: ModernSidebarNavGroup[] = []
  for (const group of groups) {
    const groupMatches = group.label.toLowerCase().includes(q)
    const items = groupMatches ? group.items : group.items.filter((item) => item.label.toLowerCase().includes(q))
    if (items.length === 0) continue
    result.push({ ...group, items, onReorder: undefined, addItem: undefined })
  }
  return result
}

import { classArr } from "#ui/utils/classArr.js"

/** Rounded accent bar left of an active entry. */
export function AppSidebarAccentBar(p: { active: boolean; accentColor?: string }) {
  return (
    <span
      aria-hidden="true"
      style={p.accentColor ? { "background-color": p.accentColor } : undefined}
      class={classArr(
        "absolute -left-1.5 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full", // layout
        !p.accentColor && "bg-blue-600 dark:bg-blue-500", // color
        "transition-[transform,opacity,background-color] duration-200 ease-out motion-reduce:transition-none", // animation
        p.active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
      )}
    />
  )
}

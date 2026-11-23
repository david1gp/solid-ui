import { classArr } from "#ui/utils/classArr.js"

/** Shared look of ModernSidebar nav entries (h-8 row, icon + label, glass hover, glowing active state). */
export const modernSidebarNavButtonClass = classArr(
  "modern-sidebar-entry relative flex items-center gap-2 h-8 px-[7px] rounded-lg cursor-pointer text-sm text-left", // layout
  "border border-transparent", // reserves the active outline; px-[7px] + 1px border keeps the 8px icon inset
  "font-medium text-neutral-600 dark:text-slate-200", // text
  "hover:bg-violet-500/5 hover:text-neutral-950 dark:hover:bg-white/[0.06] dark:hover:text-white", // hover
  "transition-[background-color,border-color,box-shadow,color] duration-200 motion-reduce:transition-none", // animation
)

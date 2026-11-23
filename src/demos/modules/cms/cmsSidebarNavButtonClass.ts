import { classArr } from "#ui/utils/classArr.js"

/** Shared look of CmsSidebar nav entries (h-8 row, icon + label, hover background). */
export const cmsSidebarNavButtonClass = classArr(
  "relative flex items-center gap-2 h-8 px-2 rounded-md cursor-pointer text-sm text-left", // layout
  "font-medium text-neutral-950 dark:text-neutral-50", // text
  "hover:bg-black/5 dark:hover:bg-white/10", // hover
)

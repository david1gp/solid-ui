import { classArr } from "#ui/utils/classArr.js"

/** Opaque-enough glass for floating menus so content behind stays readable. */
export const modernPopoverSurfaceClass = classArr(
  "rounded-xl border shadow-xl shadow-violet-950/10 dark:shadow-black/40", // layout
  "bg-white/95 dark:bg-[#12152b]/95 backdrop-blur-xl", // background
  "border-neutral-200 dark:border-white/10", // border
)

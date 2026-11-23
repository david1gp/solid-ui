import { classArr } from "#ui/utils/classArr.js"

/** Opaque-enough frosted glass for the account popover so content behind stays readable. */
export const navbarHeaderModernPopoverSurfaceClass = classArr(
  "rounded-xl border shadow-xl shadow-violet-950/10 dark:shadow-black/40", // layout
  "bg-white/85 dark:bg-[#12152b]/85 backdrop-blur-xl backdrop-saturate-150", // background
  "border-neutral-200 dark:border-white/10", // border
)

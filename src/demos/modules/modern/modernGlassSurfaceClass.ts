import { classArr } from "#ui/utils/classArr.js"

/** Frosted glass panel (sidebar, settings nav): light tint, heavy blur, so the page shapes melt behind it. */
export const modernGlassSurfaceClass = classArr(
  "bg-white/35 dark:bg-[#0b0e1c]/40 backdrop-blur-[48px] backdrop-saturate-[1.6]", // background
  "border-neutral-200/80 dark:border-white/[0.08]", // border color
)

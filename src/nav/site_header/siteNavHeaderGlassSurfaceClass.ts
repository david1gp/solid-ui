import { classArr } from "#ui/utils/classArr.js"

/** Frosted glass site header: light tint, heavy blur, so the page content melts behind it (same look as NavbarHeaderModern). */
export const siteNavHeaderGlassSurfaceClass = classArr(
  "bg-white/35 dark:bg-[#0b0e1c]/40 backdrop-blur-[48px] backdrop-saturate-[1.6]", // background
  "border-neutral-200/80 dark:border-white/[0.08]", // border color
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.5)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]", // top highlight
)

import { classArr } from "#ui/utils/classArr.js"

/** Footer text link: muted until hovered, with a visible keyboard focus ring. */
export const footerSimpleLinkClass = classArr(
  "inline-flex items-center rounded-md -mx-2 px-2 py-1 text-sm", // layout
  "text-neutral-600 dark:text-neutral-400", // text
  "hover:text-neutral-950 hover:bg-black/5 dark:hover:text-neutral-50 dark:hover:bg-white/10", // hover
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--footer-simple-accent)", // focus
  "transition-colors",
)

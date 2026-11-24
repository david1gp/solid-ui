import { classArr } from "#ui/utils/classArr.js"

/** Footer text link: muted until hovered, with a visible keyboard focus ring. */
export const footerSimpleLinkClass = classArr(
  "inline-flex items-center rounded-md -mx-2 px-2 py-1 text-sm", // layout
  "text-muted-foreground", // text
  "hover:text-foreground hover:bg-foreground/8 hover:underline underline-offset-4", // hover
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--footer-simple-accent)", // focus
  "transition-colors",
)

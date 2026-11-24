import { classesDisabledModifier } from "#ui/classes/classesDisabledModifier.js"
import { classesInputFocus } from "#ui/input/input/classesInputFocus.js"
import { classesInputSurface } from "#ui/input/input/classesInputSurface.js"
import { classArr } from "#ui/utils/classArr.js"

export const classesInput = classArr(
  "inline-flex", // layout
  "w-full", // sizing
  "bg-gray-50", // bg
  "border border-input", // borders
  classesInputSurface,
  "rounded-md", // border radius
  "px-3 py-2", // spacing
  "placeholder:text-muted-foreground", // typography
  "file:border-0 file:bg-transparent file:font-medium", // file input styling
  classesInputFocus, // focus states
  classesDisabledModifier, // disabled
)

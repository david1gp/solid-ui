import { classesTextLink } from "#ui/classes/classesTextLink.js"
import type { LinkTextProps } from "#ui/interactive/link/LinkTextProps.jsx"
import { classMerge } from "#ui/utils/classMerge.js"
import { splitProps } from "solid-js"

export function LinkText(p: LinkTextProps) {
  const [s, rest] = splitProps(p, ["class", "href"])
  return (
    <a
      href={s.href}
      class={classMerge(
        classesTextLink,
        "no-underline hover:underline", // underline
        "break-all", // line breaks
        s.class,
      )}
      {...rest}
    />
  )
}

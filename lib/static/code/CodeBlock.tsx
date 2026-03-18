import { classMerge } from "#ui/utils/classMerge"
import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

export interface CodeBlockProps extends ComponentProps<"pre"> {}

export const CodeBlock: Component<CodeBlockProps> = (p) => {
  const [s, rest] = splitProps(p, ["class", "children"])
  return (
    <pre
      class={classMerge(
        "p-2 rounded-lg text-xs whitespace-pre-wrap wrap-anywhere bg-slate-100 dark:bg-slate-900",
        s.class,
      )}
      {...rest}
    >
      {s.children}
    </pre>
  )
}

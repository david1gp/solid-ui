import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"
import { classMerge } from "~ui/utils/classMerge"

export interface CodeBlockProps extends ComponentProps<"pre"> {}

export const CodeBlock: Component<CodeBlockProps> = (p) => {
  const [s, rest] = splitProps(p, ["class", "children"])
  return (
    <pre
      class={classMerge(
        "p-2 rounded-lg text-xs whitespace-pre-wrap break-words bg-slate-100 dark:bg-slate-900",
        s.class,
      )}
      {...rest}
    >
      {s.children}
    </pre>
  )
}

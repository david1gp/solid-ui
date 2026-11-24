import { cn } from "cn"
import type { Component } from "solid-js"
import { omit } from "solid-js"
import { classesInput } from "#ui/input/input/classesInput.js"
import { type ComponentProps } from "@solidjs/web"

/** Styled native multiline textarea element. */
export const Textarea: Component<ComponentProps<"textarea">> = (p) => {
  const rest = omit(p, "class")
  return <textarea class={cn(classesInput, "flex min-h-[80px] ring-offset-background", p.class)} {...rest} />
}

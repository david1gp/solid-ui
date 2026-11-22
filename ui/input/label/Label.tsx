import { cn } from "cn"
import type { Component } from "solid-js"
import { omit } from "solid-js"
import { classesLabel } from "#ui/input/label/classesLabel.js"
import { type ComponentProps } from "@solidjs/web"

/** Styled native label element for form fields. */
export const Label: Component<ComponentProps<"label">> = (p) => {
  const rest = omit(p, "class")
  // biome-ignore lint/a11y/noLabelWithoutControl: generic label; consumers associate it via `for`/`htmlFor` or nested controls passed through `rest`.
  return <label class={cn(classesLabel, p.class)} {...rest} />
}

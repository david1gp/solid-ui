import { badgeCva1, type BadgeVariant } from "#ui/static/badge/badgeCva.jsx"
import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

export interface BadgeProps extends ComponentProps<"div"> {
  variant?: BadgeVariant
}

export const Badge: Component<BadgeProps> = (p) => {
  const [s, rest] = splitProps(p, ["variant", "class"])
  return <div class={badgeCva1(s.variant, s.class)} {...rest} />
}

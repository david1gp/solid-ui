import { type ComponentProps } from "@solidjs/web"
import type { Component } from "solid-js"
import { omit } from "solid-js"
import { navbarHeaderModernButtonClickAnimationClass } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonClickAnimationClass.js"
import {
  type NavbarHeaderModernButtonCvaProps,
  navbarHeaderModernButtonCva,
} from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import { navbarHeaderModernDisabledDirectlyClass } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernDisabledDirectlyClass.js"

export interface NavbarHeaderModernButtonProps extends ComponentProps<"button">, NavbarHeaderModernButtonCvaProps {}

/** Primary clickable button with variant styling and a click animation. */
export const NavbarHeaderModernButton: Component<NavbarHeaderModernButtonProps> = (p) => {
  const rest = omit(p, "variant", "class", "type")
  return (
    <button
      class={[
        navbarHeaderModernButtonCva(
          p.variant,
          navbarHeaderModernButtonClickAnimationClass,
          p.disabled && navbarHeaderModernDisabledDirectlyClass,
          typeof p.class === "string" ? p.class : undefined,
        ),
        typeof p.class === "string" ? undefined : p.class,
      ]}
      type={p.type ?? "button"}
      {...rest}
    />
  )
}

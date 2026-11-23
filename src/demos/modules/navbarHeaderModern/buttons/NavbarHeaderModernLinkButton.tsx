import { createLink } from "@tanstack/solid-router"
import { omit } from "solid-js"
import type { NavbarHeaderModernButtonAnchorProps } from "#src/demos/modules/navbarHeaderModern/buttons/NavbarHeaderModernLinkButtonProps.js"
import { navbarHeaderModernButtonCva } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import { navbarHeaderModernButtonIconCva } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonIconCva.js"
import { Icon } from "#ui/static/icon/Icon.jsx"

/** Shared styled button-anchor; base for both link variants. */
function NavbarHeaderModernButtonAnchor(p: NavbarHeaderModernButtonAnchorProps) {
  const rest = omit(
    p,
    "class",
    "variant",
    "newTab",
    "isLoading",
    "icon",
    "iconRight",
    "iconClass",
    "children",
    "target",
    "rel",
  )
  return (
    <a
      class={[
        navbarHeaderModernButtonCva(
          p.variant,
          "break-all", // line breaks for long links
          typeof p.class === "string" ? p.class : undefined,
        ),
        typeof p.class === "string" ? undefined : p.class,
      ]}
      target={p.newTab ? "_blank" : p.target}
      rel={p.newTab ? "noopener noreferrer" : p.rel}
      {...rest}
    >
      {p.icon && (
        <Icon path={p.icon} class={navbarHeaderModernButtonIconCva(p.variant, p.children && "mr-2", p.iconClass)} />
      )}
      {p.children}
      {p.iconRight && (
        <Icon
          path={p.iconRight}
          class={navbarHeaderModernButtonIconCva(p.variant, p.children && "ml-2", p.iconClass)}
        />
      )}
    </a>
  )
}

/** Internal button link — typed `to`, client-side nav + preload. Needs a RouterProvider. */
export const NavbarHeaderModernLinkButtonInternal = createLink(NavbarHeaderModernButtonAnchor)

/** External button link — plain `<a>` for external/runtime URLs. */
export function NavbarHeaderModernLinkButtonExternal(p: NavbarHeaderModernButtonAnchorProps & { href: string }) {
  return <NavbarHeaderModernButtonAnchor {...p} />
}

import { type ComponentProps } from "@solidjs/web"
import { type Component, omit } from "solid-js"
import { navbarHeaderModernButtonClickAnimationClass } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonClickAnimationClass.js"
import {
  type NavbarHeaderModernButtonCvaProps,
  navbarHeaderModernButtonCvaIconOnly,
} from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import { navbarHeaderModernButtonIconCva } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonIconCva.js"
import { navbarHeaderModernDisabledDirectlyClass } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernDisabledDirectlyClass.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { HasIcon } from "#ui/utils/HasIcon.js"
import type { HasTitle } from "#ui/utils/HasTitle.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import { isDisabled } from "#ui/utils/MayHaveDisabledAccessor.js"
import { isLoading, type MayHaveIsLoading } from "#ui/utils/MayHaveIsLoading.js"

export interface NavbarHeaderModernButtonIconOnlyProps
  extends Omit<ComponentProps<"button">, "title">,
    NavbarHeaderModernButtonCvaProps,
    HasTitle,
    HasIcon,
    MayHaveIsLoading,
    MayHaveChildren {
  iconRight?: boolean
}

/** Rounded icon-only button; pass a single icon and no children. */
export const NavbarHeaderModernButtonIconOnly: Component<NavbarHeaderModernButtonIconOnlyProps> = (p) => {
  const rest = omit(
    p,
    "variant",
    "class",
    "isLoading",
    "title",
    "icon",
    "iconRight",
    "iconClass",
    "type",
    "disabled",
    "children",
  )
  return (
    <button
      class={[
        navbarHeaderModernButtonCvaIconOnly(
          p.variant,
          isLoading(p),
          isDisabled(p),
          navbarHeaderModernButtonClickAnimationClass,
          typeof p.class === "string" ? p.class : undefined,
        ),
        typeof p.class === "string" ? undefined : p.class,
      ]}
      title={p.title}
      type={p.type ?? "button"}
      {...rest}
    >
      {!p.iconRight && (
        <Icon
          path={p.icon}
          class={navbarHeaderModernButtonIconCva(
            p.variant,
            p.children && "mr-2",
            p.isLoading && "animate-spin-faster",
            p.disabled && navbarHeaderModernDisabledDirectlyClass,
            p.iconClass,
          )}
        />
      )}
      {p.children}
      {p.iconRight && <Icon path={p.icon} class={navbarHeaderModernButtonIconCva(p.variant, p.iconClass)} />}
    </button>
  )
}

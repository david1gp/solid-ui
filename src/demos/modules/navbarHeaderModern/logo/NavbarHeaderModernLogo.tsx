import { type ComponentProps } from "@solidjs/web"
import { cn } from "cn"
import { NavbarHeaderModernLinkButtonInternal } from "#src/demos/modules/navbarHeaderModern/buttons/NavbarHeaderModernLinkButton.jsx"
import {
  type NavbarHeaderModernButtonVariant,
  navbarHeaderModernButtonVariant,
} from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import { NavbarHeaderModernLogoImg } from "#src/demos/modules/navbarHeaderModern/logo/NavbarHeaderModernLogoImg.jsx"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavbarHeaderModernLogoProps extends MayHaveClass {
  /** Typed internal route to navigate to; defaults to `"/"`. */
  to?: ComponentProps<typeof NavbarHeaderModernLinkButtonInternal>["to"]
  logoUrl?: string
  imageClass?: string
  logoText: string
  logoTextClass?: string
  variant?: NavbarHeaderModernButtonVariant
}

/** Clickable logo image link with accompanying text. */
export function NavbarHeaderModernLogo(p: NavbarHeaderModernLogoProps) {
  return (
    <NavbarHeaderModernLinkButtonInternal
      to={p.to ?? "/"}
      variant={p.variant ?? navbarHeaderModernButtonVariant.ghost}
      class={cn("flex gap-1.5", p.class)}
    >
      <NavbarHeaderModernLogoImg
        src={p.logoUrl ?? "/navbar-header-modern-logo.svg"}
        alt={"Logo"}
        zoomIn={false}
        class={cn("size-7 mr-1", p.imageClass)}
      />
      <span class={cn("text-2xl font-bold", p.logoTextClass)}>{p.logoText}</span>
    </NavbarHeaderModernLinkButtonInternal>
  )
}

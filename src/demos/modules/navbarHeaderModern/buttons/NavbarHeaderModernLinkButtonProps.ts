import { type ComponentProps } from "@solidjs/web"
import type { NavbarHeaderModernButtonCvaProps } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import type { MayHaveIsLoading } from "#ui/utils/MayHaveIsLoading.js"

/** Style and content props for the NavbarHeader-Modern link button anchor. */
export interface NavbarHeaderModernButtonAnchorProps
  extends ComponentProps<"a">,
    NavbarHeaderModernButtonCvaProps,
    MayHaveIsLoading {
  /** Opens the link in a new tab and sets `rel="noopener noreferrer"`. */
  newTab?: boolean
  // icon
  icon?: string
  iconRight?: string
  iconClass?: string
}

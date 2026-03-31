import { ttt } from "#ui/i18n/ttt.js"
import { ButtonIcon } from "#ui/interactive/button/ButtonIcon.jsx"
import type { SidebarState } from "#ui/interactive/sidebar/SidebarState.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { MayHaveButtonVariant } from "#ui/utils/MayHaveButtonVariant.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiMenu } from "@mdi/js"

export interface SidebarToggleProps
  extends SidebarState, SidebarToggleClasses, MayHaveChildren, MayHaveClass, MayHaveButtonVariant {
  iconClass?: string
}

interface SidebarToggleClasses {
  iconDesktopOpen?: string
  iconDesktopClose?: string
  iconMobileOpen?: string
  iconMobileClose?: string
}

export function SidebarToggle(p: SidebarToggleProps) {
  const isOpen = () => (p.isMobile.get() ? p.openMobile.get() : p.openDesktop.get())

  const handleToggle = () => {
    if (p.isMobile.get()) {
      p.openMobile.set(!p.openMobile.get())
    } else {
      p.openDesktop.set(!p.openDesktop.get())
    }
  }

  return (
    <ButtonIcon
      variant={p.variant}
      onClick={handleToggle}
      title={isOpen() ? ttt("Close sidebar") : ttt("Open sidebar")}
      class={p.class}
    >
      {p.children ? p.children : <Icon path={getIcon(p)} class={p.iconClass} />}
    </ButtonIcon>
  )
}

function getIcon(p: SidebarToggleProps): string {
  if (p.isMobile) {
    if (p.openMobile) {
      return p.iconMobileOpen ?? mdiMenu
    }
    return p.iconMobileClose ?? mdiClose
  }
  if (p.openDesktop) {
    return p.iconDesktopOpen ?? mdiChevronLeft
  }
  return p.iconDesktopClose ?? mdiChevronRight
}

import { debounce } from "@solid-primitives/scheduled"
import { type Element as JSXElement, onSettled, Show, omit } from "solid-js"
import type { CorcuDialogTexts } from "#ui/interactive/dialog/CorcuDialogTexts.js"
import { SidebarMobileDrawer } from "#ui/interactive/sidebar/SidebarMobileDrawer.jsx"
import type { SidebarState } from "#ui/interactive/sidebar/SidebarState.jsx"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface SidebarProps extends MayHaveClass {
  state: SidebarState
  defaultWidth?: number
  debounceMs?: number

  //
  // props for mobile dialog
  //
  title: string
  description?: string
  titleClass?: string
  descriptionClass?: string
  texts?: CorcuDialogTexts
  desktopChildren: JSXElement
  mobileChildren: JSXElement
}

/** Responsive sidebar switching between desktop and mobile drawer. */
export function Sidebar(p: SidebarProps) {
  const rest = omit(p, "state", "defaultWidth", "debounceMs", "class", "desktopChildren", "mobileChildren")

  onSettled(() => {
    const checkMobile = debounce(
      () => p.state.isMobile.set(window.innerWidth < (p.defaultWidth ?? 768)),
      p.debounceMs ?? 100,
    )
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  return (
    <>
      <Show when={!p.state.isMobile.get() && p.state.openDesktop.get()}>{p.desktopChildren}</Show>
      <Show when={p.state.isMobile.get()}>
        <SidebarMobileDrawer {...rest} open={p.state.openMobile}>
          {p.mobileChildren}
        </SidebarMobileDrawer>
      </Show>
    </>
  )
}

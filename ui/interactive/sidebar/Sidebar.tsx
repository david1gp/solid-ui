import type { CorcuDialogTexts } from "#ui/interactive/dialog/CorcuDialogTexts.js"
import { SidebarMobileDrawer } from "#ui/interactive/sidebar/SidebarMobileDrawer.jsx"
import type { SidebarState } from "#ui/interactive/sidebar/SidebarState.jsx"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { debounce } from "@solid-primitives/scheduled"
import { onMount, Show, splitProps, type JSXElement } from "solid-js"

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

export function Sidebar(p: SidebarProps) {
  const [s, rest] = splitProps(p, ["state", "defaultWidth", "debounceMs", "class", "desktopChildren", "mobileChildren"])

  onMount(() => {
    const checkMobile = debounce(
      () => s.state.isMobile.set(window.innerWidth < (s.defaultWidth ?? 768)),
      s.debounceMs ?? 100,
    )
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  return (
    <>
      <Show when={!s.state.isMobile.get() && s.state.openDesktop.get()}>{s.desktopChildren}</Show>
      <Show when={s.state.isMobile.get()}>
        <SidebarMobileDrawer {...rest} open={s.state.openMobile}>
          {s.mobileChildren}
        </SidebarMobileDrawer>
      </Show>
    </>
  )
}

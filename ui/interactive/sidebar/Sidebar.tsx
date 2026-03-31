import type { CorcuDialogTexts } from "#ui/interactive/dialog/CorcuDialogTexts.js"
import { SidebarMobileDrawer } from "#ui/interactive/sidebar/SidebarMobileDrawer.jsx"
import type { SidebarState } from "#ui/interactive/sidebar/SidebarState.jsx"
import type { HasChildren } from "#ui/utils/HasChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { debounce } from "@solid-primitives/scheduled"
import { onMount, Show, splitProps } from "solid-js"

export interface SidebarProps extends HasChildren, MayHaveClass {
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
}

export function Sidebar(p: SidebarProps) {
  const [s, rest] = splitProps(p, ["state", "defaultWidth", "debounceMs", "children", "class"])

  onMount(() => {
    const checkMobile = debounce(
      () => p.state.isMobile.set(window.innerWidth < (p.defaultWidth ?? 768)),
      p.debounceMs ?? 200,
    )
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  return (
    <>
      <Show when={!p.state.isMobile.get() && p.state.openDesktop.get()}>{p.children}</Show>
      <Show when={p.state.isMobile.get()}>
        <SidebarMobileDrawer {...rest} open={p.state.openMobile}>
          {p.children}
        </SidebarMobileDrawer>
      </Show>
    </>
  )
}

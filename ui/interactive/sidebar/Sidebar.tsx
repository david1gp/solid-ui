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
      () => s.state.isMobile.set(window.innerWidth < (s.defaultWidth ?? 768)),
      s.debounceMs ?? 100,
    )
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  })

  return (
    <>
      <Show when={!s.state.isMobile.get() && s.state.openDesktop.get()}>{s.children}</Show>
      <Show when={s.state.isMobile.get()}>
        <SidebarMobileDrawer {...rest} open={s.state.openMobile}>
          {s.children}
        </SidebarMobileDrawer>
      </Show>
    </>
  )
}

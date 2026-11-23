import { classArr } from "#ui/utils/classArr.js"
import "./NavbarHeaderModernBackdrop.css"

export interface NavbarHeaderModernBackdropProps {
  /** Pin to the viewport instead of the nearest positioned ancestor (for scrolling pages). */
  fixed?: boolean
}

/** Placeholder backdrop: abstract color shapes behind demo content. Parent needs `relative isolate` unless `fixed`. */
export function NavbarHeaderModernBackdrop(p: NavbarHeaderModernBackdropProps) {
  return (
    <div
      aria-hidden="true"
      class={classArr("navbar-header-modern-backdrop", p.fixed && "navbar-header-modern-backdrop-fixed")}
    >
      <span class={"navbar-header-modern-backdrop-shape-violet"} />
      <span class={"navbar-header-modern-backdrop-shape-amber"} />
      <span class={"navbar-header-modern-backdrop-shape-teal"} />
      <span class={"navbar-header-modern-backdrop-shape-magenta"} />
      <span class={"navbar-header-modern-backdrop-shape-cyan"} />
    </div>
  )
}

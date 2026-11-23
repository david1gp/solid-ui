import { classArr } from "#ui/utils/classArr.js"
import "./DemoShapesBackdrop.css"

export interface DemoShapesBackdropProps {
  /** Pin to the viewport instead of the nearest positioned ancestor (for scrolling pages). */
  fixed?: boolean
}

/** Placeholder backdrop: abstract color shapes behind demo content. Parent needs `relative isolate` unless `fixed`. */
export function DemoShapesBackdrop(p: DemoShapesBackdropProps) {
  return (
    <div aria-hidden="true" class={classArr("demo-shapes-backdrop", p.fixed && "demo-shapes-backdrop-fixed")}>
      <span class={"demo-shapes-backdrop-shape-violet"} />
      <span class={"demo-shapes-backdrop-shape-amber"} />
      <span class={"demo-shapes-backdrop-shape-teal"} />
      <span class={"demo-shapes-backdrop-shape-magenta"} />
      <span class={"demo-shapes-backdrop-shape-cyan"} />
    </div>
  )
}

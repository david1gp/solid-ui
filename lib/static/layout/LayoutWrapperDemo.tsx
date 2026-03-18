import { Toaster } from "#ui/interactive/toast/Toaster"
import { TailwindIndicator } from "#ui/static/dev/TailwindIndicator"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren"
import type { MayHaveTitle } from "#ui/utils/MayHaveTitle"
import { createEffect } from "solid-js"

export interface LayoutWrapperDemoProps extends MayHaveChildren, MayHaveTitle {}

export function LayoutWrapperDemo(p: LayoutWrapperDemoProps) {
  createEffect(() => {
    if (!p.title) return
    document.title = p.title
  })
  return (
    <>
      {p.children}
      <TailwindIndicator />
      <Toaster />
    </>
  )
}

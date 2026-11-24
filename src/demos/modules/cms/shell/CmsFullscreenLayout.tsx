import type { Element as JSXElement } from "solid-js"

export function CmsFullscreenLayout(p: { children: JSXElement }) {
  return <main class="min-h-dvh w-full bg-background p-8 dark:bg-[#222326]">{p.children}</main>
}

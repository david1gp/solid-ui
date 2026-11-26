import { type Element as JSXElement, Show } from "solid-js"
import "./CmsViewEnter.css"

export function CmsViewEnter(p: { view: string; children: JSXElement }) {
  return (
    <Show when={p.view} keyed>
      {(_view) => <div class="cms-view-enter">{p.children}</div>}
    </Show>
  )
}

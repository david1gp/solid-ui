import { For } from "solid-js"
import type { FooterSimpleColumn } from "./FooterSimpleColumn.js"
import { footerSimpleLinkClass } from "./footerSimpleLinkClass.js"

/** One titled column of footer links. */
export function FooterSimpleLinkColumn(p: { column: FooterSimpleColumn }) {
  return (
    <nav aria-label={p.column.title} class={"flex flex-col gap-2"}>
      <h2 class={"text-sm font-semibold text-neutral-950 dark:text-neutral-50"}>{p.column.title}</h2>
      <ul class={"flex flex-col gap-0.5"}>
        <For each={p.column.links}>
          {(link) => (
            <li>
              <a href={link.href} class={footerSimpleLinkClass}>
                {link.label}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}

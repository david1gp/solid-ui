import { For } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { FooterSimpleSocialLink } from "./FooterSimpleSocialLink.js"

/** Row of icon-only social media links. */
export function FooterSimpleSocialLinks(p: { links: FooterSimpleSocialLink[] }) {
  return (
    <ul class={"flex items-center gap-1"} aria-label={"Social Media"}>
      <For each={p.links}>
        {(link) => (
          <li>
            <a
              href={link.href}
              target={"_blank"}
              rel={"noopener noreferrer"}
              aria-label={link.label}
              title={link.label}
              class={classArr(
                "flex items-center justify-center size-9 rounded-md", // layout
                "text-muted-foreground", // text
                "hover:text-foreground hover:bg-foreground/8", // hover
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--footer-simple-accent)", // focus
                "transition-colors",
              )}
            >
              <Icon path={link.icon} class={"size-5"} />
            </a>
          </li>
        )}
      </For>
    </ul>
  )
}

import { mdiArrowUp } from "@adaptive-ds/mdi/mdiArrowUp.js"
import { For, type Element as JSXElement, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { FooterSimpleColumn } from "./FooterSimpleColumn.js"
import type { FooterSimpleLink } from "./FooterSimpleLink.js"
import { footerSimpleLinkClass } from "./footerSimpleLinkClass.js"
import { FooterSimpleLinkColumn } from "./FooterSimpleLinkColumn.jsx"
import { footerSimpleScrollToTop } from "./footerSimpleScrollToTop.js"
import type { FooterSimpleSocialLink } from "./FooterSimpleSocialLink.js"
import { FooterSimpleSocialLinks } from "./FooterSimpleSocialLinks.jsx"

export interface FooterSimpleProps {
  logo?: JSXElement
  brand?: JSXElement
  description?: string
  columns: FooterSimpleColumn[]
  socialLinks?: FooterSimpleSocialLink[]
  /** Extra block on the right of the link columns, e.g. a newsletter form. */
  aside?: JSXElement
  copyright: string
  legalLinks?: FooterSimpleLink[]
  backToTopLabel?: string
  /** Focus ring and button color; defaults to the theme foreground. */
  accentColor?: string
  /** Text color on accent buttons; defaults to the theme background. */
  accentForegroundColor?: string
  class?: string
}

/** Page footer: brand block, link columns, optional aside and a bottom bar with legal links. */
export function FooterSimple(p: FooterSimpleProps) {
  return (
    <footer
      style={{
        "--footer-simple-accent": p.accentColor ?? "var(--foreground)",
        "--footer-simple-accent-foreground": p.accentForegroundColor ?? "var(--background)",
      }}
      class={classArr(
        "w-full text-foreground", // layout
        "bg-muted", // background
        "border-t border-border", // border
        p.class,
      )}
    >
      <div class={"mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pb-12"}>
        <div class={"grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1.4fr)]"}>
          <div class={"flex flex-col gap-4"}>
            <div class={"flex items-center gap-2"}>
              <span class={"shrink-0"}>{p.logo}</span>
              <span class={"text-base font-semibold"}>{p.brand}</span>
            </div>
            <Show when={p.description}>
              <p class={"max-w-xs text-sm text-muted-foreground"}>{p.description}</p>
            </Show>
            <Show when={p.socialLinks?.length}>
              <div class={"-ml-2"}>
                <FooterSimpleSocialLinks links={p.socialLinks ?? []} />
              </div>
            </Show>
          </div>
          <div class={"grid grid-cols-2 gap-8 sm:grid-cols-3"}>
            <For each={p.columns}>{(column) => <FooterSimpleLinkColumn column={column} />}</For>
          </div>
          <Show when={p.aside}>
            <div>{p.aside}</div>
          </Show>
        </div>
        <div class={"mt-10 pt-6 flex flex-col-reverse gap-4 border-t border-border sm:flex-row sm:items-center"}>
          <p class={"text-xs text-muted-foreground"}>{p.copyright}</p>
          <Show when={p.legalLinks?.length}>
            <nav aria-label={"Rechtliches"} class={"flex flex-wrap gap-x-4 sm:ml-auto"}>
              <For each={p.legalLinks}>
                {(link) => (
                  <a href={link.href} class={classArr(footerSimpleLinkClass, "text-xs")}>
                    {link.label}
                  </a>
                )}
              </For>
            </nav>
          </Show>
          <button
            type={"button"}
            onClick={footerSimpleScrollToTop}
            class={classArr(
              "flex items-center gap-1.5 self-start h-8 px-2 rounded-md cursor-pointer text-xs font-medium", // layout
              "text-muted-foreground", // text
              "hover:text-foreground hover:bg-foreground/8", // hover
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--footer-simple-accent)", // focus
              !p.legalLinks?.length && "sm:ml-auto",
            )}
          >
            <Icon path={mdiArrowUp} class={"size-4"} />
            {p.backToTopLabel ?? "Nach oben"}
          </button>
        </div>
      </div>
    </footer>
  )
}

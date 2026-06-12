import { Show } from "solid-js"
import { LinkText } from "#ui/interactive/link/LinkText.jsx"

export interface ConsentFooterLinksProps {
  privacyHref: string
  privacyLabel: string
  imprintHref?: string
  imprintLabel: string
  note: string
}

// Muted slate theme to keep the footer subtle — overrides LinkText's default blue + break-all.
const footerLinkClass =
  "font-medium underline underline-offset-4 break-normal text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"

export function ConsentFooterLinks(p: ConsentFooterLinksProps) {
  return (
    <div class="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
      <LinkText href={p.privacyHref} class={footerLinkClass}>
        {p.privacyLabel}
      </LinkText>
      <Show when={p.imprintHref}>
        {(href) => (
          <LinkText href={href()} class={footerLinkClass}>
            {p.imprintLabel}
          </LinkText>
        )}
      </Show>
      <span>{p.note}</span>
    </div>
  )
}

import { mdiBellOutline } from "@adaptive-ds/mdi/mdiBellOutline.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsShellText } from "../i18n/cmsShellText.js"

export function CmsShellHeader(p: { group: string; title: string; locale: "de" | "en" }) {
  return (
    <header class="sticky top-0 z-30 flex shrink-0 flex-wrap items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 text-sm sm:px-8 dark:border-white/10 dark:bg-[#222326]">
      <nav aria-label="Breadcrumb" class="min-w-0 flex-1 truncate text-neutral-500">
        <span class="hidden sm:inline">
          {p.group} <span aria-hidden="true">/</span>{" "}
        </span>
        <span class="font-medium text-neutral-950 dark:text-neutral-50">{p.title}</span>
      </nav>
      <details class="relative -mr-1.5">
        <summary
          class="cursor-pointer list-none rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label={cmsShellText[p.locale].notifications}
        >
          <Icon path={mdiBellOutline} class="size-5" />
        </summary>
        <div class="absolute right-1.5 z-30 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-neutral-800">
          {cmsShellText[p.locale].noNotifications}
        </div>
      </details>
    </header>
  )
}

import { mdiBellOutline } from "@adaptive-ds/mdi/mdiBellOutline.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { createSignal, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsShellText } from "../i18n/cmsShellText.js"

export function CmsShellHeader(p: {
  group: string
  title: string
  locale: "de" | "en"
  onLocale: (locale: "de" | "en") => void
  onSearch: (value: string) => void
  onSettings: () => void
}) {
  const [searchOpen, setSearchOpen] = createSignal(false)
  return (
    <header class="flex flex-wrap items-center gap-3 border-b border-neutral-200 px-4 py-3 text-sm dark:border-white/10">
      <nav aria-label="Breadcrumb" class="min-w-0 flex-1 truncate text-neutral-500">
        <span class="hidden sm:inline">
          {p.group} <span aria-hidden="true">/</span>{" "}
        </span>
        <span class="font-medium text-neutral-950 dark:text-neutral-50">{p.title}</span>
      </nav>
      <button
        type="button"
        class="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10 sm:hidden"
        aria-label={cmsShellText[p.locale].search}
        aria-expanded={searchOpen() ? "true" : "false"}
        onClick={() => setSearchOpen(!searchOpen())}
      >
        <Icon path={mdiMagnify} class="size-5" />
      </button>
      <label class="hidden items-center gap-2 rounded-xl border border-neutral-200 px-2 dark:border-white/10 sm:flex">
        <Icon path={mdiMagnify} class="size-4" />
        <input
          class="w-28 bg-transparent py-1.5 outline-none sm:w-40"
          type="search"
          placeholder={cmsShellText[p.locale].search}
          onInput={(e) => p.onSearch(e.currentTarget.value)}
        />
      </label>
      <button
        type="button"
        class="rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
        onClick={() => p.onLocale(p.locale === "de" ? "en" : "de")}
        aria-label={cmsShellText[p.locale].language}
      >
        {p.locale.toUpperCase()}
      </button>
      <details class="relative">
        <summary
          class="cursor-pointer list-none rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label={cmsShellText[p.locale].notifications}
        >
          <Icon path={mdiBellOutline} class="size-5" />
        </summary>
        <div class="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-neutral-800">
          {cmsShellText[p.locale].noNotifications}
        </div>
      </details>
      <details class="relative">
        <summary class="cursor-pointer list-none rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10">
          Max ▾
        </summary>
        <div class="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-neutral-800">
          <button
            type="button"
            class="w-full rounded-lg px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10"
            onClick={(event) => {
              event.currentTarget.closest("details")?.removeAttribute("open")
              p.onSettings()
            }}
          >
            {cmsShellText[p.locale].settings}
          </button>
        </div>
      </details>
      <Show when={searchOpen()}>
        <label class="flex w-full items-center gap-2 rounded-xl border border-neutral-200 px-2 dark:border-white/10 sm:hidden">
          <Icon path={mdiMagnify} class="size-4" />
          <input
            class="min-w-0 flex-1 bg-transparent py-1.5 outline-none"
            type="search"
            aria-label={cmsShellText[p.locale].search}
            placeholder={cmsShellText[p.locale].search}
            onInput={(e) => p.onSearch(e.currentTarget.value)}
          />
        </label>
      </Show>
    </header>
  )
}

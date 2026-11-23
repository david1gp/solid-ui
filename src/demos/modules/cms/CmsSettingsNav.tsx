import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { For, type Element as JSXElement, Show } from "solid-js"
import { CmsSidebarAccentBar } from "#src/demos/modules/cms/CmsSidebarAccentBar.jsx"
import { CmsSidebarAvatar } from "#src/demos/modules/cms/CmsSidebarAvatar.jsx"
import type { CmsSidebarNavItem } from "#src/demos/modules/cms/CmsSidebarNavItem.js"
import { cmsSidebarNavButtonClass } from "#src/demos/modules/cms/cmsSidebarNavButtonClass.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface CmsSettingsNavProps extends MayHaveClass {
  /** Heading above the profile, e.g. "Einstellungen". */
  title?: JSXElement
  name?: string
  email?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  /** Settings sections; only icon, label, isActive and onClick are used. */
  items: CmsSidebarNavItem[]
  /** Same accent as CmsSidebar, used for the active bar. */
  accentColor?: string
  /** Accessible name of the nav landmark; defaults to title when that is a string. */
  ariaLabel?: string
  logoutLabel?: string
  onLogout?: () => void
}

/**
 * Second sidebar for a settings page, placed right next to CmsSidebar: large avatar with name and email,
 * the settings sections as nav entries in the CmsSidebar style, and an optional logout entry at the bottom.
 */
export function CmsSettingsNav(p: CmsSettingsNavProps) {
  const hasProfile = () => !!(p.name || p.email || p.userAvatar || p.userImageUrl || p.userInitials)
  return (
    <aside
      class={classArr(
        "flex flex-col shrink-0 self-stretch w-56 min-h-0 overflow-hidden", // layout: stretches to the flex row height
        "bg-neutral-50 dark:bg-[#202124] border-r border-neutral-200 dark:border-white/10", // look
        "text-neutral-950 dark:text-neutral-50",
        p.class,
      )}
    >
      <Show when={p.title}>
        <div class={"flex items-center h-11 px-4"}>
          <h2 class={"min-w-0 truncate whitespace-nowrap text-base font-semibold"}>{p.title}</h2>
        </div>
      </Show>

      <Show when={hasProfile()}>
        <div class={"flex flex-col items-center gap-1 px-4 pt-4 pb-6 text-center"}>
          <CmsSidebarAvatar
            userAvatar={p.userAvatar}
            userImageUrl={p.userImageUrl}
            userInitials={p.userInitials}
            class={"size-20 mb-2 text-xl ring-4 ring-white dark:ring-white/15 shadow-sm"}
          />
          <Show when={p.name}>
            <span class={"w-full text-base font-semibold truncate"}>{p.name}</span>
          </Show>
          <Show when={p.email}>
            <span class={"w-full text-xs text-neutral-500 dark:text-neutral-400 truncate"}>{p.email}</span>
          </Show>
        </div>
      </Show>

      <nav
        aria-label={p.ariaLabel ?? (typeof p.title === "string" ? p.title : undefined)}
        class={"flex flex-col flex-1 min-h-0 gap-0.5 overflow-y-auto overflow-x-hidden px-2 py-2"}
      >
        <For each={p.items}>
          {(item) => (
            <button
              type={"button"}
              onClick={() => item.onClick?.()}
              data-nav-entry={""}
              aria-current={item.isActive ? "page" : undefined}
              class={classArr(
                cmsSidebarNavButtonClass,
                "w-full min-w-0",
                item.isActive && "bg-black/5 dark:bg-white/15",
              )}
            >
              <CmsSidebarAccentBar active={!!item.isActive} accentColor={p.accentColor} />
              <Icon path={item.icon} class={"size-4"} />
              <span class={"min-w-0 truncate whitespace-nowrap"}>{item.label}</span>
            </button>
          )}
        </For>
      </nav>

      <Show when={p.logoutLabel}>
        {/* h-10 matches CmsSidebar's user footer (32px avatar + p-1), so both top borders line up */}
        <div class={"border-t border-neutral-200 dark:border-white/10 px-2 py-1.5"}>
          <button
            type={"button"}
            onClick={() => p.onLogout?.()}
            class={classArr(
              "flex items-center gap-2 w-full min-w-0 h-10 px-2 rounded-md cursor-pointer text-sm text-left font-medium", // layout like nav entries
              "text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10", // color
            )}
          >
            <Icon path={mdiLogout} class={"size-4"} />
            <span class={"min-w-0 truncate whitespace-nowrap"}>{p.logoutLabel}</span>
          </button>
        </div>
      </Show>
    </aside>
  )
}

import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { For, type JSXElement, Show } from "solid-js"
import { AppSidebarAccentBar } from "#ui/modules/app_sidebar/AppSidebarAccentBar.jsx"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"
import { appSidebarNavButtonClass } from "#ui/modules/app_sidebar/appSidebarNavButtonClass.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface AppSettingsNavProps extends MayHaveClass {
  /** Heading above the profile, e.g. "Einstellungen". */
  title?: JSXElement
  name?: string
  email?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  /** Settings sections; only icon, label, isActive and onClick are used. */
  items: AppSidebarNavItem[]
  /** Same accent as AppSidebar, used for the active bar. */
  accentColor?: string
  /** Accessible name of the nav landmark; defaults to title when that is a string. */
  ariaLabel?: string
  logoutLabel?: string
  onLogout?: () => void
}

/**
 * Second sidebar for a settings page, placed right next to AppSidebar: large avatar with name and email,
 * the settings sections as nav entries in the AppSidebar style, and an optional logout entry at the bottom.
 */
export function AppSettingsNav(p: AppSettingsNavProps) {
  const hasProfile = () => !!(p.name || p.email || p.userAvatar || p.userImageUrl || p.userInitials)
  return (
    <aside
      class={classArr(
        "flex flex-col shrink-0 self-stretch w-56 min-h-0 overflow-hidden", // layout: stretches to the flex row height
        "bg-neutral-50 dark:bg-[#111111] border-r border-border", // look
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
          <AppSidebarAvatar
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
                appSidebarNavButtonClass,
                "w-full min-w-0",
                item.isActive && "bg-black/5 dark:bg-white/10",
              )}
            >
              <AppSidebarAccentBar active={!!item.isActive} accentColor={p.accentColor} />
              <Icon path={item.icon} class={"size-4"} />
              <span class={"min-w-0 truncate whitespace-nowrap"}>{item.label}</span>
            </button>
          )}
        </For>
      </nav>

      <Show when={p.logoutLabel}>
        <div class={"border-t border-border px-2 py-1.5"}>
          <button
            type={"button"}
            onClick={() => p.onLogout?.()}
            class={classArr(
              "flex items-center gap-2 w-full min-w-0 h-8 px-2 rounded-md cursor-pointer text-sm text-left font-medium", // layout like nav entries
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

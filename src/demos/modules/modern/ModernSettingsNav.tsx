import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { For, type Element as JSXElement, Show } from "solid-js"
import { ModernSidebarAvatar } from "#src/demos/modules/modern/ModernSidebarAvatar.jsx"
import type { ModernSidebarNavItem } from "#src/demos/modules/modern/ModernSidebarNavItem.js"
import { modernGlassSurfaceClass } from "#src/demos/modules/modern/modernGlassSurfaceClass.js"
import { modernSidebarNavButtonClass } from "#src/demos/modules/modern/modernSidebarNavButtonClass.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface ModernSettingsNavProps extends MayHaveClass {
  /** Heading above the profile, e.g. "Einstellungen". */
  title?: JSXElement
  name?: string
  email?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  /** Settings sections; only icon, label, isActive and onClick are used. */
  items: ModernSidebarNavItem[]
  /** Same accent as ModernSidebar, used for the active bar. */
  accentColor?: string
  /** Accessible name of the nav landmark; defaults to title when that is a string. */
  ariaLabel?: string
  logoutLabel?: string
  onLogout?: () => void
}

/**
 * Second sidebar for a settings page, placed right next to ModernSidebar: large avatar with name and email,
 * the settings sections as nav entries in the ModernSidebar style, and an optional logout entry at the bottom.
 */
export function ModernSettingsNav(p: ModernSettingsNavProps) {
  const hasProfile = () => !!(p.name || p.email || p.userAvatar || p.userImageUrl || p.userInitials)
  return (
    <aside
      style={p.accentColor ? { "--modern-sidebar-accent": p.accentColor } : undefined}
      class={classArr(
        "modern-sidebar-panel relative flex flex-col shrink-0 self-stretch w-56 min-h-0 overflow-hidden", // layout: stretches to the flex row height
        "border-r", // border
        modernGlassSurfaceClass,
        "text-neutral-950 dark:text-slate-100",
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
          <ModernSidebarAvatar
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
              class={classArr(modernSidebarNavButtonClass, "w-full min-w-0")}
            >
              <Icon path={item.icon} class={"modern-sidebar-entry-icon size-4 shrink-0"} />
              <span class={"min-w-0 truncate whitespace-nowrap"}>{item.label}</span>
            </button>
          )}
        </For>
      </nav>

      <Show when={p.logoutLabel}>
        {/* h-10 matches ModernSidebar's user footer (32px avatar + p-1), so both top borders line up */}
        <div class={"border-t border-neutral-200/80 dark:border-white/[0.08] px-2 py-1.5"}>
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

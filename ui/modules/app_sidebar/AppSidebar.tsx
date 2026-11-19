import { mdiAccountCircleOutline } from "@adaptive-ds/mdi/mdiAccountCircleOutline.js"
import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import Popover from "@corvu/popover"
import { Key } from "@solid-primitives/keyed"
import { type ComponentProps, children, createSignal, type JSXElement, Show, splitProps } from "solid-js"
import { ttt } from "#ui/i18n/ttt.js"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"
import { createFlyoutState } from "#ui/modules/app_sidebar/createFlyoutState.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface AppSidebarProps extends MayHaveClass {
  /** true = icon-only rail. */
  collapsed: SignalObject<boolean>
  logo: JSXElement
  brand: JSXElement
  groups: AppSidebarNavGroup[]
  userName?: string
  userInitials?: string
  onUserClick?: () => void
  /** Popover body opened by clicking the user footer, e.g. <AppSidebarUserMenu />. */
  userMenu?: JSXElement
  /** CSS color of the active item's accent bar; defaults to blue. */
  accentColor?: string
}

// Shared timing so width, fades and height collapses move as one.
const motion = "duration-500 ease-in-out motion-reduce:transition-none"

/**
 * App navigation sidebar with brand, grouped entries and user footer; collapses to an icon rail.
 * Everything stays mounted while toggling: the width animates, icons keep a fixed position
 * (centered in the 48px rail) and labels fade out / get clipped instead of popping.
 */
export function AppSidebar(p: AppSidebarProps) {
  const isOpen = () => !p.collapsed.get()
  const menu = createFlyoutState()
  // Drawer state keyed by group label, so it survives `groups` being re-created on every update.
  const [drawerState, setDrawerState] = createSignal<Record<string, boolean>>({})
  // Resolve once so the menu keeps its state (e.g. selections) across close/reopen.
  const userMenu = children(() => p.userMenu)
  const fade = () => classArr("transition-opacity", motion, isOpen() ? "opacity-100" : "opacity-0")
  return (
    <aside
      class={classArr(
        "flex flex-col shrink-0 h-full overflow-hidden", // layout
        "bg-neutral-50 dark:bg-[#111111]", // background
        "border-r border-border", // border
        "transition-[width]", // animation
        motion,
        isOpen() ? "w-56" : "w-12",
        p.class,
      )}
    >
      <div class={"flex items-center h-11 px-2"}>
        <div class={classArr("flex flex-1 min-w-0 items-center gap-2 overflow-hidden", fade())} aria-hidden={!isOpen()}>
          <span class={"shrink-0 pl-1"}>{p.logo}</span>
          <div class={"min-w-0 truncate whitespace-nowrap text-base font-semibold"}>{p.brand}</div>
        </div>
        <button
          type={"button"}
          onClick={() => p.collapsed.set(!p.collapsed.get())}
          title={isOpen() ? ttt("Close sidebar") : ttt("Open sidebar")}
          aria-label={isOpen() ? ttt("Close sidebar") : ttt("Open sidebar")}
          aria-expanded={isOpen()}
          class={classArr(
            "flex items-center justify-center shrink-0 size-8 rounded-md cursor-pointer", // layout
            "hover:bg-black/5 dark:hover:bg-white/10", // hover
          )}
        >
          <Icon
            path={mdiChevronLeft}
            class={classArr("size-5 transition-transform", motion, !isOpen() && "rotate-180")}
          />
        </button>
      </div>

      <nav class={"flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2"}>
        <Key each={p.groups} by={"label"}>
          {(group) => {
            const drawerOpen = () => drawerState()[group().label] ?? group().defaultOpen ?? false
            const setDrawerOpen = (open: boolean) => setDrawerState((s) => ({ ...s, [group().label]: open }))
            // The rail mirrors the drawer: a closed drawer collapses to one group icon with a flyout.
            const itemsVisible = () => !group().collapsible || drawerOpen()
            const railGroupVisible = () => !isOpen() && !!group().collapsible && !drawerOpen()
            const labelClass = "px-2 pb-1 text-xs font-semibold text-muted-foreground whitespace-nowrap"
            return (
              <Collapsible open={isOpen() || group().items.length > 0}>
                <div class={"flex flex-col gap-0.5 pb-4"}>
                  <Collapsible open={isOpen()}>
                    <Show
                      when={group().collapsible}
                      fallback={<h3 class={classArr(labelClass, fade())}>{group().label}</h3>}
                    >
                      <h3 class={fade()}>
                        <button
                          type={"button"}
                          onClick={() => setDrawerOpen(!drawerOpen())}
                          aria-expanded={drawerOpen()}
                          class={classArr(
                            labelClass,
                            "flex items-center gap-1 w-full rounded-md cursor-pointer text-left", // layout
                            "hover:text-neutral-950 dark:hover:text-neutral-50", // hover
                          )}
                        >
                          <span class={"truncate"}>{group().label}</span>
                          <Icon
                            path={mdiChevronDown}
                            class={classArr(
                              "size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
                              !drawerOpen() && "-rotate-90",
                            )}
                          />
                        </button>
                      </h3>
                    </Show>
                  </Collapsible>
                  <Show when={group().collapsible}>
                    <Collapsible open={railGroupVisible()}>
                      <RailGroupButton group={group()} accentColor={p.accentColor} />
                    </Collapsible>
                  </Show>
                  <Collapsible open={itemsVisible()}>
                    <div class={"flex flex-col gap-0.5"}>
                      <Key each={group().items} by={"label"}>
                        {(item) => (
                          <NavItemButton
                            item={item()}
                            accentColor={p.accentColor}
                            title={isOpen() ? undefined : item().label}
                            labelClass={fade()}
                          />
                        )}
                      </Key>
                    </div>
                  </Collapsible>
                </div>
              </Collapsible>
            )
          }}
        </Key>
      </nav>

      <Show when={p.userName || p.userInitials}>
        <div class={"border-t border-border p-1.5"}>
          <Show
            when={userMenu()}
            fallback={
              <UserButton
                userName={p.userName}
                userInitials={p.userInitials}
                onUserClick={p.onUserClick}
                isOpen={isOpen()}
                fade={fade()}
              />
            }
          >
            <Popover
              open={menu.open()}
              onOpenChange={menu.setOpen}
              placement={isOpen() ? "top-start" : "right-end"}
              floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
            >
              <Popover.Trigger
                as={UserButton}
                onClick={menu.onTriggerClick}
                userName={p.userName}
                userInitials={p.userInitials}
                onUserClick={p.onUserClick}
                isOpen={isOpen()}
                fade={fade()}
              />
              <Popover.Portal>
                <Popover.Content
                  class={classArr(
                    "z-50 p-3 rounded-xl border border-border shadow-lg", // layout
                    "bg-white dark:bg-[#111111]", // background
                    menu.contentClass(),
                  )}
                >
                  {userMenu()}
                </Popover.Content>
              </Popover.Portal>
            </Popover>
          </Show>
        </div>
      </Show>
    </aside>
  )
}

const navButtonClass = classArr(
  "relative flex items-center gap-2 h-8 px-2 rounded-md cursor-pointer text-sm text-left", // layout
  "font-medium text-neutral-950 dark:text-neutral-50", // text
  "hover:bg-black/5 dark:hover:bg-white/10", // hover
)

/** Rounded accent bar left of an active entry. */
function AccentBar(p: { active: boolean; accentColor?: string }) {
  return (
    <span
      aria-hidden={true}
      style={p.accentColor ? { "background-color": p.accentColor } : undefined}
      class={classArr(
        "absolute -left-1.5 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full", // layout
        !p.accentColor && "bg-blue-600 dark:bg-blue-500", // color
        "transition-[transform,opacity,background-color] duration-200 ease-out motion-reduce:transition-none", // animation
        p.active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
      )}
    />
  )
}

type NavItemButtonProps = {
  item: AppSidebarNavItem
  accentColor?: string
  title?: string
  labelClass?: string
  onSelect?: () => void
}

/** One navigation entry: accent bar, icon and label. */
function NavItemButton(p: NavItemButtonProps) {
  return (
    <button
      type={"button"}
      onClick={() => {
        p.item.onClick?.()
        p.onSelect?.()
      }}
      title={p.title}
      aria-label={p.item.label}
      aria-current={p.item.isActive ? "page" : undefined}
      class={classArr(navButtonClass, p.item.isActive && "bg-black/5 dark:bg-white/10")}
    >
      <AccentBar active={!!p.item.isActive} accentColor={p.accentColor} />
      <Icon path={p.item.icon} class={"size-4"} />
      <span class={classArr("truncate whitespace-nowrap", p.labelClass)}>{p.item.label}</span>
    </button>
  )
}

/** Icon-rail stand-in for a closed drawer: one group icon that opens a flyout with its items. */
function RailGroupButton(p: { group: AppSidebarNavGroup; accentColor?: string }) {
  const flyout = createFlyoutState()
  const hasActive = () => p.group.items.some((i) => i.isActive)
  const icon = () => p.group.icon ?? p.group.items[0]?.icon
  return (
    <Popover
      open={flyout.open()}
      onOpenChange={flyout.setOpen}
      placement={"right-start"}
      floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
    >
      <Popover.Trigger
        onClick={flyout.onTriggerClick}
        title={p.group.label}
        aria-label={p.group.label}
        class={classArr(navButtonClass, "w-full", (hasActive() || flyout.open()) && "bg-black/5 dark:bg-white/10")}
      >
        <AccentBar active={hasActive()} accentColor={p.accentColor} />
        <Show when={icon()}>{(path) => <Icon path={path()} class={"size-4"} />}</Show>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          class={classArr(
            "z-50 flex flex-col gap-0.5 min-w-44 max-w-64 max-h-[70vh] overflow-y-auto px-2.5 py-1.5", // layout
            "rounded-xl border border-border shadow-lg bg-white dark:bg-[#111111]", // look
            flyout.contentClass(),
          )}
        >
          <Popover.Label class={"px-2 pt-1 pb-1 text-xs font-semibold text-muted-foreground whitespace-nowrap"}>
            {p.group.label}
          </Popover.Label>
          <Key each={p.group.items} by={"label"}>
            {(item) => (
              <NavItemButton item={item()} accentColor={p.accentColor} onSelect={() => flyout.setOpen(false)} />
            )}
          </Key>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}

/** Animates its child's height to/from 0 via the grid-rows 0fr/1fr trick. */
function Collapsible(p: { open: boolean; children: JSXElement }) {
  return (
    <div
      class={classArr(
        "grid transition-[grid-template-rows,opacity]", // layout + animation
        motion,
        p.open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      aria-hidden={!p.open}
    >
      {/* -mx-2 px-2: extend the clip box into the nav padding so the active accent bar is not cut off */}
      <div class={"min-h-0 overflow-hidden -mx-2 px-2"}>{p.children}</div>
    </div>
  )
}

type UserButtonProps = Pick<AppSidebarProps, "userName" | "userInitials" | "onUserClick"> &
  ComponentProps<"button"> & { isOpen: boolean; fade: string }

/** Footer button with avatar initials and name; also used as popover trigger. */
function UserButton(p: UserButtonProps) {
  const [s, rest] = splitProps(p, ["userName", "userInitials", "onUserClick", "isOpen", "fade", "class"])
  return (
    <button
      type={"button"}
      title={s.userName}
      {...rest}
      onClick={(e) => {
        s.onUserClick?.()
        if (typeof rest.onClick === "function") rest.onClick(e)
      }}
      class={classArr(
        "flex items-center gap-2 w-full rounded-md p-1 cursor-pointer text-sm text-left", // layout
        "font-medium text-neutral-950 dark:text-neutral-50", // text
        "hover:bg-black/5 dark:hover:bg-white/10 data-expanded:bg-black/5 dark:data-expanded:bg-white/10", // hover
      )}
    >
      <Show when={s.userInitials}>
        <span
          class={classArr(
            "flex items-center justify-center size-7 shrink-0 rounded-full", // layout
            "bg-black/5 dark:bg-white/10 text-xs font-semibold", // look
          )}
        >
          {s.userInitials}
        </span>
      </Show>
      <Show when={s.userName}>
        <span class={classArr("flex min-w-0 items-center gap-2", s.fade)}>
          <Icon path={mdiAccountCircleOutline} class={"size-4"} />
          <span class={"truncate whitespace-nowrap"}>{s.userName}</span>
        </span>
      </Show>
    </button>
  )
}

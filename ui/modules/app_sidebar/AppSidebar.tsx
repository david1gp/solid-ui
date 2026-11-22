import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiDotsHorizontal } from "@adaptive-ds/mdi/mdiDotsHorizontal.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import Popover from "@corvu-next/popover"
import {
  children,
  createEffect,
  createMemo,
  createSignal,
  type Element as JSXElement,
  For,
  omit,
  Show,
  untrack,
} from "solid-js"
import { ttt } from "#ui/i18n/ttt.js"
import { AppSidebarAccentBar } from "#ui/modules/app_sidebar/AppSidebarAccentBar.jsx"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"
import { appSidebarFilterGroups } from "#ui/modules/app_sidebar/appSidebarFilterGroups.js"
import { appSidebarNavButtonClass } from "#ui/modules/app_sidebar/appSidebarNavButtonClass.js"
import { createFlyoutState } from "#ui/modules/app_sidebar/createFlyoutState.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { type ComponentProps } from "@solidjs/web"

export interface AppSidebarProps extends MayHaveClass {
  /** true = icon-only rail. */
  collapsed: SignalObject<boolean>
  logo: JSXElement
  brand: JSXElement
  groups: AppSidebarNavGroup[]
  userName?: string
  userInitials?: string
  userAvatar?: JSXElement
  userImageUrl?: string
  onUserClick?: () => void
  /** Popover body opened by clicking the user footer, e.g. <AppSidebarUserMenu />. */
  userMenu?: JSXElement
  /** CSS color of the active item's accent bar; defaults to blue. */
  accentColor?: string
  /** Show a search field below the header that filters groups and entries; defaults to true. */
  searchable?: boolean
  /** Placeholder of the search field; defaults to "Search". */
  searchPlaceholder?: string
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
  const [accountTrigger, setAccountTrigger] = createSignal<HTMLElement>()
  // Drawer state keyed by group label, so it survives `groups` being re-created on every update.
  const [drawerState, setDrawerState] = createSignal<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = createSignal("")
  // The filter only applies while the field is visible, so the icon rail always shows everything.
  const activeQuery = () => (isOpen() && p.searchable !== false ? searchQuery().trim() : "")
  const isSearching = () => activeQuery() !== ""
  const groups = () => appSidebarFilterGroups(p.groups, activeQuery())
  let searchInput: HTMLInputElement | undefined
  const openSearch = () => {
    p.collapsed.set(false)
    queueMicrotask(() => searchInput?.focus())
  }
  // Resolve once so the menu keeps its state (e.g. selections) across close/reopen.
  const userMenu = children(() => p.userMenu)
  const fade = () => classArr("transition-opacity", motion, isOpen() ? "opacity-100" : "opacity-0")
  return (
    <aside
      style={p.accentColor ? { "--app-sidebar-accent": p.accentColor } : undefined}
      class={classArr(
        "flex flex-col shrink-0 h-full overflow-hidden", // layout
        "bg-neutral-50 dark:bg-[#202124]", // background
        "border-r border-neutral-200 dark:border-white/10", // border
        "transition-[width]", // animation
        motion,
        isOpen() ? "w-56" : "w-12",
        p.class,
      )}
    >
      <div class={"flex items-center h-11 px-2"}>
        <div
          class={classArr("flex flex-1 min-w-0 items-center gap-2 overflow-hidden", fade())}
          aria-hidden={isOpen() ? "false" : "true"}
        >
          <span class={"shrink-0 pl-1"}>{p.logo}</span>
          <div class={"min-w-0 truncate whitespace-nowrap text-base font-semibold"}>{p.brand}</div>
        </div>
        <button
          type={"button"}
          onClick={() => p.collapsed.set(!p.collapsed.get())}
          title={isOpen() ? ttt("Close sidebar") : ttt("Open sidebar")}
          aria-label={isOpen() ? ttt("Close sidebar") : ttt("Open sidebar")}
          aria-expanded={isOpen() ? "true" : "false"}
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

      <Show when={p.searchable !== false}>
        <div class={"px-2 pt-1"}>
          <Collapsible open={isOpen()}>
            <SearchField
              ref={(el) => {
                searchInput = el
              }}
              value={searchQuery()}
              onInput={setSearchQuery}
              placeholder={p.searchPlaceholder ?? ttt("Search")}
            />
          </Collapsible>
          <Collapsible open={!isOpen()}>
            <button
              type={"button"}
              onClick={openSearch}
              title={ttt("Search")}
              aria-label={ttt("Search")}
              class={classArr(appSidebarNavButtonClass, "w-full")}
            >
              <Icon path={mdiMagnify} class={"size-4"} />
            </button>
          </Collapsible>
        </div>
      </Show>

      <nav tabindex={-1} class={"flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2"}>
        <Show when={isSearching() && groups().length === 0}>
          <p class={"px-2 py-1 text-sm text-muted-foreground whitespace-nowrap"}>{ttt("No results")}</p>
        </Show>
        <For each={groups()} keyed={(group) => group.label}>
          {(group) => {
            const drawerOpen = () => isSearching() || (drawerState()[group().label] ?? group().defaultOpen ?? false)
            const setDrawerOpen = (open: boolean) => setDrawerState((s) => ({ ...s, [group().label]: open }))
            // The rail mirrors the drawer: a closed drawer collapses to one group icon with a flyout.
            const itemsVisible = () => !group().collapsible || drawerOpen()
            const railGroupVisible = () => !isOpen() && !!group().collapsible && !drawerOpen()
            const labelClass = "px-2 pb-1 text-xs font-semibold text-muted-foreground whitespace-nowrap"
            return (
              <Collapsible open={isOpen() || group().items.length > 0 || !!group().addItem}>
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
                          aria-expanded={drawerOpen() ? "true" : "false"}
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
                      <GroupItems
                        group={group()}
                        accentColor={p.accentColor}
                        showLabels={isOpen()}
                        labelClass={fade()}
                      />
                    </div>
                  </Collapsible>
                </div>
              </Collapsible>
            )
          }}
        </For>
      </nav>

      <Show when={p.userName || p.userInitials || p.userAvatar || p.userImageUrl}>
        {/* px-1 + button p-1 = 8px inset: centers the 32px avatar in the 48px rail, aligned with the toggle button */}
        <div class={"border-t border-neutral-200 dark:border-white/10 px-1 py-1.5"}>
          <Show
            when={userMenu()}
            fallback={
              <UserButton
                userName={p.userName}
                userInitials={p.userInitials}
                userAvatar={p.userAvatar}
                userImageUrl={p.userImageUrl}
                onUserClick={p.onUserClick}
                isOpen={isOpen()}
                fade={fade()}
              />
            }
          >
            <Popover
              open={menu.open()}
              onOpenChange={menu.setOpen}
              finalFocusEl={accountTrigger()}
              placement={isOpen() ? "top-start" : "right-end"}
              floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
            >
              <Popover.Trigger
                as={UserButton}
                ref={setAccountTrigger}
                onClick={menu.onTriggerClick}
                userName={p.userName}
                userInitials={p.userInitials}
                userAvatar={p.userAvatar}
                userImageUrl={p.userImageUrl}
                onUserClick={p.onUserClick}
                isOpen={isOpen()}
                fade={fade()}
              />
              <Popover.Portal>
                <Popover.Content
                  class={classArr(
                    "z-50 p-3 rounded-xl border border-neutral-200 dark:border-white/10 shadow-lg", // layout
                    "bg-white dark:bg-[#202124]", // background
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

type NavItemButtonProps = {
  item: AppSidebarNavItem
  accentColor?: string
  title?: string
  labelClass?: string
  onSelect?: () => void
  draggable?: boolean
  dragging?: boolean
  dropBefore?: boolean
  dropAfter?: boolean
  onDragStart?: (event: DragEvent) => void
  onDragOver?: (event: DragEvent) => void
  onDrop?: (event: DragEvent) => void
  onDragEnd?: () => void
  onKeyDown?: (event: KeyboardEvent) => void
  onDelete?: () => void
  onMove?: (direction: number) => void
  canMoveUp?: boolean
  canMoveDown?: boolean
  /** Called when inline rename starts, e.g. to cancel a pending flyout close from the double-click's first click. */
  onEditStart?: () => void
}

/** Token of the entry whose options menu is open; shared so at most one menu is open. */
const [openItemMenu, setOpenItemMenu] = createSignal<symbol>()

/** One navigation entry: accent bar, icon and label; optionally renamable inline. */
function NavItemButton(p: NavItemButtonProps) {
  // Memo (owned by the component): conditional JSX props are compiled to memo getters, and reading
  // them from event handlers would create unowned computations.
  const canRename = createMemo(() => !!p.item.onRename && !p.title)
  // Only the visible, labelled instance may auto-edit; hidden copies (collapsed rail) must not steal focus.
  const [editing, setEditing] = createSignal(untrack(() => !!p.item.autoEdit && canRename()))
  let button: HTMLButtonElement | undefined
  let trigger: HTMLButtonElement | undefined
  let menuContent: HTMLDivElement | undefined
  // dragstart fires on the draggable wrapper, not on the trigger, so remember where the press began.
  let pressOnTrigger = false
  const menu = createFlyoutState()
  // Memo for the same reason as canRename: read from the contextmenu handler.
  const hasMenu = createMemo(() => !p.title && (!!p.item.onRename || !!p.item.onDelete || !!p.draggable))
  const focusFirstMenuItem = () =>
    // The content mounts after the open state flips; wait a frame so the menu items exist.
    requestAnimationFrame(() =>
      menuContent?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus(),
    )
  const menuToken = Symbol()
  const setMenuOpen = (open: boolean) => {
    if (open) setOpenItemMenu(menuToken)
    menu.setOpen(open)
  }
  // Only one entry menu at a time: opening another one (e.g. via right-click) closes this one.
  createEffect(openItemMenu, (token) => {
    if (token !== menuToken && untrack(menu.open)) menu.setOpen(false)
  })
  // Escape must close the menu even when focus did not move into it (e.g. after a right-click).
  createEffect(menu.open, (open) => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return
      event.preventDefault()
      menu.setOpen(false)
      trigger?.focus()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  })
  const openMenu = () => {
    setMenuOpen(true)
    focusFirstMenuItem()
  }
  const startEditing = () => {
    if (!canRename()) return
    p.onEditStart?.()
    setEditing(true)
  }
  const finish = (value: string | undefined) => {
    if (!editing()) return
    setEditing(false)
    const label = value?.trim()
    if (label && label !== p.item.label) p.item.onRename?.(label)
    // Keep focus on the entry so focus-outside handlers (e.g. the flyout popover) don't dismiss.
    queueMicrotask(() => button?.focus())
  }
  return (
    <Show
      when={editing()}
      fallback={
        <div
          class={classArr(
            "relative group",
            p.dragging && "opacity-40",
            p.dropBefore &&
              "before:absolute before:z-10 before:inset-x-1 before:top-0 before:h-0.5 before:bg-[var(--app-sidebar-accent,var(--color-blue-500))]",
            p.dropAfter &&
              "after:absolute after:z-10 after:inset-x-1 after:bottom-0 after:h-0.5 after:bg-[var(--app-sidebar-accent,var(--color-blue-500))]",
          )}
          draggable={p.draggable ? "true" : undefined}
          onDragStart={(event) => {
            if (pressOnTrigger) {
              event.preventDefault()
              return
            }
            p.onDragStart?.(event)
          }}
          onPointerDown={() => {
            pressOnTrigger = false
          }}
          onDragOver={p.onDragOver}
          onDrop={p.onDrop}
          onDragEnd={p.onDragEnd}
          onContextMenu={(event) => {
            if (!hasMenu()) return
            event.preventDefault()
            openMenu()
          }}
        >
          <button
            ref={button}
            type={"button"}
            onClick={() => {
              p.item.onClick?.()
              p.onSelect?.()
            }}
            onDblClick={startEditing}
            title={p.title}
            onKeyDown={(event) => {
              if ((event.key === "Delete" || event.key === "Backspace") && p.item.onDelete) {
                event.preventDefault()
                p.onDelete?.()
                return
              }
              if (event.key === "F2" && canRename()) {
                event.preventDefault()
                startEditing()
                return
              }
              p.onKeyDown?.(event)
              // Reordering moves the DOM node, which drops focus; keep it on the moved entry.
              if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown"))
                queueMicrotask(() => button?.focus())
            }}
            aria-label={p.item.label}
            data-nav-entry={""}
            aria-current={p.item.isActive ? "page" : undefined}
            aria-keyshortcuts={
              [p.draggable && "Alt+ArrowUp Alt+ArrowDown", canRename() && "F2", p.item.onDelete && "Delete"]
                .filter(Boolean)
                .join(" ") || undefined
            }
            class={classArr(
              appSidebarNavButtonClass,
              "w-full min-w-0",
              hasMenu() && "pr-9",
              p.item.isActive && "bg-black/5 dark:bg-white/15",
            )}
          >
            <AppSidebarAccentBar active={!!p.item.isActive} accentColor={p.accentColor} />
            <Icon path={p.item.icon} class={"size-4"} />
            <span class={classArr("min-w-0 truncate whitespace-nowrap", p.labelClass)}>{p.item.label}</span>
          </button>
          <Show when={hasMenu()}>
            <Popover
              open={menu.open()}
              onOpenChange={setMenuOpen}
              restoreFocus={false}
              placement={"bottom-end"}
              floatingOptions={{ offset: 4, flip: true, shift: { padding: 8 } }}
            >
              <Popover.Trigger
                ref={trigger}
                type={"button"}
                draggable="false"
                onPointerDown={(event) => {
                  event.stopPropagation()
                  pressOnTrigger = true
                }}
                onDragStart={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
                onClick={(event) => {
                  menu.onTriggerClick(event)
                  if (!menu.open()) focusFirstMenuItem()
                }}
                aria-label={`${ttt("Options for")} ${p.item.label}`}
                aria-haspopup={"menu"}
                class={classArr(
                  // focus-visible, not focus: flyouts auto-focus their first entry on a mouse open, which must not reveal the dots.
                  "absolute right-1 top-1 size-6 flex items-center justify-center rounded cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 focus-visible:opacity-100 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 [@media(hover:none)]:opacity-100",
                  p.item.isActive || menu.open() ? "opacity-100" : "opacity-0",
                )}
              >
                <Icon path={mdiDotsHorizontal} class={"size-4"} />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  ref={menuContent}
                  role={"menu"}
                  data-sidebar-item-menu={""}
                  aria-label={`${ttt("Options for")} ${p.item.label}`}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault()
                      event.stopPropagation()
                      menu.setOpen(false)
                      trigger?.focus()
                      return
                    }
                    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
                    event.preventDefault()
                    const buttons = Array.from(
                      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
                    )
                    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? buttons.length - 1
                          : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length
                    buttons[next]?.focus()
                  }}
                  class={classArr(
                    "z-60 min-w-44 p-1 rounded-xl border border-neutral-200 dark:border-white/10 shadow-lg bg-white dark:bg-[#202124]",
                    menu.contentClass(),
                  )}
                >
                  <Show when={canRename()}>
                    <MenuItem
                      label={ttt("Rename")}
                      shortcut={"F2"}
                      onClick={() => {
                        menu.setOpen(false)
                        startEditing()
                      }}
                    />
                  </Show>
                  <Show when={p.draggable}>
                    <MenuItem
                      label={ttt("Move up")}
                      shortcut={"Alt+↑"}
                      disabled={!p.canMoveUp}
                      onClick={() => {
                        p.onMove?.(-1)
                        menu.setOpen(false)
                        trigger?.focus()
                      }}
                    />
                    <MenuItem
                      label={ttt("Move down")}
                      shortcut={"Alt+↓"}
                      disabled={!p.canMoveDown}
                      onClick={() => {
                        p.onMove?.(1)
                        menu.setOpen(false)
                        trigger?.focus()
                      }}
                    />
                  </Show>
                  <Show when={p.item.onDelete}>
                    <Show when={canRename() || p.draggable}>
                      <div role={"separator"} class={"my-1 border-t border-neutral-200 dark:border-white/10"} />
                    </Show>
                    <MenuItem
                      label={ttt("Delete")}
                      shortcut={ttt("Del")}
                      destructive
                      onClick={() => {
                        menu.setOpen(false)
                        p.onDelete?.()
                      }}
                    />
                  </Show>
                </Popover.Content>
              </Popover.Portal>
            </Popover>
          </Show>
        </div>
      }
    >
      <div class={classArr(appSidebarNavButtonClass, "cursor-text bg-black/5 dark:bg-white/15")}>
        <AppSidebarAccentBar active={!!p.item.isActive} accentColor={p.accentColor} />
        <Icon path={p.item.icon} class={"size-4"} />
        <input
          ref={(el) => {
            queueMicrotask(() => {
              el.focus()
              el.select()
            })
          }}
          value={p.item.label}
          aria-label={ttt("Rename")}
          onKeyDown={(event) => {
            event.stopPropagation()
            if (event.key === "Enter") {
              event.preventDefault()
              finish(event.currentTarget.value)
            } else if (event.key === "Escape") {
              event.preventDefault()
              finish(undefined)
            }
          }}
          onBlur={(event) => finish(event.currentTarget.value)}
          class={classArr(
            "min-w-0 flex-1 -mx-1 px-1 h-6 rounded bg-white dark:bg-black", // layout
            "outline-none ring-1 ring-[var(--app-sidebar-accent,var(--color-blue-500))] text-sm font-medium", // look
          )}
        />
      </div>
    </Show>
  )
}

function MenuItem(p: {
  label: string
  shortcut: string
  disabled?: boolean
  destructive?: boolean
  onClick: () => void
}) {
  return (
    <button
      type={"button"}
      role={"menuitem"}
      disabled={p.disabled}
      onClick={p.onClick}
      class={classArr(
        "flex w-full items-center justify-between gap-6 rounded-md px-2 py-1.5 text-sm text-left hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/10 outline-none disabled:opacity-40",
        p.destructive && "text-red-600 dark:text-red-400",
      )}
    >
      <span>{p.label}</span>
      <span class={"text-xs text-muted-foreground"}>{p.shortcut}</span>
    </button>
  )
}

/** Shared drawer/flyout entries; onReorder uses final destination indices. */
function GroupItems(p: {
  group: AppSidebarNavGroup
  accentColor?: string
  showLabels: boolean
  labelClass?: string
  onSelect?: () => void
  onEditStart?: () => void
  onEmptyFocus?: () => void
}) {
  let groupElement: HTMLDivElement | undefined
  const [dragged, setDragged] = createSignal<string>()
  const [target, setTarget] = createSignal<string>()
  const items = () => p.group.items.map((item) => ({ ...item, key: item.id ?? item.label }))
  const move = (from: string, to: string) => {
    const current = items()
    const fromIndex = current.findIndex((item) => item.key === from)
    const toIndex = current.findIndex((item) => item.key === to)
    if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) p.group.onReorder?.(fromIndex, toIndex)
  }
  const clear = () => {
    setDragged(undefined)
    setTarget(undefined)
  }
  return (
    <div ref={groupElement} class={"flex flex-col gap-0.5"} tabindex={-1}>
      <For each={items()} keyed={(item) => item.key}>
        {(item) => (
          <NavItemButton
            item={item()}
            accentColor={p.accentColor}
            title={p.showLabels ? undefined : item().label}
            labelClass={p.labelClass}
            onSelect={p.onSelect}
            onEditStart={p.onEditStart}
            onDelete={() => {
              const buttons = Array.from(groupElement?.querySelectorAll<HTMLButtonElement>("[data-nav-entry]") ?? [])
              const index = items().findIndex((i) => i.key === item().key)
              const next =
                buttons[index + 1] ??
                buttons[index - 1] ??
                groupElement?.querySelector<HTMLButtonElement>("[data-nav-add]")
              const nav = groupElement?.closest<HTMLElement>("nav")
              item().onDelete?.()
              queueMicrotask(() => {
                if (next?.isConnected) next.focus()
                else if (groupElement?.isConnected) groupElement.focus()
                else if (p.onEmptyFocus) p.onEmptyFocus()
                else nav?.focus()
              })
            }}
            onMove={(direction) => {
              const current = items()
              const index = current.findIndex((i) => i.key === item().key)
              const next = current[index + direction]
              if (next) move(item().key, next.key)
            }}
            canMoveUp={items().findIndex((i) => i.key === item().key) > 0}
            canMoveDown={items().findIndex((i) => i.key === item().key) < items().length - 1}
            draggable={!!p.group.onReorder}
            dragging={dragged() === item().key}
            dropBefore={
              target() === item().key &&
              items().findIndex((i) => i.key === dragged()) > items().findIndex((i) => i.key === item().key)
            }
            dropAfter={
              target() === item().key &&
              items().findIndex((i) => i.key === dragged()) < items().findIndex((i) => i.key === item().key)
            }
            onDragStart={(event) => {
              if (!p.group.onReorder) return
              setDragged(item().key)
              event.dataTransfer?.setData("text/plain", item().key)
              if (event.dataTransfer) event.dataTransfer.effectAllowed = "move"
            }}
            onDragOver={(event) => {
              if (!dragged()) return
              event.preventDefault()
              setTarget(item().key)
            }}
            onDrop={(event) => {
              if (!dragged()) return
              event.preventDefault()
              move(dragged()!, item().key)
              clear()
            }}
            onDragEnd={clear}
            onKeyDown={(event) => {
              if (!p.group.onReorder || !event.altKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return
              event.preventDefault()
              const current = items()
              const index = current.findIndex((i) => i.key === item().key)
              const next = current[index + (event.key === "ArrowUp" ? -1 : 1)]
              if (next) move(item().key, next.key)
            }}
          />
        )}
      </For>
      <Show when={p.showLabels && p.group.addItem}>
        {(add) => (
          <button
            type={"button"}
            onClick={() => add().onAdd()}
            data-nav-add={""}
            class={classArr(appSidebarNavButtonClass, "text-neutral-500 dark:text-neutral-400")}
          >
            <Icon path={add().icon ?? mdiPlus} class={"size-4"} />
            <span class={"truncate whitespace-nowrap"}>{add().label}</span>
          </button>
        )}
      </Show>
    </div>
  )
}

/** Icon-rail stand-in for a closed drawer: one group icon that opens a flyout with its items. */
function RailGroupButton(p: { group: AppSidebarNavGroup; accentColor?: string }) {
  const flyout = createFlyoutState()
  const [trigger, setTrigger] = createSignal<HTMLElement>()
  const hasActive = () => p.group.items.some((i) => i.isActive)
  const icon = () => p.group.icon ?? p.group.items[0]?.icon ?? (p.group.addItem ? mdiPlus : undefined)
  return (
    <Popover
      open={flyout.open()}
      onOpenChange={flyout.setOpen}
      finalFocusEl={trigger()}
      onOutsidePointer={(event) => {
        if (event.target instanceof Element && event.target.closest("[data-sidebar-item-menu]")) event.preventDefault()
      }}
      placement={"right-start"}
      floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
    >
      <Popover.Trigger
        ref={setTrigger}
        onClick={flyout.onTriggerClick}
        title={p.group.label}
        aria-label={p.group.label}
        class={classArr(
          appSidebarNavButtonClass,
          "w-full",
          (hasActive() || flyout.open()) && "bg-black/5 dark:bg-white/15",
        )}
      >
        <AppSidebarAccentBar active={hasActive()} accentColor={p.accentColor} />
        <Show when={icon()}>{(path) => <Icon path={path()} class={"size-4"} />}</Show>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          class={classArr(
            "z-50 flex flex-col gap-0.5 min-w-44 max-w-64 max-h-[70vh] overflow-y-auto px-2.5 py-1.5", // layout
            "rounded-xl border border-neutral-200 dark:border-white/10 shadow-lg bg-white dark:bg-[#202124]", // look
            flyout.contentClass(),
          )}
        >
          <Popover.Label class={"px-2 pt-1 pb-1 text-xs font-semibold text-muted-foreground whitespace-nowrap"}>
            {p.group.label}
          </Popover.Label>
          <GroupItems
            group={p.group}
            accentColor={p.accentColor}
            showLabels={true}
            onSelect={() => flyout.setOpen(false)}
            onEditStart={() => flyout.setOpen(true)}
            onEmptyFocus={() => trigger()?.closest<HTMLElement>("nav")?.focus()}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}

/** Sidebar search input with magnifier icon and clear button; Escape clears the query. */
function SearchField(p: {
  ref: (el: HTMLInputElement) => void
  value: string
  onInput: (value: string) => void
  placeholder: string
}) {
  return (
    <div
      class={classArr(
        "flex items-center gap-2 h-8 px-2 rounded-md", // layout
        "bg-black/5 dark:bg-white/10 focus-within:ring-1 focus-within:ring-[var(--app-sidebar-accent,var(--color-blue-500))]", // look
      )}
    >
      <Icon path={mdiMagnify} class={"size-4 shrink-0 text-muted-foreground"} />
      <input
        ref={p.ref}
        type={"search"}
        value={p.value}
        onInput={(event) => p.onInput(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && p.value) {
            event.preventDefault()
            p.onInput("")
          }
        }}
        placeholder={p.placeholder}
        aria-label={p.placeholder}
        class={classArr(
          "min-w-0 flex-1 bg-transparent outline-none text-sm", // layout
          "placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden", // look
        )}
      />
      <Show when={p.value}>
        <button
          type={"button"}
          onClick={() => p.onInput("")}
          title={ttt("Clear search")}
          aria-label={ttt("Clear search")}
          class={
            "flex items-center justify-center shrink-0 size-5 rounded cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
          }
        >
          <Icon path={mdiClose} class={"size-3.5"} />
        </button>
      </Show>
    </div>
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
      aria-hidden={p.open ? "false" : "true"}
      inert={!p.open}
    >
      {/* -mx-2 px-2: extend the clip box into the nav padding so the active accent bar is not cut off */}
      <div class={"min-h-0 overflow-hidden -mx-2 px-2"}>{p.children}</div>
    </div>
  )
}

type UserButtonProps = Pick<
  AppSidebarProps,
  "userName" | "userInitials" | "userAvatar" | "userImageUrl" | "onUserClick"
> &
  ComponentProps<"button"> & { isOpen: boolean; fade: string }

/** Footer button with avatar initials and name; also used as popover trigger. */
function UserButton(p: UserButtonProps) {
  const rest = omit(
    p,
    "userName",
    "userInitials",
    "userAvatar",
    "userImageUrl",
    "onUserClick",
    "isOpen",
    "fade",
    "class",
  )
  return (
    <button
      type={"button"}
      title={p.userName}
      {...rest}
      onClick={(e) => {
        p.onUserClick?.()
        if (typeof rest.onClick === "function") rest.onClick(e)
      }}
      class={classArr(
        "flex items-center gap-2 w-full rounded-md p-1 cursor-pointer text-sm text-left", // layout
        "font-medium text-neutral-950 dark:text-neutral-50", // text
        "hover:bg-black/5 dark:hover:bg-white/10 data-expanded:bg-black/5 dark:data-expanded:bg-white/10", // hover
      )}
    >
      <AppSidebarAvatar userAvatar={p.userAvatar} userImageUrl={p.userImageUrl} userInitials={p.userInitials} />
      <Show when={p.userName}>
        <span class={classArr("min-w-0 truncate whitespace-nowrap", p.fade)}>{p.userName}</span>
      </Show>
    </button>
  )
}

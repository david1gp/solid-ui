import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { mdiPlus } from "@adaptive-ds/mdi/mdiPlus.js"
import Popover from "@corvu/popover"
import { Key } from "@solid-primitives/keyed"
import { type ComponentProps, children, createMemo, createSignal, type JSXElement, Show, splitProps } from "solid-js"
import { ttt } from "#ui/i18n/ttt.js"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import type { AppSidebarNavItem } from "#ui/modules/app_sidebar/AppSidebarNavItem.js"
import { appSidebarFilterGroups } from "#ui/modules/app_sidebar/appSidebarFilterGroups.js"
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
              class={classArr(navButtonClass, "w-full")}
            >
              <Icon path={mdiMagnify} class={"size-4"} />
            </button>
          </Collapsible>
        </div>
      </Show>

      <nav class={"flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2"}>
        <Show when={isSearching() && groups().length === 0}>
          <p class={"px-2 py-1 text-sm text-muted-foreground whitespace-nowrap"}>{ttt("No results")}</p>
        </Show>
        <Key each={groups()} by={"label"}>
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
        </Key>
      </nav>

      <Show when={p.userName || p.userInitials || p.userAvatar || p.userImageUrl}>
        <div class={"border-t border-border p-1.5"}>
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
              placement={isOpen() ? "top-start" : "right-end"}
              floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
            >
              <Popover.Trigger
                as={UserButton}
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
  draggable?: boolean
  dragging?: boolean
  dropBefore?: boolean
  dropAfter?: boolean
  onDragStart?: (event: DragEvent) => void
  onDragOver?: (event: DragEvent) => void
  onDrop?: (event: DragEvent) => void
  onDragEnd?: () => void
  onKeyDown?: (event: KeyboardEvent) => void
  /** Called when inline rename starts, e.g. to cancel a pending flyout close from the double-click's first click. */
  onEditStart?: () => void
}

/** One navigation entry: accent bar, icon and label; optionally renamable inline. */
function NavItemButton(p: NavItemButtonProps) {
  // Memo (owned by the component): conditional JSX props are compiled to memo getters, and reading
  // them from event handlers would create unowned computations.
  const canRename = createMemo(() => !!p.item.onRename && !p.title)
  // Only the visible, labelled instance may auto-edit; hidden copies (collapsed rail) must not steal focus.
  const [editing, setEditing] = createSignal(!!p.item.autoEdit && canRename())
  let button: HTMLButtonElement | undefined
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
        <button
          ref={button}
          type={"button"}
          onClick={() => {
            p.item.onClick?.()
            p.onSelect?.()
          }}
          onDblClick={startEditing}
          title={p.title}
          draggable={p.draggable}
          onDragStart={p.onDragStart}
          onDragOver={p.onDragOver}
          onDrop={p.onDrop}
          onDragEnd={p.onDragEnd}
          onKeyDown={(event) => {
            if (event.key === "F2" && canRename()) {
              event.preventDefault()
              startEditing()
              return
            }
            p.onKeyDown?.(event)
          }}
          aria-label={p.item.label}
          aria-current={p.item.isActive ? "page" : undefined}
          aria-keyshortcuts={
            [p.draggable && "Alt+ArrowUp Alt+ArrowDown", canRename() && "F2"].filter(Boolean).join(" ") || undefined
          }
          class={classArr(
            navButtonClass,
            p.item.isActive && "bg-black/5 dark:bg-white/10",
            p.dragging && "opacity-40",
            p.dropBefore && "before:absolute before:inset-x-1 before:top-0 before:h-0.5 before:bg-blue-500",
            p.dropAfter && "after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:bg-blue-500",
          )}
        >
          <AccentBar active={!!p.item.isActive} accentColor={p.accentColor} />
          <Icon path={p.item.icon} class={"size-4"} />
          <span class={classArr("truncate whitespace-nowrap", p.labelClass)}>{p.item.label}</span>
        </button>
      }
    >
      <div class={classArr(navButtonClass, "cursor-text bg-black/5 dark:bg-white/10")}>
        <AccentBar active={!!p.item.isActive} accentColor={p.accentColor} />
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
            "outline-none ring-1 ring-blue-500 text-sm font-medium", // look
          )}
        />
      </div>
    </Show>
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
}) {
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
    <>
      <Key each={items()} by={"key"}>
        {(item) => (
          <NavItemButton
            item={item()}
            accentColor={p.accentColor}
            title={p.showLabels ? undefined : item().label}
            labelClass={p.labelClass}
            onSelect={p.onSelect}
            onEditStart={p.onEditStart}
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
      </Key>
      <Show when={p.showLabels && p.group.addItem}>
        {(add) => (
          <button
            type={"button"}
            onClick={() => add().onAdd()}
            class={classArr(navButtonClass, "text-neutral-500 dark:text-neutral-400")}
          >
            <Icon path={add().icon ?? mdiPlus} class={"size-4"} />
            <span class={"truncate whitespace-nowrap"}>{add().label}</span>
          </button>
        )}
      </Show>
    </>
  )
}

/** Icon-rail stand-in for a closed drawer: one group icon that opens a flyout with its items. */
function RailGroupButton(p: { group: AppSidebarNavGroup; accentColor?: string }) {
  const flyout = createFlyoutState()
  const hasActive = () => p.group.items.some((i) => i.isActive)
  const icon = () => p.group.icon ?? p.group.items[0]?.icon ?? (p.group.addItem ? mdiPlus : undefined)
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
          <GroupItems
            group={p.group}
            accentColor={p.accentColor}
            showLabels={true}
            onSelect={() => flyout.setOpen(false)}
            onEditStart={() => flyout.setOpen(true)}
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
        "bg-black/5 dark:bg-white/10 focus-within:ring-1 focus-within:ring-blue-500", // look
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
      aria-hidden={!p.open}
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
  const [s, rest] = splitProps(p, [
    "userName",
    "userInitials",
    "userAvatar",
    "userImageUrl",
    "onUserClick",
    "isOpen",
    "fade",
    "class",
  ])
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
      <AppSidebarAvatar userAvatar={s.userAvatar} userImageUrl={s.userImageUrl} userInitials={s.userInitials} />
      <Show when={s.userName}>
        <span class={classArr("min-w-0 truncate whitespace-nowrap", s.fade)}>{s.userName}</span>
      </Show>
    </button>
  )
}

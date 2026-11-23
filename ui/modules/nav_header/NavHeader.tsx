import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiMenu } from "@adaptive-ds/mdi/mdiMenu.js"
import Popover from "@corvu-next/popover"
import { For, type Element as JSXElement, Show } from "solid-js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { ThemeButton } from "#ui/interactive/theme/ThemeButton.jsx"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import type { NavHeaderNavItem } from "#ui/modules/nav_header/NavHeaderNavItem.js"
import { navHeaderStateCreate } from "#ui/modules/nav_header/navHeaderStateCreate.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavHeaderProps extends MayHaveClass {
  logo: JSXElement
  brand: JSXElement
  onBrandClick?: () => void
  items: NavHeaderNavItem[]
  accentColor?: string
  showThemeToggle?: boolean
  loginLabel?: string
  onLogin?: () => void
  userName?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  userMenu?: JSXElement
  actions?: JSXElement
}

/** Responsive top navigation with a collapsible mobile menu. */
export function NavHeader(p: NavHeaderProps) {
  const state = navHeaderStateCreate(() => p.userMenu)
  return (
    <header
      class={classArr(
        "sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#202124]/90",
        p.class,
      )}
      style={p.accentColor ? { "--nav-header-accent": p.accentColor } : undefined}
    >
      <div
        class={
          "mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 md:grid-cols-[auto_1fr_auto] md:px-6"
        }
      >
        <button
          type={"button"}
          onClick={p.onBrandClick}
          class={
            "flex min-w-0 items-center gap-2 py-3 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          }
        >
          <span class={"shrink-0"}>{p.logo}</span>
          <span class={"truncate"}>{p.brand}</span>
        </button>
        <Button
          ref={(el) => state.mobileTrigger.set(el)}
          variant={buttonVariant.ghost}
          class={"md:hidden"}
          aria-label={state.mobileOpen.get() ? "Close navigation" : "Open navigation"}
          aria-expanded={state.mobileOpen.get() ? "true" : "false"}
          aria-controls={state.panelId}
          onClick={() => state.mobileOpen.set(!state.mobileOpen.get())}
        >
          <Icon path={state.mobileOpen.get() ? mdiClose : mdiMenu} class={"size-5"} />
        </Button>
        <div id={state.panelId} class={classArr("col-span-2 pb-4 md:contents", !state.mobileOpen.get() && "hidden")}>
          <nav
            aria-label={"Main navigation"}
            class={"flex flex-col gap-1 md:flex-row md:items-center md:justify-center"}
          >
            <For each={p.items}>{(item) => <NavLink item={item} onSelect={state.closeMobile} />}</For>
          </nav>
          <div
            class={
              "flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-3 mt-3 dark:border-white/10 md:mt-0 md:border-0 md:pt-0"
            }
          >
            {p.actions}
            <Show when={p.showThemeToggle !== false}>
              <ThemeButton />
            </Show>
            <Show
              when={p.userName || p.userInitials || p.userAvatar || p.userImageUrl || p.userMenu}
              fallback={
                <Button
                  variant={buttonVariant.contrast}
                  onClick={() => {
                    state.closeMobile()
                    p.onLogin?.()
                  }}
                >
                  {p.loginLabel ?? "Log in"}
                </Button>
              }
            >
              <Show
                when={state.resolvedUserMenu()}
                fallback={
                  <span class={"flex items-center gap-2"}>
                    <AppSidebarAvatar
                      userAvatar={p.userAvatar}
                      userImageUrl={p.userImageUrl}
                      userInitials={p.userInitials}
                    />
                    <Show when={p.userName}>
                      <span class={"text-sm"}>{p.userName}</span>
                    </Show>
                  </span>
                }
              >
                <Popover
                  open={state.menu().open()}
                  onOpenChange={(open) => state.menu().setOpen(open)}
                  finalFocusEl={state.accountTrigger.get()}
                  placement={"bottom-end"}
                  floatingOptions={{ offset: 8, flip: true, shift: { padding: 8 } }}
                >
                  <Popover.Trigger
                    ref={(el) => state.accountTrigger.set(el)}
                    onClick={(event) => state.menu().onTriggerClick(event)}
                    class={
                      "flex items-center gap-2 rounded-md p-1 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-white/10"
                    }
                    aria-label={p.userName ? `Account: ${p.userName}` : "Account menu"}
                  >
                    <AppSidebarAvatar
                      userAvatar={p.userAvatar}
                      userImageUrl={p.userImageUrl}
                      userInitials={p.userInitials}
                    />
                    <Show when={p.userName}>
                      <span class={"text-sm font-medium"}>{p.userName}</span>
                    </Show>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      class={classArr(
                        "z-50 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg dark:border-white/10 dark:bg-[#202124]",
                        state.menu().contentClass(),
                      )}
                    >
                      {state.resolvedUserMenu()}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink(p: { item: NavHeaderNavItem; onSelect: () => void }) {
  const linkClass = () =>
    classArr(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2",
      p.item.isActive
        ? "text-[var(--nav-header-accent,#2563eb)] bg-black/5 dark:bg-white/10"
        : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10",
    )
  const select = () => {
    p.onSelect()
    p.item.onClick?.()
  }
  return (
    <Show
      when={p.item.href}
      fallback={
        <button
          type={"button"}
          class={linkClass()}
          aria-current={p.item.isActive ? "page" : undefined}
          onClick={select}
        >
          <Show when={p.item.icon}>{(icon) => <Icon path={icon()} class={"size-4"} />}</Show>
          {p.item.label}
        </button>
      }
    >
      {(href) => (
        <a href={href()} class={linkClass()} aria-current={p.item.isActive ? "page" : undefined} onClick={select}>
          <Show when={p.item.icon}>{(icon) => <Icon path={icon()} class={"size-4"} />}</Show>
          {p.item.label}
        </a>
      )}
    </Show>
  )
}

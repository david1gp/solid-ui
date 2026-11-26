import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiMenu } from "@adaptive-ds/mdi/mdiMenu.js"
import Popover from "@corvu-next/popover"
import { For, type Element as JSXElement, Show } from "solid-js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { LinkButtonExternal } from "#ui/interactive/link/LinkButton.jsx"
import { ThemeButton } from "#ui/interactive/theme/ThemeButton.jsx"
import { ThemeSwitch } from "#ui/interactive/theme/ThemeSwitch.jsx"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import type { NavHeaderNavItem } from "#ui/modules/nav_header/NavHeaderNavItem.js"
import { navHeaderStateCreate } from "#ui/modules/nav_header/navHeaderStateCreate.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavHeaderProps extends MayHaveClass {
  logo: JSXElement
  brand?: JSXElement
  onBrandClick?: () => void
  items: NavHeaderNavItem[]
  accentColor?: string
  showThemeToggle?: boolean
  /** Light/dark switch placed before the login buttons or profile; replaces the theme cycle button. */
  showThemeSwitch?: boolean
  loginLabel?: string
  onLogin?: () => void
  registerLabel?: string
  onRegister?: () => void
  ctaLabel?: string
  ctaHref?: string
  onCta?: () => void
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
        "sticky top-0 z-40 w-full border-b border-border bg-background/90 text-foreground backdrop-blur",
        p.class,
      )}
      style={p.accentColor ? { "--nav-header-accent": p.accentColor } : undefined}
    >
      <div
        class={
          "mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 lg:grid-cols-[auto_1fr_auto] lg:px-6"
        }
      >
        <div class={"flex min-w-0 items-center py-2"}>
          <Show when={p.brand !== undefined} fallback={p.logo}>
            <button
              type={"button"}
              onClick={p.onBrandClick}
              class={"flex min-w-0 items-center gap-2 text-left font-semibold"}
            >
              <span class={"shrink-0"}>{p.logo}</span>
              <span class={"truncate"}>{p.brand}</span>
            </button>
          </Show>
        </div>
        <Button
          ref={(el) => state.mobileTrigger.set(el)}
          variant={buttonVariant.ghost}
          class={"lg:hidden"}
          aria-label={state.mobileOpen.get() ? "Close navigation" : "Open navigation"}
          aria-expanded={state.mobileOpen.get() ? "true" : "false"}
          aria-controls={state.panelId}
          onClick={() => state.mobileOpen.set(!state.mobileOpen.get())}
        >
          <Icon path={state.mobileOpen.get() ? mdiClose : mdiMenu} class={"size-5"} />
        </Button>
        <div id={state.panelId} class={classArr("col-span-2 pb-4 lg:contents", !state.mobileOpen.get() && "hidden")}>
          <nav aria-label={"Main navigation"} class={"flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-end"}>
            <For each={p.items}>{(item) => <NavLink item={item} onSelect={state.closeMobile} />}</For>
          </nav>
          <div class={"flex flex-wrap items-center gap-2 border-t border-border pt-3 mt-3 lg:mt-0 lg:border-0 lg:pt-0"}>
            {p.actions}
            <Show when={p.showThemeSwitch}>
              <ThemeSwitch class={"mr-1"} />
            </Show>
            <Show
              when={
                p.showThemeToggle !== false &&
                !p.showThemeSwitch &&
                !(p.userName || p.userInitials || p.userAvatar || p.userImageUrl || p.userMenu)
              }
            >
              <ThemeButton />
            </Show>
            <Show
              when={p.userName || p.userInitials || p.userAvatar || p.userImageUrl || p.userMenu}
              fallback={
                <>
                  <Button
                    variant={buttonVariant.ghost}
                    onClick={() => {
                      state.closeMobile()
                      p.onLogin?.()
                    }}
                  >
                    {p.loginLabel ?? "Log in"}
                  </Button>
                  <Show when={p.onRegister}>
                    <Button
                      variant={p.ctaLabel && (p.ctaHref || p.onCta) ? buttonVariant.outline : buttonVariant.contrast}
                      onClick={() => {
                        state.closeMobile()
                        p.onRegister?.()
                      }}
                    >
                      {p.registerLabel ?? "Register"}
                    </Button>
                  </Show>
                </>
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
                {/* Locking body scroll makes it the header's sticky container instead of the viewport. */}
                <Popover
                  preventScroll={false}
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
                      "flex items-center gap-2 rounded-md p-1 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
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
                        "z-50 rounded-xl border border-border bg-background p-3 shadow-lg",
                        state.menu().contentClass(),
                      )}
                    >
                      {state.resolvedUserMenu()}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover>
              </Show>
            </Show>
            <Show when={p.ctaLabel && (p.ctaHref || p.onCta)}>
              <Show
                when={p.ctaHref}
                fallback={
                  <Button
                    variant={buttonVariant.contrast}
                    class={"w-full lg:w-auto"}
                    onClick={() => {
                      state.closeMobile()
                      p.onCta?.()
                    }}
                  >
                    {p.ctaLabel}
                  </Button>
                }
              >
                {(href) => (
                  <LinkButtonExternal
                    href={href()}
                    variant={buttonVariant.contrast}
                    class={"w-full lg:w-auto"}
                    onClick={() => {
                      state.closeMobile()
                      p.onCta?.()
                    }}
                  >
                    {p.ctaLabel}
                  </LinkButtonExternal>
                )}
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
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2",
      p.item.isActive
        ? "bg-black/5 dark:bg-white/10 text-[var(--nav-header-accent,var(--foreground))] font-medium"
        : "text-muted-foreground hover:bg-black/3 dark:hover:bg-white/5 hover:text-foreground",
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

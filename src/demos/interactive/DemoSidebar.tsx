import { createSidebarState } from "#ui/interactive/sidebar/createSidebarState.jsx"
import { Sidebar, SidebarToggle } from "#ui/interactive/sidebar/index.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classMerge } from "#ui/utils/classMerge.js"
import type { HasChildren } from "#ui/utils/HasChildren.js"
import { mdiAccount, mdiCog, mdiHome, mdiInformation, mdiMail } from "@mdi/js"
import { For } from "solid-js"

export function DemoSidebar() {
  const state = createSidebarState()
  return (
    <div class="flex">
      <Sidebar state={state} title="Demo Sidebar">
        <SidebarContent />
      </Sidebar>
      <main class="flex h-screen w-full flex-col">
        <header class="flex items-center gap-4 border-b border-sidebar-border bg-sidebar p-2">
          <SidebarToggle openDesktop={state.openDesktop} openMobile={state.openMobile} isMobile={state.isMobile} />
          <h1 class="text-lg font-semibold">Sidebar2 Demo</h1>
        </header>
        <MainContent />
      </main>
    </div>
  )
}

function MainContent() {
  return (
    <main class="flex flex-1 items-start justify-left p-2">
      <div class="space-y-6">
        <section>
          <h2 class="mb-3 text-xl font-semibold">Overview</h2>
          <p class="text-muted-foreground">
            Sidebar2 is a resizable sidebar component using Corvu Resizable for desktop and Corvu Dialog for mobile
            overlay. It supports adjustable width and collapsible behavior.
          </p>
        </section>
        <section>
          <h2 class="mb-3 text-xl font-semibold">Features</h2>
          <ul class="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Resizable using Corvu Resizable component</li>
            <li>Collapsible with toggle button</li>
            <li>Mobile overlay using Corvu Dialog</li>
            <li>Separate menu content support for mobile vs desktop</li>
            <li>Customizable width constraints</li>
          </ul>
        </section>
        <section>
          <h2 class="mb-3 text-xl font-semibold">Usage</h2>
          <p class="text-muted-foreground">
            The sidebar accepts <code>menuContent</code> for desktop and
            <code>mobileMenuContent</code> for mobile (falling back to
            <code>menuContent</code> if not provided). The main children are only used on desktop when no{" "}
            <code>menuContent</code> is provided.
          </p>
        </section>
      </div>
    </main>
  )
}

interface NavItem {
  icon?: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

interface NavGroup {
  label: string
  items: NavItem[]
}

function SidebarContent() {
  const navigationGroups: NavGroup[] = [
    {
      label: "Main",
      items: [
        { icon: mdiHome, label: "Home", isActive: true },
        { icon: mdiMail, label: "Messages" },
        { icon: mdiInformation, label: "About" },
      ],
    },
    {
      label: "Settings",
      items: [
        { icon: mdiAccount, label: "Profile" },
        { icon: mdiCog, label: "Settings" },
      ],
    },
  ]
  return (
    <nav class="flex flex-col gap-6">
      <Header>
        <span class="py-1.5">Demo</span>
      </Header>
      <For each={navigationGroups}>
        {(group) => (
          <div class="flex flex-col gap-2">
            <h3 class="text-muted-foreground px-2 text-xs font-semibold uppercase tracking-wide">{group.label}</h3>
            <For each={group.items}>
              {(item) => (
                <button
                  type="button"
                  onClick={item.onClick}
                  class={classMerge(
                    "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  {item.icon && <Icon path={item.icon} class="size-4" />}
                  <span>{item.label}</span>
                </button>
              )}
            </For>
          </div>
        )}
      </For>
    </nav>
  )
}

function Header(p: HasChildren) {
  return (
    <div class="flex items-center gap-4 border-b border-sidebar-border bg-sidebar p-2 text-lg font-semibold">
      {p.children}
    </div>
  )
}

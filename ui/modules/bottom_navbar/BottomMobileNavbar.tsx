import { mdiHome } from "@adaptive-ds/mdi/mdiHome.js"
import { mdiHomeOutline } from "@adaptive-ds/mdi/mdiHomeOutline.js"
import { mdiMagnify } from "@adaptive-ds/mdi/mdiMagnify.js"
import { mdiMovieOpen } from "@adaptive-ds/mdi/mdiMovieOpen.js"
import { mdiMovieOpenOutline } from "@adaptive-ds/mdi/mdiMovieOpenOutline.js"
import { mdiPlusBox } from "@adaptive-ds/mdi/mdiPlusBox.js"
import { mdiPlusBoxOutline } from "@adaptive-ds/mdi/mdiPlusBoxOutline.js"
import { For, Show } from "solid-js"
import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"

const items = [
  { label: "Home", icon: mdiHomeOutline, activeIcon: mdiHome },
  { label: "Search", icon: mdiMagnify, activeIcon: mdiMagnify },
  { label: "Create", icon: mdiPlusBoxOutline, activeIcon: mdiPlusBox },
  { label: "Reels", icon: mdiMovieOpenOutline, activeIcon: mdiMovieOpen },
  { label: "Profile", icon: "", activeIcon: "" },
] as const

/** Five icon-only destinations, positioned at the bottom of a relative container. */
export function BottomMobileNavbar(props: {
  active: (typeof items)[number]["label"]
  onSelect: (item: (typeof items)[number]["label"]) => void
}) {
  return (
    <nav
      aria-label="Main navigation"
      class="absolute inset-x-0 bottom-0 z-10 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] text-foreground"
    >
      <div class="flex items-center justify-around">
        <For each={items}>
          {(item) => (
            <button
              type="button"
              aria-label={item.label}
              aria-current={props.active === item.label ? "page" : undefined}
              onClick={() => props.onSelect(item.label)}
              class="flex min-h-14 min-w-11 flex-1 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
            >
              <Show
                when={item.label === "Profile"}
                fallback={<Icon path={props.active === item.label ? item.activeIcon : item.icon} class="size-7" />}
              >
                <span
                  class={`block size-7 rounded-full ${props.active === item.label ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                >
                  <AppSidebarCssAvatar />
                </span>
              </Show>
            </button>
          )}
        </For>
      </div>
    </nav>
  )
}

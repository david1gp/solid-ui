import { For } from "solid-js"
import { BottomMobileNavbar } from "#ui/modules/bottom_navbar/BottomMobileNavbar.jsx"
import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { demoBottomMobileNavbarStateCreate } from "./demoBottomMobileNavbarStateCreate.js"

export function DemoBottomMobileNavbar() {
  const state = demoBottomMobileNavbarStateCreate()
  return (
    <main data-bottom-mobile-navbar-demo class="flex min-h-dvh items-center justify-center bg-muted sm:p-8">
      <div class="relative h-dvh w-full overflow-hidden bg-background text-foreground sm:h-[min(780px,calc(100dvh_-_4rem))] sm:max-w-[390px] sm:rounded-[2rem] sm:border sm:border-border sm:shadow-xl">
        <div class="h-full overflow-y-auto pb-24">
          <header class="sticky top-0 z-[1] border-b border-border bg-background px-5 py-4">
            <h1 class="text-xl font-semibold">{state.active()}</h1>
          </header>
          <div class="space-y-5 p-5">
            <p class="text-sm text-muted-foreground">
              {state.active() === "Home"
                ? "Your daily inspiration, all in one place."
                : `Explore ${state.active().toLowerCase()} here.`}
            </p>
            <For each={[1, 2, 3]}>
              {(item) => (
                <article class="overflow-hidden rounded-2xl border border-border">
                  <div class="flex items-center gap-3 p-4">
                    <span class="size-9">
                      <AppSidebarCssAvatar />
                    </span>
                    <div>
                      <p class="text-sm font-semibold">{item === 1 ? "Your community" : "A little inspiration"}</p>
                      <p class="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div class="h-44 bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100 dark:from-slate-800 dark:via-indigo-950 dark:to-slate-900" />
                </article>
              )}
            </For>
          </div>
        </div>
        <BottomMobileNavbar active={state.active()} onSelect={state.select} />
      </div>
    </main>
  )
}

import { BottomMobileNavbar } from "#ui/modules/bottom_navbar/BottomMobileNavbar.jsx"
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
        </div>
        <BottomMobileNavbar active={state.active()} onSelect={state.select} />
      </div>
    </main>
  )
}

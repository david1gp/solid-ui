import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { mdiMenu } from "@adaptive-ds/mdi/mdiMenu.js"
import { siteNavHeaderGlassSurfaceClass } from "#src/nav/site_header/siteNavHeaderGlassSurfaceClass.js"
import { siteNavHeaderStateCreate } from "#src/nav/site_header/siteNavHeaderStateCreate.js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { ThemeSwitch } from "#ui/interactive/theme/ThemeSwitch.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import { classArr } from "#ui/utils/classArr.js"

export function SiteNavHeader() {
  const state = siteNavHeaderStateCreate()
  return (
    <header
      class={classArr(
        "sticky top-0 z-40 w-full border-b text-foreground", // layout
        siteNavHeaderGlassSurfaceClass, // frosted glass
      )}
    >
      <div
        class={
          "mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 lg:grid-cols-[auto_1fr_auto] lg:px-6"
        }
      >
        <div class={"flex min-w-0 items-center py-2"}>
          <LogoImageText logoText="adaptive-solid-ui" logoTextClass="text-lg font-semibold" />
        </div>
        <Button
          ref={state.setMobileTrigger}
          variant={buttonVariant.ghost}
          class={"lg:hidden"}
          aria-label={state.mobileOpen() ? "Close navigation" : "Open navigation"}
          aria-expanded={state.mobileOpen() ? "true" : "false"}
          aria-controls={state.panelId}
          onClick={state.toggleMobile}
        >
          <Icon path={state.mobileOpen() ? mdiClose : mdiMenu} class={"size-5"} />
        </Button>
        <div id={state.panelId} class={classArr("col-span-2 pb-4 lg:contents", !state.mobileOpen() && "hidden")}>
          <nav
            aria-label={"Main navigation"}
            class={"flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-center"}
          >
            <a
              href="https://github.com/david1gp/solid-ui"
              target="_blank"
              rel="noopener noreferrer"
              onClick={state.closeMobile}
              class={
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 text-muted-foreground hover:bg-black/3 dark:hover:bg-white/5 hover:text-foreground"
              }
            >
              Code
            </a>
            <a
              href="https://www.npmjs.com/package/@adaptive-ds/solid-ui"
              target="_blank"
              rel="noopener noreferrer"
              onClick={state.closeMobile}
              class={
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 text-muted-foreground hover:bg-black/3 dark:hover:bg-white/5 hover:text-foreground"
              }
            >
              Package
            </a>
          </nav>
          <div class={"flex flex-wrap items-center gap-2 border-t border-border pt-3 mt-3 lg:mt-0 lg:border-0 lg:pt-0"}>
            <ThemeSwitch class={"mr-1"} />
          </div>
        </div>
      </div>
    </header>
  )
}

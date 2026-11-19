import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import type { JSXElement } from "solid-js"
import { ttt } from "#ui/i18n/ttt.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface AppSettingsSidebarProps extends MayHaveClass {
  open: SignalObject<boolean>
  title: JSXElement
  /** Panel body, e.g. <AppSettingsPanel />. */
  children: JSXElement
}

// Same timing as AppSidebar so both sidebars move as one.
const motion = "duration-500 ease-in-out motion-reduce:transition-none"

/**
 * Secondary sidebar that overlays the page right next to AppSidebar, e.g. for settings; the page does not shift.
 * Render it inside a `relative` wrapper around AppSidebar: it is positioned at `left-full` of that wrapper.
 * A backdrop over the page closes it on click. Stays mounted: the width animates between 0 and w-80
 * and the content keeps a fixed width so it slides instead of reflowing.
 */
export function AppSettingsSidebar(p: AppSettingsSidebarProps) {
  const isOpen = () => p.open.get()
  return (
    <>
      <div
        aria-hidden={true}
        onClick={() => p.open.set(false)}
        class={classArr(
          "absolute top-0 left-full z-30 h-full w-screen bg-black/10 dark:bg-black/30", // layout + look
          "transition-opacity", // animation
          motion,
          isOpen() ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        aria-hidden={!isOpen()}
        inert={!isOpen()}
        onKeyDown={(e) => e.key === "Escape" && p.open.set(false)}
        class={classArr(
          "absolute top-0 left-full z-40 h-full overflow-hidden", // layout
          "bg-neutral-50 dark:bg-[#262626]", // background
          "transition-[width,opacity]", // animation
          motion,
          isOpen() ? "w-80 opacity-100 border-r border-border shadow-xl" : "w-0 opacity-0",
          p.class,
        )}
      >
        <div class={"flex flex-col w-[calc(20rem-1px)] h-full"}>
          <div class={"flex items-center h-11 px-2 pl-4"}>
            <h2 class={"flex-1 min-w-0 truncate text-base font-semibold text-neutral-950 dark:text-neutral-50"}>
              {p.title}
            </h2>
            <button
              type={"button"}
              onClick={() => p.open.set(false)}
              title={ttt("Close")}
              aria-label={ttt("Close")}
              class={classArr(
                "flex items-center justify-center shrink-0 size-8 rounded-md cursor-pointer", // layout
                "text-neutral-950 dark:text-neutral-50 hover:bg-black/5 dark:hover:bg-white/10", // hover
              )}
            >
              <Icon path={mdiClose} class={"size-5"} />
            </button>
          </div>
          <div class={"flex-1 min-h-0 overflow-y-auto px-3 pb-3"}>{p.children}</div>
        </div>
      </aside>
    </>
  )
}

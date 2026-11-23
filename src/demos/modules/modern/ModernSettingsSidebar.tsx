import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import type { Element as JSXElement } from "solid-js"
import { ttt } from "#ui/i18n/ttt.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface ModernSettingsSidebarProps extends MayHaveClass {
  open: SignalObject<boolean>
  title: JSXElement
  /** Panel body, e.g. <ModernSettingsPanel />. */
  children: JSXElement
}

// Same timing as ModernSidebar so both sidebars move as one.
const motion = "duration-500 ease-in-out motion-reduce:transition-none"

/**
 * Secondary sidebar that overlays the page right next to ModernSidebar, e.g. for settings; the page does not shift.
 * Render it inside a `relative` wrapper around ModernSidebar: it is positioned at `left-full` of that wrapper.
 * A backdrop over the page closes it on click. Stays mounted: the width animates between 0 and w-80
 * and the content keeps a fixed width so it slides instead of reflowing.
 */
export function ModernSettingsSidebar(p: ModernSettingsSidebarProps) {
  const isOpen = () => p.open.get()
  return (
    <>
      <div
        data-modern-settings-backdrop=""
        aria-hidden="true"
        data-closed={!isOpen() ? "" : undefined}
        onClick={() => p.open.set(false)}
        class={classArr(
          "absolute top-0 left-full z-30 h-full w-screen bg-black/10 dark:bg-[#05060d]/50 backdrop-blur-[2px]", // layout + look
          "transition-opacity opacity-100 data-closed:opacity-0 data-closed:pointer-events-none", // animation
          motion,
        )}
      />
      <aside
        aria-hidden={isOpen() ? "false" : "true"}
        inert={!isOpen()}
        onKeyDown={(e) => e.key === "Escape" && p.open.set(false)}
        class={classArr(
          "absolute top-0 left-full z-40 h-full overflow-hidden", // layout
          "bg-white/90 dark:bg-[#0e1122]/90 backdrop-blur-xl backdrop-saturate-150", // background
          "transition-[width,opacity] w-80 aria-hidden:w-0 opacity-100 aria-hidden:opacity-0", // animation
          "aria-[hidden=false]:border-r aria-[hidden=false]:border-neutral-200/80 dark:aria-[hidden=false]:border-white/[0.08] aria-[hidden=false]:shadow-2xl aria-[hidden=false]:shadow-violet-950/20",
          motion,
          p.class,
        )}
      >
        <div class={"flex flex-col w-[calc(20rem-1px)] h-full"}>
          <div class={"flex items-center h-11 px-2 pl-4"}>
            <h2 class={"flex-1 min-w-0 truncate text-base font-semibold text-neutral-950 dark:text-slate-100"}>
              {p.title}
            </h2>
            <button
              type={"button"}
              onClick={() => p.open.set(false)}
              title={ttt("Close")}
              aria-label={ttt("Close")}
              class={classArr(
                "flex items-center justify-center shrink-0 size-8 rounded-lg cursor-pointer", // layout
                "text-neutral-500 dark:text-slate-400 hover:text-neutral-950 dark:hover:text-white hover:bg-violet-500/5 dark:hover:bg-white/[0.06]", // hover
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

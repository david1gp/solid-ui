import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { navbarHeaderModernThemeSwitchStateCreate } from "#src/demos/modules/navbarHeaderModern/theme/navbarHeaderModernThemeSwitchStateCreate.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavbarHeaderModernThemeSwitchProps extends MayHaveClass {
  /** Accessible name; the switch is "on" in dark mode. */
  label?: string
}

/** Sun/moon toggle switch between light and dark mode. */
export function NavbarHeaderModernThemeSwitch(p: NavbarHeaderModernThemeSwitchProps) {
  const state = navbarHeaderModernThemeSwitchStateCreate()
  return (
    <button
      type={"button"}
      role={"switch"}
      aria-checked={state.isDark() ? "true" : "false"}
      aria-label={p.label ?? "Dark mode"}
      title={p.label ?? "Dark mode"}
      onClick={state.toggle}
      class={classArr(
        "relative inline-flex h-7 w-13 shrink-0 cursor-pointer items-center rounded-full p-0.5", // layout
        "border border-border bg-muted transition-colors", // track
        "focus-visible:outline-2 focus-visible:outline-offset-2", // focus
        p.class,
      )}
    >
      <Icon path={mdiWhiteBalanceSunny} class={"absolute left-1.5 size-3.5 text-amber-500"} />
      <Icon path={mdiWeatherNight} class={"absolute right-1.5 size-3.5 text-muted-foreground"} />
      <span
        aria-hidden={"true"}
        class={classArr(
          "relative flex size-6 items-center justify-center rounded-full shadow-sm", // thumb
          "bg-white text-amber-500 dark:bg-neutral-800 dark:text-sky-200", // colors
          "transition-[translate,opacity] duration-200 motion-reduce:transition-none",
          state.isDark() && "translate-x-5.5",
          !state.ready() && "opacity-0",
        )}
      >
        <Icon path={state.isDark() ? mdiWeatherNight : mdiWhiteBalanceSunny} class={"size-4"} />
      </span>
    </button>
  )
}
